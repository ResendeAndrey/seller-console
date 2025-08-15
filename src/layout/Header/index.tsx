/*
  Header.tsx
  This file handle the dark mode icons to set dark or light theme
*/

import { useTheme } from "@/context/theme/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="flex justify-end items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <button onClick={toggleDarkMode}>
        {darkMode ? (
          <SunIcon className="size-7 text-blue-500" data-testid="sun-icon" />
        ) : (
          <MoonIcon className="size-7 text-blue-500 " data-testid="moon-icon" />
        )}
      </button>
    </header>
  );
};

export default Header;
