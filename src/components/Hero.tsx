'use client'
import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0005]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#43040f]/80 via-[#0a0005] to-[#1e3a8a]/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'2s'}} />
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg viewBox="0 0 800 800" className="w-full max-w-4xl mandala-spin">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
              <ellipse key={i} cx="400" cy="200" rx="80" ry="30" fill="none" stroke="#D4AF37" strokeWidth="1" transform={`rotate(${angle}, 400, 400)`} />
            ))}
            <circle cx="400" cy="400" r="380" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="5,5"/>
            <circle cx="400" cy="400" r="200" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2,3"/>
          </svg>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000] opacity-60" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm tracking-widest uppercase rounded-sm">
          <Star size={12} fill="currentColor" /> Udaipur, Rajasthan <Star size={12} fill="currentColor" />
        </div>
        <p className="text-yellow-400/70 text-lg md:text-xl mb-3 tracking-wide" style={{fontFamily:'Noto Serif Devanagari, serif'}}>हर पल को यादगार बनाते हैं</p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl text-white mb-2 leading-tight" style={{fontFamily:'Cinzel Decorative, serif'}}>
          <span className="text-gold-gradient" style={{background:'linear-gradient(135deg,#D4AF37,#F5D060,#D4AF37)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Geet</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white/90 mb-4 tracking-widest" style={{fontFamily:'Cinzel Decorative, serif'}}>SOLUTIONS</h2>
        <div className="ornament-divider max-w-sm mx-auto mb-6"><span className="text-yellow-400 text-lg px-4">✦</span></div>
        <p className="text-xl md:text-2xl text-orange-300/90 italic mb-2" style={{fontFamily:'Playfair Display, serif'}}>"Moments Crafted with Heart"</p>
        <p className="text-white/60 text-sm tracking-widest uppercase mb-8">Elegance · Creativity · Execution</p>
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {['Corporate Events','Weddings','Cultural Programs','Musical Nights','Government Programs','Artist Management'].map(item => (
            <span key={item} className="px-3 py-1 text-xs bg-[#8B0000]/50 border border-[#8B0000]/50 text-yellow-300/80 rounded-sm tracking-wide">{item}</span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#contact" className="px-8 py-4 bg-[#8B0000] hover:bg-[#a00000] border border-yellow-500/50 text-yellow-300 tracking-widest uppercase text-sm transition-all hover:-translate-y-0.5">Plan Your Event</Link>
          <Link href="/#events" className="px-8 py-4 border border-white/20 hover:border-yellow-400/50 text-white/80 hover:text-yellow-300 tracking-widest uppercase text-sm transition-all">Our Work</Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-400/50 animate-bounce"><ChevronDown size={28} /></div>
    </section>
  )
}