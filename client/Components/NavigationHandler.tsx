import { useNavigate } from 'react-router-dom';
import React from 'react';

interface NavProps {
  topic: string;
  setChoice: (choice: 'pro' | 'against') => void;
  navigate: (path: string, options?: any) => void;
}

const NavigationHandler = ({ topic, setChoice, navigate }: NavProps) => {
  const proChoice = () => {
    setChoice('pro');
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
    setChoice('against');
    navigate('/conversationPage', {
      state: {
        backEndInput: {
          topic: topic,
          user_side: 'con',
        },
      },
    });
  };

  return { proChoice, conChoice };
};

export default NavigationHandler;
