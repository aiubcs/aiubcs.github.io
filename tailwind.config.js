/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aiub: {
          navy: '#003366',
          teal: '#064e3b',
          emerald: '#0d9488',
          mint: '#10b981',
          bg: '#f8fafc',
          card: '#ffffff',
          darkBg: '#0f172a',
          darkCard: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
