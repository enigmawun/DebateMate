import React from 'react';

interface ArgumentProps {
  body: string;
  key: string;
  font: string;
}

const Argument: React.FC<ArgumentProps> = ({ body, font }) => {
  let classFont;

  return (
    <div>
      <p className={font}>{body}</p>
    </div>
  );
};

export default Argument;
