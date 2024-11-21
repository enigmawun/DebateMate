import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Argument from './Argument';

const ConversationPage = () => {
  const location = useLocation();
  const { backEndInput } = location.state || {}; // Get state values from location

  const [aiInputState, setAIInputState] = useState([
    backEndInput.ai_arguments[0],
  ]);
  const [userInputState, setUserInputState] = useState(
    backEndInput.user_arguments
  );
  const [templateState, setTemplateState] = useState('');

  // rerender components if aiInputState is updated
  //function that creates paragraph for each argument in aiInputState and userInputState

  //create an array of Argument components that alternates the AI's argument with the user's
  //aiInputState[0], user_arguments[0], backEndInput.ai_arguments[1], user_arguments[1];
  let argArray: any[] = [];
  function createArgBody() {
    for (let i = 0; i < aiInputState.length; i++) {
      argArray.push(<Argument body={aiInputState[i]} />);
      if (userInputState[i])
        argArray.push(<Argument body={userInputState[i]} />);
    }
  }

  createArgBody();
  //if aiInputState is changed, rerender components
  //populate the display with the chat bot's response
  useEffect(() => {
    if (aiInputState[1] === null) createArgBody();
    else {
      argArray = [];
      createArgBody();
    }
  }, [aiInputState]);
  // if (backEndInput) {
  //   const newArg = aiInputState.concat(backEndInput.ai_arguments[0]);
  //   setAIInputState(aiInputState.concat(backEndInput.ai_arguments[0]));
  //   console.log(backEndInput, 'backend input is here');
  // }
  // }, [backEndInput]);

  const navigate = useNavigate();

  //submit new argument to API along with all the other info contained in backEndInput
  const sendArgToServer = async () => {
    try {
      // Send data to backend
      // const newObj = [...backEndInput, userInputState, aiInputState]
      backEndInput.round += 1;
      console.log('backendinput in sendarg to server', backEndInput);
      console.log(
        'rounds after changing backendinput rounds',
        backEndInput.round
      );
      const newData = await fetch('http://localhost:3000/api/ai/argument', {
        // rename here after
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_arguments: userInputState,
          ai_arguments: aiInputState,
          topic: backEndInput.topic,
          user_side: backEndInput.proOrCon,
          round: backEndInput.round,
        }),
      });

      if (!newData.ok) {
        throw new Error(`HTTP Connection Error: ${newData.status}`);
      }

      const data = await newData.json();

      //then we want to add string ai_argument to AI input state as new elem in array
      //store response object data on the existing array within backEndInput
      setAIInputState(aiInputState.concat([data.ai_argument]));
      backEndInput.ai_reasoning.concat([data.ai_reasoning]);
      backEndInput.ai_strong_point.concat([data.ai_strong_point]);
      backEndInput.ai_weak_point.concat([data.ai_weak_point]);
      backEndInput.user_strong_point.concat([data.user_strong_point]);
      backEndInput.user_weak_point.concat([data.user_weak_point]);
    } catch {
      console.error('Error sending data to backend @', backEndInput.round);
    }
  };

  //fetch request one more time to ai/arguments tendpoint and wait for it
  //to come back and have it provide us with a response before we move on to
  //the assessment -- the assessment endpoint will make use of final AI argument
  const lastFetch = async () => {
    try {
      const newData = await fetch('http://localhost:3000/api/ai/argument', {
        // rename here after
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...backEndInput,
          user_arguments: userInputState,
          ai_arguments: aiInputState,
        }),
      });
    } catch {
      console.error('error with the final fetch');
    }
  };

  const handleSubmit = () => {
    //add user argument to array of user args
    let newUserState = [...userInputState];
    newUserState.push(templateState);
    setUserInputState(newUserState);
    //send user argument to the server
    sendArgToServer();
    //clear user argument from input box
    setTemplateState('');

    // console.log('newUserState', newUserState);
    // console.log('userInputState', userInputState);

    if (backEndInput.round === 3) {
      lastFetch();
      navigate('/assessmentPage', {
        state: {
          backEndInput: {
            user_arguments: aiInputState,
            ai_arguments: userInputState,
            ai_reasoning: [backEndInput.ai_reasoning],
            ai_strong_point: [backEndInput.ai_strong_point],
            ai_weak_point: [backEndInput.ai_weak_point],
            user_strong_point: [backEndInput.user_strong_point],
            user_weak_point: [backEndInput.user_strong_point],
            topic: backEndInput.topic,
            user_side: backEndInput.user_side,
            round: backEndInput.round,
          },
        },
      });
    }
  };

  useEffect(() => {
    // This will log whenever userInputState changes
    console.log('userInputState updated:', userInputState);
  }, [userInputState]);

  return (
    <div>
      <h1>Conversation Page</h1>
      {argArray}
      <input
        type="text"
        value={templateState}
        onChange={(e) => {
          setTemplateState(e.target.value);
        }}
        // onChange={(e) => addArgument(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ConversationPage;
