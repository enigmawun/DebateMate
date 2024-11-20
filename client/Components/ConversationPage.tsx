import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const ConversationPage = () => {
    
  const location = useLocation();
  const { aiInput } = location.state || {}; // Get state values from location

  const [aiInputState, setAIInputState] = useState([]);
  const [userInputState, setUserInputState] = useState([])

  // Save `aiInput` into the state on initial render
  useEffect(() => {
    if (aiInput) {
      setAIInputState(aiInputState.concat(aiInput));
    }
  }, [aiInput]);

  const navigate = useNavigate();

  const gotoAssessmentPage = () => {
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
      <button onClick = {gotoAssessmentPage}>Submit</button>
    </div>
  );
};

export default ConversationPage;