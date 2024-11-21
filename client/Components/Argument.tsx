import React from 'react';

interface ArgumentProps {
  body: string;
}

const Argument: React.FC<ArgumentProps> = ({ body }) => {
  return (
    <div>
      <p>{body}</p>
    </div>
  );
};

export default Argument;
