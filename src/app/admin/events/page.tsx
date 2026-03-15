'use client'
import { useEffect, useState, useCallback } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useAdminAuth } from '@/lib/useAdminAuth'
import { supabase, type Event } from '@/lib/supabase'
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload } from 'lucide-react'
import Image from 'next/image'
const CATS = ['Corporate Events','Government Programs','Private Celebrations','Musical Nights','Ghazal Evenings','Literary Events','Cultural Events','Open Mic']
const empty = {title:'',description:'',category:'',event_date:'',location:'',image_url:'',is_featured:false,is_published:true}
export default function AdminEvents() {
  const { loading: authLoading } = useAdminAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Event|null>(null)
  const [form, setForm] = useState(empty)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const load = useCallback(async () => {
    const {data} = await supabase.from('events').select('*').order('created_at',{ascending:false})
    setEvents(data||[]); setLoading(false)
  }, [])
  useEffect(() => { if(!authLoading) load() }, [authLoading, load])
  function openEdit(e: Event) { setEditing(e); setForm({title:e.title,description:e.description||'',category:e.category,event_date:e.event_date||'',location:e.location||'',image_url:e.image_url||'',is_featured:e.is_featured,is_published:e.is_published}); setShowForm(true) }
  async function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if(!file) return; setUploading(true)
    const fname = `event_${Date.now()}.${file.name.split('.').pop()}`
    const {error} = await supabase.storage.from('events').upload(fname, file, {upsert:true})
    if(!error) { const {data} = supabase.storage.from('events').getPublicUrl(fname); setForm(p => ({...p,image_url:data.publicUrl})); setMsg('✅ Uploaded!') }
    else setMsg('❌ Upload failed')
    setUploading(false)
  }
  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    if(editing) await supabase.from('events').update({...form,updated_at:new Date().toISOString()}).eq('id',editing.id)
    else await supabase.from('events').insert([form])
    setShowForm(false); setEditing(null); setForm(empty); setSaving(false); setMsg(''); load()
  }
  async function del(id: string) { if(!confirm('Delete?')) return; await supabase.from('events').delete().eq('id',id); load() }
  async function toggle(e: Event) { await supabase.from('events').update({is_published:!e.is_published}).eq('id',e.id); load() }
  if(authLoading) return <div className="min-h-screen bg-[#0a0005] flex items-center justify-center"><div className="text-yellow-400 animate-pulse">Loading...</div></div>
  return (
    <div className="min-h-screen bg-[#0a0005]">
      <AdminSidebar />
      <main className="md:ml-56 p-6 pt-16 md:pt-6">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="font-display text-2xl text-gold-gradient">Events</h1><p className="text-yellow-100/40 text-sm mt-1">{events.length} events total</p></div>
          <button onClick={() => {setShowForm(true);setEditing(null);setForm(empty)}} className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 text-sm transition-all"><Plus size={16}/>Add Event</button>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_,i)=><div key={i} className="h-48 bg-yellow-500/5 animate-pulse border border-yellow-500/10"/>)}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className={`glass border overflow-hidden ${event.is_published?'border-yellow-500/15':'border-red-900/30 opacity-70'}`}>
                <div className="aspect-video relative bg-red-900/20">
                  {event.image_url ? <Image src={event.image_url} alt={event.title} fill className="object-cover"/> : <div className="w-full h-full flex items-center justify-center text-4xl">🎭</div>}
                  {!event.is_published && <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-900/80 text-red-300 text-xs">Hidden</div>}
                </div>
                <div className="p-4">
                  <p className="text-xs text-yellow-500/60 mb-1 tracking-widest uppercase">{event.category}</p>
                  <h3 className="font-heading text-yellow-100/80 text-sm mb-1 line-clamp-1">{event.title}</h3>
                  {event.event_date && <p className="text-yellow-100/35 text-xs mb-3">{new Date(event.event_date).toLocaleDateString('en-IN')}</p>}
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(event)} className="flex items-center gap-1.5 px-3 py-1.5 border border-yellow-500/25 hover:border-yellow-500/50 text-yellow-400/70 hover:text-yellow-300 text-xs transition-all"><Pencil size={12}/>Edit</button>
                    <button onClick={() => toggle(event)} className="flex items-center gap-1.5 px-3 py-1.5 border border-yellow-500/15 text-yellow-100/40 hover:text-yellow-100/70 text-xs transition-all">{event.is_published?<EyeOff size={12}/>:<Eye size={12}/>}{event.is_published?'Hide':'Show'}</button>
                    <button onClick={() => del(event.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-red-900/30 hover:border-red-700/50 text-red-500/60 hover:text-red-400 text-xs transition-all ml-auto"><Trash2 size={12}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-[#0a0005]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#100008] border border-yellow-500/20 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#100008] px-6 py-4 border-b border-yellow-500/15 flex items-center justify-between z-10">
              <h2 className="font-heading text-yellow-300 text-xl">{editing ? 'Edit Event' : 'Add New Event'}</h2>
              <button onClick={() => setShowForm(false)} className="text-yellow-100/40 hover:text-yellow-100/80 p-1"><X size={20}/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              {form.image_url && <div className="relative h-40 border border-yellow-500/20 overflow-hidden"><Image src={form.image_url} alt="Preview" fill className="object-cover"/><button type="button" onClick={() => setForm(p=>({...p,image_url:''}))} className="absolute top-2 right-2 w-6 h-6 bg-red-900/80 text-red-300 flex items-center justify-center text-xs"><X size={12}/></button></div>}
              <label className="flex items-center gap-2 cursor-pointer px-4 py-3 border border-dashed border-yellow-500/25 hover:border-yellow-500/50 text-yellow-100/40 hover:text-yellow-100/70 transition-all text-sm">
                <Upload size={16}/>{uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleImgUpload} className="hidden" disabled={uploading}/>
              </label>
              {msg && <p className="text-sm text-yellow-300">{msg}</p>}
              <input type="url" value={form.image_url} onChange={e => setForm(p=>({...p,image_url:e.target.value}))} placeholder="Or paste image URL" className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/70 px-4 py-2 text-sm outline-none placeholder:text-yellow-100/20"/>
              <input required value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} placeholder="Event Title *" className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/80 px-4 py-3 text-sm outline-none placeholder:text-yellow-100/20"/>
              <div className="grid sm:grid-cols-2 gap-4">
                <select required value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value}))} className="bg-red-900/40 border border-yellow-500/15 text-yellow-100/80 px-4 py-3 text-sm outline-none appearance-none">
                  <option value="" className="bg-[#1a0a00]">Select Category</option>
                  {CATS.map(c=><option key={c} value={c} className="bg-[#1a0a00]">{c}</option>)}
                </select>
                <input type="date" value={form.event_date} onChange={e => setForm(p=>({...p,event_date:e.target.value}))} className="bg-red-900/20 border border-yellow-500/15 text-yellow-100/80 px-4 py-3 text-sm outline-none"/>
              </div>
              <input value={form.location} onChange={e => setForm(p=>({...p,location:e.target.value}))} placeholder="Location" className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/80 px-4 py-3 text-sm outline-none placeholder:text-yellow-100/20"/>
              <textarea value={form.description} onChange={e => setForm(p=>({...p,description:e.target.value}))} placeholder="Description" rows={3} className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/80 px-4 py-3 text-sm outline-none resize-none placeholder:text-yellow-100/20"/>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer" onClick={() => setForm(p=>({...p,is_published:!p.is_published}))}>
                  <div className={`w-10 h-5 rounded-full relative ${form.is_published?'bg-red-800':'bg-gray-800'}`}><div className={`absolute top-0.5 w-4 h-4 bg-yellow-400 rounded-full transition-all ${form.is_published?'left-5':'left-0.5'}`}/></div>
                  <span className="text-sm text-yellow-100/60">Published</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer" onClick={() => setForm(p=>({...p,is_featured:!p.is_featured}))}>
                  <div className={`w-10 h-5 rounded-full relative ${form.is_featured?'bg-red-800':'bg-gray-800'}`}><div className={`absolute top-0.5 w-4 h-4 bg-yellow-400 rounded-full transition-all ${form.is_featured?'left-5':'left-0.5'}`}/></div>
                  <span className="text-sm text-yellow-100/60">Featured</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-3 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm disabled:opacity-50">{saving?'Saving...':editing?'Update Event':'Create Event'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-yellow-500/15 text-yellow-100/50 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}