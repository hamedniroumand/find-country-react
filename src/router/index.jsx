import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'));
const CountryPage = React.lazy(() => import('../pages/CountryPage'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));

const router = createBrowserRouter([{
  path: '/',
  element: <DefaultLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/countries/:code',
      element: <CountryPage />,
    },
    {
      path: '/404',
      element: <ErrorPage statusCode={404} title="Page not found!" />,
    },
  ],
}]);

export default router;
