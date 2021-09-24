module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'gray': '#f8f8f8',
        'ash': '#777',
        'primary-txt': '#a6c76c',
        'blk-txt': '#333',
        'border-clr':'#dadada',
        'tback': 'rbga(355,355,355, 0.1)',
        'card-bg': '#eeedeb',
        'new': '#ef837b',
        'blk-ash': '#4b4b4b',
        'opaDown': 'rbga(0,0,0, 0.4)',
      },
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
