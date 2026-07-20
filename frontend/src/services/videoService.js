import api from './api';

const videoService = {
  async getVideo(id) {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  async updateProgress(videoId, watchedSeconds, isCompleted = false) {
    const response = await api.post(`/videos/${videoId}/progress`, {
      watchedSeconds,
      isCompleted
    });
    return response.data;
  },

  async deleteVideo(id) {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  }
};

export default videoService;
