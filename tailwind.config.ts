import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060709",
        surface: "#0b0d12",
        "surface-card": "#11141d",
        "surface-border": "#1a1f2c",
        gold: {
          400: "#e6c875",
          500: "#d4af37",
          600: "#aa8828",
        },
        cosmic: {
          blue: "#4f86f7",
          cyan: "#38bdf8",
          purple: "#9333ea",
          glow: "rgba(147, 51, 234, 0.15)",
        },
        muted: {
          foreground: "#8a94a6",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-fade": "glow 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
