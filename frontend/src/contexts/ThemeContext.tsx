import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type TTheme = "dark" | "light" | "system";

type TThemeProviderInitialState = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
};
type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: TTheme;
  storageKey?: string;
};

const initialState: TThemeProviderInitialState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext =
  createContext<TThemeProviderInitialState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "dark",
  storageKey = "reservify-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<TTheme>(
    () => (localStorage.getItem(storageKey) as TTheme) || defaultTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-schema:dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme: TTheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === "undefined")
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
