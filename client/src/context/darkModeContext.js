import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };
  const element = document.documentElement

  useEffect(() => {
    localStorage.setItem("theme", darkMode);
    switch (darkMode) {
      case true:
        element.classList.add('dark')
        break;
      case false:
        element.classList.remove('dark')
        break;
      default:
        element.classList.add('light')
        break;
    }
  }, [darkMode])


  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};