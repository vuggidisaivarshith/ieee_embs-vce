/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ieee: {
          blue: '#00629B',
          dark: '#004A77',
          light: '#0079C1'
        },
        embs: {
          purple: '#6A3FA0',
          darkPurple: '#512D7E',
          teal: '#0DA6A0'
        },
        vardhaman: {
          orange: '#F5821F',
          darkOrange: '#D66A0C'
        },
        neutralDark: '#1A2332',
        neutralLight: '#F7F9FB'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        heading: ['Sora', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 98, 155, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(0, 98, 155, 0.15)',
      }
    },
  },
  plugins: [],
}
