'use client'
export default function About() {
  return (
    <section id="about" className="bg-black">
      {/* Big 2-col photo layout */}
      <div className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden min-h-[50vh]">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
            alt="Musical Event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
          <div className="absolute bottom-8 left-8">
            <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase mb-1">Musical Nights</p>
            <p className="text-white text-2xl font-serif">Ghazal & Sufi Evenings</p>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[50vh]">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
            alt="Corporate Event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
          <div className="absolute bottom-8 left-8">
            <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase mb-1">Corporate</p>
            <p className="text-white text-2xl font-serif">Conferences & Meets</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-yellow-500 grid grid-cols-2 md:grid-cols-4">
        {[['500+','Events'],['10+','Years'],['50+','Artists'],'100% Satisfaction'.split(' ').slice(0,1).concat(['Satisfaction'])].map((item, i) => {
          const num = Array.isArray(item) ? item[0] : ''
          const label = Array.isArray(item) ? item[1] : ''
          const pairs = [['500+','Events'],['10+','Years'],['50+','Artists'],['100%','Satisfaction']]
          return (
            <div key={i} className="py-6 text-center border-r border-black/10 last:border-0">
              <div className="text-3xl font-bold text-black font-serif">{pairs[i][0]}</div>
              <div className="text-black/70 text-xs tracking-widest uppercase mt-1">{pairs[i][1]}</div>
            </div>
          )
        })}
      </div>

      {/* About text - minimal */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-4">About Geet Solutions</p>
        <h2 className="text-white text-4xl md:text-5xl font-serif leading-tight mb-6">
          Udaipur&apos;s Premier<br/>Event Creators
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
          From royal weddings to government ceremonies — we craft every moment with precision, elegance and passion.
        </p>
      </div>
    </section>
  )
}