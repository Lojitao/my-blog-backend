import React, { useState } from 'react';
import { Button, Input,notification } from 'antd';
import { UserOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import { useApi } from '../context/ApiContext'; // 引入全局 API 的 Hook
import { useNavigate } from "react-router-dom";

// @ts-ignore
import { setToken } from "../utils/cookie.js";

export const LoginRoute: React.FC = () => {
  const api = useApi(); // 全局 API
  const navigate = useNavigate(); // 初始化 useNavigate Hook

  const [account,setAccount] = useState("")
  const [secret,setSecret] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 控制圖標狀態

  function iconChange(){
    setIsPasswordVisible((prev) => !prev); // 切換圖標狀態
  }

  async function submit(){
    const response = await api.auth.login({ login:account, password:secret });
    const { status,data } =response
    if (status===200) {
      notification.success({message: "登入成功"})
      setToken(data)
      navigate('/dashboard')
    }
    
  }

  return (
    <div className='w-fit h-screen m-auto flex flex-col justify-center items-center'>
      <Input className='w-fit flex mb-2'
        value={account} onChange={(e) => setAccount(e.target.value)}
        placeholder="帳號" prefix={<UserOutlined />}
      />

      <Input className='w-fit flex mb-2'
        value={secret} onChange={(e) => setSecret(e.target.value)}
        placeholder="密碼" 
        type={isPasswordVisible ? "text" : "password"} // 切換密碼輸入顯示類型
        prefix={
          isPasswordVisible ? (
            <EyeInvisibleOutlined onClick={iconChange} style={{ cursor: 'pointer' }} />
          ) : (
            <EyeOutlined onClick={iconChange} style={{ cursor: 'pointer' }} />
          )
        }
      />
      
      <Button onClick={submit} type="primary">登入</Button>

    </div>
  );
};

