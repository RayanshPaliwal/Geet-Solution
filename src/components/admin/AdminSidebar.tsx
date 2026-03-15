'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Calendar, Image, MessageSquare, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
const navItems = [
  {href:'/admin/dashboard',label:'Dashboard',icon:LayoutDashboard},
  {href:'/admin/events',label:'Events',icon:Calendar},
  {href:'/admin/gallery',label:'Gallery',icon:Image},
  {href:'/admin/inquiries',label:'Inquiries',icon:MessageSquare},
]
export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  async function handleLogout() { await supabase.auth.signOut(); router.push('/admin') }
  const Nav = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-yellow-500/15">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-900 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-serif text-lg font-bold">G</div>
          <div><p className="font-heading text-yellow-300 text-sm">Geet Solutions</p><p className="text-yellow-100/30 text-xs">Admin Panel</p></div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({href,label,icon:Icon}) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all ${active ? 'bg-red-900/80 border border-yellow-500/30 text-yellow-300' : 'text-yellow-100/50 hover:text-yellow-100/80 hover:bg-red-900/30'}`}>
              <Icon size={16} className={active ? 'text-yellow-400' : 'text-yellow-100/40'} />{label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-yellow-500/10 space-y-2">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2 text-xs text-yellow-100/40 hover:text-yellow-300 transition-colors">↗ View Website</Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-900/20 transition-all">
          <LogOut size={16}/>Logout
        </button>
      </div>
    </div>
  )
  return (
    <>
      <aside className="hidden md:flex w-56 bg-[#080004] border-r border-yellow-500/10 fixed inset-y-0 left-0 z-40 flex-col"><Nav /></aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#080004]/95 border-b border-yellow-500/15 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-900 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-serif font-bold">G</div>
          <span className="font-heading text-yellow-300 text-sm">Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-yellow-400 p-1">{mobileOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-[#080004] border-r border-yellow-500/10"><Nav /></aside>
        </div>
      )}
    </>
  )
}