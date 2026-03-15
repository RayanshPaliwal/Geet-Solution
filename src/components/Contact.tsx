'use client'
import {useState} from 'react'
import {Phone,Mail,Send,CheckCircle,Instagram,Youtube} from 'lucide-react'
import {submitInquiry} from '@/lib/supabase'
const types=['Corporate Event','Government Program','Wedding','Musical Night','Ghazal Evening','Mushaira','Open Mic','Private Celebration','Other']
export default function Contact(){
  const [form,setForm]=useState({name:'',email:'',phone:'',event_type:'',message:''})
  const [loading,setLoading]=useState(false)
  const [ok,setOk]=useState(false)
  async function submit(e:React.FormEvent){
    e.preventDefault();setLoading(true)
    try{await submitInquiry(form);setOk(true);setForm({name:'',email:'',phone:'',event_type:'',message:''})}catch{}finally{setLoading(false)}
  }
  return(
    <section id="contact" className="bg-[#0d0d0d] border-t border-white/5">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left — dark info panel */}
        <div className="flex flex-col justify-between p-10 md:p-16 lg:p-20 bg-[#0a0a0a] border-r border-white/5">
          <div>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-6">Get In Touch</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
              Let&apos;s Build<br/>Something<br/><span className="text-[#C9A84C]">Unforgettable</span>
            </h2>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm">
              Tell us about your event and we&apos;ll craft an experience that exceeds every expectation.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            <a href="tel:+919999999999" className="flex items-center gap-4 group">
              <div className="w-11 h-11 border border-white/10 group-hover:border-[#C9A84C] flex items-center justify-center transition-colors flex-shrink-0">
                <Phone size={15} className="text-[#C9A84C]"/>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-0.5">Phone</p>
                <p className="text-white/70 group-hover:text-white text-sm transition-colors">+91 99999 99999</p>
              </div>
            </a>
            <a href="mailto:info@geetsolutions.in" className="flex items-center gap-4 group">
              <div className="w-11 h-11 border border-white/10 group-hover:border-[#C9A84C] flex items-center justify-center transition-colors flex-shrink-0">
                <Mail size={15} className="text-[#C9A84C]"/>
              </div>
              <div>
                <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-0.5">Email</p>
                <p className="text-white/70 group-hover:text-white text-sm transition-colors">info@geetsolutions.in</p>
              </div>
            </a>
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-9 h-9 border border-white/10 hover:border-[#C9A84C] flex items-center justify-center text-white/30 hover:text-[#C9A84C] transition-all"><Instagram size={14}/></a>
              <a href="#" className="w-9 h-9 border border-white/10 hover:border-[#C9A84C] flex items-center justify-center text-white/30 hover:text-[#C9A84C] transition-all"><Youtube size={14}/></a>
            </div>
          </div>
        </div>
        {/* Right — form */}
        <div className="flex items-center justify-center p-10 md:p-16 lg:p-20">
          {ok?(
            <div className="text-center">
              <CheckCircle size={52} className="text-[#C9A84C] mx-auto mb-5"/>
              <h3 className="text-white text-2xl font-bold mb-3">Message Sent!</h3>
              <p className="text-white/35 text-sm mb-8">We&apos;ll reach out within 24 hours.</p>
              <button onClick={()=>setOk(false)} className="px-8 py-3 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-black transition-all">Send Another</button>
            </div>
          ):(
            <form onSubmit={submit} className="w-full max-w-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name"
                  className="col-span-2 bg-white/3 border border-white/8 focus:border-[#C9A84C]/60 text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/20"/>
                <input required type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone"
                  className="bg-white/3 border border-white/8 focus:border-[#C9A84C]/60 text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/20"/>
                <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email"
                  className="bg-white/3 border border-white/8 focus:border-[#C9A84C]/60 text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-white/20"/>
              </div>
              <select value={form.event_type} onChange={e=>setForm({...form,event_type:e.target.value})}
                className="w-full bg-white/3 border border-white/8 focus:border-[#C9A84C]/60 text-white text-sm px-4 py-3.5 outline-none transition-colors appearance-none">
                <option value="" className="bg-[#0d0d0d]">Event Type</option>
                {types.map(t=><option key={t} value={t} className="bg-[#0d0d0d]">{t}</option>)}
              </select>
              <textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your vision..." rows={4}
                className="w-full bg-white/3 border border-white/8 focus:border-[#C9A84C]/60 text-white text-sm px-4 py-3.5 outline-none transition-colors resize-none placeholder:text-white/20"/>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#C9A84C] hover:bg-[#e0bc5a] text-black font-bold text-xs tracking-[0.25em] uppercase transition-all disabled:opacity-50 hover:scale-[1.01]">
                <Send size={13}/>{loading?'Sending...':'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}