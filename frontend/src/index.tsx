import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <FunctionPage /> : <App />;
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
          {/* 如果用戶未登入並訪問受限路徑，重定向到 / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
