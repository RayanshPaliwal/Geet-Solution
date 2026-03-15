'use client'
import {useEffect,useState,useCallback} from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import {useAdminAuth} from '@/lib/useAdminAuth'
import {supabase,type Inquiry} from '@/lib/supabase'
import {Phone,Mail,Calendar,CheckCheck,Eye,Users,Clock,PhoneCall} from 'lucide-react'

export default function AdminInquiries(){
  const {loading:authLoading}=useAdminAuth()
  const [leads,setLeads]=useState<Inquiry[]>([])
  const [loading,setLoading]=useState(true)
  const [selected,setSelected]=useState<Inquiry|null>(null)
  const [filter,setFilter]=useState<'all'|'unread'|'read'>('all')

  const load=useCallback(async()=>{
    const {data}=await supabase.from('inquiries').select('*').order('created_at',{ascending:false})
    setLeads(data||[])
    setLoading(false)
  },[])

  useEffect(()=>{if(!authLoading)load()},[authLoading,load])

  async function markRead(id:string){
    await supabase.from('inquiries').update({is_read:true}).eq('id',id)
    setLeads(p=>p.map(i=>i.id===id?{...i,is_read:true}:i))
    setSelected(p=>p?.id===id?{...p,is_read:true}:p)
  }

  function open(lead:Inquiry){
    setSelected(lead)
    if(!lead.is_read)markRead(lead.id)
  }

  const filtered=filter==='unread'?leads.filter(i=>!i.is_read):filter==='read'?leads.filter(i=>i.is_read):leads
  const unread=leads.filter(i=>!i.is_read).length
  const total=leads.length

  if(authLoading)return(
    <div className="min-h-screen bg-[#0a0005] flex items-center justify-center">
      <div className="text-[#FF6B35] animate-pulse font-display text-lg">Loading...</div>
    </div>
  )

  return(
    <div className="min-h-screen bg-[#FFF8F0]">
      <AdminSidebar/>
      <main className="md:ml-56 p-6 pt-16 md:pt-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-[#1A0A00]">Leads</h1>
          <p className="text-[#1A0A00]/50 text-sm mt-1">Customer enquiries from the website</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-[#FF6B35]/20 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-[#C1121F]"/>
              <span className="text-[#1A0A00]/50 text-xs uppercase tracking-wider">Total Leads</span>
            </div>
            <div className="text-2xl font-bold font-display text-[#C1121F]">{total}</div>
          </div>
          <div className="bg-[#FF6B35] border border-[#FF6B35] p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-white"/>
              <span className="text-white/70 text-xs uppercase tracking-wider">New / Unread</span>
            </div>
            <div className="text-2xl font-bold font-display text-white">{unread}</div>
          </div>
          <div className="bg-white border border-[#FF6B35]/20 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-1">
              <CheckCheck size={16} className="text-[#C1121F]"/>
              <span className="text-[#1A0A00]/50 text-xs uppercase tracking-wider">Contacted</span>
            </div>
            <div className="text-2xl font-bold font-display text-[#C1121F]">{total-unread}</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {([['all','All'],['unread','New'],['read','Contacted']] as const).map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all rounded-sm ${filter===v?'bg-[#C1121F] text-white':'bg-white border border-[#C1121F]/20 text-[#1A0A00]/50 hover:border-[#C1121F]/50'}`}>
              {l} {v==='unread'&&unread>0&&`(${unread})`}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Leads list */}
          <div className="lg:col-span-2 space-y-2 max-h-[65vh] overflow-y-auto">
            {loading?(
              [...Array(4)].map((_,i)=>(
                <div key={i} className="h-20 bg-white animate-pulse rounded-sm border border-[#FF6B35]/10"/>
              ))
            ):filtered.length===0?(
              <div className="text-center py-16 border-2 border-dashed border-[#FF6B35]/20 rounded-sm">
                <div className="text-4xl mb-2">📬</div>
                <p className="text-[#1A0A00]/40 text-sm">No leads yet</p>
              </div>
            ):filtered.map(lead=>(
              <div key={lead.id} onClick={()=>open(lead)}
                className={`bg-white border-l-4 p-4 cursor-pointer transition-all hover:shadow-md rounded-sm ${selected?.id===lead.id?'border-l-[#C1121F] shadow-md':'border-l-transparent hover:border-l-[#FF6B35]'} ${!lead.is_read?'ring-1 ring-[#FF6B35]/30':''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!lead.is_read&&<div className="w-2 h-2 bg-[#FF6B35] rounded-full flex-shrink-0 animate-pulse"/>}
                      <p className={`font-bold text-sm truncate ${!lead.is_read?'text-[#1A0A00]':'text-[#1A0A00]/60'}`}>{lead.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Phone size={11} className="text-[#C1121F] flex-shrink-0"/>
                      <p className="text-[#C1121F] text-xs font-medium">{lead.phone||'—'}</p>
                    </div>
                    {lead.event_type&&<p className="text-[#1A0A00]/40 text-[10px] mt-0.5 tracking-wider uppercase">{lead.event_type}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="text-[#1A0A00]/30 text-[10px]">
                      {new Date(lead.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}
                    </p>
                    {!lead.is_read?(
                      <span className="px-2 py-0.5 bg-[#FF6B35] text-white text-[9px] font-bold uppercase rounded-full">New</span>
                    ):(
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase rounded-full">Seen</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lead Detail */}
          <div className="lg:col-span-3">
            {selected?(
              <div className="bg-white border border-[#FF6B35]/20 p-6 rounded-sm h-full">
                {/* Lead header */}
                <div className="flex items-start justify-between mb-5 pb-5 border-b border-[#FF6B35]/15">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1A0A00]">{selected.name}</h3>
                    {selected.event_type&&(
                      <span className="inline-block mt-1 px-3 py-0.5 bg-[#C1121F] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                        {selected.event_type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selected.is_read?(
                      <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <CheckCheck size={14}/>Seen
                      </span>
                    ):(
                      <button onClick={()=>markRead(selected.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-[#FF6B35]/40 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white text-xs font-bold transition-all rounded-sm">
                        <Eye size={12}/>Mark Read
                      </button>
                    )}
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-3 mb-5">
                  {/* Phone - primary, bold */}
                  <div className="flex items-center gap-3 p-3 bg-[#C1121F]/5 border border-[#C1121F]/15 rounded-sm">
                    <div className="w-9 h-9 bg-[#C1121F] flex items-center justify-center flex-shrink-0 rounded-sm">
                      <Phone size={15} className="text-white"/>
                    </div>
                    <div>
                      <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-0.5">Mobile Number</p>
                      <a href={`tel:${selected.phone}`} className="text-[#C1121F] font-bold text-base hover:underline">
                        {selected.phone||'—'}
                      </a>
                    </div>
                  </div>

                  {selected.email&&(
                    <div className="flex items-center gap-3 p-3 bg-[#1A0A00]/3 border border-[#1A0A00]/10 rounded-sm">
                      <div className="w-9 h-9 bg-[#1A0A00]/10 flex items-center justify-center flex-shrink-0 rounded-sm">
                        <Mail size={15} className="text-[#1A0A00]/60"/>
                      </div>
                      <div>
                        <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-0.5">Email</p>
                        <a href={`mailto:${selected.email}`} className="text-[#1A0A00]/70 text-sm hover:text-[#C1121F] transition-colors">
                          {selected.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-[#FF6B35]/60 flex-shrink-0"/>
                    <span className="text-[#1A0A00]/40 text-xs">
                      Enquired on {new Date(selected.created_at).toLocaleString('en-IN',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-[#FFF8F0] border border-[#FF6B35]/15 p-4 rounded-sm mb-5">
                  <p className="text-[#1A0A00]/40 text-[9px] tracking-widest uppercase mb-2">Message</p>
                  <p className="text-[#1A0A00]/70 text-sm leading-relaxed">{selected.message}</p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a href={`tel:${selected.phone}`}
                    className="flex items-center gap-2 px-5 py-3 bg-[#C1121F] hover:bg-[#FF6B35] text-white font-bold text-xs tracking-widest uppercase transition-all rounded-sm">
                    <PhoneCall size={14}/> Call Now
                  </a>
                  {selected.email&&(
                    <a href={`mailto:${selected.email}?subject=Re: Your Enquiry - Geet Solutions`}
                      className="flex items-center gap-2 px-5 py-3 border border-[#C1121F]/30 hover:border-[#C1121F] text-[#1A0A00]/60 hover:text-[#C1121F] font-bold text-xs tracking-widest uppercase transition-all rounded-sm">
                      <Mail size={14}/> Email
                    </a>
                  )}
                </div>
              </div>
            ):(
              <div className="bg-white border-2 border-dashed border-[#FF6B35]/20 min-h-64 flex items-center justify-center rounded-sm">
                <div className="text-center">
                  <div className="text-5xl mb-3">👆</div>
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