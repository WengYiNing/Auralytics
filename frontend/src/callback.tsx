import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const Callback: React.FC = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetch('https://auralyticsmusic.com/.netlify/functions/token-exchange', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.access_token) {
          console.log('Access Token:', data.access_token);
          login(data.access_token); 
          if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
          }
          if (data.user_id) { 
            localStorage.setItem('userId', data.user_id);
          }
          navigate('/'); 
        } else {
          console.error('Failed to exchange code for tokens');
          navigate('/error');
        }
      })
      .catch(error => {
        console.error('Error during token exchange:', error);
        navigate('/error');
      });
    } else {
      console.error('Authorization code not found in URL');
      navigate('/error');
    }
  }, [login, navigate]);

  return <div>Loading...</div>;
}

export default Callback;
