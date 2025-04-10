import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/LandingPage.css';
import ScrollHint from '../components/ScrollHint'; 
import { useTranslation } from 'react-i18next';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const functionList = [
  {
    image: "https://imgur.com/DDsfJVh.jpeg",
    alt: "Top Tracks",
    title: 'home.top_tracks_title',
    desc: 'home.top_tracks_desc'
  },
  {
    image: "https://imgur.com/uss6Xfu.jpeg",
    alt: "Top Artists",
    title: 'home.top_artists_title',
    desc: 'home.top_artists_desc'
  },
  {
    image: "https://imgur.com/lnaxdCk.jpeg",
    alt: "Top Albums",
    title: 'home.top_albums_title',
    desc: 'home.top_albums_desc'
  },
  {
    image: "https://imgur.com/ZCDqGW4.jpeg",
    alt: "Top Genres",
    title: 'home.top_genres_title',
    desc: 'home.top_genres_desc'
  },
  {
    image: "https://imgur.com/0ORZtMy.jpeg",
    alt: "Top Eras",
    title: 'home.top_eras_title',
    desc: 'home.top_eras_desc'
  },
];

const App: React.FC = () => {
  const boxesRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

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

  const currentItem = functionList[currentIndex];

  return (
    <div>
      <Header />
      <div className="start-content">
        <p>
          {t('home.intro')
            .split('\n')
            .map((line: string, idx: number) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
          ))}
        </p>
        <a href={`${BASE_URL}/login`} className="please-login">
          {t('home.login_prompt')}
        </a>
      </div>

      <ScrollHint />

      <div className="demo-preview-container">
        <h2 className="demo-title">{t('home.demo_title') || 'See your music story in action'}</h2>
        <p className="demo-subtitle">
          {t('home.demo_subtitle') || "Here's an example of what you'll get after logging in."}
        </p>

        <img
          src="https://imgur.com/j2BGodl.png"
          alt="Demo Preview"
          className="demo-image"
        />

        <p className="demo-caption">
          {t('home.demo_caption') || 'Genre breakdown, favorite tracks, and visual insights – personalized for you.'}
        </p>

        <ScrollHint />
      </div>

      <div ref={boxesRef} className={`intro-function-content ${isScrolled ? 'visible' : ''}`}>
        <div className="intro-item single">
          <div className="intro-image-container">
            <img className="intro-image" src={currentItem.image} alt={currentItem.alt} />
          </div>  
          <div className='intro-words'>
            <p>{t(currentItem.desc)}</p>
          </div>
        </div>
        <div className="function-selector">
          {['track', 'artist', 'album', 'genre', 'era'].map((key, idx) => (
            <button
              key={idx}
              className={`selector-button ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              {t(`home.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
