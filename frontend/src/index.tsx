import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './pages/LandingPage';
import FunctionPage from './pages/Function';
import Tracks from './pages/Tracks';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Genres from './pages/Genres';
import Eras from './pages/Eras';
import Privacy from './pages/Privacy';
import TermsOfUse from './pages/TermsOfUse';
import Callback from './callback'; 
import { AuthProvider, useAuth } from './AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <FunctionPage /> : <LandingPage />;
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/function" element={<FunctionPage />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/eras" element={<Eras />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/TermsOfUse" element={<TermsOfUse />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
