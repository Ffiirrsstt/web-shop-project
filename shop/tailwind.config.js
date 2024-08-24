/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xxs: "250px", // สำหรับขนาดหน้าจอที่เล็กกว่า 235px
        xs: "350px",
      },
    },
  },
  plugins: [],
};
