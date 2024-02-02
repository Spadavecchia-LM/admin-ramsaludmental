const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors:{
      primaryGreen:"#1DBE98",
      white:"#f1f5f9"

    }
  },
  darkMode: "class",
  plugins: [nextui()]
}

