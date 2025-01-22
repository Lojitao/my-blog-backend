import axiosInstance from './axiosInstance';

const blog = {
  getList: (params) => axiosInstance.get('/blog', {params}),
  getBlogById: (id) => axiosInstance.get(`/blog/${id}`),
  add: (data) => axiosInstance.post('/blog', data),
  update: (id,data) => axiosInstance.put(`/blog/${id}`,data),
  deleteBlog: (id) => axiosInstance.delete(`/blog/${id}`),
};

export default blog;