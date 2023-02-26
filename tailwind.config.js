/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "539px",
        md: "700px",
        md2: "820px",
        lg: "850px",
        lg2: "895px",
        xl: "1120px",
        xxl: "1294px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
