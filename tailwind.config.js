// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    dropShadow:{
     '3xl':'0 10px 8px rgba(0,0,254,0.49)',
    },
    fill: (theme)=>({
      'red': theme('colors.red.500'),
      'blue': theme('colors.blue.400'),
      'black': 'rgba(0,0,0,0.44)'
    })
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
}