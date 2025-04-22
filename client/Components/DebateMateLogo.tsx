import React from 'react';
import speechBubble from '../assets/debateMate_speechBubble.webp';
import titlePic from '../assets/debateMate_Title.png';
import logo from '../assets/debateMate_logo.png';

const DebateMateLogo = () => {
  return (
    <div className="logo-container">
      <img className="speechBubble" src={logo} alt="speechBubble logo" />
    </div>
  );
};

export default DebateMateLogo;
