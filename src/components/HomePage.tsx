import React from 'react';
import NavBar from './NavBar/Navbar'; // Import your SearchBar component
import styles from './HomePage.module.css'; // Import the CSS module for styling

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <NavBar />
    </div>
  );
};

export default HomePage;
