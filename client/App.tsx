import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import { useNavigate } from 'react-router-dom';
import NavigationHandler from './Components/NavigationHandler';
// import { createRoot } from 'react-dom/client';
import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';
import SelectMenu from './Components/SelectMenu';
import { createBrowserRouter } from 'react-router-dom';
import DebateMateLogo from './Components/DebateMateLogo';
import HalfBg from './Components/HalfBg';
//images and styling
import './styles2.css';
import instructions from './assets/debateMate_instructions.png';
import leftMic from './assets/debateMate_leftMic.png';
import rightMic from './assets/debateMate_rightMic.png';
import Container from './Components/Container';

import swirlBgImg from './assets/debateMate_spinTexture.png';

const App = () => {
  const [topic, setTopic] = useState('AI intelligence');
  const [isHovered, setHoveredSide] = useState<'red' | 'blue' | null | ''>(
    null
  );
  const [choice, setChoice] = useState<'pro' | 'against' | null>(null);
  const [prevHovered, setPrevHovered] = useState<null | string>(null);
  const { proChoice, conChoice } = NavigationHandler({ topic, setChoice });

  /*Expand the red side on hover*/
  const handleMouseEnter = (color: 'red' | 'blue' | '') => {
    setHoveredSide(color);
    const newChoice = color === 'red' ? 'pro' : 'against';
    setChoice(newChoice);
  };

  const handleMouseLeave = (color: 'blue' | 'red') => {
    setHoveredSide(null);
    setChoice(null);
  };

  return (
    <div className="main-container">
      {!isHovered && (
        <>
          <Container key="redcontainer" isHovered={isHovered} color="red">
            <img
              src={instructions}
              alt="instructions"
              className="instructions"
            />
          </Container>
          <img
            src={swirlBgImg}
            alt="Background Swirl Texture"
            className={'swirlBg red'}
          />
          <div id="red-bar"></div>
          <Container
            key="bluecontainer"
            isHovered={isHovered}
            color="blue"
          ></Container>
          <img
            src={swirlBgImg}
            alt="Background Swirl Texture"
            className={'swirlBg blue'}
          />
        </>
      )}
      {isHovered === 'red' && (
        <Container
          key="redcontainer"
          isHovered={isHovered}
          color="red"
        ></Container>
      )}
      {isHovered === 'blue' && (
        <Container
          key="bluecontainer"
          isHovered={isHovered}
          color="blue"
        ></Container>
      )}

      {isHovered !== 'blue' && (
        <img
          key="redMic"
          src={rightMic}
          id="leftMic"
          className="mic-image leftMic"
          alt="left Mic Picture"
          onPointerEnter={() => handleMouseEnter('red')}
          onPointerLeave={() => handleMouseLeave('red')}
          onClick={proChoice}
        />
      )}
      {isHovered !== 'red' && (
        <img
          key="blueMic"
          src={leftMic}
          id="lefttMic"
          className="mic-image rightMic"
          alt="right Mic Picture"
          onMouseEnter={() => handleMouseEnter('blue')}
          onMouseLeave={() => handleMouseLeave('blue')}
          onClick={conChoice}
        />
      )}
      <SelectMenu topic={topic} setTopic={setTopic}></SelectMenu>
    </div>
  );
};

export const router = createBrowserRouter([
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

export default App;
