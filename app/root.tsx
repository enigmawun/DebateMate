import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../client/App';

export default function Root() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
