/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        tasksPageBg: "linear-gradient(177deg, #FFD370 54%, #FFFFFF 54%)",
        // checkboxTrue: "url('../public/images/checkboxTrue.png')",
        // checkboxFalse: "url('/image/checkboxFalse.png')",
      },
      colors: {
        "primary-yellow": "#FFD370",
        "primary-gray": "#9F9A91",
        "baseline-gray-700": "#333333",
        "baseline-gray-500": "#E5E5E5",
        "baseline-gray-400": "#EFEFEF",
      },
      boxShadow: {
        "input-shadow": "0 0 15px 0 rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
