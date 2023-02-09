/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: "850px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
