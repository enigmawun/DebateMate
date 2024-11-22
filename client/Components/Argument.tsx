import React from 'react';

interface ArgumentProps {
  body: string;
  key: string;
  font: string;
  user: string;
}

const Argument: React.FC<ArgumentProps> = ({ body, key, font, user }) => {
  let classFont;

  return (
    <div className={user}>
      <p className={font}>{body}</p>
    </div>
  );
};

export default Argument;
