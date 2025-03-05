import React from 'react';
import speechBubble from '../assets/debateMate_speechBubble.png';
import titlePic from '../assets/debateMate_Title.png';

const DebateMateLogo = () => {
  return (
    <div className="speechbubble" style={{ zIndex: '5' }}>
      <img
        src={speechBubble}
        alt="speechBubble"
        style={{
          position: 'absolute',
          width: '40vw',
          top: '5vw',
          zIndex: '3', //move (0,0) from top left to middle of pic
          transform: 'translateX(-50%)',
        }}
      />
      <img
        src={titlePic}
        alt="title"
        style={{
          position: 'absolute',
          width: '30vw',
          zIndex: '4',
          top: '8vw',
          transform: 'translateX(-50%)',
        }}
      />{' '}
    </div>
  );
};

export default DebateMateLogo;
