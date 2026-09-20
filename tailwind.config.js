/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── OptiForge 2026 palette ──
        of: {
          teal:    "#008C95",
          tealDk: "#006E76",
          blue:   "#0066CC",
          blueDk: "#004FA3",
          cyan:   "#00B8D9",
          cyanLt: "#33C9E5",
          navy:   "#071A2B",
          navyLt:"#0D2844",
          ice:    "#F2F8FA",
          char:   "#17202A",
          white:  "#FFFFFF",
        },
        // ── VCE Editorial Palette ──
        vce: {
          teal:      "#087F8C",
          tealDark:  "#075E61",
          tealLight: "#0A9BAA",
          coral:     "#E76F51",
          coralDark: "#C95A3D",
          yellow:    "#E9C46A",
          bg:        "#F2F8FA",
          surface:   "#FFFFFF",
          charcoal:  "#172121",
          muted:     "#647070",
          border:    "#DDE4E1",
          borderDark:"#B8C5C0",
        },
        // ── Preserved legacy tokens ──
        embs:  { blue:"#00629B",blueAlt:"#007DAE",purple:"#772583",cyan:"#00A8C6",teal:"#0D9488",emerald:"#2E9B68" },
        bio:   { red:"#D92D3F",ruby:"#E11D48",leukocyte:"#F8FAFC",plasma:"#0E1C36",obsidian:"#040711",void:"#070B16" },
        clinical:{ green:"#2E9B68",emerald:"#10B981" },
        warm:  { accent:"#F4B942",amber:"#F59E0B" },
        ieee:  { blue:"#00629B",dark:"#004A77",light:"#0079C1",cyan:"#38BDF8" },
        surface:{ light:"#FFFFFF",subtle:"#F8FAFC",muted:"#F1F5F9",border:"#E2E8F0",dark:"#070B16",darkCard:"#0F172A" },
        text:  { primary:"#0F172A",secondary:"#475569",muted:"#64748B",light:"#F8FAFC" },
      },
      fontFamily: {
        sans:    ["Inter","system-ui","sans-serif"],
        heading: ["Sora","Outfit","sans-serif"],
        display: ["Sora","Outfit","sans-serif"],
        mono:    ["JetBrains Mono","Fira Code","monospace"],
      },
      boxShadow: {
        // Apple-style glass shadows
        "glass-sm":   "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)",
        "glass":      "0 4px 24px -2px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        "glass-lg":   "0 12px 40px -6px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-hover":"0 20px 50px -8px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
        "teal-glow":  "0 4px 20px -4px rgba(8,127,140,0.28), inset 0 1px 0 rgba(255,255,255,0.3)",
        "of-glow":    "0 8px 32px -6px rgba(0,140,149,0.35), 0 2px 8px rgba(0,102,204,0.15)",
        // Legacy
        "card":       "0 1px 3px rgba(23,33,33,0.06), 0 4px 16px -2px rgba(23,33,33,0.06)",
        "card-hover": "0 4px 24px -4px rgba(8,127,140,0.14), 0 1px 3px rgba(23,33,33,0.06)",
        "editorial":  "0 2px 8px -1px rgba(23,33,33,0.08)",
        "teal-subtle":"0 4px 20px -4px rgba(8,127,140,0.20)",
        "bright":     "0 4px 20px -2px rgba(0,98,155,0.08), 0 2px 6px -1px rgba(0,0,0,0.04)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2.5s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float:      { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-6px)" } },
        shimmer:    { from:{ backgroundPosition:"-200% 0" }, to:{ backgroundPosition:"200% 0" } },
        glowPulse:  { "0%,100%":{ opacity:"0.7",transform:"scale(1)" }, "50%":{ opacity:"1",transform:"scale(1.04)" } },
      },
    },
  },
  plugins: [],
}
