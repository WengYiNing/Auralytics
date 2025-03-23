import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div id="root">
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
    </footer>
  );
};

export default Footer;
