/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textUnderlineOffset: {
        '4': '4px',
      },
    },
    boxShadow: {
      navBar: "0px 10px 8px 0px rgba(3, 3, 4, 0.03), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1720px",
      "3xl": "1856px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.underline-orange-500': {
          'text-decoration-color': 'orange',
          'text-underline-offset': '4px', // Ajusta el valor según sea necesario
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
