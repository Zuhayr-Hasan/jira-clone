// ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

const lightTheme = {
  background: "#f0f0f0",
  text: "#191919",
  inputColor: "#e3e3e3"
};

const darkTheme = {
  background: "#333333",
  text: "#f0f0f0",
  inputColor: "#444"
};

export default ThemeContext;
