/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ios-blue': '#007AFF',
        'ios-gray': '#8E8E93',
        'ios-light-gray': '#F2F2F7',
        'ios-red': '#FF3B30',
        'ios-green': '#34C759',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'ios': '13px',
      },
      boxShadow: {
        'ios': '0 4px 8px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
