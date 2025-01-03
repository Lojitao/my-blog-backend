import Cookies from "js-cookie";

// 獲取 Token
export const getToken = () => {
  return Cookies.get("token") || undefined; // 如果 token 不存在，返回 undefined
};

// 驗證是否已登入
export const hasValidToken = () => {
  return !!getToken(); // 驗證 token 是否有效
};

// 儲存 Token
export const setToken = (token) => {
  Cookies.set("token", token); // 將 token 儲存到 Cookie 中
};

// 清除 Token
export const clearToken = () => {
  Cookies.remove("token"); // 移除 token
};