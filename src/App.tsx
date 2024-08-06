// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import your HomePage component
import LoginPage from './components/LoginPage'; // Import your LoginPage component
import Layout from './components/NavBar/Layout'; // Import the Layout component
import SignUpPage from './components/SignUpPage';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import ProfilePage from './components/ProfilePage';
import TeamPage from './components/TeamPage';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="profile" element={<ProfilePage />}/>
            <Route path="teamcreation" element={<TeamPage />}/>
            {/* Add other routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
