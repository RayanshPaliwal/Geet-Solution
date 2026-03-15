'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 60 60" className="w-10 h-10 flex-shrink-0">
            <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
            <circle cx="30" cy="30" r="10" fill="#8B0000"/>
            {[0,45,90,135,180,225,270,315].map((a,i) => (
              <ellipse key={i} cx={30+16*Math.cos(a*Math.PI/180)} cy={30+16*Math.sin(a*Math.PI/180)}
                rx="4" ry="2" fill="#D4AF37" transform={`rotate(${a},${30+16*Math.cos(a*Math.PI/180)},${30+16*Math.sin(a*Math.PI/180)})`}/>
            ))}
            <text x="30" y="33" textAnchor="middle" fontSize="9" fill="#D4AF37" fontFamily="serif" fontWeight="bold">GS</text>
          </svg>
          <div className="hidden sm:block">
            <div className="text-yellow-400 font-serif text-lg font-bold leading-none tracking-wider">GEET</div>
            <div className="text-yellow-600 text-xs tracking-[0.3em]">SOLUTIONS</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([href,label]) => (
            <Link key={href} href={href} className="text-white/80 hover:text-yellow-400 text-sm tracking-widest uppercase transition-colors">{label}</Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a href="tel:+919999999999" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs tracking-widest uppercase transition-all">
            <Phone size={13}/> Call Now
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-yellow-500/20 px-6 py-6 space-y-4">
          {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([href,label]) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)}
              className="block text-white/70 hover:text-yellow-400 text-sm tracking-widest uppercase py-2 border-b border-white/10 transition-colors">
              {label}
            </Link>
          ))}
          <a href="tel:+919999999999" className="flex items-center gap-2 mt-4 px-5 py-3 bg-yellow-500 text-black font-bold text-sm tracking-widest uppercase justify-center">
            <Phone size={14}/> Book Event
          </a>
        </div>
      )}
    </nav>
  )
}