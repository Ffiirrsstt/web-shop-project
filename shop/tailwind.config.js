/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xxxs: "210px", // สำหรับขนาดหน้าจอที่เล็กกว่า 235px
        xxs: "275px", // สำหรับขนาดหน้าจอที่เล็กกว่า 235px
        xs: "360px",
        ms: "425px",
        sm: "570px",
        base: "625px",
      },
    },
  },
  plugins: [],
};
