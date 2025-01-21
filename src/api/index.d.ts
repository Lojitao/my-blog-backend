import authApi from './authApi';
import category from './category';
import blogCategory from './blogCategory';

export type ApiType = {
  auth: typeof authApi;
  category: typeof category;
  blogCategory: typeof blogCategory;
};

declare const api: ApiType;

export default api;