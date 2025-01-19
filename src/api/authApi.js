import axiosInstance from './axiosInstance';

const authApi = {
  login: (data) => axiosInstance.post('/admin/auth/sign_in', data),
  // register: (data) => axiosInstance.post('/auth/register', data),
  // logout: () => axiosInstance.post('/auth/logout'),
};

export default authApi;