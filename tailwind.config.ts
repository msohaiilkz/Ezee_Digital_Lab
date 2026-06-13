import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#113040",
          teal: "#1D9785",
          aqua: "#2ABFAF",
          forest: "#0F6C4A",
          sky: "#4CB2E1",
          orange: "#F46416",
          gray: "#888888",
          dark: "#333333",
          light: "#EEEEEE"
        }
      },
      boxShadow: {
        glow: "0 0 42px rgba(42, 191, 175, 0.28)",
        orange: "0 16px 40px rgba(244, 100, 22, 0.26)"
      },
      backgroundImage: {
        "lab-grid": "linear-gradient(rgba(76,178,225,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(76,178,225,0.08) 1px, transparent 1px)",
        "blue-radial": "radial-gradient(circle at 22% 18%, rgba(42,191,175,0.34), transparent 28%), radial-gradient(circle at 82% 20%, rgba(76,178,225,0.24), transparent 30%), linear-gradient(135deg, #113040 0%, #0b202b 58%, #0f2e31 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(244, 100, 22, 0)" },
          "50%": { boxShadow: "0 0 34px rgba(244, 100, 22, 0.34)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
