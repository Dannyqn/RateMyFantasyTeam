import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS module for styling
import logo from '../../assets/RateMyFantasyTeam.png';
import SearchBar from './Searchbar/Searchbar';
import SearchResultsList from './Searchbar/SearchResultsList';

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Handler for login button click
  const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };

  // Handler for signup button click
  const handleSignupClick = () => {
    navigate('/signup'); // Redirects to the signup page
  };

  return (
    <nav className={styles.navbar} id="navbar">
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <div className={styles.searchbarcontainer}>
        <SearchBar setResults={setResults} setIsFocused={setIsFocused} />
        {results && results.length > 0 && <SearchResultsList results={results} isFocused={isFocused} />}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.loginbutton} onClick={handleLoginClick}>
          Log in
        </button>
        <button className={styles.signupbutton} onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
