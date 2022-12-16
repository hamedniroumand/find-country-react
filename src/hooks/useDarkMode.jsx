import React from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = React.useState(() => {
    const themInLocalStorage = localStorage.getItem('theme');
    const isSystemInDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return themInLocalStorage || (isSystemInDarkMode ? 'dark' : 'light');
  });

  React.useLayoutEffect(() => {
    document.documentElement.classList.add(theme);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return {
    isInDarkMode: theme === 'dark',
    toggleDarkMode,
  };
};

export default useDarkMode;
