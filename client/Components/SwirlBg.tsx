import textureBg from '../assets/debateMateTexture.png';
import swirlBgImg from '../assets/debateMate_spinTexture.png';
import React, { ReactNode } from 'react';

interface SwirlBgProps {
  children?: ReactNode;
  color: 'red' | 'blue';
}

export const SwirlBg: React.FC<SwirlBgProps> = ({ children, color }) => {
  return <div className="bg-texture"></div>;
};
