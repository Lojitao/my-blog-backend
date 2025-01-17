import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { UserOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';

export const LoginRoute: React.FC = () => {
  const [account,setAccount] = useState("")
  const [secret,setSecret] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 控制圖標狀態

  function iconChange(){
    setIsPasswordVisible((prev) => !prev); // 切換圖標狀態
  }

  function submit(){
    console.log('account',account);
    console.log('secret',secret);
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

