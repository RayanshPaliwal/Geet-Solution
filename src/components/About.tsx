'use client'
export default function About(){
  const imgs=[
    {src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',label:'Corporate'},
    {src:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',label:'Weddings'},
    {src:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop',label:'Concerts'},
    {src:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',label:'Celebrations'},
    {src:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',label:'Ghazal Nights'},
    {src:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',label:'Literary'},
  ]
  return(
    <section id="about" className="bg-[#FFF8F0] py-24 relative overflow-hidden">
      {/* Decorative Rajasthani arch top border */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#C1121F]"/>
      <div className="absolute top-3 left-0 right-0 flex justify-center overflow-hidden h-8">
        <svg viewBox="0 0 1440 32" className="w-full" preserveAspectRatio="none">
          {Array.from({length:36}).map((_,i)=>(
            <ellipse key={i} cx={i*40+20} cy="0" rx="16" ry="20" fill="#C1121F"/>
          ))}
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-8">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-14">
          <div>
            <span className="inline-block px-3 py-1 bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-4">Who We Are</span>
            <h2 className="font-display text-[#1A0A00] text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Creating Events<br/>That <span className="text-[#C1121F]">Inspire</span>
            </h2>
          </div>
          <div>
            <p className="text-[#1A0A00]/50 text-sm leading-relaxed">
              Geet Solutions is Rajasthan&apos;s premium event management company. From royal weddings to government ceremonies, musical nights to corporate meets — we craft each moment with passion and precision.
            </p>
          </div>
        </div>

        {/* Horizontal scroll - small peek photos */}
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{width:'max-content'}}>
            {imgs.map((img,i)=>(
              <div key={i} className="relative flex-shrink-0 overflow-hidden group" style={{width:'220px',height:'300px'}}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/70 to-transparent"/>
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#FF6B35] text-[9px] tracking-[0.3em] uppercase font-bold">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-14 border border-[#FF6B35]/20 divide-x divide-y md:divide-y-0 divide-[#FF6B35]/20">
          {[['500+','Events'],['10+','Years'],['50+','Artists'],['100%','Happy Clients']].map(([n,l],i)=>(
            <div key={i} className="py-8 px-6 text-center bg-white hover:bg-[#FF6B35] group transition-colors duration-300">
              <div className="font-display text-[#C1121F] group-hover:text-white text-3xl font-extrabold mb-1 transition-colors">{n}</div>
              <div className="text-[#1A0A00]/40 group-hover:text-white/70 text-[10px] tracking-widest uppercase transition-colors">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom arch border */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#C1121F] mt-2"/>
    </section>
  )
}