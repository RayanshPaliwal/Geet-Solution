/** @type {import('tailwindcss').Config} */
module.exports={
  content:['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{extend:{colors:{gold:{'400':'#C9A84C','500':'#b8973b'}},fontFamily:{hindi:['"Noto Serif Devanagari"','serif']}}},
  plugins:[]
}