/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        squid: ['GameOfSquids', 'sans-serif'], // Add the custom font
      },
      colors: {
        // Gradient Colors
        darkPurple: "#1a0137",
        lightPurple: "#31004a",
        neonPink: "#ff007a",
        neonBlue: "#5d9fff",
      },
    },
  },
  plugins: [],
};
