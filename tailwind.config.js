/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF6B35',
        red: { DEFAULT: '#C1121F', dark: '#A10E19' },
        cream: '#FFF8F0',
        dark: '#1A0A00',
        cyan: { DEFAULT: '#00E5FF', dark: '#00B8CC' },
        purple: { DEFAULT: '#A855F7', dark: '#7C3AED' },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        hindi: ['Noto Serif Devanagari', 'serif'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'rgb-border': 'rgb-border 2s linear infinite',
        'rgb-glow': 'rgb-glow 3s linear infinite',
        'gradient-text': 'rgb-text-anim 4s ease infinite',
        'scan-line': 'scan-line 5s linear infinite',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
}
