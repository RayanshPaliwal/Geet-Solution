/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        saffron: { 400:'#ff9d2b',500:'#ff7f07',900:'#7f3100' },
        maroon: { 700:'#c00d24',800:'#8B0000',900:'#43040f',950:'#1a0005' },
        gold: { 300:'#fcd34d',400:'#D4AF37',500:'#b7950b',600:'#92730a' },
        cream: '#FDF6E3',
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
        hindi: ['"Noto Serif Devanagari"', 'serif'],
      },
    },
  },
  plugins: [],
}