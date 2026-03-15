'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <circle cx="30" cy="30" r="28" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                <circle cx="30" cy="30" r="10" fill="#8B0000"/>
                {[0,45,90,135,180,225,270,315].map((a,i) => (
                  <ellipse key={i} cx={30+16*Math.cos(a*Math.PI/180)} cy={30+16*Math.sin(a*Math.PI/180)}
                    rx="4" ry="2" fill="#D4AF37" transform={`rotate(${a},${30+16*Math.cos(a*Math.PI/180)},${30+16*Math.sin(a*Math.PI/180)})`}/>
                ))}
                <text x="30" y="33" textAnchor="middle" fontSize="9" fill="#D4AF37" fontFamily="serif" fontWeight="bold">GS</text>
              </svg>
              <div>
                <div className="text-yellow-400 font-serif text-xl font-bold tracking-wider">GEET</div>
                <div className="text-yellow-600 text-xs tracking-[0.3em]">SOLUTIONS</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Premium Event Management & Creative Solutions. Udaipur, Rajasthan.
            </p>
            <p className="text-yellow-400/70 font-serif italic">हर पल को यादगार बनाते हैं</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 border border-white/10 hover:border-yellow-500 flex items-center justify-center text-white/40 hover:text-yellow-400 transition-all"><Instagram size={15}/></a>
              <a href="#" className="w-9 h-9 border border-white/10 hover:border-yellow-500 flex items-center justify-center text-white/40 hover:text-yellow-400 transition-all"><Facebook size={15}/></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-serif text-lg mb-5">Services</h4>
            <ul className="space-y-2">
              {['Corporate Events','Government Programs','Weddings','Musical Nights','Ghazal Evenings','Mushaira','Artist Management'].map(s => (
                <li key={s}>
                  <Link href="/#services" className="text-white/40 hover:text-yellow-400 text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-lg mb-5">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-white/50 hover:text-yellow-400 transition-colors">
                <Phone size={15} className="text-yellow-500 flex-shrink-0"/><span className="text-sm">+91 99999 99999</span>
              </a>
              <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-white/50 hover:text-yellow-400 transition-colors">
                <Mail size={15} className="text-yellow-500 flex-shrink-0"/><span className="text-sm">info@geetsolutions.in</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin size={15} className="text-yellow-500 flex-shrink-0 mt-0.5"/>
                <span className="text-sm">Udaipur, Rajasthan<br/>India — 313001</span>
              </div>
            </div>
            <a href="tel:+919999999999"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs tracking-widest uppercase transition-all">
              <Phone size={13}/> Book Now
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Geet Solutions. All rights reserved.</p>
          <p className="text-white/25 text-xs tracking-widest uppercase">Elegance · Creativity · Execution</p>
        </div>
      </div>
    </footer>
  )
}