import React, { ReactNode } from 'react';
import { SwirlBg } from '../Components/SwirlBg';
import blueBg from '../assets/debateMate_blueBg.png';
import redBg from '../assets/debateMate_redBg.png';
import textureBg from '../assets/debateMateTexture.png';
import HalfBg from '../Components/HalfBg';

import swirlBgImg from '../debateMate_spinTexture.png';

interface ContainerProps {
  children?: ReactNode;
  isHovered: 'red' | 'blue' | '' | null;
  color: 'red' | 'blue';
}
type Metadata = {
  className: string;
  baseBgSrc: string;
  alt: string;
  swirlId: string;
};

const Container: React.FC<ContainerProps> = ({
  color,
  isHovered,
  children,
}) => {
  let metadata: Metadata = {
    className: '',
    baseBgSrc: '',
    alt: '',
    swirlId: '',
  };
  let containerClass =
    isHovered == color
      ? 'background background-stretch ' + color
      : 'background ' + color;
  let id = '';
  function getClasses(color: string) {
    if (color === 'blue') {
      if (isHovered !== 'blue') {
        containerClass += ' background-right';
      }
      id = 'background-right';
    } else if (color === 'red') {
      containerClass += ' background-left';
      id = 'background-left';
    }
  }
  getClasses(color);

  return isHovered === color ? (
    <div className={'background ' + color}>
      <HalfBg color={color}></HalfBg>
    </div>
  ) : (
    <div className={containerClass} id={id}>
      <SwirlBg key={id} color={color}>
        {children}
      </SwirlBg>
    </div>
  );
};

export default Container;
