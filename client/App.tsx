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
    <div className="entry">
      <h1 className="permanent-marker-regular">
        What would you like to debate?
      </h1>
      <div className="custom-select">
        <select
          id="dropdown"
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        >
          <option value="AI intelligence">
            Is AI capable of real intelligence?
          </option>
          <option value="free will">Does free will exist?</option>
        </select>
      </div>
      <p className="permanent-marker-regular"> Choose your side </p>
      <button value="pro" className="pro" onClick={proChoice}>
        PRO
      </button>
      <button value="con" className="con" onClick={conChoice}>
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
