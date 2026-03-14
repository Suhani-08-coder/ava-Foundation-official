/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'avaf-gold': '#C5A059',
        'avaf-dark': '#1E293B',
        'avaf-slate': '#334155',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      }
    }
  },
  plugins: [],
}