'use client'
import {useEffect,useState} from 'react'
import {Calendar,MapPin,ArrowRight} from 'lucide-react'
import {getEvents,type Event} from '@/lib/supabase'
const sample:Event[]=[
  {id:'1',title:'Royal Wedding Celebration',description:'',category:'Weddings',event_date:'2024-12-15',location:'Udaipur',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',is_featured:true,is_published:true,created_at:''},
  {id:'2',title:'Corporate Annual Meet',description:'',category:'Corporate',event_date:'2024-11-20',location:'Hotel Taj',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'3',title:'Shaam-e-Ghazal',description:'',category:'Musical',event_date:'2024-10-05',location:'City Palace',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'4',title:'Government Foundation Day',description:'',category:'Government',event_date:'2024-08-15',location:'Town Hall',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'5',title:'Mushaira Night',description:'',category:'Literary',event_date:'2024-09-22',location:'Sajjangarh',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'6',title:'Open Mic Season 3',description:'',category:'Cultural',event_date:'2024-07-10',location:'Fateh Sagar',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
]
export default function Events(){
  const [events,setEvents]=useState<Event[]>([])
  useEffect(()=>{getEvents().then(d=>setEvents(d.length?d:sample)).catch(()=>setEvents(sample))},[])
  const feat=events[0]
  const rest=events.slice(1)
  return(
    <section id="events" className="bg-[#0d0d0d] py-24 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mb-12 flex items-end justify-between">
        <div>
          <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-4">Our Portfolio</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">Recent Events</h2>
        </div>
      </div>

      {/* Featured - full width */}
      {feat&&(
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mb-6">
          <div className="relative overflow-hidden group cursor-pointer" style={{height:'520px'}}>
            <img src={feat.image_url} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-10 flex items-end justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-[#C9A84C] text-black text-[9px] font-bold tracking-[0.2em] uppercase mb-4">{feat.category}</span>
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-3">{feat.title}</h3>
                <div className="flex items-center gap-5 text-white/40 text-xs">
                  {feat.event_date&&<span className="flex items-center gap-1.5"><Calendar size={11}/>{new Date(feat.event_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>}
                  {feat.location&&<span className="flex items-center gap-1.5"><MapPin size={11}/>{feat.location}</span>}
                </div>
              </div>
              <div className="hidden md:flex w-12 h-12 border border-white/20 items-center justify-center group-hover:border-[#C9A84C] group-hover:text-[#C9A84C] text-white/40 transition-all flex-shrink-0">
                <ArrowRight size={18}/>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest - horizontal scroll, small cards */}
      <div className="overflow-x-auto scrollbar-none pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-3 pb-2" style={{width:'max-content'}}>
          {rest.map((e)=>(
            <div key={e.id} className="group relative flex-shrink-0 overflow-hidden cursor-pointer" style={{width:'260px',height:'180px'}}>
              <img src={e.image_url} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-[#C9A84C] text-[9px] tracking-widest uppercase mb-1">{e.category}</p>
                <p className="text-white text-sm font-semibold leading-tight">{e.title}</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-8"/>
        </div>
      </div>
    </section>
  )
}