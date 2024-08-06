import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import { auth } from '../firebase'; // Import auth for logout
import styles from './Navbar.module.css'; // Import CSS module for styling
import logo from '../../assets/RateMyFantasyTeam.png';
import SearchBar from './Searchbar/Searchbar';
import SearchResultsList from './Searchbar/SearchResultsList';

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { currentUser, userData } = useAuth(); // Get current user and userData from Auth context

  // Handler for login button click
  const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };

  // Handler for signup button click
  const handleSignupClick = () => {
    navigate('/signup'); // Redirects to the signup page
  };

  // Handler for logout button click
  const handleLogoutClick = async () => {
    await auth.signOut();
    navigate('/'); // Redirects to the home page after logout
  };

    // Handler for profile click
    const handleProfileClick = async () => {
      navigate('/profile'); // Redirects to the profile page
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
        {!currentUser ? (
          <>
            <button className={styles.loginbutton} onClick={handleLoginClick}>
              Log in
            </button>
            <button className={styles.signupbutton} onClick={handleSignupClick}>
              Sign Up
            </button>
          </>
        ) : userData ? (
          <>
            <Link to="/profile" className={styles.usernameLink}>
                <span className={styles.username} onClick={handleProfileClick}>{userData.username}</span>
            </Link>
            <button className={styles.logoutbutton} onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <span className={styles.loading}>Loading...</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
