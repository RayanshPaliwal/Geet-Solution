'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import {Menu, X} from 'lucide-react'

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>20)
    window.addEventListener('scroll',fn)
    return()=>window.removeEventListener('scroll',fn)
  },[])
  const links=[['About','/#about'],['Services','/#services'],['Events','/#events'],['Gallery','/#gallery'],['Contact','/#contact']]
  return(
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled?'bg-[#FFF8F0]/95 backdrop-blur-sm shadow-sm border-b border-[#FF6B35]/10':'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <img 
            src="/geet-logo.png" 
            alt="Geet Solutions" 
            className="h-12 md:h-14 w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all"
            onError={(e)=>{
              e.currentTarget.style.display='none'
              const next = e.currentTarget.nextElementSibling as HTMLElement
              if(next) next.style.display='flex'
            }}
          />
          {/* Fallback text logo */}
          <div className="hidden items-center gap-2">
            <div className="w-8 h-8 bg-[#C1121F] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm font-serif">G</span>
            </div>
            <div>
              <span className={`font-display font-bold text-lg leading-none ${scrolled?'text-[#C1121F]':'text-white'}`}>GEET</span>
              <span className={`block text-[9px] tracking-[0.3em] uppercase font-medium leading-none ${scrolled?'text-[#1A0A00]/50':'text-white/60'}`}>SOLUTIONS</span>
            </div>
          </div>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(([l,h])=>(
            <Link key={l} href={h} className={`text-xs font-bold tracking-[0.15em] uppercase transition-colors hover:text-[#FF6B35] ${scrolled?'text-[#1A0A00]/70':'text-white/80'}`}>{l}</Link>
          ))}
          <Link href="/#contact" className="px-5 py-2.5 bg-[#C1121F] hover:bg-[#FF6B35] text-white text-xs font-bold tracking-[0.15em] uppercase transition-all rounded-sm shadow-md hover:shadow-lg">
            Book Event
          </Link>
        </div>
        {/* Mobile burger */}
        <button onClick={()=>setOpen(!open)} className={`md:hidden p-2 transition-colors ${scrolled?'text-[#1A0A00]':'text-white'}`}>
          {open?<X size={22}/>:<Menu size={22}/>}
        </button>
      </div>
      {/* Mobile menu */}
      {open&&(
        <div className="md:hidden bg-[#FFF8F0]/98 backdrop-blur-sm border-t border-[#FF6B35]/20 shadow-xl">
          <div className="flex flex-col py-4 px-6 gap-1">
            {links.map(([l,h])=>(
              <Link key={l} href={h} onClick={()=>setOpen(false)}
                className="py-3 text-[#1A0A00]/70 text-sm font-bold tracking-widest uppercase border-b border-[#FF6B35]/10 last:border-0 hover:text-[#C1121F] transition-colors">
                {l}
              </Link>
            ))}
            <Link href="/#contact" onClick={()=>setOpen(false)} className="mt-3 py-3 bg-[#C1121F] text-white text-xs font-bold tracking-[0.2em] uppercase text-center rounded-sm hover:bg-[#FF6B35] transition-all">
              Book Event 🔥
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}