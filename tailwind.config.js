/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        hindi: ['"Noto Serif Devanagari"', 'serif'],
      },
      colors: {
        gold: { 400: '#D4AF37', 500: '#b7950b' },
      },
    },
  },
  plugins: [],
}