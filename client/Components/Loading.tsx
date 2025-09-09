import loading from '../assets/beepboop.gif';

import swirlBg1280 from '../assets/spinTexture1280.webp';
import swirlBg1920 from '../assets/debateMateTexture.png';
import swirlBg800 from '../assets/spinTexture800.webp';
import swirlBg500 from '../assets/spinTexture500.webp';
import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
}: LoadingSpinnerProps) => {
  return (
    <div className="bg-color-change main-container">
      <img
        srcSet={`${swirlBg500} 0.5x, ${swirlBg800} 1x, ${swirlBg1280} 1.5x, ${swirlBg1920} 2x`}
        src={swirlBg1280}
        alt="Background Swirl Texture"
        className={className}
      />
    </div>
  );
};

export default LoadingSpinner;
