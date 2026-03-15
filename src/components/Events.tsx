'use client'
import {useEffect,useState} from 'react'
import {Calendar,MapPin} from 'lucide-react'
import {getEvents,type Event} from '@/lib/supabase'
const sample:Event[]=[
  {id:'1',title:'Royal Wedding Celebration',description:'',category:'Weddings',event_date:'2024-12-15',location:'City Palace',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',is_featured:true,is_published:true,created_at:''},
  {id:'2',title:'Corporate Annual Meet',description:'',category:'Corporate',event_date:'2024-11-20',location:'Hotel Taj',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'3',title:'Shaam-e-Ghazal',description:'',category:'Musical',event_date:'2024-10-05',location:'Heritage Haveli',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'4',title:'Govt Foundation Day',description:'',category:'Government',event_date:'2024-08-15',location:'Town Hall',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'5',title:'Mushaira Night',description:'',category:'Literary',event_date:'2024-09-22',location:'Sajjangarh',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'6',title:'Open Mic S3',description:'',category:'Cultural',event_date:'2024-07-10',location:'Fateh Sagar',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
]
export default function Events(){
  const [events,setEvents]=useState<Event[]>([])
  useEffect(()=>{getEvents().then(d=>setEvents(d.length?d:sample)).catch(()=>setEvents(sample))},[])
  const feat=events[0]; const rest=events.slice(1)
  return(
    <section id="events" className="bg-[#FFF8F0] py-24 relative overflow-hidden">
      {/* Top lotus border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-6">
        <svg viewBox="0 0 1440 24" className="w-full h-6" preserveAspectRatio="none">
          {Array.from({length:72}).map((_,i)=>(
            <ellipse key={i} cx={i*20+10} cy="24" rx="8" ry="12" fill="#FF6B35" opacity="0.4"/>
          ))}
        </svg>
      </div>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-3">Our Work</span>
            <h2 className="font-display text-[#1A0A00] text-4xl md:text-5xl font-extrabold tracking-tight">Recent Events</h2>
          </div>
        </div>
        {feat&&(
          <div className="relative overflow-hidden group mb-3" style={{height:'480px'}}>
            <img src={feat.image_url} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/85 via-[#1A0A00]/20 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-[#FF6B35] text-white text-[9px] font-bold tracking-[0.2em] uppercase mb-3">{feat.category}</span>
                <h3 className="text-white font-display text-2xl md:text-3xl font-bold mb-2 tracking-tight">{feat.title}</h3>
                <div className="flex items-center gap-4 text-white/50 text-xs">
                  {feat.event_date&&<span className="flex items-center gap-1"><Calendar size={11}/>{new Date(feat.event_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>}
                  {feat.location&&<span className="flex items-center gap-1"><MapPin size={11}/>{feat.location}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
          <div className="flex gap-3" style={{width:'max-content'}}>
            {rest.map(e=>(
              <div key={e.id} className="group relative flex-shrink-0 overflow-hidden" style={{width:'240px',height:'160px'}}>
                <img src={e.image_url} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/80 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-[#FF6B35] text-[9px] tracking-widest uppercase font-bold">{e.category}</p>
                  <p className="text-white text-xs font-semibold leading-tight mt-0.5">{e.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}