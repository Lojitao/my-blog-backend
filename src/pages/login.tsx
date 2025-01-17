import React from 'react';
import { Button, DatePicker } from 'antd';

export const LoginRoute: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <DatePicker className='block' />
      <Button className="text-2xl" type="primary">登入</Button>
      <p className="text-2xl bg-black">asdsa</p>
    </div>
  );
};


// export const LoginRoute = () => {
//   return (
//     <p>登入頁拉!!!</p>
//   );
// };
