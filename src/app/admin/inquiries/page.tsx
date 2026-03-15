'use client'
import {useEffect,useState,useCallback} from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import {useAdminAuth} from '@/lib/useAdminAuth'
import {supabase,type Inquiry} from '@/lib/supabase'
import {Phone,Mail,Calendar,CheckCheck,Eye,User,Tag} from 'lucide-react'

export default function AdminInquiries(){
  const {loading:authLoading}=useAdminAuth()
  const [inquiries,setInquiries]=useState<Inquiry[]>([])
  const [loading,setLoading]=useState(true)
  const [selected,setSelected]=useState<Inquiry|null>(null)
  const [filter,setFilter]=useState<'all'|'unread'>('all')

  const load=useCallback(async()=>{
    const {data}=await supabase.from('inquiries').select('*').order('created_at',{ascending:false})
    setInquiries(data||[]);setLoading(false)
  },[])

  useEffect(()=>{if(!authLoading)load()},[authLoading,load])

  async function markRead(id:string){
    await supabase.from('inquiries').update({is_read:true}).eq('id',id)
    setInquiries(p=>p.map(i=>i.id===id?{...i,is_read:true}:i))
    setSelected(p=>p?.id===id?{...p,is_read:true}:p)
  }

  function openLead(inq:Inquiry){
    setSelected(inq)
    if(!inq.is_read)markRead(inq.id)
  }

  const filtered=filter==='unread'?inquiries.filter(i=>!i.is_read):inquiries
  const unreadCount=inquiries.filter(i=>!i.is_read).length

  if(authLoading)return<div className="min-h-screen bg-[#0a0005] flex items-center justify-center"><div className="text-yellow-400 animate-pulse">Loading...</div></div>

  return(
    <div className="min-h-screen bg-[#FFF8F0]">
      <AdminSidebar/>
      <main className="md:ml-56 p-6 pt-16 md:pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-[#C1121F] font-bold">Leads</h1>
            <p className="text-[#1A0A00]/50 text-sm mt-1">
              {inquiries.length} total leads
              {unreadCount>0&&<span className="ml-2 px-2 py-0.5 bg-[#FF6B35] text-white text-xs rounded-full font-bold">{unreadCount} new</span>}
            </p>
          </div>
          <div className="flex gap-2">
            {(['all','unread'] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all font-bold rounded-sm ${filter===f?'bg-[#C1121F] text-white':'border border-[#C1121F]/30 text-[#C1121F]/60 hover:border-[#C1121F]'}`}>
                {f==='unread'?`New (${unreadCount})`:'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Leads list */}
          <div className="lg:col-span-2 space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {loading?(
              [...Array(5)].map((_,i)=><div key={i} className="h-24 bg-[#C1121F]/5 animate-pulse rounded-sm border border-[#C1121F]/10"/>)
            ):filtered.length===0?(
              <div className="text-center py-16 border border-[#C1121F]/10 border-dashed rounded-sm">
                <p className="text-[#1A0A00]/30 text-sm">No leads yet</p>
              </div>
            ):filtered.map(inq=>(
              <div key={inq.id} onClick={()=>openLead(inq)}
                className={`p-4 border-l-4 cursor-pointer transition-all rounded-r-sm bg-white shadow-sm hover:shadow-md
                  ${selected?.id===inq.id?'border-l-[#FF6B35] bg-orange-50':'border-l-transparent hover:border-l-[#C1121F]/40'}
                  ${!inq.is_read?'border-l-[#C1121F]':''}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {!inq.is_read&&<div className="w-2 h-2 bg-[#C1121F] rounded-full flex-shrink-0 animate-pulse"/>}
                    <p className={`font-bold text-sm truncate ${!inq.is_read?'text-[#C1121F]':'text-[#1A0A00]/70'}`}>{inq.name}</p>
                  </div>
                  <p className="text-[#1A0A00]/30 text-xs flex-shrink-0">
                    {new Date(inq.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#1A0A00]/50 text-xs mb-1">
                  <Phone size={10} className="text-[#FF6B35] flex-shrink-0"/>
                  <span className="font-medium">{inq.phone||'—'}</span>
                </div>
                {inq.event_type&&(
                  <span className="inline-block px-2 py-0.5 bg-[#FF6B35]/10 text-[#FF6B35] text-[9px] tracking-wide uppercase font-bold rounded-sm">{inq.event_type}</span>
                )}
              </div>
            ))}
          </div>

          {/* Lead detail */}
          <div className="lg:col-span-3">
            {selected?(
              <div className="bg-white border border-[#C1121F]/10 p-6 rounded-sm shadow-sm h-full">
                {/* Lead header */}
                <div className="flex items-start justify-between mb-6 pb-5 border-b border-[#FF6B35]/20">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 bg-[#C1121F] rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-white"/>
                      </div>
                      <div>
                        <h3 className="font-display text-[#C1121F] text-xl font-bold">{selected.name}</h3>
                        {selected.event_type&&(
                          <span className="inline-block px-2 py-0.5 bg-[#FF6B35] text-white text-[9px] font-bold tracking-widest uppercase rounded-sm">{selected.event_type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {selected.is_read?(
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCheck size={14}/>Read</span>
                  ):(
                    <button onClick={()=>markRead(selected.id)} className="flex items-center gap-1 px-3 py-1.5 border border-[#C1121F]/30 text-[#C1121F] hover:bg-[#C1121F] hover:text-white text-xs transition-all rounded-sm font-bold">
                      <Eye size={12}/>Mark Read
                    </button>
                  )}
                </div>

                {/* Contact details — lead card style */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 bg-[#FFF8F0] rounded-sm border border-[#FF6B35]/20">
                    <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-1 font-bold">Mobile</p>
                    <a href={`tel:${selected.phone}`} className="text-[#C1121F] font-bold text-base hover:underline flex items-center gap-1.5">
                      <Phone size={14}/>{selected.phone||'—'}
                    </a>
                  </div>
                  <div className="p-3 bg-[#FFF8F0] rounded-sm border border-[#FF6B35]/20">
                    <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-1 font-bold">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-[#1A0A00]/70 text-sm hover:text-[#C1121F] transition-colors">
                      {selected.email||'Not provided'}
                    </a>
                  </div>
                  <div className="p-3 bg-[#FFF8F0] rounded-sm border border-[#FF6B35]/20">
                    <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-1 font-bold">Event Type</p>
                    <p className="text-[#1A0A00]/70 text-sm font-medium">{selected.event_type||'Not specified'}</p>
                  </div>
                  <div className="p-3 bg-[#FFF8F0] rounded-sm border border-[#FF6B35]/20">
                    <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-1 font-bold">Received On</p>
                    <p className="text-[#1A0A00]/70 text-sm">{new Date(selected.created_at).toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="p-4 bg-[#FFF8F0] rounded-sm border border-[#FF6B35]/20 mb-5">
                  <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-2 font-bold">Message / Requirement</p>
                  <p className="text-[#1A0A00]/70 text-sm leading-relaxed">{selected.message}</p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a href={`tel:${selected.phone}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#C1121F] hover:bg-[#FF6B35] text-white font-bold text-xs tracking-[0.15em] uppercase transition-all rounded-sm">
                    <Phone size={13}/>Call Lead
                  </a>
                  {selected.email&&(
                    <a href={`mailto:${selected.email}?subject=Re: Your Event Enquiry - Geet Solutions`}
                      className="flex items-center gap-2 px-5 py-2.5 border border-[#C1121F]/30 text-[#C1121F] hover:bg-[#C1121F] hover:text-white font-bold text-xs tracking-[0.15em] uppercase transition-all rounded-sm">
                      <Mail size={13}/>Email
                    </a>
                  )}
                  <a href={`https://wa.me/91${selected.phone?.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs tracking-[0.15em] uppercase transition-all rounded-sm">
                    WhatsApp
                  </a>
                </div>
              </div>
            ):(
              <div className="bg-white border border-dashed border-[#C1121F]/20 min-h-48 rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-[#1A0A00]/30 text-sm">Select a lead to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}