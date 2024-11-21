import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
  const location = useLocation();
  const { assessmentPageInfo } = location.state || {}; // Get state values from location

  //OVERALL SUMMARY
  const [assessmentSummary, setassessmentSummary] = useState('');

  //AI SUMMARY
  const [aiStrongPoints, setaiStrongPoints] = useState('');
  const [aiWeakPoints, setaiWeakPoints] = useState('');

  //YOUR SUMMARY
  const [userStrongPoints, setUserStrongPoints] = useState('');
  const [userWeakPoints, setUserWeakPoints] = useState('');
  const [winner, setWinner] = useState(assessmentPageInfo.winner);

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

  useEffect(() => {
    setassessmentSummary(assessmentPageInfo.comp_assessment); //what is the summary called
    setaiStrongPoints(assessmentPageInfo.ai_score);
    setaiWeakPoints(assessmentPageInfo.winner);
    setUserStrongPoints(assessmentPageInfo.userScore);
    setUserWeakPoints(assessmentPageInfo.userBlindspot);
  }, []);

  return (
    <div>
      <h1>Assessment Page</h1>
      <p>AI Performance Summary</p>
      <p>Strong Points:</p>
      <p>{aiStrongPoints}</p>
      <p>Weak Points:</p>
      <p>{aiWeakPoints}</p>
      <p>Your Performance Summary</p>
      <p>Strong Points:</p>
      <p>{userStrongPoints}</p>
      <p>Weak Points:</p>
      <p>{userWeakPoints}</p>
      <p>Assessment Summary</p>
      <p>{assessmentSummary}</p>
    </div>
  );
};

export default AssessmentPage;
