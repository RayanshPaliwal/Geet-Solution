'use client'
import Link from 'next/link'
import {Phone,Mail,Instagram,Youtube} from 'lucide-react'
export default function Footer(){
  return(
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <svg viewBox="0 0 50 50" className="w-9 h-9">
                <circle cx="25" cy="25" r="23" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
                <circle cx="25" cy="25" r="8" fill="#8B0000"/>
                {[0,40,80,120,160,200,240,280,320].map((a,i)=>{const x=25+14*Math.cos(a*Math.PI/180),y=25+14*Math.sin(a*Math.PI/180);return<ellipse key={i} cx={x} cy={y} rx="3.5" ry="1.5" fill="#C9A84C" transform={`rotate(${a},${x},${y})`}/>})}
                <text x="25" y="28" textAnchor="middle" fontSize="8" fill="#C9A84C" fontFamily="serif" fontWeight="700">GS</text>
              </svg>
              <div>
                <div className="text-[#C9A84C] font-bold tracking-[0.15em] text-sm">GEET</div>
                <div className="text-[#C9A84C]/40 tracking-[0.35em] text-[9px]">SOLUTIONS</div>
              </div>
            </div>
            <p className="text-white/25 text-xs leading-relaxed mb-5 max-w-xs">
              Premium event management company delivering unforgettable experiences — from intimate gatherings to grand productions.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 border border-white/8 hover:border-[#C9A84C] flex items-center justify-center text-white/20 hover:text-[#C9A84C] transition-all"><Instagram size={13}/></a>
              <a href="#" className="w-8 h-8 border border-white/8 hover:border-[#C9A84C] flex items-center justify-center text-white/20 hover:text-[#C9A84C] transition-all"><Youtube size={13}/></a>
            </div>
          </div>
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase mb-5">Services</p>
            <ul className="space-y-2.5">
              {['Corporate Events','Government Programs','Weddings','Musical Nights','Ghazal Evenings','Mushaira & Literary','Artist Management'].map(s=>(
                <li key={s}><Link href="/#services" className="text-white/30 hover:text-[#C9A84C] text-xs transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase mb-5">Contact</p>
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-white/30 hover:text-[#C9A84C] transition-colors group">
                <Phone size={13} className="text-[#C9A84C]/60 flex-shrink-0"/>
                <span className="text-xs">+91 99999 99999</span>
              </a>
              <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-white/30 hover:text-[#C9A84C] transition-colors">
                <Mail size={13} className="text-[#C9A84C]/60 flex-shrink-0"/>
                <span className="text-xs">info@geetsolutions.in</span>
              </a>
            </div>
            <Link href="/#contact" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#C9A84C] hover:bg-[#e0bc5a] text-black font-bold text-[10px] tracking-[0.2em] uppercase transition-all">
              Book Event
            </Link>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">© {new Date().getFullYear()} Geet Solutions. All rights reserved.</p>
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">Elegance · Creativity · Execution</p>
        </div>
      </div>
    </footer>
  )
}