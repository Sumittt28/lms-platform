import api from './api';

const courseService = {
  async getCourses(params = {}) {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  async getCourse(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  async getInstructorCourses() {
    const response = await api.get('/courses/instructor/my-courses');
    return response.data;
  },

  async getCourseVideos(courseId) {
    const response = await api.get(`/courses/${courseId}/videos`);
    return response.data;
  },

  async addVideo(courseId, videoData) {
    const response = await api.post(`/courses/${courseId}/videos`, videoData);
    return response.data;
  }
};

export default courseService;
