import axiosClient from './api';

export const chatService = {
  sendMessage: async (message) => {
    try {
      console.log('📤 Sending message:', message);
      const response = await axiosClient.post('/chat', { message });
      console.log('📥 Chat response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Chat API Error:', error);
      if (error.response) {
        error.message = error.response.data?.detail || error.message;
        error.status = error.response.status;
      } else if (error.request) {
        error.message = 'No response from server';
      }
      throw error;
    }
  },

  getHistory: async (limit = 20) => {
    try {
      const response = await axiosClient.get(`/chat/history?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('❌ Error getting chat history:', error);
      if (error.response) {
        error.message = error.response.data?.detail || error.message;
        error.status = error.response.status;
      }
      return { history: [] };
    }
  },

  clearHistory: async () => {
    try {
      const response = await axiosClient.post('/chat/clear');
      return response.data;
    } catch (error) {
      console.error('❌ Error clearing chat history:', error);
      if (error.response) {
        error.message = error.response.data?.detail || error.message;
        error.status = error.response.status;
      }
      throw error;
    }
  }
};

export default chatService;