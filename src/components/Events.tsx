'use client'
import { useEffect, useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { getEvents, type Event } from '@/lib/supabase'

const sampleEvents: Event[] = [
  {id:'1',title:'Royal Wedding Celebration',description:'',category:'Weddings',event_date:'2024-12-15',location:'Udaipur, Rajasthan',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',is_featured:true,is_published:true,created_at:''},
  {id:'2',title:'Corporate Annual Meet',description:'',category:'Corporate',event_date:'2024-11-20',location:'Hotel Taj, Udaipur',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',is_featured:true,is_published:true,created_at:''},
  {id:'3',title:'Shaam-e-Ghazal',description:'',category:'Musical',event_date:'2024-10-05',location:'City Palace, Udaipur',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'4',title:'Government Foundation Day',description:'',category:'Government',event_date:'2024-08-15',location:'Town Hall, Udaipur',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'5',title:'Mushaira Night',description:'',category:'Literary',event_date:'2024-09-22',location:'Sajjangarh, Udaipur',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
  {id:'6',title:'Open Mic Season 3',description:'',category:'Cultural',event_date:'2024-07-10',location:'Fateh Sagar, Udaipur',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',is_featured:false,is_published:true,created_at:''},
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    getEvents().then(d => setEvents(d.length ? d : sampleEvents)).catch(() => setEvents(sampleEvents))
  }, [])

  const featured = events.find(e => e.is_featured)
  const rest = events.filter(e => !e.is_featured).slice(0, 5)

  return (
    <section id="events" className="bg-black py-20">
      <div className="text-center mb-12 px-6">
        <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Our Work</p>
        <h2 className="text-white text-4xl md:text-5xl font-serif">Recent Events</h2>
      </div>

      <div className="px-4 max-w-7xl mx-auto">
        {/* Featured big card */}
        {featured && (
          <div className="relative overflow-hidden mb-3 group cursor-pointer" style={{height:'500px'}}>
            <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs font-bold tracking-widest uppercase mb-3">{featured.category}</span>
              <h3 className="text-white text-3xl md:text-4xl font-serif mb-2">{featured.title}</h3>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                {featured.event_date && <span className="flex items-center gap-1"><Calendar size={13}/>{new Date(featured.event_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>}
                {featured.location && <span className="flex items-center gap-1"><MapPin size={13}/>{featured.location}</span>}
              </div>
            </div>
          </div>
        )}

        {/* 5-col small grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {rest.map(event => (
            <div key={event.id} className="group relative overflow-hidden cursor-pointer" style={{height:'220px'}}>
              <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-yellow-400 text-xs tracking-wide mb-1">{event.category}</p>
                <p className="text-white text-sm font-serif line-clamp-2">{event.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}