/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-blue': '#007aff',
        'ios-light-blue': '#e9f0ff',
        'ios-green': '#34c759',
        'ios-red': '#ff3b30',
        'ios-yellow': '#ffcc00',
        'ios-gray': '#8e8e93',
        'ios-light-gray': '#f2f2f7',
      },
      fontFamily: {
        'arabic': ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
