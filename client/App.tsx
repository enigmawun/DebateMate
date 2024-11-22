import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';

import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const [topic, setTopic] = useState('AI intelligence');

  const navigate = useNavigate();

  const proChoice = () => {
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
    navigate('/conversationPage', {
      state: {
        backEndInput: {
          topic: topic,
          user_side: 'con',
        },
      },
    });
  };

  return (
    <div className='topic-selector'>
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
      </button>{' '}
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
