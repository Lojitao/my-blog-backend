import authApi from './authApi';
import category from './category';
import blogCategory from './blogCategory';
import blog from './blog';

export type ApiType = {
  auth: typeof authApi;
  category: typeof category;
  blogCategory: typeof blogCategory;
  blog: typeof blog;
};

declare const api: ApiType;

export default api;