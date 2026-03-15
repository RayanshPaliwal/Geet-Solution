'use client'
import Link from 'next/link'
export default function Hero(){
  return(
    <section className="relative h-screen w-full overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover object-center opacity-60"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"/>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 max-w-screen-xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-5 font-medium">Premium Event Management</p>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
            Moments<br/><span className="text-[#C9A84C]">Crafted</span><br/>with Heart
          </h1>
          <p className="text-white/50 text-sm md:text-base mb-10 max-w-md leading-relaxed font-light">
            From intimate gatherings to grand productions — we transform ideas into unforgettable experiences.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact" className="px-8 py-3.5 bg-[#C9A84C] hover:bg-[#e0bc5a] text-black font-bold text-xs tracking-[0.2em] uppercase transition-all hover:scale-105">
              Book Your Event
            </Link>
            <Link href="/#gallery" className="px-8 py-3.5 border border-white/20 hover:border-[#C9A84C] text-white/70 hover:text-[#C9A84C] font-bold text-xs tracking-[0.2em] uppercase transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}