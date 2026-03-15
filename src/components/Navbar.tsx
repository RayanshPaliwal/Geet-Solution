'use client'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import {Menu,X,Phone} from 'lucide-react'
export default function Navbar(){
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)},[])
  return(
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled?'bg-[#0d0d0d]/95 backdrop-blur-xl':'bg-transparent'}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 50 50" className="w-9 h-9 flex-shrink-0">
            <circle cx="25" cy="25" r="23" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
            <circle cx="25" cy="25" r="8" fill="#8B0000"/>
            {[0,40,80,120,160,200,240,280,320].map((a,i)=>{const x=25+14*Math.cos(a*Math.PI/180),y=25+14*Math.sin(a*Math.PI/180);return<ellipse key={i} cx={x} cy={y} rx="3.5" ry="1.5" fill="#C9A84C" transform={`rotate(${a},${x},${y})`}/>})}
            <text x="25" y="28" textAnchor="middle" fontSize="8" fill="#C9A84C" fontFamily="serif" fontWeight="700">GS</text>
          </svg>
          <div className="leading-none">
            <div className="text-[#C9A84C] font-bold tracking-[0.15em] text-sm">GEET</div>
            <div className="text-[#C9A84C]/50 tracking-[0.35em] text-[9px]">SOLUTIONS</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([h,l])=>(
            <Link key={h} href={h} className="text-white/60 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors">{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="/#contact" className="hidden md:block px-5 py-2 bg-[#C9A84C] hover:bg-[#e0bc5a] text-black font-bold text-[10px] tracking-[0.2em] uppercase transition-all">Book Event</a>
          <button onClick={()=>setOpen(!open)} className="md:hidden text-white p-1.5">{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
      </div>
      {open&&<div className="md:hidden bg-[#0d0d0d] border-t border-white/5 px-6 py-5 space-y-4">
        {[['/#about','About'],['/#services','Services'],['/#events','Events'],['/#gallery','Gallery'],['/#contact','Contact']].map(([h,l])=>(
          <Link key={h} href={h} onClick={()=>setOpen(false)} className="block text-white/60 hover:text-[#C9A84C] text-xs tracking-[0.2em] uppercase py-2 border-b border-white/5 transition-colors">{l}</Link>
        ))}
        <a href="/#contact" className="block mt-4 px-5 py-3 bg-[#C9A84C] text-black font-bold text-xs tracking-widest uppercase text-center">Book Event</a>
      </div>}
    </nav>
  )
}