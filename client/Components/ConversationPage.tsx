import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Argument from './Argument';

// LANDING PAGE
// Grab state - topic & user_side
// Pass that information & call conversation page

// CONVERSATION PAGE
// State for user arguments: []
// State for ai arguments: []
// State for ai reasoning:  []
// State for ai strong points []
// State for ai weak points []
// State for user strong points []
// State for user weak points []
// State for round []

// at every request to /arguments
// build each individual state array

// last fetch
// the same call to /arguments
// pass all state info to new page --> assessments
// /assessment endpoint will be called using the passed in state

const ConversationPage = () => {
  // const [templateState, setTemplateState] = useState('');
  // const [assessmentPageInfo, setAssessmentPageInfo] = useState({});
  // State for ai reasoning:  []
  // State for user strong points []
  // State for user weak points
  const location = useLocation();
  const { backEndInput } = location.state || {}; // Get state values from location
  const topic = backEndInput.topic;
  const userSide = backEndInput.user_side;
  const [aiArguments, setAiArguments] = useState([] as string[]);
  const [userArguments, setUserArguments] = useState([] as string[]);
  const [round, setRound] = useState(0);
  const [userString, setUserString] = useState('');

  const [aiReasonings, setaiReasonings] = useState([] as string[]);
  const [aiWeakPoints, setaiWeakPoints] = useState([] as string[]);
  const [aiStrongPoints, setAiStrongPoints] = useState([] as string[]);
  const [userWeakPoints, setUserWeakPoints] = useState([] as string[]);
  const [userStrongPoints, setuserStrongPoints] = useState([] as string[]);

  const [assessment, setAssessment] = useState({});

  //  Move argArray into state to trigger re-renders
  const [argumentElements, setArgumentElements] = useState<JSX.Element[]>([]);

  // Update createArgBody to set state instead of mutating variable
  const createArgBody = () => {
    const newArgArray: JSX.Element[] = [];
    for (let i = 0; i < aiArguments.length; i++) {
      newArgArray.push(
        <Argument
          key={`ai-${i}`}
          body={aiArguments[i]}
          font="ai comic-neue-regular"
        />
      );
      if (userArguments[i]) {
        newArgArray.push(
          <Argument
            key={`user-${i}`}
            body={userArguments[i]}
            font="user caveat-hand"
          />
        );
      }
    }
    setArgumentElements(newArgArray);
  };

  // FUpdate useEffect to watch both arrays
  useEffect(() => {
    createArgBody();
  }, [aiArguments, userArguments]);

  //if aiInputState is changed, rerender components
  //populate the display with the chat bot's response
  useEffect(() => {
    if (userArguments[1] === null) createArgBody();
    else {
      createArgBody();
    }
  }, [aiArguments]);

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
      // backEndInput.round += 1;
      setRound(round + 1);
      // const newround = backEndInput.round;
      // const userSide = backEndInput.user_side;
      // const topic = backEndInput.topic;
      // console.log('backendinput in sendarg to server', backEndInput);
      // console.log(
      //   'rounds after changing backendinput rounds',
      //   backEndInput.round
      // );
      const newData = await fetch('http://localhost:3000/api/ai/argument', {
        // rename here after
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_arguments: userArguments,
          ai_arguments: aiArguments,
          topic: topic,
          user_side: userSide,
          round: round,
        }),
      });

      if (!newData.ok) {
        throw new Error(`HTTP Connection Error: ${newData.status}`);
      }

      const data = await newData.json();
      console.log('data from server', data);
      //then we want to add string ai_argument to AI input state as new elem in array
      //store response object data on the existing array within backEndInput
      // Use the correct property name from server response
      const newAiArgument = data.ai_argument; // Changed from ai_arguments
      setAiArguments((prev) => [...prev, newAiArgument]);

      const newAiReasoningsArr = [data.ai_reasonings];
      const updatedAiReasonings: string[] = [...aiReasonings].concat(
        newAiReasoningsArr
      );
      setaiReasonings(updatedAiReasonings);

      // const updatedAiWeakPoints = aiWeakPoints.slice().concat(data.ai_weak_points);
      // setaiWeakPoints(updatedAiWeakPoints);
      const aiweakPoint = [data.ai_weak_points];
      const updatedaiWeakPoints: string[] = [...aiWeakPoints].concat(
        aiweakPoint
      );
      setaiWeakPoints(updatedaiWeakPoints);

      const newAiStrongPointsArr = [data.ai_strong_points];
      const updatedAiStrongPoints: string[] = [...aiStrongPoints].concat(
        newAiStrongPointsArr
      );
      setAiStrongPoints(updatedAiStrongPoints);

      // const updatedUserWeakPoints = aiArguments.slice().concat(data.user_weak_points);
      // setUserWeakPoints(updatedUserWeakPoints);
      const newUserStrongPointsArr = [data.user_strong_points];
      const updatedUserStrongPoints: string[] = [...userStrongPoints].concat(
        newUserStrongPointsArr
      );
      setuserStrongPoints(updatedUserStrongPoints);

      // const updatedUserStrongPoints = aiArguments.slice().concat(data.user_strong_points);
      // setUserStrongPoints(updatedUserStrongPoints);'
      const newUserWeakPoints = [data.user_weak_points];
      const updatedUserWeakPoints: string[] = [...userWeakPoints].concat(
        newUserWeakPoints
      );
      setUserWeakPoints(updatedUserWeakPoints);

      // backEndInput.ai_reasoning = data.ai_reasoning;
      // backEndInput.ai_strong_point = data.ai_strong_point;
      // backEndInput.ai_weak_point = data.ai_weak_point;
      // backEndInput.user_strong_point = data.user_strong_point;
      // backEndInput.user_weak_point = data.user_weak_point;

      // console.log(
      //   'this is backendinput after we get it back from server',
      //   backEndInput
      // );
    } catch {
      console.error('Error sending data to backend @ round ', round);
    }
  };

  //fetch request one more time to ai/arguments tendpoint and wait for it
  //to come back and have it provide us with a response before we move on to
  //the assessment -- the assessment endpoint will make use of final AI argument and all reasonings
  const lastFetch = async () => {
    // one last time sending post request to /api/ai/argument to get the final AI argument
    sendArgToServer();

    try {
      const assessmentResponse = await fetch(
        'http://localhost:3000/api/ai/assessment',
        {
          // rename here after
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_arguments: userArguments,
            ai_arguments: aiArguments,
            topic: topic,
            user_side: userSide,
            ai_reasonings: aiReasonings,
            ai_strong_points: aiStrongPoints,
            ai_weak_points: aiWeakPoints,
            user_strong_points: userStrongPoints,
            user_weak_points: userWeakPoints,
          }),
        }
      );

      const assessmentData = await assessmentResponse.json();
      console.log('assessmentData', assessmentData);
      setAssessment(assessmentData);
    } catch {
      console.error('Error getting data from backend for assessment');
    }
  };

  const handleSubmit = () => {
    const userArgument = [userString];
    const updatedUserArguments: string[] = [...userArguments].concat(
      userArgument
    );
    setUserArguments(updatedUserArguments);
    setUserString('');
    if (round === 3) {
      lastFetch();
      navigate('/assessmentPage', {
        state: {
          assessmentPageInfo: {
            ...assessment,
          },
        },
      });
    } else {
      //send user argument to the server
      sendArgToServer();
    }
    // console.log('newUserState', newUserState);
    // console.log('userInputState', userInputState);
  };

  useEffect(() => {
    console.log('userInputState updated:', userArguments);
  }, [userArguments]);

  useEffect(() => {
    if (topic && userSide) {
      console.log('Making initial fetch with:', { topic, userSide });

      const initialFetch = async () => {
        try {
          const newData = await fetch('http://localhost:3000/api/ai/argument', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              user_arguments: [],
              ai_arguments: [],
              topic: topic,
              user_side: userSide,
              round: 0,
            }),
          });

          if (!newData.ok) {
            const errorText = await newData.text();
            throw new Error(`HTTP Error ${newData.status}: ${errorText}`);
          }

          const data = await newData.json();
          console.log('Initial API response:', data);

          if (data.ai_argument) {
            console.log('Setting AI argument:', data.ai_argument);
            setAiArguments([data.ai_argument]);
            setaiReasonings([data.ai_reasoning]);
            setaiWeakPoints([data.ai_weak_point]);
            setAiStrongPoints([data.ai_strong_point]);
            setuserStrongPoints([data.user_strong_point]);
            setUserWeakPoints([data.user_weak_point]);
            setRound(1);
          } else {
            console.error('No AI argument in response:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      initialFetch();
    } else {
      console.log('Missing required data:', { topic, userSide });
    }
  }, [topic, userSide]);

  useEffect(() => {
    console.log('Current AI Arguments:', aiArguments);
  }, [aiArguments]);

  return (
    <div className="container">
      <h1 className="permanent-marker-regular">Create a debate</h1>
      <div className="chatcontainer">
        {argumentElements} {/* Use the state array instead of variable */}
      </div>
      <div className="inputbox">
        <input
          type="text"
          value={userString}
          placeholder="Craft your argument here..."
          onChange={(e) => {
            setUserString(e.target.value);
          }}
          // onChange={(e) => addArgument(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ConversationPage;
