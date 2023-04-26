/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-green-theme': '#009688',
        'color-green-theme-50': '#c5d9d7',
        'color-green-theme-hover': '#d5fcf7'
      }
    },
  },
  plugins: [],
}

