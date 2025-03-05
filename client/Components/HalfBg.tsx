import React from 'react';
import yes from '../assets/debate-yes.png';
import no from '../assets/debate-no.png';

interface HalfBgProps {
  color: string;
}
const HalfBg: React.FC<HalfBgProps> = ({ color }) => {
  return (
    <div className={'background ' + color}>
      {color === 'blue' && (
        <img
          src={no}
          id="CONside"
          alt="CON"
          style={{
            position: 'absolute',
            height: '20vh',
            left: '78%',
            top: '50%',
            opacity: 1,
            zIndex: 5,
            transform: 'translateX(-50%)', //move (0,0) from top left to middle of pic
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}
      {color === 'red' && (
        <img
          src={yes}
          id="CONside"
          alt="CON"
          style={{
            position: 'absolute',
            height: '20vh',
            left: '78%',
            top: '50%',
            opacity: 1,
            zIndex: 5,
            transform: 'translateX(-50%)', //move (0,0) from top left to middle of pic
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}
    </div>
  );
};

export default HalfBg;
