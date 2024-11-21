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

  // example format
  // {
  //   "summary": "AI performed well in reasoning but weak in counterpoints.",
  //   "ai_performance": {
  //     "strong_points": ["Clear reasoning", "Structured arguments"],
  //     "weak_points": ["Lack of emotional appeal"]
  //   },
  //   "user_performance": {
  //     "strong_points": ["Compelling examples"],
  //     "weak_points": ["Lack of detailed rebuttals"]
  //   }
  // }

  useEffect(() => {
    setassessmentSummary(assessmentPageInfo.summary);
    setaiStrongPoints(assessmentPageInfo.ai_performance.strong_points);
    setaiWeakPoints(assessmentPageInfo.ai_performance.weak_points);
    setUserStrongPoints(assessmentPageInfo.user_performance.strong_points);
    setUserWeakPoints(assessmentPageInfo.user_performance.weak_points);
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
