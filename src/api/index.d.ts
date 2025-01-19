import authApi from './authApi';
// import postApi from './postApi';
// import userApi from './userApi';

export type ApiType = {
  auth: typeof authApi;
  // post: typeof postApi;
  // user: typeof userApi;
};

declare const api: ApiType;

export default api;