'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, Heart } from 'lucide-react'
export default function Footer() {
  const services = ['Corporate Events','Government Programs','Private Celebrations','Musical Nights','Ghazal Evenings','Mushaira','Artist Management']
  return (
    <footer className="bg-[#050003] border-t border-yellow-500/15">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-900/40 border border-yellow-500/30 flex items-center justify-center">
                <span className="font-serif text-yellow-400 text-2xl font-bold">G</span>
              </div>
              <div>
                <div className="font-display text-2xl text-gold-gradient">Geet Solutions</div>
                <div className="text-xs text-yellow-100/40 tracking-widest uppercase">Event Management</div>
              </div>
            </div>
            <p className="text-yellow-100/50 text-sm leading-relaxed mb-4 max-w-sm">Premium Event Management & Creative Solutions in Udaipur, Rajasthan. We craft unforgettable experiences with elegance, creativity, and professional precision.</p>
            <p className="font-hindi text-yellow-400/60 text-base">हर पल को यादगार बनाते हैं ✨</p>
          </div>
          <div>
            <h4 className="font-heading text-yellow-300 text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s}>
                  <Link href="/#services" className="text-yellow-100/45 hover:text-yellow-300 text-sm transition-colors flex items-center gap-2">
                    <span className="text-yellow-600/50 text-xs">✦</span>{s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-yellow-300 text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-yellow-100/45 hover:text-yellow-300 transition-colors"><Phone size={14} className="text-yellow-500/50 flex-shrink-0" /><span className="text-sm">+91 99999 99999</span></a>
              <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-yellow-100/45 hover:text-yellow-300 transition-colors"><Mail size={14} className="text-yellow-500/50 flex-shrink-0" /><span className="text-sm">info@geetsolutions.in</span></a>
              <div className="flex items-start gap-3 text-yellow-100/45"><MapPin size={14} className="text-yellow-500/50 flex-shrink-0 mt-0.5" /><span className="text-sm">Udaipur, Rajasthan<br/>India — 313001</span></div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-yellow-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-yellow-100/30 text-xs">© {new Date().getFullYear()} Geet Solutions. All rights reserved.</p>
          <p className="text-yellow-100/30 text-xs flex items-center gap-1">Made with <Heart size={12} className="text-red-500 fill-red-500" /> in Udaipur, Rajasthan</p>
          <p className="text-yellow-100/30 text-xs">Elegance · Creativity · Execution</p>
        </div>
      </div>
    </footer>
  )
}