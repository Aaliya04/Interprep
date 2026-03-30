/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        dark: "#0f172a",
        card: "rgba(255,255,255,0.05)"
      },
      boxShadow: {
        glow: "0 0 25px rgba(99,102,241,0.5)"
      }
    },
  },
  plugins: [],
}