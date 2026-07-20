import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';
import config from '../config/env.js';
import courseService from './courseService.js';

const vimeoApi = axios.create({
  baseURL: 'https://api.vimeo.com',
  headers: {
    Authorization: `Bearer ${config.vimeoAccessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.vimeo.*+json;version=3.4'
  }
});

class VideoService {
  async addVideo(courseId, instructorId, videoData) {
    // Verify course ownership
    await courseService.verifyCourseOwnership(courseId, instructorId);

    const { title, description, vimeoVideoId, durationSeconds, position, isPreview } = videoData;
    const videoId = uuidv4();

    const result = await pool.query(
      `INSERT INTO videos (id, course_id, title, description, vimeo_video_id, duration_seconds, position, is_preview)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [videoId, courseId, title, description || null, vimeoVideoId, durationSeconds || null, position, isPreview || false]
    );

    return this.formatVideo(result.rows[0]);
  }

  async getCourseVideos(courseId, userId = null) {
    // Check if user is enrolled or is instructor
    let hasAccess = false;

    if (userId) {
      const courseResult = await pool.query(
        'SELECT instructor_id FROM courses WHERE id = $1',
        [courseId]
      );

      if (courseResult.rows.length > 0) {
        const course = courseResult.rows[0];
        
        // Check if instructor
        if (course.instructor_id === userId) {
          hasAccess = true;
        } else {
          // Check if enrolled
          const enrollmentResult = await pool.query(
            'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
            [userId, courseId]
          );
          hasAccess = enrollmentResult.rows.length > 0;
        }
      }
    }

    const result = await pool.query(
      `SELECT v.*, 
              CASE WHEN $2 THEN v.vimeo_video_id ELSE NULL END as vimeo_video_id
       FROM videos v
       WHERE v.course_id = $1
       ORDER BY v.position`,
      [courseId, hasAccess]
    );

    return result.rows.map(video => ({
      ...this.formatVideo(video),
      isLocked: !hasAccess && !video.is_preview
    }));
  }

  async getVideoById(videoId, userId) {
    const result = await pool.query(
      `SELECT v.*, c.instructor_id
       FROM videos v
       JOIN courses c ON v.course_id = c.id
       WHERE v.id = $1`,
      [videoId]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 404, message: 'Video not found' };
    }

    const video = result.rows[0];

    // Check access
    const isInstructor = video.instructor_id === userId;
    let hasAccess = isInstructor || video.is_preview;

    if (!hasAccess && userId) {
      const enrollmentResult = await pool.query(
        'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
        [userId, video.course_id]
      );
      hasAccess = enrollmentResult.rows.length > 0;
    }

    if (!hasAccess) {
      throw { statusCode: 403, message: 'You do not have access to this video' };
    }

    return this.formatVideo(video);
  }

  async updateProgress(userId, videoId, watchedSeconds, isCompleted = false) {
    await pool.query(
      `INSERT INTO progress (id, user_id, video_id, watched_seconds, is_completed, last_watched_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id, video_id)
       DO UPDATE SET 
         watched_seconds = GREATEST(progress.watched_seconds, $4),
         is_completed = progress.is_completed OR $5,
         last_watched_at = NOW()`,
      [uuidv4(), userId, videoId, watchedSeconds, isCompleted]
    );

    return { success: true };
  }

  async deleteVideo(videoId, instructorId) {
    const result = await pool.query(
      `SELECT v.*, c.instructor_id
       FROM videos v
       JOIN courses c ON v.course_id = c.id
       WHERE v.id = $1`,
      [videoId]
    );

    if (result.rows.length === 0) {
      throw { statusCode: 404, message: 'Video not found' };
    }

    if (result.rows[0].instructor_id !== instructorId) {
      throw { statusCode: 403, message: 'You do not own this video' };
    }

    await pool.query('DELETE FROM videos WHERE id = $1', [videoId]);
    return { message: 'Video deleted successfully' };
  }

  // Get Vimeo embed URL
  async getVimeoEmbedUrl(vimeoVideoId) {
    try {
      const response = await vimeoApi.get(`/videos/${vimeoVideoId}`);
      return response.data.embed?.html || null;
    } catch (error) {
      console.error('Vimeo API error:', error.message);
      return null;
    }
  }

  formatVideo(video) {
    return {
      id: video.id,
      courseId: video.course_id,
      title: video.title,
      description: video.description,
      vimeoVideoId: video.vimeo_video_id,
      durationSeconds: video.duration_seconds,
      position: video.position,
      isPreview: video.is_preview,
      createdAt: video.created_at
    };
  }
}

export default new VideoService();
