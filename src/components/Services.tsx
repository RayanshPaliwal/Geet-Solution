'use client'
const items = [
  {icon:'🏢',title:'Corporate Events',img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop'},
  {icon:'🏛️',title:'Government Programs',img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop'},
  {icon:'💍',title:'Weddings',img:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop'},
  {icon:'🎵',title:'Musical Nights',img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop'},
  {icon:'🌙',title:'Ghazal Evenings',img:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop'},
  {icon:'📜',title:'Mushaira',img:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop'},
  {icon:'🎙️',title:'Open Mic',img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop'},
  {icon:'🔊',title:'Stage & Production',img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop'},
  {icon:'🌟',title:'Artist Management',img:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=600&auto=format&fit=crop'},
]
export default function Services() {
  return (
    <section id="services" className="bg-black py-20">
      <div className="text-center mb-12 px-6">
        <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">What We Do</p>
        <h2 className="text-white text-4xl md:text-5xl font-serif">Our Expertise</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-0.5 bg-yellow-900/20">
        {items.map((item, i) => (
          <div key={i} className="group relative overflow-hidden aspect-square cursor-pointer">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl mb-3 drop-shadow-lg">{item.icon}</span>
              <p className="text-white font-serif text-lg md:text-xl text-center px-4 drop-shadow-lg">{item.title}</p>
            </div>
            {/* Hover border */}
            <div className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          </div>
        ))}
      </div>
    </section>
  )
}