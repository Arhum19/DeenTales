/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        success: "#4CAF50",
        error: "#c62828",
        "brand-green": {
          DEFAULT: "#7ba67d",
          50: "#f0f7f1",
          100: "#d4e4d5",
          200: "#a8c9a9",
          300: "#7ba67d",
          400: "#6b9470",
          500: "#5c8561",
          600: "#4d7551",
          700: "#3e6442",
          800: "#2f5332",
          900: "#204223",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
