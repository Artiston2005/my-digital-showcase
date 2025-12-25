import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "diwali" | "christmas" | "holi";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Auto-detect theme based on date
const getAutomaticTheme = (): Theme => {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec
  const date = now.getDate();

  // Christmas (Dec 21 - Dec 27)
  if (month === 11 && date >= 21 && date <= 27) {
    return "christmas";
  }

  // Holi (Approx March for demo - update yearly)
  if (month === 2 && date >= 10 && date <= 20) {
    return "holi";
  }

  // Diwali (Approx Oct/Nov for demo - update yearly)
  if ((month === 9 && date >= 15) || (month === 10 && date <= 15)) {
    return "diwali";
  }

  return "default";
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getAutomaticTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    root.removeAttribute("data-theme");
    if (theme !== "default") {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};