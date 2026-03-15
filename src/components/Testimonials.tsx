'use client'
import {useEffect,useState} from 'react'
import {Star} from 'lucide-react'
import {getTestimonials,type Testimonial} from '@/lib/supabase'
const sample:Testimonial[]=[
  {id:'1',client_name:'Rajesh Sharma',client_company:'Sharma Industries',message:'Geet Solutions ne hamara corporate event ekdum next level bana diya. Flawless execution, stunning vibes!',rating:5,is_published:true,created_at:''},
  {id:'2',client_name:'Priya & Vikram',client_company:'',message:'Our wedding was everything we dreamed of and more. Every detail was absolutely perfect. 10/10!',rating:5,is_published:true,created_at:''},
  {id:'3',client_name:'R.K. Mehta IAS',client_company:'District Collectorate',message:'Government program organized with impeccable professionalism. Highly recommend!',rating:5,is_published:true,created_at:''},
]
export default function Testimonials(){
  const [items,setItems]=useState<Testimonial[]>([])
  const [cur,setCur]=useState(0)
  useEffect(()=>{getTestimonials().then(d=>setItems(d.length?d:sample)).catch(()=>setItems(sample))},[])
  useEffect(()=>{if(items.length<=1)return;const t=setInterval(()=>setCur(p=>(p+1)%items.length),5000);return()=>clearInterval(t)},[items.length])
  return(
    <section className="bg-[#FFF8F0] py-24 relative overflow-hidden border-t-4 border-[#FF6B35]">
      {/* Rajasthani decorative border pattern top */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <svg viewBox="0 0 400 16" className="w-full max-w-lg h-4">
          {Array.from({length:20}).map((_,i)=>(
            <g key={i}>
              <diamond points={`${i*20+10},0 ${i*20+14},8 ${i*20+10},16 ${i*20+6},8`}/>
              <polygon points={`${i*20+10},2 ${i*20+13},8 ${i*20+10},14 ${i*20+7},8`} fill="#FF6B35" opacity="0.4"/>
            </g>
          ))}
        </svg>
      </div>
      {/* Big decorative quote mark */}
      <div className="absolute top-10 left-8 text-[180px] leading-none text-[#FF6B35]/8 font-serif pointer-events-none select-none">&ldquo;</div>
      <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
        <span className="inline-block px-3 py-1 bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-8">Client Love ❤️</span>
        {items.length>0&&(
          <>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_,i)=><Star key={i} size={16} className="text-[#FF6B35] fill-[#FF6B35]"/>)}
            </div>
            <p className="text-[#1A0A00] text-xl md:text-2xl font-medium leading-relaxed mb-8">
              &ldquo;{items[cur]?.message}&rdquo;
            </p>
            <div className="w-10 h-1 bg-[#FF6B35] mx-auto mb-5 rounded-full"/>
            <p className="text-[#1A0A00] font-display font-bold text-base">{items[cur]?.client_name}</p>
            {items[cur]?.client_company&&<p className="text-[#1A0A00]/40 text-[10px] tracking-[0.3em] uppercase mt-1">{items[cur].client_company}</p>}
            {items.length>1&&(
              <div className="flex justify-center gap-2 mt-8">
                {items.map((_,i)=>(
                  <button key={i} onClick={()=>setCur(i)}
                    className={`transition-all duration-300 rounded-full ${i===cur?'w-8 h-2 bg-[#FF6B35]':'w-2 h-2 bg-[#FF6B35]/25 hover:bg-[#FF6B35]/50'}`}/>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}