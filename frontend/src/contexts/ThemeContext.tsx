import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type TTheme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: TTheme;
  storageKey?: string;
};

const initialState = {};

const ThemeProviderContext = createContext(initialState);

const ThemeProvider = ({
  children,
  defaultTheme = "dark",
  storageKey,
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<TTheme>(defaultTheme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window;
    }
  }, [theme]);
  return (
    <ThemeProviderContext.Provider value>
      {children}
    </ThemeProviderContext.Provider>
  );
};

const useTheme = () => {
  context = useContext(ThemeProviderContext);
};
