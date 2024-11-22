import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';

import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//images
import textureBg from './assets/debateMateTexture.png';
import blueBg from './assets/debateMate_blueBg.png';
import swirlBg from './assets/debateMate_spinTexture.png';
import leftMic from './assets/debateMate_leftMic.png';
import rightMic from './assets/debateMate_rightMic.png';
import choosePromptPic from './assets/debateMate_chooseyourprompt.png';
import instructions from './assets/debateMate_instructions.png';
import speechBubble from './assets/debateMate_speechBubble.png';
import titlePic from './assets/debateMate_Title.png';
import PROside from './assets/PROside.png';
import CONside from './assets/CONside.png';


const App = () => {
  const [topic, setTopic] = useState('AI intelligence');

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

  //IMAGE STYLING
  const moveRedBar = () => {
    const leftMic = document.getElementById("leftMic")
    leftMic!.classList.add("leftMic-small");

    const redBar = document.getElementById("red-bar")
    redBar!.classList.add("red-bar-big");

    const swirlLeftBg = document.getElementById("swirlLeftBg")
    swirlLeftBg!.classList.add("swirl-opacityZero");

    const rightMic = document.getElementById("rightMic")
    rightMic!.classList.add("disappear");

    const swirlRightBg = document.getElementById("swirlRightBg")
    swirlRightBg!.classList.add("disappear");

    const CONside = document.getElementById("CONside")
    CONside!.classList.add("appear");
  }

  const moveRedBarBack = () => {
    const leftMic = document.getElementById("leftMic")
    leftMic!.classList.remove("leftMic-small");

    const redBar = document.getElementById("red-bar")
    redBar!.classList.remove("red-bar-big");

    const swirlLeftBg = document.getElementById("swirlLeftBg")
    swirlLeftBg!.classList.remove("swirl-opacityZero");

    const rightMic = document.getElementById("rightMic")
    rightMic!.classList.remove("disappear");

    const swirlRightBg = document.getElementById("swirlRightBg")
    swirlRightBg!.classList.remove("disappear");

    const CONside = document.getElementById("CONside")
    CONside!.classList.remove("appear");
  }

  const moveBlueBar = () => {
    const rightMic = document.getElementById("rightMic")
    rightMic!.classList.add("rightMic-small");

    const redBar = document.getElementById("red-bar")
    redBar!.classList.add("red-bar-small");

    const swirlRightBg = document.getElementById("swirlRightBg")
    swirlRightBg!.classList.add("swirl-opacityZero");

    const leftMic = document.getElementById("leftMic")
    leftMic!.classList.add("disappear");

    const swirlLeftBg = document.getElementById("swirlLeftBg")
    swirlLeftBg!.classList.add("disappear");

    const PROside = document.getElementById("PROside")
    PROside!.classList.add("appear");
  }

  const moveBlueBarBack = () => {
    const rightMic = document.getElementById("rightMic")
    rightMic!.classList.remove("rightMic-small");

    const redBar = document.getElementById("red-bar")
    redBar!.classList.remove("red-bar-small");

    const swirlRightBg = document.getElementById("swirlRightBg")
    swirlRightBg!.classList.remove("swirl-opacityZero");

    const leftMic = document.getElementById("leftMic")
    leftMic!.classList.remove("disappear");

    const swirlLeftBg = document.getElementById("swirlLeftBg")
    swirlLeftBg!.classList.remove("disappear");

    const PROside = document.getElementById("PROside")
    PROside!.classList.remove("appear");
  }

  return (
    <div>
    <div className="background">

        <img
          src={blueBg}
          alt="Background Blue Image"
          style={{position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: -2}}
        />

        <img
          src={swirlBg}
          id="swirlRightBg"
          alt="Background Swirl Texture"
          style={{position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50vw",
                  height: "100vh",
                  transform: "scaleX(-1)",
                  mixBlendMode: "overlay",
                  zIndex: 0,
                  transition: "opacity 0.4s ease-out, width 0.5s ease-in-out"}}
        />
        
        <img
          src={rightMic}
          id="rightMic"
          className="leftMic-image"
          alt="Left Mic Picture"
          style={{position: "absolute",
                  bottom: 0,
                  left: "67vw",
                  height: "65vh",
                  zIndex: 1,
                  transition: "height 0.5s ease-out"}}
          onMouseEnter={moveBlueBar}
          onMouseLeave={moveBlueBarBack}
          onClick={proChoice}
        />

        <img
          src={textureBg}
          alt="Background Texture"
          style={{position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  mixBlendMode: "color-burn",
                  opacity: .90,
                  zIndex: 0}}
        />

        <img
          src={swirlBg}
          id="swirlLeftBg"
          alt="Background Swirl Texture"
          style={{position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50vw",
                  height: "100vh",
                  mixBlendMode: "overlay",
                  zIndex: 0,
                  transition: "opacity 0.4s ease-out, width 0.5s ease-in-out"}}
        />
        
        <img
          src={leftMic}
          id="leftMic"
          className="leftMic-image"
          alt="Left Mic Picture"
          style={{position: "absolute",
                  bottom: 0,
                  left: "12vw",
                  height: "65vh",
                  zIndex: 1,
                  transition: "height 0.5s ease-out"}}
          onMouseEnter={moveRedBar}
          onMouseLeave={moveRedBarBack}
          onClick={conChoice}
        />

        <div
          id="red-bar"
          style={{
            backgroundColor: "#a61e31",
            position: "absolute",
            top: 0,
            left: 0,
            width: "50vw",
            height: "100vh",
            zIndex: -1,
            transition: "width 0.5s ease-in-out"
            }}
        />
        <img 
          src={choosePromptPic} 
          alt="choose prompt"
          style={{
            position: "absolute",
            width: "18vw",
            left: "50%",
            bottom: "8%",
            transform: "translateX(-50%)" //move (0,0) from top left to middle of pic
          }}
        />

        <img 
          src={instructions} 
          alt="instructions"
          style={{
            position: "absolute",
            width: "11vw",
            left: "8.5%",
            bottom: "8%",
            transform: "translateX(-50%)" //move (0,0) from top left to middle of pic
          }}
        />

        <img 
          src={speechBubble} 
          alt="speechBubble"
          style={{
            position: "absolute",
            height: "34vh",
            left: "50%",
            top: "5%",
            zIndex: -1,
            transform: "translateX(-50%)" //move (0,0) from top left to middle of pic
          }}
        />

        <img 
          src={titlePic} 
          alt="title"
          style={{
            position: "absolute",
            height: "9vh",
            left: "50%",
            top: "10%",
            zIndex: -1,
            transform: "translateX(-50%)" //move (0,0) from top left to middle of pic
          }}
        />

        <img 
          src={PROside}
          id="PROside"
          alt="PRO"
          style={{
            position: "absolute",
            height: "20vh",
            left: "22%",
            top: "50%",
            opacity: 0,
            zIndex: -1,
            transform: "translateX(-50%)", //move (0,0) from top left to middle of pic
            transition: "opacity 0.5s ease-in-out"
          }}
        />

        <img 
          src={CONside}
          id="CONside" 
          alt="CON"
          style={{
            position: "absolute",
            height: "20vh",
            left: "78%",
            top: "50%",
            opacity: 0,
            zIndex: -1,
            transform: "translateX(-50%)", //move (0,0) from top left to middle of pic
            transition: "opacity 0.5s ease-in-out"
          }}
        />

    </div>
    <div className="content" style={{
            position: "absolute",
            left: "50%",
            top: "18%",
            transform: "translateX(-50%)" //move (0,0) from top left to middle of pic
          }}>
      <p color="black"> What would you like to debate? </p>
      <select
        id="dropdown"
        onChange={(e) => {
          setTopic(e.target.value);
        }}
      >
        <option value="AI intelligence">
          Is AI capable of real intelligence?
        </option>
        <option value="b">Other option to come</option>
      </select>
      {/* <p> Choose your side </p> */}
      {/* <button value="pro" onClick={proChoice}>
        PRO
      </button> */}
      {/* <button value="con" onClick={conChoice}>
        CON
      </button>{' '} */}
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