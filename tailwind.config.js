/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '600px',
        'md': '738px',
        'lg': '960px',
        'xl': '1200px',
        '2xl': '1400px',
      }
    },
    extend: {
      colors: {
        main: "#0aad0a",
        mainHover:"#09a109"
      }
    },
  },
  plugins: [],
}

