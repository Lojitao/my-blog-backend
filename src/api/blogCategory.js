import axiosInstance from './axiosInstance';

const blogCategory = {
  getList: (params) => axiosInstance.get('/blogCategory', {params}),
  getDataById: (id) => axiosInstance.get(`/blogCategory/${id}`),
  add: (data) => axiosInstance.post('/blogCategory', data),
  update: (id,data) => axiosInstance.put(`/blogCategory/${id}`,data),
  deleteDataById: (id) => axiosInstance.delete(`/blogCategory/${id}`),
};

export default blogCategory;