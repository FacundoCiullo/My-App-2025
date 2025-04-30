import React, { useEffect, useState } from 'react';

const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const Theme = () => {
  const [theme, setThemeState] = useState(localStorage.getItem('theme') || preferedColorScheme);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const switchToTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(switchToTheme);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" id="slider" checked={theme === 'dark'} onChange={toggleTheme} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Theme;