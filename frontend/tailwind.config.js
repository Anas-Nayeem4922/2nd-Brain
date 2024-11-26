/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          200: "#e6e9ed",
          100: "#f9fbfc",
          600: "#95989c",
        },
        purple: {
          600: "#5046e3",
          200: "#e1e6ff",
          500: "#3b359c"
        }
      }
    },
  },
  plugins: [],
}

