/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zyron: {
          cyan: "#2563EB",
          blue: "#2d5af8",
          violet: "#7d12ff",
          dark: "#050505",
          panel: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.1)",
          brandblue: '#1e40af',
          brandaccent: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #2d5af8 0deg, #00f0ff 180deg, #7d12ff 360deg)",
      },
    },
  },
  plugins: [],
};
