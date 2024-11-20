import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';

// import Recommendations from './Components/Recommendations';
import ConversationPage from './Components/Recommendations';
import AssessmentPage from './Components/Recommendations';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const App = () => {
  const [proOrCon, setProOrCon] = useState(false)
  const [prompt, choosePrompt] = useState('')

  const navigate = useNavigate();
  
  const sendToConversationPage = async () => {
    try {
      // Send data to backend
      const aiInput = await fetch('http://localhost:5001/api/choices', { // rename here after
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
          proOrCon, //shorthand here too
          prompt, //shorthand here too
        }),
      });
  
      // Navigate to Conversation Page
      navigate('/conversationPage', { 
        state: { 
          aiInput //name of the key is the same as the variable, shorthand
        } 
      });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div>
      {/* <Recommendations /> */}
      <p> What would you like to debate? </p>
      <select id="dropdown">
        <option value="a">a</option>
        <option value="b">b</option>
      </select>
      <p> Choose your side </p>
      <button onClick = {sendToConversationPage}>PRO</button>
      <button onClick = {sendToConversationPage}>CON</button>
      
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/conversationPage",
    element: <ConversationPage />,
  },
  {
    path: "/assessmentPage",
    element: <AssessmentPage />,
  },
]);

createRoot(document.querySelector('#root')!).render(
<React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>);

export default App;
