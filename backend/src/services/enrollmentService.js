import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';

class EnrollmentService {
  async enrollUser(userId, courseId, client = pool) {
    const enrollmentId = uuidv4();

    await client.query(
      `INSERT INTO enrollments (id, user_id, course_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, course_id) DO NOTHING`,
      [enrollmentId, userId, courseId]
    );

    return enrollmentId;
  }

  async getEnrolledCourses(userId) {
    const result = await pool.query(
      `SELECT c.*, u.full_name as instructor_name,
              e.enrolled_at,
              (SELECT COUNT(*) FROM videos WHERE course_id = c.id) as total_videos,
              (SELECT COUNT(*) FROM progress p 
               JOIN videos v ON p.video_id = v.id 
               WHERE p.user_id = $1 AND v.course_id = c.id AND p.is_completed = true) as completed_videos
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       LEFT JOIN users u ON c.instructor_id = u.id
       WHERE e.user_id = $1
       ORDER BY e.enrolled_at DESC`,
      [userId]
    );

    return result.rows.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnail_url,
      instructorName: course.instructor_name,
      enrolledAt: course.enrolled_at,
      progress: {
        totalVideos: parseInt(course.total_videos || 0),
        completedVideos: parseInt(course.completed_videos || 0),
        percentage: course.total_videos > 0 
          ? Math.round((course.completed_videos / course.total_videos) * 100) 
          : 0
      }
    }));
  }

  async checkEnrollment(userId, courseId) {
    const result = await pool.query(
      'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    return result.rows.length > 0;
  }
}

export default new EnrollmentService();
