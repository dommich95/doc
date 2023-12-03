import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ToggleTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
      className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center mr-4"
    >
      {theme === 'dark' ? (
        <SunIcon color="black" />
      ) : (
        <MoonIcon color="white" />
      )}
    </button>
  );
};

export default ToggleTheme;
