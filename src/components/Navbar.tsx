'use client'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import {Menu,X} from 'lucide-react'
export default function Navbar(){
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)},[])
  return(
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled?'bg-[#FFF8F0]/95 backdrop-blur-xl shadow-sm border-b border-[#FF6B35]/20':'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex-shrink-0">
            <svg viewBox="0 0 50 50" className="w-full h-full">
              <circle cx="25" cy="25" r="23" fill="#C1121F"/>
              <circle cx="25" cy="25" r="16" fill="none" stroke="#FF6B35" strokeWidth="1"/>
              <circle cx="25" cy="25" r="8" fill="#FF6B35"/>
              {[0,45,90,135,180,225,270,315].map((a,i)=>{const x=25+14*Math.cos(a*Math.PI/180),y=25+14*Math.sin(a*Math.PI/180);return<ellipse key={i} cx={x} cy={y} rx="3" ry="1.5" fill="#FFF8F0" transform={`rotate(${a},${x},${y})`}/>})}
              <text x="25" y="29" textAnchor="middle" fontSize="9" fill="#FFF8F0" fontFamily="serif" fontWeight="700">GS</text>
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-[#C1121F] font-bold tracking-tight text-base">GEET</div>
            <div className="text-[#FF6B35] tracking-[0.3em] text-[8px] font-medium">SOLUTIONS</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([h,l])=>(
            <Link key={h} href={h} className="text-[#1A0A00]/60 hover:text-[#C1121F] text-xs tracking-[0.15em] uppercase font-medium transition-colors">{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="/#contact" className="hidden md:block px-5 py-2 bg-[#C1121F] hover:bg-[#FF6B35] text-white font-bold text-[10px] tracking-[0.2em] uppercase transition-all rounded-sm">Book Event</a>
          <button onClick={()=>setOpen(!open)} className="md:hidden text-[#C1121F] p-1.5">{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
      </div>
      {open&&(
        <div className="md:hidden bg-[#FFF8F0] border-t border-[#FF6B35]/20 px-6 py-5 space-y-3">
          {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([h,l])=>(
            <Link key={h} href={h} onClick={()=>setOpen(false)} className="block text-[#1A0A00]/60 hover:text-[#C1121F] text-xs tracking-[0.2em] uppercase py-2 border-b border-[#FF6B35]/10 font-medium transition-colors">{l}</Link>
          ))}
          <a href="/#contact" className="block mt-3 px-5 py-3 bg-[#C1121F] text-white font-bold text-xs tracking-widest uppercase text-center rounded-sm">Book Event</a>
        </div>
      )}
    </nav>
  )
}