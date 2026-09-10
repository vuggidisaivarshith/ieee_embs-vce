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
          light: '#0079C1',
          cyan: '#38BDF8'
        },
        embs: {
          purple: '#6A3FA0',
          darkPurple: '#512D7E',
          teal: '#0DA6A0',
          violet: '#9333EA',
          emerald: '#10B981'
        },
        bio: {
          ruby: '#E11D48',
          arterial: '#BE123C',
          deepArterial: '#881337',
          leukocyte: '#F8FAFC',
          plasma: '#0E1C36',
          obsidian: '#040711',
          void: '#070B16'
        },
        vardhaman: {
          orange: '#F5821F',
          darkOrange: '#D66A0C',
          amber: '#FBBF24'
        },
        neutralDark: '#0D1527',
        neutralLight: '#F7F9FB'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        heading: ['Sora', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 98, 155, 0.12)',
        'glass-hover': '0 14px 44px 0 rgba(0, 98, 155, 0.22)',
        'bio-glow': '0 0 35px -5px rgba(13, 166, 160, 0.25)',
        'arterial-glow': '0 0 35px -5px rgba(225, 29, 72, 0.25)',
        'purple-glow': '0 0 35px -5px rgba(106, 63, 160, 0.25)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
