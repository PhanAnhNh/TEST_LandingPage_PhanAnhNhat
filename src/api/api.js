import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - Thêm token vào header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi
axiosClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    
    if (error.response) {
      // Server trả về lỗi
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      
      // Nếu 401 Unauthorized - xóa token
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        // Dispatch event để các component khác cập nhật
        window.dispatchEvent(new Event('authChange'));
      }
    } else if (error.request) {
      // Không nhận được response
      console.error('No response from server');
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;