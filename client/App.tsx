import React, { useState, useRef } from 'react';
// import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles2.css';

import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//images
import instructions from './assets/debateMate_instructions.png';

import textureBg from './assets/debateMateTexture.png';
import blueBg from './assets/debateMate_blueBg.png';
import swirlBg from './assets/debateMate_spinTexture.png';
import leftMic from './assets/debateMate_leftMic.png';
import rightMic from './assets/debateMate_rightMic.png';
import choosePromptPic from './assets/debateMate_chooseyourprompt.png';
import DebateMateLogo from './Components/DebateMateLogo';
import titlePic from './assets/debateMate_Title.png';

import yes from './assets/debate-yes.png';
import no from './assets/debate-no.png';

const App = () => {
  const [topic, setTopic] = useState('AI Intelligence');
  const [isHovered, setHoveredSide] = useState('');
  const redSideRef = useRef(null);

  const navigate = useNavigate();

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

  // const handleHover = (e) => {
  //   setHoveredSide(e.target.value);
  //   e.setAttribute();
  // };
  const moveRedBar = () => {
    // const leftMic = document.getElementById('leftMic');
    // leftMic!.classList.add('leftMic-small');
    setHoveredSide('red');
    const leftBg = document.getElementById('background-left');
    const rightBg = document.getElementById('background-right');
    rightBg!.classList.add('disappear');
    leftBg!.classList.add('red-bar-big');
    // const redBar = document.getElementById('red-bar');
    // // redBar!.classList.add('red-bar-big');

    // const swirlLeftBg = document.getElementById('swirlLeftBg');
    // swirlLeftBg!.classList.add('swirl-opacityZero');

    // const rightMic = document.getElementById('rightMic');
    // rightMic!.classList.add('disappear');

    // const swirlRightBg = document.getElementById('swirlRightBg');
    // swirlRightBg!.classList.add('disappear');

    // const CONside = document.getElementById('CONside');
    // CONside!.classList.add('appear');
  };

  const moveRedBarBack = () => {
    // const leftMic = document.getElementById('leftMic');
    // leftMic!.classList.remove('leftMic-small');

    const redBar = document.getElementById('red-bar');

    const swirlLeftBg = document.getElementById('swirlLeftBg');
    swirlLeftBg!.classList.remove('swirl-opacityZero');

    const rightMic = document.getElementById('rightMic');
    rightMic!.classList.remove('disappear');

    const swirlRightBg = document.getElementById('swirlRightBg');
    swirlRightBg!.classList.remove('disappear');

    const CONside = document.getElementById('CONside');
    CONside!.classList.remove('appear');
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
  //IMAGE STYLING

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="background background-right" id="background-right">
        <img src={blueBg} alt="Background Blue Image" className="bluebg" />

        <img
          src={swirlBg}
          id="swirlRightBg"
          alt="Background Swirl Texture"
          className="swirlBg"
        />
        <img
          src={rightMic}
          id="rightMic"
          className="mic-image rightMic rightMic-small"
          alt="Left Mic Picture"
          onMouseEnter={moveBlueBar}
          onMouseLeave={moveBlueBarBack}
          onClick={proChoice}
        />
      </div>
      <div className="background background-left" id="background-left">
        <img src={textureBg} alt="Background Texture" className="bluebg" />
        <img
          src={swirlBg}
          id="swirlLeftBg"
          className="swirlBg"
          alt="Background Swirl Texture"
        />

        <img
          src={leftMic}
          id="leftMic"
          className="mic-image leftMic leftMic-small"
          alt="Left Mic Picture"
          onMouseEnter={moveRedBar}
          onMouseLeave={moveRedBarBack}
          onClick={conChoice}
        />

        {isHovered === 'red' ? (
          <div id="red-bar" className="redBg-stretch">
            <img
              src={yes}
              id="PROside"
              alt="PRO"
              style={{
                position: 'absolute',
                height: '20vh',
                left: '22%',
                top: '50%',

                zIndex: -1,
                transform: 'translateX(-50%)', //move (0,0) from top left to middle of pic
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          </div>
        ) : (
          ''
        )}

        <img src={instructions} alt="instructions" className="instructions" />

        <img
          src={no}
          id="CONside"
          alt="CON"
          style={{
            position: 'absolute',
            height: '20vh',
            left: '78%',
            top: '50%',
            opacity: 0,
            zIndex: -1,
            transform: 'translateX(-50%)', //move (0,0) from top left to middle of pic
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        <DebateMateLogo />
      </div>

      <div
        className="content"
        style={{
          position: 'absolute',
          display: 'flex',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          bottom: '30vh',
          alignItems: 'center',
          margin: 'auto',
          zIndex: '6', //move (0,0) from top left to middle of pic
        }}
      >
        <img
          src={choosePromptPic}
          alt="choose prompt"
          style={{
            width: '25vw',
            marginBottom: '20px',
            zIndex: '6',
            //move (0,0) from top left to middle of pic
          }}
        />
        <select
          id="dropdown"
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            width: '25vw',
            textWrap: 'wrap',
            zIndex: '6',
            minWidth: '200px',
          }}
        >
          <option value={topic}>Is AI capable of real intelligence?</option>
          <option value={topic}>Does free will exist?</option>
        </select>
      </div>
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
