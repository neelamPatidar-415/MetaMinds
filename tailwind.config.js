//  /** @type {import('tailwindcss').Config} */
// export default {
//    content: ["./views/**/*.ejs"],
//    theme: {
//      extend: {},
//    },
//    plugins: [],
//  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./views/**/*.ejs", "./public/**/*.js"], // adjust paths as per your project
  content: ["./views/**/*.{html,js,ejs}", "./*.html", "./*.ejs"], // adjust paths as per your project

  theme: {
    extend: {},
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./*.html",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

