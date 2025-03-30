import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className="footer">
      <div id="root">
        <div className="content">
          <div className='trade-mark-and-disclaimer'>
            <p>{t('footer.disclaimer')}</p>
            <div className='social-link'>
              <Link to="https://x.com/AuralyticsMusic">X</Link>
              <Link to="https://github.com/WengYiNing/Auralytics">Github</Link>
            </div>
          </div>
          <div className='policy-and-trademark'>
            <p className='trademark'>© 2025 Auralytics</p>
            <div className='policy'>
              <Link to="/TermsOfUse">{t('footer.terms')}</Link>
              <Link to="/privacy">{t('footer.privacy')}</Link>
            </div>
            <select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}>
              <option value="en">English</option>
              <option value="zh-TW">繁體中文</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
