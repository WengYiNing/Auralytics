import React, { useEffect, useState } from 'react';
import '../styles/ScrollHint.css'; 

const ScrollHint: React.FC = () => {
  const [visible, setVisible] = useState(true);

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
      <span>↓ Scroll to explore</span>
    </div>
  );
};

export default ScrollHint;
