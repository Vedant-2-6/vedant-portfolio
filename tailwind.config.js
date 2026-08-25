/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        termBg: '#0d1117',
        termGreen: '#3fb950',
        termRed: '#f85149',
        termBlue: '#58a6ff',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
