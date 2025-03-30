import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import '../styles/Function.css';
import { useAuth } from '../AuthContext'; 

const FunctionPage: React.FC = () => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); 
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Header />
      <div className="instant-analysis">
        <div className="boxes-content1">
          <Link to="/tracks">{t('function.top_tracks')}</Link>
          <Link to="/artists">{t('function.top_artists')}</Link>
          <Link to="/albums">{t('function.top_albums')}</Link>
          <Link to="/genres">{t('function.top_genres')}</Link>
          <Link to="/eras">{t('function.top_eras')}</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FunctionPage;
