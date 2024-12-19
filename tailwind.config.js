/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'new-line': 'rgba(38, 55, 122, 0.06)', // Add your rgba color here
      },
    },
  },
  plugins: [],
}

