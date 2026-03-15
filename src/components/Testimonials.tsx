'use client'
import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { getTestimonials, type Testimonial } from '@/lib/supabase'
const sample: Testimonial[] = [
  {id:'1',client_name:'Rajesh Sharma',client_company:'Sharma Industries',message:'Geet Solutions turned our corporate event into an unforgettable experience. Professional, creative, and flawless execution!',rating:5,is_published:true,created_at:''},
  {id:'2',client_name:'Priya & Vikram Mehra',client_company:'Wedding Client',message:'Our wedding was beyond our dreams. Every detail was perfect, from the Rajasthani decoration to the live music. Truly magical!',rating:5,is_published:true,created_at:''},
  {id:'3',client_name:'IAS Officer R.K. Mehta',client_company:'District Collectorate',message:'The government program was organized with impeccable precision and dignity. Highly recommend Geet Solutions.',rating:5,is_published:true,created_at:''},
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
    <section className="py-20 md:py-28 bg-gradient-to-b from-red-950/10 via-[#0a0005] to-[#0a0005] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">ग्राहकों के विचार</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">What Our Clients Say</h2>
          <div className="ornament-divider max-w-xs mx-auto"><span className="text-yellow-400 px-4 text-xl">✦</span></div>
        </div>
        {items.length > 0 && (
          <div>
            <div className="glass border border-yellow-500/20 p-8 md:p-12 text-center relative">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500/40" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500/40" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500/40" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500/40" />
              <Quote size={40} className="text-yellow-500/30 mx-auto mb-6" />
              <p className="font-heading text-xl md:text-2xl text-yellow-100/85 italic leading-relaxed mb-8">&ldquo;{items[current]?.message}&rdquo;</p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(items[current]?.rating||5)].map((_,i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="font-heading text-yellow-300 text-lg">{items[current]?.client_name}</p>
              {items[current]?.client_company && <p className="text-yellow-100/45 text-sm tracking-widest uppercase mt-1">{items[current].client_company}</p>}
            </div>
            {items.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {items.map((_,i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`transition-all rounded-full ${i===current ? 'w-6 h-2 bg-yellow-400' : 'w-2 h-2 bg-yellow-500/30'}`} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}