/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      overflow: {
        hidden: 'hidden', // Adds a custom utility class for `overflow: hidden`
      },
    },
  },
  plugins: [],
}
