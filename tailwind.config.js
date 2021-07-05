module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: {
          1000: '#f7883e',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
