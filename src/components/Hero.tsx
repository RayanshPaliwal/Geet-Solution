'use client'
import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
          alt="Geet Solutions Events"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent z-10" />

      {/* Content - minimal, centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* Logo mark */}
        <div className="mb-6">
          <svg viewBox="0 0 120 120" className="w-20 h-20 mx-auto">
            <circle cx="60" cy="60" r="55" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
            <circle cx="60" cy="60" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4,3"/>
            <circle cx="60" cy="60" r="22" fill="rgba(139,0,0,0.8)"/>
            {[0,45,90,135,180,225,270,315].map((angle, i) => {
              const x = 60 + 34 * Math.cos(angle * Math.PI / 180)
              const y = 60 + 34 * Math.sin(angle * Math.PI / 180)
              return <ellipse key={i} cx={x} cy={y} rx="7" ry="3" fill="#D4AF37"
                transform={`rotate(${angle}, ${x}, ${y})`} />
            })}
            {[0,60,120,180,240,300].map((angle, i) => {
              const x = 60 + 48 * Math.cos(angle * Math.PI / 180)
              const y = 60 + 48 * Math.sin(angle * Math.PI / 180)
              return <circle key={i} cx={x} cy={y} r="3" fill="#D4AF37" opacity="0.7"/>
            })}
            <text x="60" y="56" textAnchor="middle" fontSize="16" fill="#D4AF37" fontFamily="serif" fontWeight="bold">गीत</text>
            <text x="60" y="70" textAnchor="middle" fontSize="7" fill="#FF7F07" fontFamily="serif" letterSpacing="4">SOLUTIONS</text>
          </svg>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white font-bold mb-2 tracking-wide drop-shadow-2xl">
          GEET
        </h1>
        <p className="font-hindi text-yellow-300 text-xl md:text-2xl mb-2 drop-shadow-lg">
          हर पल को यादगार बनाते हैं
        </p>
        <p className="text-yellow-200/70 text-sm tracking-[0.4em] uppercase mb-10">
          Udaipur · Rajasthan
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/#contact"
            className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 shadow-2xl">
            Book Your Event
          </a>
          <a href="/#gallery"
            className="px-10 py-4 border-2 border-white/60 hover:border-yellow-400 text-white hover:text-yellow-300 tracking-widest uppercase text-sm transition-all duration-300 backdrop-blur-sm">
            View Our Work
          </a>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-0.5 h-12 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse" />
      </div>
    </section>
  )
}