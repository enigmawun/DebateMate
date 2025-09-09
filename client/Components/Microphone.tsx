import React from 'react';
import leftMic from '../assets/debateMate_leftMic.png';
import rightMic from '../assets/debateMate_rightMic.png';

interface MicrophoneProps {
  isHovered: 'red' | 'blue' | null;
  handleMouseEnter: (color: 'red' | 'blue' | null) => void;
  handleMouseLeave: (color: 'red' | 'blue' | null) => void;

  micColor: 'red' | 'blue';
  choice: () => void;
  classes: string;
  alt: string;
  src: string;
}
const Microphone = ({
  isHovered,
  micColor,
  handleMouseEnter,
  handleMouseLeave,

  choice,
  classes,
  alt,
  src,
}: MicrophoneProps) => {
  return (
    <>
      <img
        key={micColor + 'Mic'}
        src={src}
        id={micColor + 'Mic'}
        className={classes}
        alt={alt}
        onPointerEnter={() => handleMouseEnter(micColor)}
        onPointerLeave={() => handleMouseLeave(null)}
        onClick={choice}
      />
    </>
  );
};

export default Microphone;
/*
{isHovered !== 'red' && (
    <img
      key="blueMic"
      src={rightMic}
      id="lefttMic"
      className="mic-image rightMic"
      alt="right Mic Picture"
      onMouseEnter={() => handleMouseEnter('blue')}
      onMouseLeave={() => handleMouseLeave('blue')}
      onClick={conChoice}
    />
  )}*/
