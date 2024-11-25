import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark";
type TThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<TThemeContext>({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === "dark") {
      root.classList.add("dark");
      body.style.backgroundColor = "#1e1e2f"; // Dark background
      body.style.color = "#ffffff"; // Light text
    } else {
      root.classList.remove("dark");
      body.style.backgroundColor = "#ffffff"; // Light background
      body.style.color = "#000000"; // Dark text
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
