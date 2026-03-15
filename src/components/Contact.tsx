'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { submitInquiry } from '@/lib/supabase'
const eventTypes = ['Corporate Event','Government Program','Wedding','Musical Night','Ghazal Evening','Mushaira','Open Mic','Private Celebration','Other']
export default function Contact() {
  const [form, setForm] = useState({name:'',email:'',phone:'',event_type:'',message:''})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try { await submitInquiry(form); setSuccess(true); setForm({name:'',email:'',phone:'',event_type:'',message:''}) }
    catch { setError('Something went wrong. Please call us directly.') }
    finally { setLoading(false) }
  }
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0a0005] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">संपर्क करें</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">Get In Touch</h2>
          <div className="ornament-divider max-w-xs mx-auto mb-4"><span className="text-yellow-400 px-4 font-serif italic text-yellow-100/50">Let&apos;s Create Together</span></div>
          <p className="text-yellow-100/55 max-w-xl mx-auto">Ready to create an unforgettable event? Tell us about your vision.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <a href="tel:+919999999999" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-red-900/50 border border-yellow-500/20 group-hover:border-yellow-500/50 flex items-center justify-center flex-shrink-0 transition-colors"><Phone size={18} className="text-yellow-400" /></div>
                <div><p className="text-xs text-yellow-100/40 tracking-widest uppercase mb-0.5">Phone / WhatsApp</p><p className="font-heading text-yellow-100/80 group-hover:text-yellow-300 transition-colors">+91 99999 99999</p></div>
              </a>
              <a href="mailto:info@geetsolutions.in" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-red-900/50 border border-yellow-500/20 group-hover:border-yellow-500/50 flex items-center justify-center flex-shrink-0 transition-colors"><Mail size={18} className="text-yellow-400" /></div>
                <div><p className="text-xs text-yellow-100/40 tracking-widest uppercase mb-0.5">Email</p><p className="font-heading text-yellow-100/80 group-hover:text-yellow-300 transition-colors">info@geetsolutions.in</p></div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-900/50 border border-yellow-500/20 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-yellow-400" /></div>
                <div><p className="text-xs text-yellow-100/40 tracking-widest uppercase mb-0.5">Location</p><p className="font-heading text-yellow-100/80">Udaipur, Rajasthan, India</p></div>
              </div>
            </div>
            <div className="p-6 border border-yellow-500/15 bg-yellow-500/3">
              <div className="text-2xl mb-3">🎭</div>
              <p className="font-heading text-yellow-100/70 italic text-base leading-relaxed">&ldquo;Where Events Come Alive — Turning Ideas into Exceptional Events&rdquo;</p>
              <p className="text-orange-400/60 text-xs tracking-widest uppercase mt-3">Elegance. Creativity. Execution.</p>
            </div>
          </div>
          <div className="lg:col-span-3">
            {success ? (
              <div className="glass border border-yellow-500/30 p-12 text-center flex flex-col items-center justify-center min-h-64">
                <CheckCircle size={48} className="text-yellow-400 mb-4" />
                <h3 className="font-display text-2xl text-gold-gradient mb-3">Inquiry Sent!</h3>
                <p className="text-yellow-100/60 mb-6">Thank you! Our team will contact you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="px-6 py-3 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm hover:bg-red-900/50 transition-all">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass border border-yellow-500/15 p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Ramesh Sharma"
                      className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors placeholder:text-yellow-100/20" />
                  </div>
                  <div>
                    <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210"
                      className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors placeholder:text-yellow-100/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="ramesh@example.com"
                    className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors placeholder:text-yellow-100/20" />
                </div>
                <div>
                  <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Event Type</label>
                  <select value={form.event_type} onChange={e => setForm({...form,event_type:e.target.value})}
                    className="w-full bg-red-900/40 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors appearance-none">
                    <option value="" className="bg-[#1a0a00]">Select Event Type</option>
                    {eventTypes.map(t => <option key={t} value={t} className="bg-[#1a0a00]">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-yellow-100/40 tracking-widest uppercase mb-2">Your Message *</label>
                  <textarea required value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us about your event..." rows={4} className="w-full bg-red-900/20 border border-yellow-500/20 focus:border-yellow-500/50 text-yellow-100/80 px-4 py-3 text-sm outline-none transition-colors placeholder:text-yellow-100/20 resize-none" />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 py-4 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm transition-all disabled:opacity-50">
                  <Send size={16} />{loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}