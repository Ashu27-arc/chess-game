/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': {
          800: '#5D4037',
        },
        'chess': {
          'light': '#F0D9B5',
          'dark': '#B58863',
          'border': '#7D694C',
        }
      },
    },
  },
  plugins: [],
}

