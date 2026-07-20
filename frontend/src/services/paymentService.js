import api from './api';

const paymentService = {
  async createCheckout(courseId) {
    const response = await api.post('/payments/create-checkout', { courseId });
    return response.data;
  },

  async verifyPayment(sessionId) {
    const response = await api.get(`/payments/verify/${sessionId}`);
    return response.data;
  }
};

export default paymentService;
