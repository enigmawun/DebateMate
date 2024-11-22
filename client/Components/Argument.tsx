import React from 'react';

interface ArgumentProps {
  body: string;
  key: string;
  font: string;
  role: 'ai' | 'user';
}

const Argument: React.FC<ArgumentProps> = ({ body, font, role }) => {
  const containerClass = role === 'ai' ? 'ai-argument' : 'user-argument';

  console.log('ARGS BODY: ', body);

  return (
    <div className={`arguments-container ${containerClass} ${role}`}>
      <p className={`${font} arguments`}>{body}</p>
    </div>
  );
};

export default Argument;
