'use client'
export default function About() {
  const stats = [{number:'500+',label:'Events Delivered'},{number:'10+',label:'Years Experience'},{number:'100%',label:'Client Satisfaction'},{number:'50+',label:'Artists Managed'}]
  const whyUs = [
    {icon:'💎',title:'Premium Presentation',desc:'Every event reflects luxury, elegance and refined style'},
    {icon:'🎯',title:'Flawless Execution',desc:'From planning to delivery — zero compromise on quality'},
    {icon:'🎨',title:'Creative Vision',desc:'Unique concepts crafted to tell your story beautifully'},
    {icon:'🤝',title:'Reliable Team',desc:'Experienced professionals dedicated to your success'},
  ]
  return (
    <section id="about" className="py-20 md:py-28 bg-[#0a0005] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">हमारे बारे में</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">About Us</h2>
          <div className="ornament-divider max-w-xs mx-auto"><span className="text-yellow-400 px-4 text-yellow-300/70 font-serif italic">Geet Solutions</span></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <div className="border-l-2 border-yellow-500 pl-6">
              <p className="font-heading text-2xl md:text-3xl text-yellow-100/90 italic leading-relaxed">
                &ldquo;We don&apos;t just manage events — <span className="text-orange-400">we create experiences</span> that inspire, engage, and impress.&rdquo;
              </p>
            </div>
            <p className="text-yellow-100/60 leading-relaxed text-base md:text-lg">
              Geet Solutions is a premium Event Management company in <span className="text-yellow-400">Udaipur, Rajasthan</span>. We deliver elegant, high-impact, and unforgettable experiences — from Corporate and Government programs to Private and Cultural celebrations.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 bg-red-900 border border-yellow-500/30 flex items-center justify-center text-2xl">🎭</div>
              <div>
                <p className="font-heading text-yellow-300 font-medium">Where Events Come Alive</p>
                <p className="text-yellow-100/50 text-sm">Turning Ideas into Exceptional Events</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 border-2 border-yellow-500/20" />
            <div className="absolute inset-4 border border-yellow-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
                <circle cx="200" cy="200" r="180" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
                <circle cx="200" cy="200" r="140" fill="none" stroke="#D4AF37" strokeWidth="1"/>
                <circle cx="200" cy="200" r="100" fill="none" stroke="#8B0000" strokeWidth="1.5"/>
                <circle cx="200" cy="200" r="60" fill="#1a0005"/>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle,i) => {
                  const x=200+120*Math.cos(angle*Math.PI/180); const y=200+120*Math.sin(angle*Math.PI/180)
                  return <circle key={i} cx={x} cy={y} r="8" fill="#D4AF37" opacity="0.8"/>
                })}
                <text x="200" y="195" textAnchor="middle" fontSize="20" fill="#D4AF37" fontFamily="serif">गीत</text>
                <text x="200" y="215" textAnchor="middle" fontSize="10" fill="#FF7F07" fontFamily="serif" letterSpacing="3">SOLUTIONS</text>
              </svg>
            </div>
            {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map((pos,i)=>(
              <div key={i} className={`absolute ${pos} text-yellow-500/60 text-lg`}>✦</div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s,i)=>(
            <div key={i} className="glass text-center p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
              <div className="font-display text-3xl md:text-4xl text-gold-gradient mb-2 group-hover:scale-110 transition-transform">{s.number}</div>
              <div className="text-yellow-100/55 text-sm tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-display text-3xl text-center text-gold-gradient mb-10">Why Choose Geet Solutions?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item,i)=>(
              <div key={i} className="glass p-6 border border-yellow-500/15 hover:border-yellow-500/35 transition-all group hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-heading text-lg text-yellow-300 mb-2">{item.title}</h4>
                <p className="text-yellow-100/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}