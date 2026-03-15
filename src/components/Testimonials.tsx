'use client'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { getTestimonials, type Testimonial } from '@/lib/supabase'

const sample: Testimonial[] = [
  {id:'1',client_name:'Rajesh Sharma',client_company:'Sharma Industries',message:'Geet Solutions turned our corporate event into an unforgettable experience. Flawless execution!',rating:5,is_published:true,created_at:''},
  {id:'2',client_name:'Priya & Vikram Mehra',client_company:'Wedding Client',message:'Our wedding was beyond our dreams. Every detail was perfect — from the decor to the live music.',rating:5,is_published:true,created_at:''},
  {id:'3',client_name:'IAS Officer R.K. Mehta',client_company:'District Collectorate',message:'The government program was organized with impeccable precision. Highly recommend Geet Solutions.',rating:5,is_published:true,created_at:''},
]

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    getTestimonials().then(d => setItems(d.length ? d : sample)).catch(() => setItems(sample))
  }, [])
  useEffect(() => {
    if(items.length <= 1) return
    const t = setInterval(() => setCurrent(p => (p+1) % items.length), 5000)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <section className="relative overflow-hidden">
      {/* Full bleed background image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
          alt="bg" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/80"/>
      </div>
      <div className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-4">Client Stories</p>
          {items.length > 0 && (
            <>
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(items[current]?.rating||5)].map((_,i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400"/>)}
              </div>
              <p className="text-white text-xl md:text-2xl font-serif italic leading-relaxed mb-8">
                &ldquo;{items[current]?.message}&rdquo;
              </p>
              <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6"/>
              <p className="text-white font-bold text-lg">{items[current]?.client_name}</p>
              <p className="text-white/50 text-sm tracking-widest uppercase mt-1">{items[current]?.client_company}</p>
              {items.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {items.map((_,i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`transition-all ${i===current ? 'w-8 h-1 bg-yellow-400' : 'w-1 h-1 rounded-full bg-white/30 hover:bg-white/60'}`}/>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}