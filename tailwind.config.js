/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: { 300:'#ffc166',400:'#ff9d2b',500:'#ff7f07',600:'#f06200' },
        maroon: { 700:'#c00d24',800:'#8B0000',900:'#7a0c21',950:'#43040f' },
        gold: { 200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#D4AF37',600:'#b7950b' },
        cream: '#FDF6E3',
      },
      fontFamily: {
        display: ['Cinzel Decorative', 'serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
        hindi: ['Noto Serif Devanagari', 'serif'],
      },
    },
  },
  plugins: [],
}