/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#FDB813', // A default yellowish color, will refine shortly.
        }
      }
    },
  },
  plugins: [],
}
