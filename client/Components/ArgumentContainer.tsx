import React, { useState } from 'react';
import Argument from './Argument';

type ArgProps = {
  userArguments: string[];
  aiArguments: string[];
  round: number;
  setAiArguments: React.Dispatch<React.SetStateAction<string[]>>;
};

const ArgumentContainer: React.FC<ArgProps> = ({
  userArguments,
  aiArguments,
  setAiArguments,
  round,
}) => {
  //   const [argumentElements, setArgumentElements] = useState<JSX.Element[]>([]);
  const alternateArrays = (arr1: string[], arr2: string[]): string[] => {
    return Array.from(
      { length: Math.max(arr1.length, arr2.length) },
      (_, i) => [arr1[i], arr2[i]]
    )
      .flat()
      .filter((el) => el !== undefined);
  };

  const argArray = alternateArrays(userArguments, aiArguments);

  return (
    <div>
      {argArray.map((argument, idx) => (
        <Argument key={`argument-${idx}`} body={argument} idx={idx} />
      ))}
    </div>
  );
};

export default ArgumentContainer;
