import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/App.css';
import ScrollHint from '../components/ScrollHint'; 
import { useTranslation } from 'react-i18next';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const App: React.FC = () => {
  const boxesRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (boxesRef.current) {
        const rect = boxesRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsScrolled(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="start-content">
        <p >
          {t('home.intro')}
        </p>

        <a href= {`${BASE_URL}/login`} className="please-login">
          {t('home.login_prompt')}
        </a>
      </div>
      <ScrollHint />
      <div ref={boxesRef} className={`intro-function-content ${isScrolled ? 'visible' : ''}`}>
                <div className="intro-item">
                  <div className="intro-image-container">
                    <img className="intro-image" src="https://imgur.com/5yoH2bf.jpeg" alt="Top Tracks"/>
                  </div>  
                  <div className='intro-words'>
                    <p className='function-title'>{t('home.top_tracks_title')}</p>
                    <p>{t('home.top_tracks_desc')}</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                 <img className="intro-image" src="https://imgur.com/IQAajbk.jpeg" alt="Top Artists"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>{t('home.top_artists_title')}</p>
                    <p>{t('home.artists_desc')}</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/ltQJcVc.jpeg" alt="Top Albums"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>{t('home.top_albums_title')}</p>
                    <p>{t('home.top_albums_desc')}</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/eWtoR5D.jpeg" alt="Top Genres"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>{t('home.top_genres_title')}</p>
                    <p>{t('home.genres_desc')}</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/seRyHq6.jpeg" alt="Top Eras"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>{t('home.top_eras_title')}</p>
                    <p>{t('home.top_eras_desc')}</p>
                  </div>
                </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
