/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      screens:{
        "videopoint":"340px",
      },
      
      colors: {
        "main": "#adccb7",
        "main2": "#ccc0ad",
        "main3": "#776549",
        "bg-body": "#faf5ef",
        "category1":"#5320cb",
        "category2":"#20cbc2",
        "category3":"#6acb20",
        "category4":"#d9d212",
        "category5":"#d93012",
      },
      keyframes: {
        drawTop: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        drawSides: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        drawBottom: {
          '0%': { width: '0%' },
          '100%': { width: '50%' },
        },
        hithere: {
          '30%': { transform: 'scale(1.2)' },
          '40%, 60%': { transform: 'rotate(-20deg) scale(1.2)' },
          '50%': { transform: 'rotate(20deg) scale(1.2)' },
          '70%': { transform: 'rotate(0deg) scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' },
        },
        "cartAnimation":{
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '1',
          },
          '40%': {
            transform: 'translateX(0) scale(1.1)',
          },
          '60%': {
            transform: 'translateX(0) scale(1)',
            
          },
          '100%': {
            transform: 'translateY(-100%) scale(0.5)',
            opacity: '0',
          },
        }
      },
      animation: {
        drawTop: 'drawTop 0.3s forwards',
        drawSides: 'drawSides 0.3s 0.3s forwards', 
        drawBottom: 'drawBottom 0.3s 0.6s forwards', 
        hithere: 'hithere 1s ease forwards',
        'infinite-scroll': 'infinite-scroll 45s linear infinite',
        "cartAnimation": 'cartAnimation 1.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
});
