'use client'
import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useAdminAuth } from '@/lib/useAdminAuth'
import { supabase } from '@/lib/supabase'
import { Calendar, Image, MessageSquare, Eye } from 'lucide-react'
import Link from 'next/link'
export default function Dashboard() {
  const { loading } = useAdminAuth()
  const [stats, setStats] = useState({events:0,gallery:0,inquiries:0,unread:0})
  useEffect(() => {
    if(loading) return
    Promise.all([
      supabase.from('events').select('id',{count:'exact',head:true}),
      supabase.from('gallery').select('id',{count:'exact',head:true}),
      supabase.from('inquiries').select('id',{count:'exact',head:true}),
      supabase.from('inquiries').select('id',{count:'exact',head:true}).eq('is_read',false),
    ]).then(([e,g,i,u]) => setStats({events:e.count||0,gallery:g.count||0,inquiries:i.count||0,unread:u.count||0}))
  }, [loading])
  if(loading) return <div className="min-h-screen bg-[#0a0005] flex items-center justify-center"><div className="text-yellow-400 animate-pulse">Loading...</div></div>
  const cards = [
    {label:'Total Events',value:stats.events,icon:Calendar,href:'/admin/events',color:'text-blue-400'},
    {label:'Gallery Photos',value:stats.gallery,icon:Image,href:'/admin/gallery',color:'text-green-400'},
    {label:'Total Inquiries',value:stats.inquiries,icon:MessageSquare,href:'/admin/inquiries',color:'text-purple-400'},
    {label:'Unread Inquiries',value:stats.unread,icon:Eye,href:'/admin/inquiries',color:'text-orange-400'},
  ]
  return (
    <div className="min-h-screen bg-[#0a0005]">
      <AdminSidebar />
      <main className="md:ml-56 p-6 pt-16 md:pt-6">
        <div className="mb-8">
          <h1 className="font-display text-2xl text-gold-gradient">Dashboard</h1>
          <p className="text-yellow-100/40 text-sm mt-1">Welcome to Geet Solutions Admin</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(({label,value,icon:Icon,href,color}) => (
            <Link key={label} href={href} className="glass border border-yellow-500/15 hover:border-yellow-500/30 p-5 transition-all group hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <Icon size={20} className={`${color} opacity-80`} />
                <span className={`font-display text-2xl ${color}`}>{value}</span>
              </div>
              <p className="text-yellow-100/45 text-xs tracking-wide">{label}</p>
            </Link>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass border border-yellow-500/15 p-6">
            <h3 className="font-heading text-yellow-300 text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[{label:'+ Add New Event',href:'/admin/events'},{label:'+ Upload Gallery Photo',href:'/admin/gallery'},{label:'📬 View Inquiries',href:'/admin/inquiries'},{label:'🌐 View Website',href:'/'}].map(({label,href}) => (
                <Link key={label} href={href} className="flex items-center px-4 py-3 border border-yellow-500/10 hover:border-yellow-500/30 text-yellow-100/60 hover:text-yellow-300 text-sm transition-all">{label}</Link>
              ))}
            </div>
          </div>
          <div className="glass border border-yellow-500/15 p-6">
            <h3 className="font-heading text-yellow-300 text-lg mb-4">Site Info</h3>
            <div className="space-y-3 text-sm">
              {[['Company','Geet Solutions'],['Location','Udaipur, Rajasthan'],['Status','🟢 Live'],['PWA','Enabled ✓']].map(([k,v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-yellow-500/10 last:border-0">
                  <span className="text-yellow-100/40">{k}</span><span className="text-yellow-100/70">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}