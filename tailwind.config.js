/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        tasksPageBg: "linear-gradient(177deg, #FFD370 54%, #FFFFFF 54%)",
        // checkboxTrue: "url('/src/image/checkboxTrue.png')",
        // checkboxFalse: "url('/src/image/checkboxFalse.png')",
      },
      colors: {
        "primary-yellow": "#FFD370",
        "primary-gray": "#9F9A91",
        "light-gray": "#E5E5E5",
      },
    },
  },
  plugins: [],
};
