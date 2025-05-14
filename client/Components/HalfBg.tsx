import React, { ReactNode } from 'react';

import swirlBg1280 from '../assets/spinTexture1280.webp';
import swirlBg1920 from '../assets/debateMate_spinTexture.png';
import swirlBg800 from '../assets/spinTexture800.webp';
import swirlBg500 from '../assets/spinTexture500.webp';

interface HalfBgProps {
  color: 'red' | 'blue';
  isHovered: 'red' | 'blue' | null;
  children?: ReactNode;
}
const HalfBg = ({ color, children, isHovered }: HalfBgProps) => {
  const side = color === 'red' ? 'left' : 'right';
  return (
    <div className={'background bg-spin background-' + side + ' ' + color}>
      <img
        srcSet={`${swirlBg500} 0.5x, ${swirlBg800} 1x, ${swirlBg1280} 1.5x, ${swirlBg1920} 2x`}
        src={swirlBg1920}
        alt="Background Swirl Texture"
        className={'swirlBg ' + color}
      />
    </div>
  );
};

export default HalfBg;
