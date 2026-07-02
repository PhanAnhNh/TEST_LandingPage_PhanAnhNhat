import axiosClient from '../api/api';

const authApi = {
  login: (data) => {
    return axiosClient.post('/auth/login', data);
  },
  
  register: (data) => {
    return axiosClient.post('/auth/register', data);
  },

  googleLogin: (data) => {
    return axiosClient.post('/auth/google-login', data);
  },

  getMe: () => {
    return axiosClient.get('/auth/me');
  }
};

export default authApi;