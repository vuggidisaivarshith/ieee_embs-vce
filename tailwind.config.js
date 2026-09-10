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
        // Core IEEE EMBS Semantic Tokens
        embs: {
          blue: '#00629B',
          blueAlt: '#007DAE',
          purple: '#772583',
          purpleLight: '#9D3EAA',
          cyan: '#00A8C6',
          teal: '#0D9488',
          emerald: '#2E9B68'
        },
        bio: {
          red: '#D92D3F',
          ruby: '#E11D48',
          arterial: '#BE123C',
          deepArterial: '#881337',
          leukocyte: '#F8FAFC',
          plasma: '#0E1C36',
          obsidian: '#040711',
          void: '#070B16'
        },
        clinical: {
          green: '#2E9B68',
          emerald: '#10B981'
        },
        warm: {
          accent: '#F4B942',
          amber: '#F59E0B',
          orange: '#F5821F'
        },
        ieee: {
          blue: '#00629B',
          dark: '#004A77',
          light: '#0079C1',
          cyan: '#38BDF8'
        },
        surface: {
          light: '#FFFFFF',
          subtle: '#F8FAFC',
          muted: '#F1F5F9',
          border: '#E2E8F0',
          dark: '#070B16',
          darkCard: '#0F172A'
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          light: '#F8FAFC',
          lightMuted: '#94A3B8'
        },
        neutralDark: '#070B16',
        neutralLight: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'bright': '0 4px 20px -2px rgba(0, 98, 155, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'bright-hover': '0 12px 30px -4px rgba(0, 98, 155, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'purple-glow': '0 8px 30px -4px rgba(119, 37, 131, 0.18)',
        'cyan-glow': '0 8px 30px -4px rgba(0, 168, 198, 0.2)',
        'warm-glow': '0 8px 30px -4px rgba(244, 185, 66, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 98, 155, 0.12)',
        'glass-hover': '0 14px 44px 0 rgba(0, 98, 155, 0.22)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
