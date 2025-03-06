import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArgumentContainer from './ArgumentContainer';

const ConversationPage: React.FC = () => {
  const location = useLocation();
  const { backEndInput } = location.state || {}; // Get state values from location
  const topic = backEndInput.topic;
  const userSide = backEndInput.user_side;
  const [userString, setUserString] = useState('' as string);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [aiArguments, setAiArguments] = useState([] as string[]);
  const [userArguments, setUserArguments] = useState([] as string[]);
  const [round, setRound] = useState(0);

  const [aiReasonings, setaiReasonings] = useState([] as string[]);
  const [aiWeakPoints, setaiWeakPoints] = useState([] as string[]);
  const [aiStrongPoints, setAiStrongPoints] = useState([] as string[]);
  const [userWeakPoints, setUserWeakPoints] = useState([] as string[]);
  const [userStrongPoints, setuserStrongPoints] = useState([] as string[]);

  //  Move argArray into state to trigger re-renders

  const navigate = useNavigate();
  // Update createArgBody to set state instead of mutating variable

  // FUpdate useEffect to watch both arrays
  useEffect(() => {
    console.log('User Arguments:', userArguments);
    console.log('AI Arguments:', aiArguments);
  }, [aiArguments, userArguments]);

  // For testing purposes only - debugging why ai arguments render twice on every request

  //submit new argument to API along with all the other info contained in backEndInput
  const sendArgToServer = async (argArray: string[]) => {
    console.log('Sending Arg to server... ');
    console.log(argArray, 'arguments sent to server');
    console.log(
      topic,
      'topic sent in the body',
      userSide,
      'user side sent in the body'
    );
    try {
      setRound(round + 1);
      const newData = await fetch('http://localhost:3000/api/ai/argument', {
        // rename here after
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_arguments: [argArray],
          ai_arguments: aiArguments,
          topic: topic,
          user_side: userSide,
          round: round,
        }),
      });

      if (!newData.ok) {
        throw new Error(`HTTP Connection Error: ${newData.status}`);
      } else if (newData.ok) {
        setUserArguments(argArray);
        setUserString('');
      }
      const data = await newData.json();
      console.log('data received from server after argument sent', data);

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

      console.log(
        'this is backendinput after we get it back from server',
        backEndInput
      );
    } catch (err) {
      console.error(
        'Error sending data to backend @ round ',
        round,
        ' ERROR: ',
        err
      );
    }
  };

  //fetch request one more time to ai/arguments tendpoint and wait for it
  //to come back and have it provide us with a response before we move on to
  //the assessment -- the assessment endpoint will make use of final AI argument and all reasonings
  const lastFetch = async (updatedUserArguments: string[]) => {
    // one last time sending post request to /api/ai/argument to get the final AI argument
    sendArgToServer(updatedUserArguments);
    console.log('Fetching assessment response...');
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
            topic,
            user_side: userSide,
            ai_reasoning: aiReasonings,
            ai_strong_points: aiStrongPoints,
            ai_weak_points: aiWeakPoints,
            user_strong_points: userStrongPoints,
            user_weak_points: userWeakPoints,
          }),
        }
      );

      if (!assessmentResponse.ok) {
        throw new Error(`HTTP Error: ${assessmentResponse.status}`);
      }

      const assessmentData = await assessmentResponse.json();
      console.log('assessmentData', assessmentData);
      console.log('Navigating with state:', {
        assessmentPageInfo: assessmentData,
      });
      navigate('/assessmentPage', {
        state: {
          assessmentPageInfo: assessmentData, // Pass data directly to the navigate page
        },
      });
    } catch {
      console.error('Error getting data from backend for assessment');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      const userArg = inputRef.current.value;
      const updatedUserArguments = [...userArguments, userArg];
      if (round === 3) {
        lastFetch(updatedUserArguments);
      } else {
        //send user argument to the server
        sendArgToServer(updatedUserArguments);
      }
    }
  };

  const topicSummary =
    topic === 'AI Intelligence'
      ? 'the idea that AI can achieve true intelligence.'
      : 'the idea that there is such a thing as free will.';
  return (
    <div className="chat-container">
      <h1 className="permanent-marker-regular debate">
        {`You are debating `}
        <span
          className="user-side permanent-marker-regular"
          style={{
            color: userSide === 'pro' ? 'green' : 'rgb(255, 99, 99)',
          }}
        >
          {userSide === 'pro' ? 'for ' : 'against'}
        </span>
        <span className="permanent-marker-regular topic">{topicSummary}</span>
      </h1>
      <div className="chatcontainer">
        <ArgumentContainer
          userArguments={userArguments}
          aiArguments={aiArguments}
          setAiArguments={setAiArguments}
          round={round}
        />
      </div>
      {/* Use the state array instead of variable */}
      <div className="inputbox">
        <form onSubmit={handleSubmit}>
          <textarea
            className="userinput"
            ref={inputRef}
            name="userString"
            value={userString}
            placeholder="Craft your argument here..."
            onChange={(e) => {
              setUserString(e.target.value);
            }}
            rows={8}
            cols={40}
            style={{
              textWrap: 'wrap',
            }}
          />
          <button className="submit-argument" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
