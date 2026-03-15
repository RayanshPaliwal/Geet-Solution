'use client'
const items=[
  {icon:'🏢',title:'Corporate Events',img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',desc:'Conferences, launches & annual meets'},
  {icon:'🏛️',title:'Government Programs',img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop',desc:'Official ceremonies with protocol'},
  {icon:'💍',title:'Weddings',img:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',desc:'Royal Rajasthani celebrations'},
  {icon:'🎵',title:'Musical Nights',img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop',desc:'Live concerts & performances'},
  {icon:'🌙',title:'Ghazal Evenings',img:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',desc:'Soulful Sufi & Ghazal nights'},
  {icon:'📜',title:'Mushaira',img:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',desc:'Literary & poetry events'},
  {icon:'🎙️',title:'Open Mic',img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop',desc:'Creative expression platforms'},
  {icon:'🔊',title:'Stage & Production',img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',desc:'Sound, light & AV production'},
  {icon:'🌟',title:'Artist Management',img:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=600&auto=format&fit=crop',desc:'Talent booking & coordination'},
]
export default function Services(){
  return(
    <section id="services" className="bg-[#0d0d0d] py-24 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mb-12">
        <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-4">What We Do</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">Our Services</h2>
      </div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto scrollbar-none pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-4 pb-2" style={{width:'max-content'}}>
          {items.map((item,i)=>(
            <div key={i} className="group flex-shrink-0 border border-white/8 hover:border-[#C9A84C]/40 transition-all duration-300 overflow-hidden" style={{width:'240px'}}>
              {/* Small image peek */}
              <div className="relative overflow-hidden" style={{height:'180px'}}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"/>
              </div>
              <div className="p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1.5 tracking-wide">{item.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-8"/>
        </div>
      </div>
    </section>
  )
}