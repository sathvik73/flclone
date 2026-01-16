/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',
          light: '#232f3e',
          orange: '#febd69',
          yellow: '#f0c14b',
          blue: '#007185',
          bg: '#e3e6e6'
        }
      }
    },
  },
  plugins: [],
}
