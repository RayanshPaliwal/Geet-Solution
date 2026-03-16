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

  // Scanline effect
  useEffect(()=>{
    const el=document.createElement('div')
    el.className='scanline'
    document.body.appendChild(el)
    return()=>el.remove()
  },[])

  const links=[
    {href:'/#about',label:'About'},
    {href:'/#services',label:'Services'},
    {href:'/#events',label:'Events'},
    {href:'/#gallery',label:'Gallery'},
    {href:'/#contact',label:'Contact'},
  ]

  return(
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?'py-2':'py-4'}`}
      style={{
        background:scrolled?'rgba(13,13,13,0.95)':'transparent',
        backdropFilter:scrolled?'blur(20px)':'none',
        borderBottom:scrolled?'1px solid':'none',
        animation:scrolled?'rgb-border 3s linear infinite':'none',
      }}>
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            {/* RGB glow behind logo text */}
            <div className="absolute inset-0 blur-lg opacity-50 rgb-glow" style={{background:'transparent'}}/>
            <span className="font-display text-xl font-black tracking-tight relative">
              <span className="gradient-text glitch">GEET</span>
              <span className="text-white/80 ml-1.5 text-sm font-medium tracking-[0.2em] uppercase">Solutions</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l=>(
            <Link key={l.href} href={l.href}
              className="text-white/50 hover:text-white text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:neon-cyan relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#00E5FF] to-[#A855F7] group-hover:w-full transition-all duration-300"/>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/#contact"
            className="px-5 py-2 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-sm rgb-border-anim"
            style={{color:'#00E5FF'}}>
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={()=>setMenuOpen(!menuOpen)}>
          <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen?'rotate-45 translate-y-2 bg-[#00E5FF]':'bg-white'}`}/>
          <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen?'opacity-0':'bg-white'}`}/>
          <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen?'-rotate-45 -translate-y-2 bg-[#00E5FF]':'bg-white'}`}/>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen&&(
        <div className="md:hidden absolute top-full left-0 right-0 border-t rgb-border-anim"
          style={{background:'rgba(13,13,13,0.98)',backdropFilter:'blur(20px)'}}>
          {links.map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}
              className="block px-6 py-4 text-white/60 hover:text-white border-b border-white/5 text-xs tracking-[0.2em] uppercase hover:neon-cyan transition-all">
              {l.label}
            </Link>
          ))}
          <div className="p-4">
            <Link href="/#contact" onClick={()=>setMenuOpen(false)}
              className="block text-center py-3 text-xs tracking-[0.2em] uppercase font-bold rgb-border-anim"
              style={{color:'#00E5FF'}}>
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}