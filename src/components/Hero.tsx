'use client'
import Link from 'next/link'

// Pre-computed ellipse positions for mandala (no template literals)
const mandalaEllipses = [
  {cx:25,cy:11,angle:0},{cx:39,cy:14,angle:45},{cx:43,cy:28,angle:90},
  {cx:39,cy:42,angle:135},{cx:25,cy:45,angle:180},{cx:11,cy:42,angle:225},
  {cx:7,cy:28,angle:270},{cx:11,cy:14,angle:315}
]

export default function Hero(){
  return(
    <section className="relative min-h-screen w-full overflow-hidden bg-[#C1121F]">
      {/* Jali SVG pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="jali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.8"/>
              <circle cx="40" cy="40" r="18" fill="none" stroke="white" strokeWidth="0.6"/>
              <circle cx="40" cy="40" r="6" fill="white"/>
              <line x1="40" y1="10" x2="40" y2="70" stroke="white" strokeWidth="0.5"/>
              <line x1="10" y1="40" x2="70" y2="40" stroke="white" strokeWidth="0.5"/>
              <line x1="19" y1="19" x2="61" y2="61" stroke="white" strokeWidth="0.4"/>
              <line x1="61" y1="19" x2="19" y2="61" stroke="white" strokeWidth="0.4"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(45 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(90 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(135 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(180 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(225 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(270 40 40)"/>
              <ellipse cx="40" cy="13" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(315 40 40)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jali)"/>
        </svg>
      </div>

      {/* Right side image with diagonal clip */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full pointer-events-none">
        <div className="absolute inset-0" style={{clipPath:'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'}}>
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
            alt="" className="w-full h-full object-cover opacity-70"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#C1121F] via-[#C1121F]/40 to-transparent"/>
        </div>
      </div>

      {/* Floating mandala - pre-computed, no template literals */}
      <div className="absolute top-24 right-[47%] w-20 h-20 opacity-20 animate-spin-slow hidden md:block pointer-events-none">
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(45 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(90 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(135 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(180 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(225 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(270 25 25)"/>
          <ellipse cx="25" cy="7" rx="4" ry="9" fill="#FFF8F0" transform="rotate(315 25 25)"/>
          <circle cx="25" cy="25" r="6" fill="#FF6B35"/>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-screen-xl mx-auto pb-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-[#FF6B35] rounded-full">
            <span className="font-hindi text-white text-sm font-semibold">हर पल यादगार</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80 text-xs tracking-wider">Est. 2014</span>
          </div>
          <h1 className="font-display text-white font-extrabold leading-[0.9] mb-6 text-5xl md:text-7xl lg:text-8xl tracking-tight">
            EVENTS<br/>
            <span className="text-[#FF6B35]">THAT</span><br/>
            HIT DIFF
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-10 max-w-md leading-relaxed font-light">
            Corporate. Weddings. Concerts. Ghazal Nights.<br/>
            We make every moment unforgettable. ✨
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact" className="px-8 py-3.5 bg-white hover:bg-[#FFF8F0] text-[#C1121F] font-bold text-sm tracking-wide uppercase transition-all hover:scale-105 shadow-lg rounded-sm">
              Book Now 🔥
            </Link>
            <Link href="/#gallery" className="px-8 py-3.5 border-2 border-white/40 hover:border-white text-white font-bold text-sm tracking-wide uppercase transition-all rounded-sm">
              See Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling marquee bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#FF6B35] py-2.5 overflow-hidden z-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0,1].map(ri=>(
            <div key={ri} className="flex items-center gap-6 pr-6 flex-shrink-0">
              {['Weddings ✦','Corporate Events ✦','Musical Nights ✦','Ghazal Evenings ✦','Mushaira ✦','Govt Programs ✦','Open Mic ✦','Artist Management ✦'].map((txt,i)=>(
                <span key={i} className="text-white font-bold text-xs tracking-[0.2em] uppercase">{txt}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}