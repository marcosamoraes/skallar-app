/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... add more shades if needed
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
}