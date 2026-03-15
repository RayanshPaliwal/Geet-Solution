'use client'
const services = [
  {icon:'🏢',title:'Corporate Events & Conferences',desc:'Professional corporate gatherings, conferences, seminars, product launches executed with precision and style.'},
  {icon:'🏛️',title:'Government & Official Programs',desc:'Official government ceremonies, public events, foundation days organized with protocol and dignity.'},
  {icon:'🎉',title:'Private Celebrations & Social Events',desc:'Weddings, anniversaries, birthdays transformed into timeless memories with Rajasthani elegance.'},
  {icon:'🎵',title:'Musical Nights & Live Performances',desc:'Concerts, Sufi evenings, classical music nights organized with world-class production.'},
  {icon:'🌙',title:'Ghazal & Cultural Evenings',desc:'Soul-stirring Ghazal evenings and rich cultural programs celebrating the heritage of Rajasthan.'},
  {icon:'📜',title:'Mushaira & Literary Events',desc:'Prestigious literary gatherings, poetry festivals, and Mushaira events for discerning audiences.'},
  {icon:'🎙️',title:'Open Mic & Creative Platforms',desc:'Creative expression platforms for artists, performers, and talent to showcase their skills.'},
  {icon:'🔊',title:'Stage, Sound & Technical Production',desc:'End-to-end technical production — stage design, sound systems, lighting, LED screens and AV.'},
  {icon:'🌟',title:'Artist & Talent Management',desc:'Complete artist management — booking, coordination, and management of performers and singers.'},
]
export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0005] via-red-950/20 to-[#0a0005] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">हमारी सेवाएं</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">Our Expertise</h2>
          <div className="ornament-divider max-w-xs mx-auto mb-6"><span className="text-yellow-400 px-4 font-serif italic text-yellow-100/50">What We Do</span></div>
          <p className="text-yellow-100/55 max-w-2xl mx-auto leading-relaxed">From intimate gatherings to grand productions, every detail is curated with care, passion, and perfection.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i) => (
            <div key={i} className="relative p-6 bg-red-950/20 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors" />
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="font-heading text-lg text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors">{s.title}</h3>
              <p className="text-yellow-100/55 text-sm leading-relaxed">{s.desc}</p>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <div className="inline-flex flex-col items-center gap-4 p-8 border border-yellow-500/20 bg-yellow-500/3 max-w-lg">
            <p className="font-heading text-xl text-yellow-100/80 italic">&ldquo;Thoughtful planning · Creative concepts · Luxury presentation&rdquo;</p>
            <a href="#contact" className="px-8 py-3 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm transition-all">Discuss Your Event</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
    </section>
  )
}