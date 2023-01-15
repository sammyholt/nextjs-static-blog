/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-yellow-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-pink-600",
  ],
};
