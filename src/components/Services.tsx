'use client'
const items=[
  {icon:'🏢',title:'Corporate Events',desc:'Conferences, launches and annual meets that actually slap'},
  {icon:'🏛️',title:'Govt Programs',desc:'Official ceremonies executed with protocol and dignity'},
  {icon:'💍',title:'Weddings',desc:'Royal Rajasthani celebrations that hit different'},
  {icon:'🎵',title:'Musical Nights',desc:'Live concerts and performances that go crazy'},
  {icon:'🌙',title:'Ghazal Evenings',desc:'Soulful nights you will never forget'},
  {icon:'📜',title:'Mushaira',desc:'Literary and poetry events for the culture'},
  {icon:'🎙️',title:'Open Mic',desc:'Platform for artists to shine bright'},
  {icon:'🔊',title:'Stage Production',desc:'Sound, lights and AV that hits hard'},
  {icon:'🌟',title:'Artist Management',desc:'Talent booking and full coordination'},
]
export default function Services(){
  return(
    <section id="services" className="bg-[#C1121F] py-24 relative overflow-hidden">
      {/* Spinning mandala bg decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {[0,20,40,60,80,100,120,140,160,180].map((a,i)=>(
            <ellipse key={i} cx="100" cy="30" rx="10" ry="25" fill="white" transform={`rotate(${a} 100 100)`}/>
          ))}
          <circle cx="100" cy="100" r="18" fill="white"/>
        </svg>
      </div>
      {/* Corner lotus decorations */}
      <div className="absolute top-6 left-6 opacity-15 pointer-events-none">
        <svg viewBox="0 0 60 60" className="w-14 h-14">
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <ellipse key={i} cx="30" cy="10" rx="5" ry="11" fill="white" transform={`rotate(${a} 30 30)`}/>
          ))}
          <circle cx="30" cy="30" r="7" fill="white"/>
        </svg>
      </div>
      <div className="absolute top-6 right-6 opacity-15 pointer-events-none">
        <svg viewBox="0 0 60 60" className="w-14 h-14">
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <ellipse key={i} cx="30" cy="10" rx="5" ry="11" fill="white" transform={`rotate(${a} 30 30)`}/>
          ))}
          <circle cx="30" cy="30" r="7" fill="white"/>
        </svg>
      </div>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-4">What We Do</span>
          <h2 className="font-display text-white text-4xl md:text-5xl font-extrabold tracking-tight">Our Services</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item,i)=>(
            <div key={i} className="group p-5 md:p-6 bg-white/10 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 cursor-default">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display text-white group-hover:text-[#C1121F] font-bold text-sm md:text-base mb-2 tracking-tight transition-colors">{item.title}</h3>
              <p className="text-white/50 group-hover:text-[#1A0A00]/50 text-xs leading-relaxed transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/10 border border-white/20">
          <p className="text-white font-display font-bold text-lg">Ready to create something epic?</p>
          <a href="/#contact" className="px-8 py-3 bg-white text-[#C1121F] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#FFF8F0] transition-all flex-shrink-0">
            Book Now 🚀
          </a>
        </div>
      </div>
    </section>
  )
}