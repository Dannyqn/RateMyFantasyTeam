import React, { useState, useEffect } from 'react';
import NavBar from './NavBar/Navbar';
import styles from './ProfilePage.module.css';
import profilepic from '../assets/Default_pfp.jpg';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Ensure Firebase is correctly configured
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

type User = {
  name: string;
  email: string;
  profilePicture: string;
};

const initialUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: profilepic,
};

type Member = {
  name: string;
  position: string;
};

type Team = {
  id: string;
  format: string;
  leagueMembers: number;
  platform: string;
  starters: Member[];
  bench: Member[];
  irIl: Member[];
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>(initialUser);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsCollection = collection(db, 'teams');
      const teamDocs = await getDocs(teamsCollection);
      const teamsData = teamDocs.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
      setTeams(teamsData);
    };

    fetchTeams();
  }, []);

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

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Add code to save updated user data to Firestore
  };

  const handleCreateTeam = () => {
    navigate('/teamcreation');
  };

  const handleEditTeam = (teamIndex: number) => {
    const teamToEdit = teams[teamIndex];
    navigate('/teamcreation', { state: { team: teamToEdit, isEditing: true } });
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await deleteDoc(doc(db, 'teams', teamId));
      setTeams(teams.filter(team => team.id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div className={styles.homePage}>
      <NavBar />
      <div className={styles.profileContent}>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className={styles.profilePicture}
        />
        <div className={styles.profileInfo}>
          {isEditingProfile && userData ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className={styles.profileInput}
              />
              <button onClick={handleSaveProfile} className={styles.profileButton}>Save</button>
            </>
          ) : (
            <>
              <h2 className={styles.profileName}>{userData && userData.username}</h2>
              <p className={styles.profileEmail}>{userData && userData.email}</p>
              <button onClick={() => setIsEditingProfile(true)} className={styles.profileButton}>Edit</button>
            </>
          )}
          <button onClick={handleCreateTeam} className={styles.createTeamButton}>Create a Team</button>
        </div>
      </div>
      <div className={styles.teamInfoSection}>
        <h2 className={styles.teamInfoTitle}>Your Teams</h2>
        <div className={styles.teamContainer}>
          {teams.slice(0, 8).map((team, index) => (
            <div key={team.id} className={styles.teamDetails}>
              <h3 className={styles.teamName}>{team.leagueMembers}-Man {team.format}</h3>
              <h4 className={styles.teamPlatform}>Platform: {team.platform}</h4>
              <h5>Starters:</h5>
              <ul>
                {team.starters.map((member, i) => (
                  <li key={`starter-${i}`}>{member.name} - {member.position}</li>
                ))}
              </ul>
              <h5>Bench:</h5>
              <ul>
                {team.bench.map((member, i) => (
                  <li key={`bench-${i}`}>{member.name} - {member.position}</li>
                ))}
              </ul>
              <h5>IR/IL:</h5>
              <ul>
                {team.irIl.map((member, i) => (
                  <li key={`irIl-${i}`}>{member.name} - {member.position}</li>
                ))}
              </ul>
              <button onClick={() => handleEditTeam(index)} className={styles.editTeamButton}>Edit</button>
              <button onClick={() => handleDeleteTeam(team.id)} className={styles.deleteTeamButton}>Delete</button>
            </div>
          ))}
        </div>
        {teams.length > 8 && <p>You have more teams, but only 8 are displayed.</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
