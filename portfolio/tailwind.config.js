module.exports = {
  theme: {
    extend: {
      colors: {
        "background-light": "#F0F2FF",
        "background-dark": "#000",
        "secondary-light": "#282828",
        "secondary-dark": "#0C0032",
        "section-light": "#240090",
        "section-dark": "#190061",
        "button-light": "#190061",
        "button-dark": "#3500D3",
        "text-light": "#000",
        "text-dark": "#FFF",
        "text-buttons": "#FFF"
      },
      linearGradientColors: theme => theme('colors'),
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-gradients'),
  ],
};
