'use client'
import {useState} from 'react'
import {Phone,Mail,Send,Instagram,Youtube} from 'lucide-react'
import {submitInquiry} from '@/lib/supabase'

const types=['Corporate Event','Government Program','Wedding','Musical Night','Ghazal Evening','Mushaira','Open Mic','Private Celebration','Other']

export default function Contact(){
  const [form,setForm]=useState({name:'',phone:'',email:'',event_type:'',message:''})
  const [loading,setLoading]=useState(false)
  const [ok,setOk]=useState(false)
  const [err,setErr]=useState('')

  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(!form.phone.trim()){setErr('Mobile number is required');return}
    setLoading(true);setErr('')
    try{
      await submitInquiry(form)
      setOk(true)
      setForm({name:'',phone:'',email:'',event_type:'',message:''})
    }catch(e){
      setErr('Something went wrong. Please try calling us directly.')
    }finally{setLoading(false)}
  }

  return(
    <section id="contact" className="bg-[#1A0A00]">
      {/* Top marquee */}
      <div className="bg-[#FF6B35] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0,1].map(ri=>(
            <span key={ri} className="flex items-center gap-4 pr-4 flex-shrink-0">
              {['Book Your Event','Create Memories','Make It Happen','Hit Different'].map((txt,i)=>(
                <span key={i} className="text-white font-display font-bold text-sm tracking-[0.2em] uppercase px-4">{txt} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Left — info panel */}
        <div className="flex flex-col justify-between p-10 md:p-16 bg-[#C1121F] relative overflow-hidden">
          {/* Mandala decoration */}
          <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 animate-spin-slow pointer-events-none">
            <svg viewBox="0 0 100 100">
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
                <ellipse key={i} cx="50" cy="15" rx="5" ry="12" fill="white" transform={`rotate(${a} 50 50)`}/>
              ))}
              <circle cx="50" cy="50" r="10" fill="white"/>
            </svg>
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-6">Let&apos;s Connect</span>
            <h2 className="font-display text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              Let&apos;s Build<br/>Something<br/><span className="text-[#FF6B35]">Iconic 🔥</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
              Tell us your vision and we&apos;ll make it reality — bigger, better, unforgettable.
            </p>
          </div>
          <div className="space-y-4">
            <a href="tel:+919999999999" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-white/10 group-hover:bg-white flex items-center justify-center transition-all flex-shrink-0">
                <Phone size={14} className="text-white group-hover:text-[#C1121F] transition-colors"/>
              </div>
              <span className="text-white/70 group-hover:text-white text-sm transition-colors">+91 99999 99999</span>
            </a>
            <a href="mailto:info@geetsolutions.in" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-white/10 group-hover:bg-white flex items-center justify-center transition-all flex-shrink-0">
                <Mail size={14} className="text-white group-hover:text-[#C1121F] transition-colors"/>
              </div>
              <span className="text-white/70 group-hover:text-white text-sm transition-colors">info@geetsolutions.in</span>
            </a>
            <div className="flex gap-2 pt-2">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white flex items-center justify-center text-white hover:text-[#C1121F] transition-all"><Instagram size={14}/></a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white flex items-center justify-center text-white hover:text-[#C1121F] transition-all"><Youtube size={14}/></a>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex items-center justify-center p-10 md:p-16 bg-[#1A0A00]">
          {ok ? (
            /* Thank you message */
            <div className="text-center max-w-sm">
              <div className="w-20 h-20 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🙏</span>
              </div>
              <h3 className="font-display text-white text-2xl font-bold mb-3">
                Thank You for Your Interest!
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                We have received your enquiry. Our team shall get back to you shortly. We look forward to creating something amazing together!
              </p>
              <div className="w-12 h-1 bg-[#FF6B35] mx-auto mb-8 rounded-full"/>
              <button
                onClick={()=>setOk(false)}
                className="px-8 py-3 border border-[#FF6B35]/40 text-[#FF6B35] text-xs tracking-[0.2em] uppercase hover:bg-[#FF6B35] hover:text-white transition-all rounded-sm">
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="w-full max-w-md space-y-3">
              <p className="font-display text-white font-bold text-xl mb-5">Book Your Event 🎯</p>

              {/* Name */}
              <input
                required
                value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})}
                placeholder="Your Name *"
                className="w-full bg-white/5 border border-white/10 focus:border-[#FF6B35] text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/30 rounded-sm"/>

              {/* Mobile - MANDATORY */}
              <div className="relative">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={e=>{setForm({...form,phone:e.target.value});setErr('')}}
                  placeholder="Mobile Number * (mandatory)"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#FF6B35] text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/30 rounded-sm"/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6B35] text-xs font-bold">Required</span>
              </div>

              {/* Email - optional */}
              <input
                type="email"
                value={form.email}
                onChange={e=>setForm({...form,email:e.target.value})}
                placeholder="Email (optional)"
                className="w-full bg-white/5 border border-white/10 focus:border-[#FF6B35] text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/30 rounded-sm"/>

              {/* Event Type */}
              <select
                value={form.event_type}
                onChange={e=>setForm({...form,event_type:e.target.value})}
                className="w-full bg-white/5 border border-white/10 focus:border-[#FF6B35] text-white text-sm px-4 py-3.5 outline-none transition-colors appearance-none rounded-sm">
                <option value="" className="bg-[#1A0A00]">Event Type</option>
                {types.map(t=><option key={t} value={t} className="bg-[#1A0A00]">{t}</option>)}
              </select>

              {/* Message */}
              <textarea
                required
                value={form.message}
                onChange={e=>setForm({...form,message:e.target.value})}
                placeholder="Tell us about your event..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 focus:border-[#FF6B35] text-white text-sm px-4 py-3.5 outline-none transition-colors resize-none placeholder:text-white/30 rounded-sm"/>

              {/* Error */}
              {err && <p className="text-red-400 text-xs">{err}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF6B35] hover:bg-[#C1121F] text-white font-bold text-sm tracking-wide uppercase transition-all disabled:opacity-50 rounded-sm">
                <Send size={14}/>{loading ? 'Sending...' : 'Send Enquiry 🚀'}
              </button>

              <p className="text-white/20 text-xs text-center">* Mobile number is mandatory</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}