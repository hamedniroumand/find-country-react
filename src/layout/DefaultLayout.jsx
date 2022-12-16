import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DefaultLayout() {
  return (
    <React.Suspense>
      <div className="dark:bg-secondaryDark dark:text-white min-h-screen">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </React.Suspense>
  );
}

export default DefaultLayout;
