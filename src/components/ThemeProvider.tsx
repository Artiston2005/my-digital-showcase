import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "diwali" | "christmas" | "holi" | "newyear";

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

  // New Year (Dec 28 - Jan 5)
  if ((month === 11 && date >= 28) || (month === 0 && date <= 5)) {
    return "newyear";
  }

  // Holi (Approx March 10-20 for 2025 - Update yearly)
  if (month === 2 && date >= 10 && date <= 20) {
    return "holi";
  }

  // Diwali (Approx Oct/Nov - Update yearly)
  // For 2025, Diwali is around Oct 20
  if (month === 9 && date >= 15 && date <= 25) {
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