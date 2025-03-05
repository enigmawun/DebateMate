import React, { ReactNode, ForwardedRef, useContext } from 'react';
import { SwirlBg } from '../Components/SwirlBg';
import blueBg from '../assets/debateMate_blueBg.png';
import redBg from '../assets/debateMate_redBg.png';
import textureBg from '../assets/debateMateTexture.png';

import swirlBgImg from '../debateMate_spinTexture.png';
import hoveredContext from '../Components/Contexts';

interface ContainerProps {
  children: ReactNode;
  isHovered: 'red' | 'blue' | '';
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
  let containerClass = '';
  let id = '';
  function getClasses(color: string) {
    if (color === 'blue') {
      containerClass = 'background background-right';
      id = 'background-right';
      metadata = {
        className: 'bluebg',
        baseBgSrc: redBg,
        alt: 'Background Blue Image',
        swirlId: 'swirlRightBg',
      };
    } else if (color === 'red') {
      containerClass = 'background background-left';
      id = 'background-left';
      metadata = {
        className: 'bluebg',
        baseBgSrc: redBg,
        alt: 'Background Texture',
        swirlId: 'swirlLeftBg',
      };
    }
  }
  getClasses(color);

  return (
    <div className={containerClass} id={id}>
      <SwirlBg key={id} metadata={metadata} isHovered={isHovered}>
        {children}
      </SwirlBg>
    </div>
  );
};

export default Container;
