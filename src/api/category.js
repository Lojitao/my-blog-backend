import axiosInstance from './axiosInstance';

const category = {
  getList: (params) => axiosInstance.get(
    '/category', 
    {params}
  ),
};

export default category;