import { useNavigate } from 'react-router-dom';

const NavigationHandler = ({
  topic,
  setChoice,
}: {
  topic: string;
  setChoice: (choice: 'pro' | 'against') => void;
}) => {
  const navigate = useNavigate();

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
