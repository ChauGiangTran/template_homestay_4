import React, { createContext, useContext, useState } from "react";

export type ThemeId =
  | "nature-editorial"
  | "luxury-minimalism"
  | "rustic-retreat"
  | "coastal-boutique";

export interface IThemeMeta {
  id: ThemeId;
  name: string;
  tagline: string;
  fontHeading: string;
  fontBody: string;
  primaryColor: string;
  accentColor: string;
  canvasBg: string;
}

export const THEMES_LIST: IThemeMeta[] = [
  {
    id: "nature-editorial",
    name: "Nature Editorial",
    tagline: "Sương mờ thung lũng, thông reo tĩnh tại",
    fontHeading: "Newsreader (Serif)",
    fontBody: "Public Sans",
    primaryColor: "#18281E",
    accentColor: "#876D4B",
    canvasBg: "#FAFBF9",
  },
];

interface IThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themeMeta: IThemeMeta;
}

const ThemeContext = createContext<IThemeContextType>({
  currentTheme: "nature-editorial",
  setTheme: () => {},
  themeMeta: THEMES_LIST[0],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("nature-editorial");
  const themeMeta = THEMES_LIST[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themeMeta }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
