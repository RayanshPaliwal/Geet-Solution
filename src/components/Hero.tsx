'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0005]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-[#0a0005] to-blue-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay:'2s'}} />
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg viewBox="0 0 800 800" className="w-full max-w-4xl mandala-spin">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle,i) => (
              <ellipse key={i} cx="400" cy="200" rx="80" ry="30" fill="none" stroke="#D4AF37" strokeWidth="1" transform={`rotate(${angle}, 400, 400)`}/>
            ))}
            <circle cx="400" cy="400" r="380" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="5,5"/>
            <circle cx="400" cy="400" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-yellow-500 to-red-800 opacity-60" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm tracking-widest uppercase rounded-sm">
          <Star size={12} fill="currentColor" /> Udaipur, Rajasthan <Star size={12} fill="currentColor" />
        </div>
        <p className="font-hindi text-yellow-400/70 text-lg md:text-xl mb-3 tracking-wide">हर पल को यादगार बनाते हैं</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-gold-gradient mb-2 leading-tight">Geet</h1>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-yellow-100/90 mb-4 tracking-widest">SOLUTIONS</h2>
        <div className="ornament-divider max-w-sm mx-auto mb-6"><span className="text-yellow-400 text-lg px-4">✦</span></div>
        <p className="font-heading text-xl md:text-2xl text-orange-300/90 italic mb-3">&ldquo;Moments Crafted with Heart&rdquo;</p>
        <p className="text-yellow-100/50 text-sm tracking-widest uppercase mb-8">Elegance · Creativity · Execution</p>
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {['Corporate Events','Weddings','Cultural Programs','Musical Nights','Govt Programs','Artist Management'].map(item => (
            <span key={item} className="px-3 py-1 text-xs bg-red-900/50 border border-red-700/50 text-yellow-300/80 rounded-sm">{item}</span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#contact" className="px-8 py-4 bg-red-900 hover:bg-red-800 border border-yellow-500/50 text-yellow-300 tracking-widest uppercase text-sm transition-all duration-300 hover:-translate-y-0.5">
            Plan Your Event
          </Link>
          <Link href="/#events" className="px-8 py-4 border border-yellow-100/20 hover:border-yellow-400/50 text-yellow-100/80 hover:text-yellow-300 tracking-widest uppercase text-sm transition-all duration-300">
            Our Work
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-400/50 animate-bounce"><ChevronDown size={28}/></div>
    </section>
  )
}