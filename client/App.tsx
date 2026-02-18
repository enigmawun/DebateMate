import React, { lazy, Suspense,  } from 'react';
// import ReactDOM from 'react-dom/client';
// import { useNavigate } from 'react-router-dom';
import NavigationHandler from './Components/NavigationHandler';
// import { createRoot } from 'react-dom/client';
import LoadingSpinner from './Components/Loading';
import ConversationPage from './Components/ConversationPage';
import AssessmentPage from './Components/AssessmentPage';
import MainContainer from './Components/MainContainer';
import { createBrowserRouter } from 'react-router-dom';
import './styles2.css';
//images and styling
const conversationPage = lazy(() => import('./Components/ConversationPage'));
const assessmentPage = lazy(() => import('./Components/AssessmentPage'));

const App = () => {

  return (
    <>
     
        <MainContainer />

    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/conversationPage',
    element: (
      <Suspense>
        <ConversationPage />
      </Suspense>
    ),
  },
  {
    path: '/assessmentPage',
    element: (
      <Suspense>
        <AssessmentPage />
      </Suspense>
    ),
  },
]);
