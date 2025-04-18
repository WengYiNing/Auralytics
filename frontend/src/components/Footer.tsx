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
            <option value="zh-TW">繁體中文（臺灣）</option>
            <option value="zh-HK">繁體中文（香港）</option>
            <option value="zh-CN">简体中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="es">Español</option>
            <option value="fr">français</option>
            <option value="de">Deutsch</option>
            <option value="pt-BR">Português brasileiro</option>
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
