'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, Instagram, Facebook } from 'lucide-react'
import { submitInquiry } from '@/lib/supabase'

const eventTypes = ['Corporate Event','Government Program','Wedding','Musical Night','Ghazal Evening','Mushaira','Open Mic','Private Celebration','Other']

export default function Contact() {
  const [form, setForm] = useState({name:'',email:'',phone:'',event_type:'',message:''})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    try { await submitInquiry(form); setSuccess(true); setForm({name:'',email:'',phone:'',event_type:'',message:''}) }
    catch { }
    finally { setLoading(false) }
  }

  return (
    <section id="contact" className="bg-black">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Big photo */}
        <div className="relative hidden lg:block">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
            alt="Contact" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60"/>
          <div className="absolute bottom-12 left-12 right-12">
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Udaipur, Rajasthan</p>
            <h2 className="text-white text-4xl font-serif leading-tight mb-6">Let&apos;s Create<br/>Something<br/>Extraordinary</h2>
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-white/80 hover:text-yellow-400 transition-colors">
                <div className="w-10 h-10 border border-yellow-500/40 flex items-center justify-center flex-shrink-0"><Phone size={16} className="text-yellow-400"/></div>
                <span>+91 99999 99999</span>
              </a>
              <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-white/80 hover:text-yellow-400 transition-colors">
                <div className="w-10 h-10 border border-yellow-500/40 flex items-center justify-center flex-shrink-0"><Mail size={16} className="text-yellow-400"/></div>
                <span>info@geetsolutions.in</span>
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 border border-yellow-500/40 flex items-center justify-center flex-shrink-0"><MapPin size={16} className="text-yellow-400"/></div>
                <span>Udaipur, Rajasthan — 313001</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 border border-white/20 hover:border-yellow-400 flex items-center justify-center text-white/60 hover:text-yellow-400 transition-all"><Instagram size={16}/></a>
              <a href="#" className="w-10 h-10 border border-white/20 hover:border-yellow-400 flex items-center justify-center text-white/60 hover:text-yellow-400 transition-all"><Facebook size={16}/></a>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center justify-center p-8 md:p-16 bg-[#0a0005]">
          <div className="w-full max-w-md">
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
            <h2 className="text-white text-3xl font-serif mb-8">Book Your Event</h2>

            {success ? (
              <div className="text-center py-16">
                <CheckCircle size={56} className="text-yellow-400 mx-auto mb-4"/>
                <h3 className="text-white text-2xl font-serif mb-3">Message Sent!</h3>
                <p className="text-white/50 mb-6">We&apos;ll contact you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="px-8 py-3 border border-yellow-500 text-yellow-400 text-sm tracking-widest uppercase hover:bg-yellow-500 hover:text-black transition-all">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required value={form.name} onChange={e => setForm({...form,name:e.target.value})}
                    placeholder="Your Name" className="col-span-2 bg-white/5 border border-white/10 focus:border-yellow-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"/>
                  <input required type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}
                    placeholder="Phone Number" className="bg-white/5 border border-white/10 focus:border-yellow-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"/>
                  <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                    placeholder="Email" className="bg-white/5 border border-white/10 focus:border-yellow-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"/>
                </div>
                <select value={form.event_type} onChange={e => setForm({...form,event_type:e.target.value})}
                  className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none">
                  <option value="" className="bg-[#1a0a00]">Select Event Type</option>
                  {eventTypes.map(t => <option key={t} value={t} className="bg-[#1a0a00]">{t}</option>)}
                </select>
                <textarea required value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  placeholder="Tell us about your event — date, venue, guests..." rows={4}
                  className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 text-white px-4 py-3 text-sm outline-none transition-colors resize-none placeholder:text-white/30"/>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold tracking-widest uppercase text-sm transition-all disabled:opacity-50 hover:scale-[1.02]">
                  <Send size={16}/>{loading ? 'Sending...' : 'Send Inquiry'}
                </button>
                {/* Mobile contact info */}
                <div className="lg:hidden pt-6 space-y-3 border-t border-white/10">
                  <a href="tel:+919999999999" className="flex items-center gap-3 text-white/60 hover:text-yellow-400 transition-colors text-sm">
                    <Phone size={14} className="text-yellow-500"/><span>+91 99999 99999</span>
                  </a>
                  <a href="mailto:info@geetsolutions.in" className="flex items-center gap-3 text-white/60 hover:text-yellow-400 transition-colors text-sm">
                    <Mail size={14} className="text-yellow-500"/><span>info@geetsolutions.in</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}