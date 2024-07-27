import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const savedTheme = localStorage.getItem("@react-wallet:theme");

    if (savedTheme) {
      return JSON.parse(savedTheme);
    }

    return dark;
  });

  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem("@react-wallet:theme", JSON.stringify(light));
    } else {
      setTheme(dark);
      localStorage.setItem("@react-wallet:theme", JSON.stringify(dark));
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { ThemeProvider, useTheme };
