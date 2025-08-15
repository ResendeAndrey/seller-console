/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)"
      }
    }
  },
  plugins: []
};
