import React, { useState } from 'react';
import '../styles/Header.css';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = `${BASE_URL}/login`;
  };

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { t } = useTranslation();

  return (
    <div className="header">
      <h2><a className="Website-name" href="/function">Auralytics</a></h2>
      <div className="account">
        <button className="dropdown-bottom" onClick={toggleDropdown}>
         {t('header.account')} <span>▾</span>
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {isLoggedIn ? (
              <button onClick={handleLogout}>{t('header.logout')}</button>
            ) : (
              <button onClick={handleLogin}>{t('header.login')}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
