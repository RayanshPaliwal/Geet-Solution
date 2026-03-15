'use client'
import {useEffect,useState} from 'react'
import {Star} from 'lucide-react'
import {getTestimonials,type Testimonial} from '@/lib/supabase'
const sample:Testimonial[]=[
  {id:'1',client_name:'Rajesh Sharma',client_company:'Sharma Industries',message:'Geet Solutions turned our corporate event into something extraordinary. Flawless execution, stunning design.',rating:5,is_published:true,created_at:''},
  {id:'2',client_name:'Priya & Vikram Mehra',client_company:'',message:'Our wedding was beyond imagination. Every single detail was perfect. We are forever grateful.',rating:5,is_published:true,created_at:''},
  {id:'3',client_name:'R.K. Mehta, IAS',client_company:'District Collectorate',message:'Organized our government program with impeccable precision and dignity. Highly professional.',rating:5,is_published:true,created_at:''},
]
export default function Testimonials(){
  const [items,setItems]=useState<Testimonial[]>([])
  const [cur,setCur]=useState(0)
  useEffect(()=>{getTestimonials().then(d=>setItems(d.length?d:sample)).catch(()=>setItems(sample))},[])
  useEffect(()=>{if(items.length<=1)return;const t=setInterval(()=>setCur(p=>(p+1)%items.length),5000);return()=>clearInterval(t)},[items.length])
  return(
    <section className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-20"/>
        <div className="absolute inset-0 bg-[#0d0d0d]/80"/>
      </div>
      <div className="relative z-10 py-28 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-10">What Clients Say</p>
          {items.length>0&&(
            <>
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_,i)=><Star key={i} size={16} className="text-[#C9A84C] fill-[#C9A84C]"/>)}
              </div>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-10 italic">
                &ldquo;{items[cur]?.message}&rdquo;
              </p>
              <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-6"/>
              <p className="text-white font-semibold tracking-wide">{items[cur]?.client_name}</p>
              {items[cur]?.client_company&&<p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">{items[cur].client_company}</p>}
              {items.length>1&&(
                <div className="flex justify-center gap-2 mt-10">
                  {items.map((_,i)=>(
                    <button key={i} onClick={()=>setCur(i)}
                      className={`transition-all duration-300 ${i===cur?'w-8 h-0.5 bg-[#C9A84C]':'w-0.5 h-0.5 rounded-full bg-white/20 hover:bg-white/50'}`}/>
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