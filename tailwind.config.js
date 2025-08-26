/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF536B",
        main: "radial-gradient(rgb(255, 255, 255), rgb(255, 214, 214));"
      }
    },
  },
  plugins: [],
}

