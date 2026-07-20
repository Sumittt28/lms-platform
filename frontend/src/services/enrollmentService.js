import api from './api';

const enrollmentService = {
  async getMyCourses() {
    const response = await api.get('/enrollments/my-courses');
    return response.data;
  },

  async checkEnrollment(courseId) {
    const response = await api.get(`/enrollments/check/${courseId}`);
    return response.data;
  }
};

export default enrollmentService;
