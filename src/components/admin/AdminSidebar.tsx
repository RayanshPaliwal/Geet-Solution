'use client'
import Link from 'next/link'
import {usePathname,useRouter} from 'next/navigation'
import {LayoutDashboard,Calendar,Image,Users,LogOut,Menu,X} from 'lucide-react'
import {useState} from 'react'
import {supabase} from '@/lib/supabase'

const navItems=[
  {href:'/admin/dashboard',label:'Dashboard',icon:LayoutDashboard},
  {href:'/admin/events',label:'Events',icon:Calendar},
  {href:'/admin/gallery',label:'Gallery',icon:Image},
  {href:'/admin/inquiries',label:'Leads',icon:Users},
]

export default function AdminSidebar(){
  const pathname=usePathname()
  const router=useRouter()
  const [mobileOpen,setMobileOpen]=useState(false)

  async function handleLogout(){
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const Nav=()=>(
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#FF6B35]/20 bg-[#C1121F]">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 50 50" className="w-10 h-10 flex-shrink-0">
            <rect width="50" height="50" rx="25" fill="#1A0A00"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#00E5FF"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#00E5FF" transform="rotate(45 25 25)"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#00E5FF" transform="rotate(90 25 25)"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#00E5FF" transform="rotate(135 25 25)"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#FF6B35" transform="rotate(45 25 25)"/>
            <ellipse cx="25" cy="7" rx="5" ry="11" fill="#FF6B35" transform="rotate(135 25 25)"/>
            <circle cx="25" cy="25" r="9" fill="#C1121F"/>
            <circle cx="25" cy="25" r="6" fill="#1A0A00"/>
            <text x="25" y="29" textAnchor="middle" fontSize="7" fill="#00E5FF" fontFamily="serif" fontWeight="700">G</text>
          </svg>
          <div>
            <p className="font-display text-white font-bold text-sm tracking-wide">GEET</p>
            <p className="text-white/50 tracking-[0.3em] text-[8px]">SOLUTIONS ADMIN</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 bg-[#FFF8F0]">
        {navItems.map(({href,label,icon:Icon})=>{
          const active=pathname===href
          return(
            <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-sm ${active?'bg-[#C1121F] text-white':'text-[#1A0A00]/60 hover:text-[#1A0A00] hover:bg-[#C1121F]/10'}`}>
              <Icon size={16} className={active?'text-white':'text-[#C1121F]/60'}/>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#FF6B35]/20 bg-[#FFF8F0] space-y-2">
        <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-xs text-[#1A0A00]/40 hover:text-[#C1121F] transition-colors font-medium">
          ↗ View Website
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm font-medium">
          <LogOut size={15}/>Logout
        </button>
      </div>
    </div>
  )

  return(
    <>
      <aside className="hidden md:flex w-56 bg-[#FFF8F0] border-r border-[#FF6B35]/20 fixed inset-y-0 left-0 z-40 flex-col shadow-sm">
        <Nav/>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#C1121F] px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1A0A00] rounded-full flex items-center justify-center">
            <span className="text-[#00E5FF] text-xs font-bold font-serif">G</span>
          </div>
          <span className="font-display text-white text-sm font-bold">GEET ADMIN</span>
        </div>
        <button onClick={()=>setMobileOpen(!mobileOpen)} className="text-white p-1">
          {mobileOpen?<X size={20}/>:<Menu size={20}/>}
        </button>
      </div>
      {mobileOpen&&(
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setMobileOpen(false)}/>
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-[#FFF8F0] shadow-xl"><Nav/></aside>
        </div>
      )}
    </>
  )
}