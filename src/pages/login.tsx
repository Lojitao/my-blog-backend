import React from 'react';
import { Button, DatePicker } from 'antd';

export const LoginRoute: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <DatePicker style={{ marginTop: 16 }} />
      <Button type="primary">登入</Button>
    </div>
  );
};


// export const LoginRoute = () => {
//   return (
//     <p>登入頁拉!!!</p>
//   );
// };
