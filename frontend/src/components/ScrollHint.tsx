import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ScrollHint.css'; 

const ScrollHint: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-hint ${visible ? 'visible' : 'hidden'}`}>
      <span>↓ {t('scroll_hint.hint')}</span>
    </div>
  );
};

export default ScrollHint;
