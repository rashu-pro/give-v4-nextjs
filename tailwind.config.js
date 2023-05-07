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
      },
      boxShadow: {
        'inner-custom': 'inset 0 0.08em 0.4em rgba(0, 0, 0, 0.15)'
      },
      borderColor: {
        'gray-input': "#e7e7e7"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '4rem',
        },
      }
    },
  },
  plugins: [],
}

