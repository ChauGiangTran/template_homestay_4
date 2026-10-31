/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          canvas: "#FAFBF9",
          surface: "#F0F4F1",
          primary: "#18281E",
          pine: "#23392B",
          forest: "#3E4D40",
          timber: "#876D4B",
          bark: "#5E4638",
          mist: "#DCE4DD",
          subtle: "#718073",
          cream: "#F7F5F0",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Playfair Display", "Georgia", "serif"],
        sans: ["Public Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        editorial: "0.08em",
        wide: "0.04em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "2",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(24, 40, 30, 0.05), 0 1px 4px -1px rgba(24, 40, 30, 0.03)",
        elevated: "0 10px 25px -5px rgba(24, 40, 30, 0.08), 0 8px 10px -6px rgba(24, 40, 30, 0.04)",
      },
    },
  },
  plugins: [],
};
