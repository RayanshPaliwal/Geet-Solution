'use client'
import { useEffect, useState, useCallback } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useAdminAuth } from '@/lib/useAdminAuth'
import { supabase, type Inquiry } from '@/lib/supabase'
import { Mail, Phone, Calendar, CheckCheck, Eye } from 'lucide-react'
export default function AdminInquiries() {
  const { loading: authLoading } = useAdminAuth()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inquiry|null>(null)
  const [filter, setFilter] = useState<'all'|'unread'>('all')
  const load = useCallback(async () => {
    const {data} = await supabase.from('inquiries').select('*').order('created_at',{ascending:false})
    setInquiries(data||[]); setLoading(false)
  }, [])
  useEffect(() => { if(!authLoading) load() }, [authLoading, load])
  async function markRead(id: string) {
    await supabase.from('inquiries').update({is_read:true}).eq('id',id)
    setInquiries(p => p.map(i => i.id===id ? {...i,is_read:true} : i))
    setSelected(p => p?.id===id ? {...p,is_read:true} : p)
  }
  function openInquiry(inq: Inquiry) { setSelected(inq); if(!inq.is_read) markRead(inq.id) }
  const filtered = filter==='unread' ? inquiries.filter(i => !i.is_read) : inquiries
  const unreadCount = inquiries.filter(i => !i.is_read).length
  if(authLoading) return <div className="min-h-screen bg-[#0a0005] flex items-center justify-center"><div className="text-yellow-400 animate-pulse">Loading...</div></div>
  return (
    <div className="min-h-screen bg-[#0a0005]">
      <AdminSidebar />
      <main className="md:ml-56 p-6 pt-16 md:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-gold-gradient">Inquiries</h1>
            <p className="text-yellow-100/40 text-sm mt-1">{inquiries.length} total{unreadCount > 0 && <span className="text-orange-400 ml-2">· {unreadCount} unread</span>}</p>
          </div>
          <div className="flex gap-2">
            {(['all','unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${filter===f?'bg-red-900 border-yellow-500/50 text-yellow-300':'border-yellow-500/15 text-yellow-100/40 hover:border-yellow-500/30'}`}>
                {f==='unread' ? `Unread (${unreadCount})` : 'All'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {loading ? [...Array(5)].map((_,i) => <div key={i} className="h-20 bg-yellow-500/5 animate-pulse border border-yellow-500/10"/>) :
            filtered.length === 0 ? (
              <div className="text-center py-12 border border-yellow-500/10 border-dashed"><p className="text-yellow-100/30">No inquiries yet</p></div>
            ) : filtered.map(inq => (
              <div key={inq.id} onClick={() => openInquiry(inq)}
                className={`p-4 border cursor-pointer transition-all ${selected?.id===inq.id?'border-yellow-500/40 bg-red-900/20':'border-yellow-500/10 hover:border-yellow-500/25'} ${!inq.is_read?'border-l-2 border-l-orange-500':''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!inq.is_read && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0 animate-pulse"/>}
                      <p className={`font-heading text-sm truncate ${!inq.is_read?'text-yellow-100/90':'text-yellow-100/60'}`}>{inq.name}</p>
                    </div>
                    {inq.event_type && <p className="text-xs text-yellow-500/50 mt-0.5">{inq.event_type}</p>}
                    <p className="text-xs text-yellow-100/30 mt-1 line-clamp-1">{inq.message}</p>
                  </div>
                  <p className="text-xs text-yellow-100/25 flex-shrink-0">{new Date(inq.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            {selected ? (
              <div className="glass border border-yellow-500/20 p-6 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-heading text-yellow-300 text-xl">{selected.name}</h3>
                    {selected.event_type && <span className="inline-block mt-1 px-2 py-0.5 bg-red-900/60 border border-red-700/40 text-xs text-yellow-400/70">{selected.event_type}</span>}
                  </div>
                  {selected.is_read
                    ? <span className="flex items-center gap-1 text-green-400/60 text-xs"><CheckCheck size={14}/>Read</span>
                    : <button onClick={() => markRead(selected.id)} className="flex items-center gap-1 px-3 py-1.5 border border-yellow-500/25 text-yellow-400/60 hover:text-yellow-300 text-xs transition-all"><Eye size={12}/>Mark Read</button>
                  }
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-yellow-100/60 text-sm"><Mail size={14} className="text-yellow-500/50"/><a href={`mailto:${selected.email}`} className="hover:text-yellow-300 transition-colors">{selected.email||'—'}</a></div>
                  <div className="flex items-center gap-3 text-yellow-100/60 text-sm"><Phone size={14} className="text-yellow-500/50"/><a href={`tel:${selected.phone}`} className="hover:text-yellow-300 transition-colors">{selected.phone||'—'}</a></div>
                  <div className="flex items-center gap-3 text-yellow-100/60 text-sm"><Calendar size={14} className="text-yellow-500/50"/>{new Date(selected.created_at).toLocaleString('en-IN')}</div>
                </div>
                <div className="border-t border-yellow-500/15 pt-5">
                  <p className="text-xs text-yellow-100/40 tracking-widest uppercase mb-3">Message</p>
                  <p className="text-yellow-100/70 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="flex gap-3 mt-6 pt-5 border-t border-yellow-500/10">
                  <a href={`mailto:${selected.email}?subject=Re: Your Event Inquiry - Geet Solutions`} className="flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-800 border border-yellow-500/40 text-yellow-300 text-sm transition-all"><Mail size={14}/>Reply via Email</a>
                  {selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-2 px-4 py-2 border border-yellow-500/20 hover:border-yellow-500/40 text-yellow-100/50 hover:text-yellow-300 text-sm transition-all"><Phone size={14}/>Call</a>}
                </div>
              </div>
            ) : (
              <div className="glass border border-yellow-500/10 border-dashed min-h-48 flex items-center justify-center">
                <div className="text-center"><Mail size={32} className="text-yellow-500/20 mx-auto mb-3"/><p className="text-yellow-100/25 text-sm">Select an inquiry to view details</p></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}