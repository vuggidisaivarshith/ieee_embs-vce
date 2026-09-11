/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── VCE Editorial Palette (new primary design language) ──
        vce: {
          teal:       "#087F8C",
          tealDark:   "#075E61",
          tealLight:  "#0A9BAA",
          coral:      "#E76F51",
          coralDark:  "#C95A3D",
          yellow:     "#E9C46A",
          bg:         "#F8F7F2",
          surface:    "#FFFFFF",
          charcoal:   "#172121",
          muted:      "#647070",
          border:     "#DDE4E1",
          borderDark: "#B8C5C0",
        },
        // ── Preserved IEEE/EMBS brand tokens (used by logos, admin) ──
        embs: {
          blue:        "#00629B",
          blueAlt:     "#007DAE",
          purple:      "#772583",
          purpleLight: "#9D3EAA",
          cyan:        "#00A8C6",
          teal:        "#0D9488",
          emerald:     "#2E9B68"
        },
        bio: {
          red:         "#D92D3F",
          ruby:        "#E11D48",
          arterial:    "#BE123C",
          deepArterial:"#881337",
          leukocyte:   "#F8FAFC",
          plasma:      "#0E1C36",
          obsidian:    "#040711",
          void:        "#070B16"
        },
        clinical: {
          green:   "#2E9B68",
          emerald: "#10B981"
        },
        warm: {
          accent: "#F4B942",
          amber:  "#F59E0B",
          orange: "#F5821F"
        },
        ieee: {
          blue:  "#00629B",
          dark:  "#004A77",
          light: "#0079C1",
          cyan:  "#38BDF8"
        },
        surface: {
          light:    "#FFFFFF",
          subtle:   "#F8FAFC",
          muted:    "#F1F5F9",
          border:   "#E2E8F0",
          dark:     "#070B16",
          darkCard: "#0F172A"
        },
        text: {
          primary:    "#0F172A",
          secondary:  "#475569",
          muted:      "#64748B",
          light:      "#F8FAFC",
          lightMuted: "#94A3B8"
        },
        neutralDark:  "#070B16",
        neutralLight: "#F8FAFC"
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        heading: ["Sora", "Outfit", "sans-serif"],
        display: ["Sora", "Outfit", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"]
      },
      boxShadow: {
        // VCE editorial shadows — clean, no neon
        "card":         "0 1px 3px 0 rgba(23,33,33,0.06), 0 4px 16px -2px rgba(23,33,33,0.06)",
        "card-hover":   "0 4px 24px -4px rgba(8,127,140,0.14), 0 1px 3px 0 rgba(23,33,33,0.06)",
        "editorial":    "0 2px 8px -1px rgba(23,33,33,0.08)",
        "teal-subtle":  "0 4px 20px -4px rgba(8,127,140,0.20)",
        // Legacy (used by admin/existing components)
        "bright":       "0 4px 20px -2px rgba(0,98,155,0.08), 0 2px 6px -1px rgba(0,0,0,0.04)",
        "bright-hover": "0 12px 30px -4px rgba(0,98,155,0.15), 0 4px 12px -2px rgba(0,0,0,0.06)",
        "glass":        "0 8px 32px 0 rgba(0,98,155,0.12)",
        "glass-hover":  "0 14px 44px 0 rgba(0,98,155,0.22)",
        "purple-glow":  "0 8px 30px -4px rgba(119,37,131,0.18)",
        "cyan-glow":    "0 8px 30px -4px rgba(0,168,198,0.2)",
        "warm-glow":    "0 8px 30px -4px rgba(244,185,66,0.25)"
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":      "float 6s ease-in-out infinite",
        "line-draw":  "lineDraw 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-6px)" }
        },
        lineDraw: {
          from: { "stroke-dashoffset": "1" },
          to:   { "stroke-dashoffset": "0" }
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" }
        }
      }
    }
  },
  plugins: []
}
