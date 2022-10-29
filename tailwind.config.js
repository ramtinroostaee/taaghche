/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/Modules/**/*.{js,ts,jsx,tsx}",
    // "./src/reusable/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  theme: {
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      99: "99",
      999: "999",
      1301: "1301",
      9999: "9999",
    },
  },
};
