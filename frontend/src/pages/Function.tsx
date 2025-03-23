import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Function.css';
import { useAuth } from '../AuthContext'; 

const SpotifyMusicInsights: React.FC = () => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();

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
          <Link to="/tracks">Top tracks</Link>
          <Link to="/artists">Top artists</Link>
          <Link to="/albums">Top albums</Link>
          <Link to="/genres">Top genres</Link>
          <Link to="/eras">Top eras</Link>
        </div>
      </div>
      <div className='fuction-footer'>
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

export default SpotifyMusicInsights;
