// tailwind.config.js
module.exports = {
  future: {},
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B8385',
        secondary: '#EAF3F3',
        accent: '#F99F1B',
        'accent-dark': '#DF6800',
        clementine: '#DF6800',
        danger: '#B93102',
        white: '#FFFFFF'
      },
    },
    fontFamily: {
      pirulen: ['Pirulen', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      helvetica: ['Helvetica Light Oblique', 'sans-serif']
  },
  },
  variants: {},
  plugins: [],
}