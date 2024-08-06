import React, { useState } from 'react';
import NavBar from './NavBar/Navbar'; // Import your NavBar component
import styles from './ProfilePage.module.css'; // Import the CSS module for styling
import profilepic from '../assets/Default_pfp.jpg';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';

type User = {
  name: string;
  email: string;
  profilePicture: string;
};

const initialUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: profilepic
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, userData } = useAuth(); // Get current user and userData from Auth context
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add code to save the updated user data to a server or local storage
  };

  const handleCreateTeam = () => {
    navigate('/teamcreation');
  };

  return (
    <div className={styles.homePage}>
      <NavBar />
      <div className={styles.profileContent}>
        <img
          src={profilepic}
          alt={`${user.name}'s profile`}
          className={styles.profilePicture}
        />
        <div className={styles.profileInfo}>
          {isEditing && userData ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <input
                type="text"
                name="name"
                value={userData.username}
                onChange={handleChange}
                className={styles.profileInput}
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={styles.profileInput}
              />
              <button onClick={handleSave} className={styles.profileButton}>Save</button>
            </>
          ) : (
            <>
              <h2 className={styles.profileName}>{userData && userData.username}</h2>
              <p className={styles.profileEmail}>{userData && userData.email}</p>
              <button onClick={() => setIsEditing(true)} className={styles.profileButton}>Edit</button>
            </>
          )}
          <button onClick={handleCreateTeam} className={styles.createTeamButton}>Create a Team</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
