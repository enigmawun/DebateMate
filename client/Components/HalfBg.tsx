import React, { ReactNode } from 'react';
import yes from '../assets/debate-yes.png';
import no from '../assets/debate-no.png';

interface HalfBgProps {
  color: string;
  children?: ReactNode;
}
const HalfBg: React.FC<HalfBgProps> = ({ color }) => {
  return (
    <div>
      {color === 'red' ? (
        <img
          className="bubble absolute right-5vw"
          src={no}
          id="CONside"
          alt="CON"
        />
      ) : (
        <img
          className="bubble absolute left-5vw"
          src={yes}
          id="PROside"
          alt="PRO"
        />
      )}
    </div>
  );
};

export default HalfBg;
