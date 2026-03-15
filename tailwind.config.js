/** @type {import('tailwindcss').Config} */
module.exports={
  content:['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{
    extend:{
      colors:{
        saffron:{'50':'#fff4ee','400':'#FF6B35','500':'#e55a24'},
        red:{'700':'#C1121F','800':'#a50f1a'},
        cream:'#FFF8F0',
        dark:'#1A0A00',
        gold:'#D4A017',
      },
      fontFamily:{
        display:['Syne','sans-serif'],
        body:['Space Grotesk','sans-serif'],
        hindi:['"Noto Serif Devanagari"','serif'],
      },
      animation:{
        'marquee':'marquee 25s linear infinite',
        'float':'float 4s ease-in-out infinite',
        'spin-slow':'spin-slow 30s linear infinite',
      },
      keyframes:{
        marquee:{'0%':{transform:'translateX(0)'},'100%':{transform:'translateX(-50%)'}},
        float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-10px)'}},
        'spin-slow':{'from':{transform:'rotate(0deg)'},'to':{transform:'rotate(360deg)'}},
      },
    }
  },
  plugins:[]
}