'use client'
const items=[
  {icon:'🏢',title:'Corporate Events',desc:'Conferences, launches & annual meets that actually slap'},
  {icon:'🏛️',title:'Govt Programs',desc:'Official ceremonies executed with protocol & dignity'},
  {icon:'💍',title:'Weddings',desc:'Royal Rajasthani celebrations that hit different'},
  {icon:'🎵',title:'Musical Nights',desc:'Live concerts & performances that go crazy'},
  {icon:'🌙',title:'Ghazal Evenings',desc:'Soulful nights you can't forget'},
  {icon:'📜',title:'Mushaira',desc:'Literary & poetry events for the culture'},
  {icon:'🎙️',title:'Open Mic',desc:'Platform for artists to shine bright'},
  {icon:'🔊',title:'Stage Production',desc:'Sound, lights & AV that hits hard'},
  {icon:'🌟',title:'Artist Management',desc:'Talent booking & full coordination'},
]
export default function Services(){
  return(
    <section id="services" className="bg-[#C1121F] py-24 relative overflow-hidden">
      {/* Decorative mandala bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 200 200">
          {[0,20,40,60,80,100,120,140,160,180].map((a,i)=>(
            <ellipse key={i} cx="100" cy="30" rx="12" ry="28" fill="white" transform={`rotate(${a} 100 100)`}/>
          ))}
          <circle cx="100" cy="100" r="20" fill="white"/>
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-4">What We Do</span>
          <h2 className="font-display text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Grid — 3 cols desktop, 2 mobile, NO images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item,i)=>(
            <div key={i} className={`group p-5 md:p-6 bg-white/10 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 cursor-default ${i===0?'md:col-span-1':''}`}>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display text-white group-hover:text-[#C1121F] font-bold text-sm md:text-base mb-2 tracking-tight transition-colors">{item.title}</h3>
              <p className="text-white/50 group-hover:text-[#1A0A00]/50 text-xs leading-relaxed transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/10 border border-white/20">
          <p className="text-white font-display font-bold text-lg">Ready to create something epic?</p>
          <a href="/#contact" className="px-8 py-3 bg-white text-[#C1121F] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#FFF8F0] transition-all flex-shrink-0">
            Let&apos;s Talk 🚀
          </a>
        </div>
      </div>
    </section>
  )
}