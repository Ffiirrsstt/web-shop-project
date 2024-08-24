/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xxs: "275px", // สำหรับขนาดหน้าจอที่เล็กกว่า 235px
        xs: "360px",
        sm: "570px",
        base: "625px",
      },
    },
  },
  plugins: [],
};
