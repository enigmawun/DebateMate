import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const ConversationPage = () => {
    
  const location = useLocation();
  const { backEndInput } = location.state || {}; // Get state values from location

  const [aiInputState, setAIInputState] = useState([]);
  const [userInputState, setUserInputState] = useState([])

  // Save `backEndInput` into the state on initial render
  useEffect(() => {
    if (backEndInput) {
      setAIInputState(aiInputState.concat(backEndInput.ai_arguments[0]));
      console.log(backEndInput, "backend input is here")
    }
  }, []);

  const navigate = useNavigate();

  const gotoAssessmentPage = () => {
    
    // if round is 3
    navigate('/assessmentPage', { 
        state: { 
            aiInputState,
            userInputState
        } 
      });
  }

  return (
    <div>
      <h1>Conversation Page</h1>
      <input>Input</input>
      <button onClick = {gotoAssessmentPage}>Submit</button>
    </div>
  );
};

export default ConversationPage;