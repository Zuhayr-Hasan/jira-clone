import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext";
import { lightTheme, darkTheme } from "../themes/theme";

const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeStyles = theme === "light" ? lightTheme : darkTheme;

  return { theme, toggleTheme, themeStyles };
};

export default useTheme;
