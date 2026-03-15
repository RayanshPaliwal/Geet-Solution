'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Services' },
  { href: '/#events', label: 'Events' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0005]/95 backdrop-blur-md shadow-lg border-b border-yellow-500/20' : 'bg-transparent'}`}>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B0000] border border-yellow-500/40 flex items-center justify-center">
              <span className="text-yellow-400 font-serif text-xl font-bold">G</span>
            </div>
            <div>
              <div className="font-serif text-xl text-yellow-400 leading-none">Geet</div>
              <div className="text-xs text-orange-400 tracking-widest uppercase leading-none">Solutions</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm text-white/80 hover:text-yellow-400 transition-colors relative group tracking-wide">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+919999999999" className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#8B0000] hover:bg-[#a00000] border border-yellow-500/40 text-yellow-300 text-sm transition-all">
              <Phone size={14} /> Book Event
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-400 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#0a0005]/98 border-t border-yellow-500/20">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-white/80 hover:text-yellow-400 border-b border-yellow-500/10 text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}