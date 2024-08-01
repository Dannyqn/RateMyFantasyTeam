import React, { useState } from 'react';
import styles from './LoginPage.module.css'; // Import your CSS module
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup'; // Import the Popup component

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setShowPopup(true); // Show the popup on success
      // Set a timeout to navigate after the popup is displayed
      setTimeout(() => {
        setShowPopup(false); // Hide the popup before redirecting
        navigate('/'); // Redirect to homepage
      }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Redirect or handle post-signup logic here
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
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
        <button type="submit" className={styles.button}>Login</button>
      </form>
      {showPopup && (
        <Popup
          message="Log-in successful!"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default LoginPage;
