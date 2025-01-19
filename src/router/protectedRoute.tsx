
import { Navigate } from "react-router-dom";
import { paths } from './path';
import { useEffect } from 'react';

// @ts-ignore
import { hasValidToken,setToken,getToken } from "../utils/cookie.js";




export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  console.log('ProtectedRoute is rendered');

  useEffect(() => {
    console.log('ProtectedRoute mounted');
  }, []);
  // if (!hasValidToken()) {
  //   console.log('No valid token found, setting a fake token...');
  //   setToken('fake_token_123'); // 使用你的 cookie.js 中的 setToken 方法
  // }
  

  if (!hasValidToken()) {
    // console.log({
    //   pathname: location.pathname,
    //   redirectTo: paths.public.login.getHref(location.pathname),
    // });
    return (
      <Navigate to={paths.public.login.path} replace />
    );
  }
  console.log('children',children);
  
  return children;
};

// export default ProtectedRoute;