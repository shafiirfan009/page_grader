import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        signal: "#3B82F6",
        success: "#22C55E",
        caution: "#F59E0B",
        danger: "#EF4444",
        cloud: "#F8FAFC"
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "\"Times New Roman\"", "serif"],
        body: ["\"Segoe UI\"", "\"Helvetica Neue\"", "sans-serif"]
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        shimmer: "shimmer 2.2s linear infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0"
          },
          "100%": {
            backgroundPosition: "200% 0"
          }
        }
      },
      boxShadow: {
        panel: "0 18px 60px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

