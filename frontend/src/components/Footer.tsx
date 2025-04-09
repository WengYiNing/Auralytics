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
      <div className="footer-grid">
        <div className="footer-left">
          <select onChange={handleLanguageChange} value={i18n.language}>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
          </select>
        </div>

        <div className="footer-right">
          <a href="https://github.com/WengYiNing/Auralytics" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://x.com/AuralyticsMusic" target="_blank" rel="noopener noreferrer">X</a>
          <Link to="/TermsOfUse">{t('footer.terms')}</Link>
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <span className="trademark">© 2025 Auralytics</span>
        </div>
      </div>

      <p className="footer-disclaimer">
        {t('footer.disclaimer')}
      </p>
    </footer>
  );
};

export default Footer;
