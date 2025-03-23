import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';
import { useAuth } from '../AuthContext';
import ScrollHint from '../components/ScrollHint'; 

const App: React.FC = () => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();
  const boxesRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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


  return (
    <div>
      <Header />
      <div className="start-content">
        <p >
          Discover your unique music story.
          <br /><br />
          Explore your top tracks, artists, genres, and musical eras. Dive into your personalized Spotify insights!
        </p>

        <a href="https://auralyticsmusic.com/.netlify/functions/login" className="please-login">
          Login with your Spotify account to start...
        </a>
      </div>
      <ScrollHint />
      <div ref={boxesRef} className={`intro-function-content ${isScrolled ? 'visible' : ''}`}>
                <div className="intro-item">
                  <div className="intro-image-container">
                    <img className="intro-image" src="https://imgur.com/5yoH2bf.jpeg" alt="Top Tracks"/>
                  </div>  
                  <div className='intro-words'>
                    <p className='function-title'>Top tracks</p>
                    <p>Instantly see your top 50 most-played tracks and relive the songs that build your vibe.</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                 <img className="intro-image" src="https://imgur.com/IQAajbk.jpeg" alt="Top Artists"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>Top artists</p>
                    <p>Explore your top 20 most-listened artists and see who’s been dominating your playlists.</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/ltQJcVc.jpeg" alt="Top Albums"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>Top albums</p>
                    <p>Dive into your top 10 most-listened albums and see what’s been on repeat.</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/eWtoR5D.jpeg" alt="Top Genres"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>Top genres</p>
                    <p>Discover your top 10 most-listened music genres and see which styles define your unique taste.</p>
                  </div>
                </div>
                <div className="intro-item">
                <div className="intro-image-container">
                  <img className="intro-image" src="https://imgur.com/seRyHq6.jpeg" alt="Top Eras"/>
                </div>
                  <div className='intro-words'>
                    <p className='function-title'>Top eras</p>
                    <p>Discover your top 5 most-listened eras and reveal your music history.</p>
                  </div>
                </div>
      </div>
      <div className='index-footer'>
        <div className="content">
          <div className='trade-mark-and-disclaimer'>
            <p>
            Music data, artist images, and album covers are provided by Spotify. Spotify is a trademark of Spotify AB.<br />
            We are not affiliated with Spotify AB or its partners, and our service is only intended for personal use of music data.
            </p>
          </div>
          <div className='policy-and-trademark'>
              <p className='trademark'>© 2025 Auralytics</p>
              <div className= 'policy'>
                <Link to="/TermsOfUse">Terms of Use</Link>
                <Link to="/privacy">Privacy Policy</Link>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default App;
