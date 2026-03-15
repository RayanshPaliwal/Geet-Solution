'use client'
import { useEffect, useState, useCallback } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useAdminAuth } from '@/lib/useAdminAuth'
import { supabase, type GalleryItem } from '@/lib/supabase'
import { Plus, Trash2, Eye, EyeOff, X, Upload } from 'lucide-react'
import Image from 'next/image'
const CATS = ['Weddings','Corporate','Musical','Cultural','Government','Celebrations','Stage & Production']
export default function AdminGallery() {
  const { loading: authLoading } = useAdminAuth()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [bulkProgress, setBulkProgress] = useState(0)
  const [form, setForm] = useState({title:'',image_url:'',category:'',is_published:true})
  const [msg, setMsg] = useState('')
  const load = useCallback(async () => {
    const {data} = await supabase.from('gallery').select('*').order('sort_order',{ascending:true}).order('created_at',{ascending:false})
    setGallery(data||[]); setLoading(false)
  }, [])
  useEffect(() => { if(!authLoading) load() }, [authLoading, load])
  async function handleBulkUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files||[]); if(!files.length) return
    setUploading(true); let done = 0
    for(const file of files) {
      const fname = `gallery_${Date.now()}_${Math.random().toString(36).substr(2,5)}.${file.name.split('.').pop()}`
      const {error} = await supabase.storage.from('gallery').upload(fname, file, {upsert:true})
      if(!error) {
        const {data} = supabase.storage.from('gallery').getPublicUrl(fname)
        await supabase.from('gallery').insert([{image_url:data.publicUrl,title:file.name.split('.')[0],is_published:true}])
        done++; setBulkProgress(Math.round((done/files.length)*100))
      }
    }
    setMsg(`✅ ${done} photos uploaded!`); setUploading(false); setBulkProgress(0); load()
  }
  async function handleSingleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if(!file) return; setUploading(true)
    const fname = `gallery_${Date.now()}.${file.name.split('.').pop()}`
    const {error} = await supabase.storage.from('gallery').upload(fname, file, {upsert:true})
    if(!error) { const {data} = supabase.storage.from('gallery').getPublicUrl(fname); setForm(p=>({...p,image_url:data.publicUrl})); setMsg('✅ Uploaded!') }
    setUploading(false)
  }
  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); if(!form.image_url) { setMsg('Please upload an image'); return }
    setSaving(true)
    await supabase.from('gallery').insert([form])
    setShowForm(false); setForm({title:'',image_url:'',category:'',is_published:true}); setSaving(false); setMsg(''); load()
  }
  async function del(id: string) { if(!confirm('Delete photo?')) return; await supabase.from('gallery').delete().eq('id',id); load() }
  async function toggle(item: GalleryItem) { await supabase.from('gallery').update({is_published:!item.is_published}).eq('id',item.id); load() }
  if(authLoading) return <div className="min-h-screen bg-[#0a0005] flex items-center justify-center"><div className="text-yellow-400 animate-pulse">Loading...</div></div>
  return (
    <div className="min-h-screen bg-[#0a0005]">
      <AdminSidebar />
      <main className="md:ml-56 p-6 pt-16 md:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div><h1 className="font-display text-2xl text-gold-gradient">Gallery</h1><p className="text-yellow-100/40 text-sm mt-1">{gallery.length} photos</p></div>
          <div className="flex gap-2 flex-wrap">
            <label className={`flex items-center gap-2 px-4 py-2 border border-yellow-500/25 hover:border-yellow-500/50 text-yellow-100/50 hover:text-yellow-300 text-sm transition-all cursor-pointer ${uploading?'opacity-50 cursor-wait':''}`}>
              <Upload size={14}/>{uploading && bulkProgress > 0 ? `Uploading ${bulkProgress}%...` : 'Bulk Upload'}
              <input type="file" accept="image/*" multiple onChange={handleBulkUpload} className="hidden" disabled={uploading}/>
            </label>
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 text-sm transition-all"><Plus size={14}/>Add Photo</button>
          </div>
        </div>
        {msg && <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 text-yellow-300 text-sm">{msg}</div>}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[...Array(10)].map((_,i)=><div key={i} className="aspect-square bg-yellow-500/5 animate-pulse border border-yellow-500/10"/>)}
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-16 border border-yellow-500/10 border-dashed">
            <div className="text-4xl mb-3">📸</div>
            <p className="text-yellow-100/40 mb-4">No photos yet!</p>
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-red-900 border border-yellow-500/40 text-yellow-300 text-sm">Add First Photo</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {gallery.map(item => (
              <div key={item.id} className={`group relative border overflow-hidden ${item.is_published?'border-yellow-500/15':'border-red-900/30 opacity-60'}`}>
                <div className="aspect-square relative bg-red-900/20">
                  <Image src={item.image_url} alt={item.title||'Gallery'} fill className="object-cover"/>
                  {!item.is_published && <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center"><EyeOff size={20} className="text-red-400"/></div>}
                  <div className="absolute inset-0 bg-[#0a0005]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => toggle(item)} className="w-8 h-8 bg-red-900/80 border border-yellow-500/30 flex items-center justify-center text-yellow-300 hover:bg-red-800/80 transition-all">
                      {item.is_published?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                    <button onClick={() => del(item.id)} className="w-8 h-8 bg-red-900/80 border border-red-700/30 flex items-center justify-center text-red-300 hover:bg-red-800/80 transition-all"><Trash2 size={14}/></button>
                  </div>
                </div>
                {item.title && <div className="px-2 py-1.5 bg-[#100008]"><p className="text-xs text-yellow-100/50 truncate">{item.title}</p></div>}
              </div>
            ))}
          </div>
        )}
      </main>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-[#0a0005]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#100008] border border-yellow-500/20">
            <div className="px-6 py-4 border-b border-yellow-500/15 flex items-center justify-between">
              <h2 className="font-heading text-yellow-300 text-lg">Add Gallery Photo</h2>
              <button onClick={() => setShowForm(false)} className="text-yellow-100/40 hover:text-yellow-100/80 p-1"><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {form.image_url && <div className="relative aspect-video border border-yellow-500/20 overflow-hidden"><Image src={form.image_url} alt="Preview" fill className="object-cover"/><button type="button" onClick={() => setForm(p=>({...p,image_url:''}))} className="absolute top-2 right-2 w-6 h-6 bg-red-900/80 text-red-300 flex items-center justify-center"><X size={12}/></button></div>}
              <label className="flex items-center gap-2 cursor-pointer px-4 py-3 border border-dashed border-yellow-500/25 hover:border-yellow-500/50 text-yellow-100/40 hover:text-yellow-100/70 transition-all text-sm">
                <Upload size={16}/>{uploading?'Uploading...':'Choose Image'}
                <input type="file" accept="image/*" onChange={handleSingleUpload} className="hidden" disabled={uploading}/>
              </label>
              <input type="url" value={form.image_url} onChange={e => setForm(p=>({...p,image_url:e.target.value}))} placeholder="Or paste image URL" className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/70 px-4 py-2 text-sm outline-none placeholder:text-yellow-100/20"/>
              <input value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} placeholder="Photo title (optional)" className="w-full bg-red-900/20 border border-yellow-500/15 focus:border-yellow-500/40 text-yellow-100/80 px-4 py-3 text-sm outline-none placeholder:text-yellow-100/20"/>
              <select value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value}))} className="w-full bg-red-900/40 border border-yellow-500/15 text-yellow-100/80 px-4 py-3 text-sm outline-none appearance-none">
                <option value="" className="bg-[#1a0a00]">Select Category</option>
                {CATS.map(c=><option key={c} value={c} className="bg-[#1a0a00]">{c}</option>)}
              </select>
              {msg && <p className="text-sm text-yellow-300">{msg}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving||uploading} className="flex-1 py-3 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 tracking-widest uppercase text-sm disabled:opacity-50">{saving?'Saving...':'Add to Gallery'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-yellow-500/15 text-yellow-100/50 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}