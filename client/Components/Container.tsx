import React, { ReactNode } from 'react';
import yes from '../assets/debate-yes.png';
import no from '../assets/debate-no.png';
import blueBg from '../assets/debateMate_blueBg.png';
import redBg from '../assets/debateMate_redBg.png';

import HalfBg from '../Components/HalfBg';

import swirlBgImg from '../debateMate_spinTexture.webp';

interface ContainerProps {
  children?: ReactNode;
  isHovered: 'red' | 'blue' | null;
  color: 'red' | 'blue';
  side: 'left' | 'right';
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
  side,
}) => {
  let metadata: Metadata = {
    className: '',
    baseBgSrc: '',
    alt: '',
    swirlId: '',
  };

  return (
    <div className={'background background-stretch ' + color}>
      {children}
      {isHovered === color && (
        <img
          className={'bubble absolute ' + side + '-5vw'}
          src={isHovered === 'blue' ? yes : no}
          id={side + 'side'}
          alt={side}
        />
      )}
    </div>
  );
};

export default Container;
