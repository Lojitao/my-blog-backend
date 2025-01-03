import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div>
      {/* <Navbar /> */}
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};
// export default MainLayout;