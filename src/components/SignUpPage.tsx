import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import the auth and db instances
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the auth function
import styles from './LoginPage.module.css'; // Import your CSS module
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import Popup from './Popup'; // Import the Popup component
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [username, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset the error state before attempting sign-up

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save username to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email
      });
      setShowPopup(true); // Show the popup on success
      // Set a timeout to navigate after the popup is displayed
      setTimeout(() => {
        setShowPopup(false); // Hide the popup before redirecting
        navigate('/'); // Redirect to homepage
      }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)
    } catch (error: any) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Redirect or handle post-signup logic here
  };

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form onSubmit={handleSignUp} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Signup</button>
      </form>
      {showPopup && (
        <Popup
          message="Sign-up successful!"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default SignUpPage;
