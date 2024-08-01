import React from 'react';
import NavBar from './NavBar/Navbar'; // Import your SearchBar component
import styles from './HomePage.module.css'; // Import the CSS module for styling

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to the Home Page</h1>
      <p>This is where your main content goes.</p>
      <NavBar /> {/* Add the search bar component */}
      {/* Add more content or components as needed */}
    </div>
  );
};

export default HomePage;
