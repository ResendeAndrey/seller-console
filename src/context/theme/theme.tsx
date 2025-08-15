/*
  This context is used to toggle dark mode
  Responsibilities:
    - toggle dark mode
    - store dark mode in localStorage
    - set dark mode in document
*/

import {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem("darkMode");
    return isDarkMode ? !!JSON.parse(isDarkMode) : false;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.dataset.agThemeMode = "dark-blue";
    } else {
      root.classList.remove("dark");
      document.body.dataset.agThemeMode = "light";
    }
  }, [darkMode]);

  const themeProviderMemo = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeProviderMemo}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
