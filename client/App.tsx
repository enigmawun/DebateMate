import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';

// import Recommendations from './Components/Recommendations';
import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const [topic, setTopic] = useState('AI intelligence');
  const [round, setRound] = useState(0);

  const navigate = useNavigate();

  const proChoice = () => {
    sendToConversationPage('pro');
  };

  const conChoice = () => {
    sendToConversationPage('con');
  };

  const sendToConversationPage = async (proOrCon: string) => {
    try {
      // Send data to backend
      // const response = await fetch('http://localhost:3000/api/ai/argument', { // rename here after
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     prompt, //shorthand here too
      //     "user_arguments": [],
      //     "ai_arguments": [],
      //       "topic": {topic},
      //       "user_side": {proOrCon},
      //     "round": {round}
      //   }),
      // })
      // const responsedata = response.json();

      //dummy data before hooking up to backend
      const responsedata = {
        ai_argument: `AI systems may appear intelligent, 
      but their abilities are fundamentally limited to processing patterns 
      and correlations from data within narrowly defined tasks. They lack 
      the ability to generalize knowledge across domains, as a chess-playing
       AI, for example, cannot apply its problem-solving skills to composing 
       music or diagnosing diseases without explicit retraining. Crucially, AI 
       lacks intentionality, the hallmark of true intelligence, as it operates 
       without goals, desires, or understanding of the world. Its outputs are 
       the result of statistical computations rather than genuine reasoning or
        awareness. Ultimately, AI demonstrates an illusion of intelligence, 
        driven by algorithmic sophistication, but it falls short of the creativity,
         awareness, and independent reasoning required for true intelligence,`,
        ai_reasoning: 'some reasoning string',
        ai_strong_point: 'sdfsdfsd',
        ai_weak_point: 'alsfjkdljflsdkj',
        user_strong_point: 'sdfkljdsklfj',
        user_weak_point: 'sldjfkldsjfkls',
      };
      // Navigate to Conversation Page

      navigate('/conversationPage', {
        state: {
          // backEndInput //name of the key is the same as the variable, shorthand
          backEndInput: {
            user_arguments: [],
            ai_arguments: [responsedata.ai_argument],
            topic: topic,
            user_side: proOrCon,
            round: round,
            ai_reasoning: [responsedata.ai_reasoning],
            ai_strong_point: [responsedata.ai_strong_point],
            ai_weak_point: [responsedata.ai_weak_point],
            user_strong_point: [responsedata.user_strong_point],
            user_weak_point: [responsedata.user_weak_point],
          },
        },
      });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div>
      {/* <Recommendations /> */}
      <p> What would you like to debate? </p>
      <select
        id="dropdown"
        onChange={(e) => {
          setTopic(e.target.value);
        }}
      >
        <option value="AI intelligence">
          Is AI capable of real intelligence?
        </option>
        <option value="b">Other option to come</option>
      </select>
      <p> Choose your side </p>
      <button value="pro" onClick={proChoice}>
        PRO
      </button>
      <button value="con" onClick={conChoice}>
        CON
      </button>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/conversationPage',
    element: <ConversationPage />,
  },
  {
    path: '/assessmentPage',
    element: <AssessmentPage />,
  },
]);

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
