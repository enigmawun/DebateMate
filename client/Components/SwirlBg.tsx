import textureBg from '../assets/debateMateTexture.png';
import swirlBgImg from '../assets/debateMate_spinTexture.png';
import React, { ReactNode } from 'react';

interface SwirlBgProps {
  children: ReactNode;
  metadata: {
    baseBgSrc: string;
    alt: string;
    className?: string;
    swirlId?: string;
  };
  isHovered: string;
}

export const SwirlBg: React.FC<SwirlBgProps> = ({
  children,
  isHovered,
  metadata,
}) => {
  return (
    <>
      <img
        src={metadata.baseBgSrc}
        alt={metadata.alt}
        className={metadata.className}
      />
      <img
        src={swirlBgImg}
        id={metadata.swirlId}
        alt="Background Swirl Texture"
        className="swirlBg"
      />
      {children}
    </>
  );
};
