'use client'
import Link from 'next/link'
import {Phone,Mail,Instagram,Youtube} from 'lucide-react'
export default function Footer(){
  return(
    <footer className="bg-[#1A0A00] border-t border-[#FF6B35]/20">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 50 50" className="w-10 h-10">
                <circle cx="25" cy="25" r="23" fill="#C1121F"/>
                <circle cx="25" cy="25" r="16" fill="none" stroke="#FF6B35" strokeWidth="1"/>
                <circle cx="25" cy="25" r="8" fill="#FF6B35"/>
                {[0,45,90,135,180,225,270,315].map((a,i)=>{const x=25+14*Math.cos(a*Math.PI/180),y=25+14*Math.sin(a*Math.PI/180);return<ellipse key={i} cx={x} cy={y} rx="3" ry="1.5" fill="#FFF8F0" transform={`rotate(${a},${x},${y})`}/>})}
                <text x="25" y="29" textAnchor="middle" fontSize="9" fill="#FFF8F0" fontFamily="serif" fontWeight="700">GS</text>
              </svg>
              <div>
                <div className="font-display text-[#FF6B35] font-bold tracking-tight text-base">GEET SOLUTIONS</div>
                <div className="text-white/30 tracking-[0.3em] text-[8px]">PREMIUM EVENTS</div>
              </div>
            </div>
            <p className="text-white/30 text-xs leading-relaxed mb-4">Creating unforgettable events across Rajasthan. Corporate · Weddings · Concerts · Culture.</p>
            <p className="font-hindi text-[#FF6B35]/60 text-sm">हर पल को यादगार बनाते हैं ✨</p>
            <div className="flex gap-2 mt-4">
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-[#FF6B35] flex items-center justify-center text-white/30 hover:text-white transition-all"><Instagram size={13}/></a>
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-[#FF6B35] flex items-center justify-center text-white/30 hover:text-white transition-all"><Youtube size={13}/></a>
            </div>
          </div>
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase mb-4">Services</p>
            <ul className="space-y-2">
              {['Corporate Events','Govt Programs','Weddings','Musical Nights','Ghazal Evenings','Artist Management'].map(s=>(
                <li key={s}><Link href="/#services" className="text-white/30 hover:text-[#FF6B35] text-xs transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase mb-4">Contact</p>
            <div className="space-y-3">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-white/30 hover:text-[#FF6B35] transition-colors">
                <Phone size={12} className="text-[#FF6B35]/60 flex-shrink-0"/><span className="text-xs">+91 99999 99999</span>
              </a>
              <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-white/30 hover:text-[#FF6B35] transition-colors">
                <Mail size={12} className="text-[#FF6B35]/60 flex-shrink-0"/><span className="text-xs">info@geetsolutions.in</span>
              </a>
            </div>
            <Link href="/#contact" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#FF6B35] hover:bg-[#C1121F] text-white font-bold text-[10px] tracking-[0.2em] uppercase transition-all">Book Event 🔥</Link>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">© {new Date().getFullYear()} Geet Solutions. All rights reserved.</p>
          <p className="text-white/15 text-[10px] tracking-widest uppercase">Elegance · Creativity · Execution</p>
        </div>
      </div>
    </footer>
  )
}