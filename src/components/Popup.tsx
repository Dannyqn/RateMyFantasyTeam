import React from 'react';
import styles from './Popup.module.css'; // Import your CSS module

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
