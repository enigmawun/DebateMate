import React from 'react';

interface ArgumentProps {
  body: string;
  idx: number;
}

const Argument: React.FC<ArgumentProps> = ({ body, idx }) => {
  function isOdd(value: number): boolean {
    if (value % 2) return false;
    else return true;
  }
  const isComputer = isOdd(idx);
  return (
    <div className="argument">
      {isComputer ? (
        <p className="user-text gochi-hand-regular">
          {'User Argument: ' + body}
        </p>
      ) : (
        <p className="ai-text inconsolata-reg">{'AI Argument: ' + body}</p>
      )}
    </div>
  );
};

export default Argument;
