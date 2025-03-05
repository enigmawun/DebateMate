import React, { useState, useRef, forwardRef } from 'react';
// import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles2.css';
import hoveredContext from './Components/Contexts';
import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';
import SelectMenu from './Components/SelectMenu';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DebateMateLogo from './Components/DebateMateLogo';
import HalfBg from './Components/HalfBg';
//images
import instructions from './assets/debateMate_instructions.png';

import leftMic from './assets/debateMate_leftMic.png';
import rightMic from './assets/debateMate_rightMic.png';
import choosePromptPic from './assets/debateMate_chooseyourprompt.png';
import textureBg from './assets/debateMateTexture.png';
import swirlBgImg from './assets/debateMate_spinTexture.png';
import titlePic from './assets/debateMate_Title.png';
import Container from './Components/Container';
import no from './assets/debate-no.png';
import yes from './assets/debate-yes.png';

const App = () => {
  const [topic, setTopic] = useState('AI Intelligence');
  const [isHovered, setHoveredSide] = useState<'red' | 'blue' | ''>('');
  const blueMicRef = useRef<HTMLImageElement | null>(null);
  const redMicRef = useRef<HTMLImageElement | null>(null);
  const blueBgRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  /*ROUTER*/
  const proChoice = () => {
    navigate('/conversationPage', {
      state: {
        backEndInput: {
          topic: topic,
          user_side: 'pro',
        },
      },
    });
  };

  const conChoice = () => {
    navigate('/conversationPage', {
      state: {
        backEndInput: {
          topic: topic,
          user_side: 'con',
        },
      },
    });
  };

  /*Expand the red side on hover*/
  const handleMouseEnter = (color: 'red' | 'blue' | '') => {
    setHoveredSide(color);

    // const swirlLeftBg = document.getElementById('background-left');
    // swirlLeftBg!.setAttribute('display', 'none');
    // swirlLeftBg!.classList.add('swirl-opacityZero');

    // const rightMic = document.getElementById('rightMic');
    // rightMic!.classList.add('disappear');

    // const swirlRightBg = document.getElementById('background-right');
    // swirlRightBg!.classList.add('disappear');

    // const CONside = document.getElementById('CONside');
    // CONside!.classList.add('appear');
  };

  const handleMouseLeave = (color: 'blue' | 'red') => {
    console.log('moved bar back');
    // if (color === 'red' && redMicRef.current) {
    //   redMicRef.current.classList.remove('leftMic-small');
    // } else if (color === 'blue' && blueMicRef.current) {
    //   blueMicRef.current.setAttribute('background-color', 'blue');
    // }
    setHoveredSide('');
    // const redBar = document.getElementById('red-bar');

    // const swirlLeftBg = document.getElementById('swirlLeftBg');
    // swirlLeftBg!.classList.remove('swirl-opacityZero');

    // const swirlRightBg = document.getElementById('swirlRightBg');
    // swirlRightBg!.classList.remove('disappear');

    // const CONside = document.getElementById('CONside');
    // CONside!.classList.remove('appear');
  };

  const moveBlueBar = () => {
    // const redBar = document.getElementById('red-bar');
    // proSide.classList.add('red-bar-small');

    const swirlRightBg = document.getElementById('swirlRightBg');
    swirlRightBg!.classList.add('swirl-opacityZero');

    const leftMic = document.getElementById('leftMic');
    leftMic!.classList.add('disappear');

    const swirlLeftBg = document.getElementById('swirlLeftBg');
    swirlLeftBg!.classList.add('disappear');

    const PROside = document.getElementById('PROside');
    PROside!.classList.add('appear');
  };

  const moveBlueBarBack = () => {
    // const rightMic = document.getElementById('rightMic');
    // rightMic!.classList.remove('rightMic-small');

    const redBar = document.getElementById('red-bar');
    redBar!.classList.remove('red-bar-small');

    const swirlRightBg = document.getElementById('swirlRightBg');
    swirlRightBg!.classList.remove('swirl-opacityZero');

    const leftMic = document.getElementById('leftMic');
    leftMic!.classList.remove('disappear');

    const swirlLeftBg = document.getElementById('swirlLeftBg');
    swirlLeftBg!.classList.remove('disappear');

    const PROside = document.getElementById('PROside');
    PROside!.classList.remove('appear');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {isHovered === 'red' ? (
        <HalfBg color={isHovered} />
      ) : (
        <Container key="bluecontainer" isHovered={isHovered} color="blue">
          <img
            ref={blueMicRef}
            key="blueMic"
            src={rightMic}
            id="leftMic"
            className="mic-image leftMic"
            alt="left Mic Picture"
            onMouseEnter={() => handleMouseEnter('blue')}
            onMouseLeave={() => handleMouseLeave('blue')}
            onClick={conChoice}
          />
        </Container>
      )}
      {isHovered === 'blue' ? (
        <HalfBg color={isHovered}></HalfBg>
      ) : (
        <Container key="redcontainer" isHovered={isHovered} color="red">
          <img
            ref={redMicRef}
            key="redMic"
            src={rightMic}
            id="rightMic"
            className="mic-image rightMic"
            alt="right Mic Picture"
            onPointerEnter={() => handleMouseEnter('red')}
            onPointerLeave={() => handleMouseLeave('red')}
            onClick={proChoice}
          />
          <img src={instructions} alt="instructions" className="instructions" />
        </Container>
      )}

      <DebateMateLogo />

      <SelectMenu topic={topic} setTopic={setTopic}></SelectMenu>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/conversationPage',
    element: <ConversationPage />,
  },
  {
    path: '/assessmentPage',
    element: <AssessmentPage />,
  },
]);

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
