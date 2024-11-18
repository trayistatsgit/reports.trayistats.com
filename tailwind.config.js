module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        customPurple: '#483868',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
