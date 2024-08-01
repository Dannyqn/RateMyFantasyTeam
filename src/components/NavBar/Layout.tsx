// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Layout.module.css'; // Optional: CSS module for layout styling

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
