/** @type {import('tailwindcss').Config} */
export default {
  // Dashboard dark styles must only apply when a `.dark` class is present —
  // NOT based on the visitor's OS theme. Without this, Tailwind defaults to
  // `media`, so `dark:` utilities auto-trigger on any device set to dark mode,
  // making the dashboard render black on some devices and white on others.
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:         "#F8F9FA",
        "bg-alt":   "#FAFAF8",
        "bg-soft":  "#F1F2F4",
        heading:    "#2D3748",
        body:       "#4A5568",
        muted:      "#718096",
        "accent-soft": "#8FBC8F",
        line:       "#B38B6D",
        "line-soft":  "rgba(179, 139, 109, 0.28)",
        "line-faint": "rgba(45, 55, 72, 0.08)",
        cta:        "#576DB5",
        "cta-hover":"#46599C",
        link:       "#1E3A8A",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        shell: "1320px",
      },
      boxShadow: {
        cta: "0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -8px rgba(87,109,181,0.55)",
        card: "0 24px 48px -28px rgba(45,55,72,0.20)",
      },
      keyframes: {
        pulse: {
          "0%":   { transform: "scale(.6)", opacity: "0.8" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-9px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulse:   "pulse 2.2s ease-out infinite",
        drift:   "drift 8s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
