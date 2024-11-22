import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
  const location = useLocation();
  const { assessmentPageInfo } = location.state || {}; // Get state values from location

  //OVERALL SUMMARY
  const [assessment, setAssessment] = useState('');

  //AI SUMMARY
  // const [aiStrongPoints, setaiStrongPoints] = useState('');
  // const [aiWeakPoints, setaiWeakPoints] = useState('');

  //YOUR SUMMARY
  // const [userStrongPoints, setUserStrongPoints] = useState('');
  // const [userWeakPoints, setUserWeakPoints] = useState('');
  const [winner, setWinner] = useState(String);
  const [aiScore, setAIScore] = useState(Number);
  const [userScore, setUserScore] = useState(Number);
  const [blindSpots, setBlindSpots] = useState(String);

  // example format

  // user_arguments: userArguments,
  // ai_arguments: aiArguments,
  // topic: topic,
  // user_side: userSide,
  // ai_reasonings: aiReasonings,
  // ai_strong_points: aiStrongPoints,
  // ai_weak_points: aiWeakPoints,
  // user_strong_points: userStrongPoints,
  // user_weak_points: userWeakPoints,

  const assessmentFake = { ...assessmentPageInfo };
  //   comp_assessment:
  //     'a string of comprehensive assessment of user debate performance',
  //   ai_score: 80,
  //   winner: 'user',
  //   user_score: 40,
  //   user_blind_spots:
  //     'a string of blind spot that AI thinks user could tackle during the debate',
  //   ai_advice:
  //     'this is the advice that the AI is giving to you in addition to describing your blindspots',
  // };

  useEffect(() => {
    // setassessmentSummary(assessmentPageInfo.comp_assessment); //what is the summary called
    // setaiStrongPoints(assessmentPageInfo.ai_score);
    setWinner(assessmentFake.winner);
    setAIScore(assessmentFake.ai_score);
    setUserScore(assessmentFake.user_score);
    setBlindSpots(assessmentFake.user_blind_spots);
    setAssessment(assessmentFake.comp_assessment);
  }, []);

  if (winner == 'user') {
    {console.log(winner)}
    return (
      <div>
        <h1>Congratulations,</h1>
        <h2>YOU WON!</h2>
        <h3>
          Your Score: {userScore} vs. AI Score: {aiScore}{' '}
        </h3>
        <div>
          <h4>Comprehensive Assessment</h4>
          <p>{assessment}</p>
          <h4>Points for Improvement</h4>
          <p>{blindSpots}</p>
        </div>
      </div>
    );
  }
  else if (winner == 'ai') {
    
    return (
      <div>
        <h1>Sorry,</h1>
        <h2>You've been defeated by AI.</h2>
        <h3>
          AI Score: {aiScore} vs. Your Score: {userScore}
        </h3>
        <div>
          <h4>Comprehensive Assessment</h4>
          <p>{assessment}</p>
          <h4>Points for Improvement</h4>
          <p>{blindSpots}</p>
        </div>
      </div>
    );
  }
};
//   return (
//     <div>
//       <h1>Assessment Page</h1>
//       <p>AI Performance Summary</p>
//       <p>Strong Points:</p>
//       <p>{aiStrongPoints}</p>
//       <p>Weak Points:</p>
//       <p>{aiWeakPoints}</p>
//       <p>Your Performance Summary</p>
//       <p>Strong Points:</p>
//       <p>{userStrongPoints}</p>
//       <p>Weak Points:</p>
//       <p>{userWeakPoints}</p>
//       <p>Assessment Summary</p>
//       <p>{assessmentSummary}</p>
//     </div>
//   );
// };

export default AssessmentPage;
