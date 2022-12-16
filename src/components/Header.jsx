import React from 'react';
import { Link } from 'react-router-dom';
import SolidMoonIcon from '@heroicons/react/24/solid/MoonIcon';
import PropTypes from 'prop-types';

import useDarkMode from '../hooks/useDarkMode';

function ThemeButton({ children }) {
  const { toggleDarkMode } = useDarkMode();

  return (
    <button type="button" className="flex items-center gap-2 font-semibold" onClick={toggleDarkMode}>
      {children}
    </button>
  );
}
ThemeButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Header() {
  return (
    <header className="py-8 shadow-md bg-white dark:bg-primaryDark sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-3xl">
          <h1>Where in the world?</h1>
        </Link>
        <ThemeButton>
          <>
            <SolidMoonIcon className="w-5 h-5" />
            Light Mode
          </>
        </ThemeButton>
      </div>
    </header>
  );
}
