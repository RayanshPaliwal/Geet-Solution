'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'
export default function Navbar(){
  const [scrolled,setScrolled]=useState(false)
  const [menuOpen,setMenuOpen]=useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>20)
    window.addEventListener('scroll',fn)
    return()=>window.removeEventListener('scroll',fn)
  },[])
  const links=[
    {href:'/#about',label:'About'},
    {href:'/#services',label:'Services'},
    {href:'/#events',label:'Events'},
    {href:'/#gallery',label:'Gallery'},
    {href:'/#contact',label:'Contact'},
  ]
  return(
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?'bg-[#FFF8F0]/95 backdrop-blur-sm shadow-sm border-b border-[#FF6B35]/20 py-2':'bg-transparent py-4'}`}>
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="font-display text-[#C1121F] text-2xl font-black tracking-tight">GS</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[#1A0A00] text-sm font-black tracking-widest uppercase">GEET</span>
            <span className="text-[#1A0A00]/40 text-[8px] tracking-[0.3em] uppercase">Solutions</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l=>(
            <Link key={l.href} href={l.href}
              className="text-[#1A0A00]/50 hover:text-[#C1121F] text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/#contact" className="px-5 py-2 bg-[#C1121F] hover:bg-[#FF6B35] text-white text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-sm">
            Book Event
          </Link>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={()=>setMenuOpen(!menuOpen)}>
          <span className={`w-5 h-0.5 bg-[#1A0A00] transition-all duration-300 ${menuOpen?'rotate-45 translate-y-2':''}`}/>
          <span className={`w-5 h-0.5 bg-[#1A0A00] transition-all duration-300 ${menuOpen?'opacity-0':''}`}/>
          <span className={`w-5 h-0.5 bg-[#1A0A00] transition-all duration-300 ${menuOpen?'-rotate-45 -translate-y-2':''}`}/>
        </button>
      </div>
      {menuOpen&&(
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FFF8F0] border-b border-[#FF6B35]/20 shadow-lg">
          {links.map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}
              className="block px-6 py-3 text-[#1A0A00]/60 hover:text-[#C1121F] border-b border-[#FF6B35]/10 text-xs tracking-[0.2em] uppercase hover:bg-[#FF6B35]/5 transition-all">
              {l.label}
            </Link>
          ))}
          <div className="p-4">
            <Link href="/#contact" onClick={()=>setMenuOpen(false)}
              className="block text-center py-3 bg-[#C1121F] text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#FF6B35] transition-all rounded-sm">
              Book Event
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}