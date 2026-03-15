'use client'
export default function About(){
  const imgs=[
    {src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',label:'Corporate'},
    {src:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',label:'Weddings'},
    {src:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop',label:'Musical Nights'},
    {src:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',label:'Celebrations'},
    {src:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop',label:'Government'},
    {src:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',label:'Ghazal Evenings'},
  ]
  return(
    <section id="about" className="bg-[#0d0d0d] py-24">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mb-14">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-4">Who We Are</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Creating Events<br/>That <span className="text-[#C9A84C]">Inspire</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed font-light">
            Geet Solutions is a premium event management company. From corporate conferences to royal weddings, musical nights to government programs — we craft each moment with precision and passion.
          </p>
        </div>
      </div>

      {/* Horizontal scroll strip - SMALL peek of images */}
      <div className="overflow-x-auto scrollbar-none pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-4 pb-2" style={{width:'max-content'}}>
          {imgs.map((img,i)=>(
            <div key={i} className="relative overflow-hidden flex-shrink-0 group" style={{width:'280px',height:'360px'}}>
              <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
              <div className="absolute bottom-5 left-5">
                <p className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase font-medium">{img.label}</p>
              </div>
            </div>
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-8"/>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/8">
          {[['500+','Events Delivered'],['10+','Years of Excellence'],['50+','Artists Managed'],['100%','Client Satisfaction']].map(([n,l],i)=>(
            <div key={i} className="py-10 px-8 border-r border-b border-white/8 last:border-r-0 md:border-b-0">
              <div className="text-[#C9A84C] text-4xl font-bold mb-1 tracking-tight">{n}</div>
              <div className="text-white/30 text-xs tracking-widest uppercase">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}