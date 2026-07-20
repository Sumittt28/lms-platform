import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';

class CourseService {
  async getAllCourses({ page = 1, limit = 12, categoryId, search }) {
    const offset = (page - 1) * limit;
    let query = `
      SELECT c.*, u.full_name as instructor_name,
             cat.name as category_name,
             COUNT(e.id) as enrollment_count
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.is_published = true
    `;
    const params = [];
    let paramIndex = 1;

    if (categoryId) {
      query += ` AND c.category_id = $${paramIndex++}`;
      params.push(categoryId);
    }

    if (search) {
      query += ` AND (c.title ILIKE $${paramIndex} OR c.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` GROUP BY c.id, u.full_name, cat.name`;
    query += ` ORDER BY c.created_at DESC`;
    query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = `SELECT COUNT(*) FROM courses WHERE is_published = true`;
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    return {
      courses: result.rows.map(this.formatCourse),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getCourseById(courseId, userId = null) {
    const result = await pool.query(
      `SELECT c.*, u.full_name as instructor_name, u.avatar_url as instructor_avatar,
              cat.name as category_name
       FROM courses c
       LEFT JOIN users u ON c.instructor_id = u.id
       LEFT JOIN categories cat ON c.category_id = cat.id
       WHERE c.id = $1`,
      [courseId]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 404, message: 'Course not found' };
    }

    const course = this.formatCourse(result.rows[0]);

    // Get videos
    const videosResult = await pool.query(
      `SELECT id, title, description, duration_seconds, position, is_preview
       FROM videos WHERE course_id = $1 ORDER BY position`,
      [courseId]
    );
    course.videos = videosResult.rows;

    // Check enrollment if user is logged in
    if (userId) {
      const enrollmentResult = await pool.query(
        'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, courseId]
      );
      course.isEnrolled = enrollmentResult.rows.length > 0;
    } else {
      course.isEnrolled = false;
    }

    return course;
  }

  async createCourse(instructorId, courseData) {
    const { title, description, price, categoryId, thumbnailUrl } = courseData;
    const courseId = uuidv4();

    const result = await pool.query(
      `INSERT INTO courses (id, instructor_id, title, description, price, category_id, thumbnail_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [courseId, instructorId, title, description, price, categoryId || null, thumbnailUrl || null]
    );

    return this.formatCourse(result.rows[0]);
  }

  async updateCourse(courseId, instructorId, courseData) {
    // Verify ownership
    const course = await this.verifyCourseOwnership(courseId, instructorId);

    const { title, description, price, categoryId, thumbnailUrl, isPublished } = courseData;

    const result = await pool.query(
      `UPDATE courses 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           category_id = COALESCE($4, category_id),
           thumbnail_url = COALESCE($5, thumbnail_url),
           is_published = COALESCE($6, is_published),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [title, description, price, categoryId, thumbnailUrl, isPublished, courseId]
    );

    return this.formatCourse(result.rows[0]);
  }

  async deleteCourse(courseId, instructorId) {
    await this.verifyCourseOwnership(courseId, instructorId);

    await pool.query('DELETE FROM courses WHERE id = $1', [courseId]);
    return { message: 'Course deleted successfully' };
  }

  async getInstructorCourses(instructorId) {
    const result = await pool.query(
      `SELECT c.*, COUNT(e.id) as enrollment_count
       FROM courses c
       LEFT JOIN enrollments e ON c.id = e.course_id
       WHERE c.instructor_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [instructorId]
    );

    return result.rows.map(this.formatCourse);
  }

  async verifyCourseOwnership(courseId, instructorId) {
    const result = await pool.query(
      'SELECT * FROM courses WHERE id = $1',
      [courseId]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 404, message: 'Course not found' };
    }

    if (result.rows[0].instructor_id !== instructorId) {
      throw { statusCode: 403, message: 'You do not own this course' };
    }

    return result.rows[0];
  }

  formatCourse(course) {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      price: parseFloat(course.price),
      thumbnailUrl: course.thumbnail_url,
      isPublished: course.is_published,
      instructorId: course.instructor_id,
      instructorName: course.instructor_name,
      instructorAvatar: course.instructor_avatar,
      categoryId: course.category_id,
      categoryName: course.category_name,
      enrollmentCount: parseInt(course.enrollment_count || 0),
      createdAt: course.created_at,
      updatedAt: course.updated_at
    };
  }
}

export default new CourseService();
