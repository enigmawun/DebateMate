import React from 'react';
import choosePromptPic from '../assets/debateMate_chooseyourprompt.png';

interface MenuProps {
  topic: string;
  setTopic: (value: string) => void;
}
const SelectMenu: React.FC<MenuProps> = ({ topic, setTopic }) => {
  return (
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
  );
};

export default SelectMenu;
