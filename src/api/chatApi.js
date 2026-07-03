import axiosClient from './api';

export const chatService = {
  // Gửi tin nhắn
  sendMessage: async (message) => {
    try {
      const response = await axiosClient.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },

  // Lấy lịch sử chat
  getHistory: async (limit = 20) => {
    try {
      const response = await axiosClient.get(`/chat/history?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
      return { history: [] };
    }
  },

  // Xóa lịch sử chat
  clearHistory: async () => {
    try {
      const response = await axiosClient.post('/chat/clear');
      return response.data;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }
};

export default chatService;