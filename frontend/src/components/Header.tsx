import React, { useState } from 'react';
import '../styles/Header.css';
import { useAuth } from '../AuthContext';
const BASE_URL = process.env.REACT_APP_API_BASE;

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

  return (
    <div className="header">
      <h2><a className="Website-name" href="/function">Auralytics</a></h2>
      <div className="account">
        <button className="dropdown-bottom" onClick={toggleDropdown}>
          account <span>▾</span>
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Log Out</button>
            ) : (
              <button onClick={handleLogin}>Log In</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
