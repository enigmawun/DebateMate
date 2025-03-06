import React from 'react';
import choosePromptPic from '../assets/debateMate_chooseyourprompt.png';
import DebateMateLogo from '../Components/DebateMateLogo';
interface MenuProps {
  topic: string;
  setTopic: (value: string) => void;
}
const SelectMenu: React.FC<MenuProps> = ({ topic, setTopic }) => {
  const handleSelect = function (e: React.ChangeEvent<HTMLSelectElement>) {
    setTopic(e.target.value);
  };
  return (
    <div
      className="content"
      style={{
        display: 'flex',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        bottom: '30vh',
        alignItems: 'center',
        margin: 'auto',
        zIndex: '0', //move (0,0) from top left to middle of pic
      }}
    >
      <DebateMateLogo />
      <div className="prompt">
        <img
          src={choosePromptPic}
          alt="choose prompt"
          style={{
            width: 'max(25vw, 200px)',
            marginBottom: '20px',
            zIndex: '1',

            //move (0,0) from top left to middle of pic
          }}
        />
        <select
          id="dropdown"
          onChange={(e) => handleSelect}
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            width: '25vw',
            textWrap: 'wrap',
            zIndex: '80',
            minWidth: '200px',
          }}
        >
          <option value="AI intelligence">
            Is AI capable of real intelligence?
          </option>
          <option value="Free will">Does free will exist?</option>
        </select>
      </div>
    </div>
  );
};

export default SelectMenu;
