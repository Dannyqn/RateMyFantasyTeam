import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the auth function
import styles from './LoginPage.module.css'; // Import your CSS module
import Popup from './Popup'; // Import the Popup component

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset the error state before attempting sign-up

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowPopup(true); // Show the popup on success
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
