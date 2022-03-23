const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
        number: ["Montserrat"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        //amber: colors.amber,
        black: colors.black,
        blue: colors.blue,
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        gray: colors.trueGray,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        //trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        green: colors.green,
        indigo: colors.indigo,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,
        purple: colors.purple,
        red: colors.red,
        rose: colors.rose,
        sky: colors.sky, //warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
        teal: colors.teal,
        violet: colors.violet,
        yellow: colors.amber,
        white: colors.white,
        slate: colors.slate,
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
