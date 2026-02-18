import React, { useState } from 'react';
import NavigationHandler from './NavigationHandler';
import SelectMenu from './SelectMenu';
import { createBrowserRouter } from 'react-router-dom';
import DebateMateLogo from './DebateMateLogo';
import HalfBg from './HalfBg';
//images and styling
import rightMic from '../assets/debateMate_rightMic.png';

import Container from './Container';
import Microphone from './Microphone';
import swirlBg1280 from '../assets/spinTexture1280.webp';
import swirlBg1920 from '../assets/debateMateTexture.png';
import swirlBg800 from '../assets/spinTexture800.webp';
import swirlBg500 from '../assets/spinTexture500.webp';

const MainContainer = () => {
  const [topic, setTopic] = useState('AI intelligence');
  const [isHovered, setHoveredSide] = useState<'red' | 'blue' | null>(null);
  const [choice, setChoice] = useState<'pro' | 'against' | null>(null);
  const [prevHovered, setPrevHovered] = useState<null | string>(null);
  const { proChoice, conChoice } = NavigationHandler({ topic, setChoice });

  /*Expand the red side on hover*/
  const handleMouseEnter = (color: 'red' | 'blue' | null) => {
    setHoveredSide(color);
    const newChoice = color === 'red' ? 'pro' : 'against';
    setChoice(newChoice);
  };

  const handleMouseLeave = (color: 'blue' | 'red' | null) => {
    setHoveredSide(null);
    setChoice(null);
  };

  return (
    <div className="main-container">

<SelectMenu topic={topic} setTopic={setTopic}></SelectMenu>
      {!isHovered && (
        <>
          <HalfBg color="red" key="red-halfbg" isHovered={isHovered}></HalfBg>
          <Microphone
            isHovered={isHovered}
            micColor="red"
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            choice={proChoice}
            alt="left Mic Picture"
            src={rightMic}
            classes="mic-image leftMic"
          />
          <div id="red-bar"></div>
          <HalfBg color="blue" key="blue-halfbg" isHovered={isHovered}></HalfBg>
          <Microphone
            micColor="blue"
            isHovered={isHovered}
            handleMouseEnter={() => handleMouseEnter('blue')}
            handleMouseLeave={() => handleMouseLeave(null)}
            choice={conChoice}
            alt="right Mic Picture"
            src={rightMic}
            classes="mic-image rightMic"
          />
        </>
      )}
      {isHovered === 'red' && (
        <Container
          key="redcontainer"
          isHovered={isHovered}
          color="red"
          side="right"
        >
          {' '}
          <Microphone
            isHovered={isHovered}
            micColor="red"
            handleMouseEnter={() => handleMouseEnter('red')}
            handleMouseLeave={() => handleMouseLeave(null)}
            choice={proChoice}
            alt="left Mic Picture"
            src={rightMic}
            classes="mic-image leftMic"
          />
        </Container>
      )}
      {isHovered === 'blue' && (
        <Container
          key="bluecontainer"
          isHovered={isHovered}
          color="blue"
          side="left"
        >
          <Microphone
            isHovered={null}
            micColor="blue"
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            choice={conChoice}
            alt="right Mic Picture"
            src={rightMic}
            classes="mic-image rightMic"
          />
        </Container>
      )}

    </div>
  );
};

export default MainContainer;
