'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { getEvents, type Event } from '@/lib/supabase'

const sampleEvents: Event[] = [
  {id:'1',title:'Royal Wedding Celebration',description:'A grand Rajasthani wedding.',category:'Private Celebrations',event_date:'2024-12-15',location:'Udaipur, Rajasthan',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',is_featured:true,is_published:true,created_at:''},
  {id:'2',title:'Corporate Annual Meet 2024',description:'Annual conference for 500+ employees.',category:'Corporate Events',event_date:'2024-11-20',location:'Hotel Taj, Udaipur',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',is_featured:true,is_published:true,created_at:''},
  {id:'3',title:'Shaam-e-Ghazal Evening',description:'Magical Ghazal performances.',category:'Musical Nights',event_date:'2024-10-05',location:'City Palace Ground, Udaipur',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',is_featured:false,is_published:true,created_at:''},
  {id:'4',title:'Government Foundation Day',description:'Official government program.',category:'Government Programs',event_date:'2024-08-15',location:'Town Hall, Udaipur',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',is_featured:false,is_published:true,created_at:''},
  {id:'5',title:'Mushaira Night',description:'Literary event with renowned poets.',category:'Literary Events',event_date:'2024-09-22',location:'Sajjangarh, Udaipur',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',is_featured:false,is_published:true,created_at:''},
  {id:'6',title:'Open Mic Season 3',description:'Creative platform for local talent.',category:'Cultural Events',event_date:'2024-07-10',location:'Fateh Sagar, Udaipur',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',is_featured:false,is_published:true,created_at:''},
]
const cats = ['All','Corporate Events','Government Programs','Private Celebrations','Musical Nights','Literary Events']
export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  useEffect(() => {
    getEvents().then(d => setEvents(d.length ? d : sampleEvents)).catch(() => setEvents(sampleEvents)).finally(() => setLoading(false))
  }, [])
  const filtered = active === 'All' ? events : events.filter(e => e.category === active)
  return (
    <section id="events" className="py-20 md:py-28 bg-[#0a0005] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">हमारे आयोजन</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">Our Events</h2>
          <div className="ornament-divider max-w-xs mx-auto"><span className="text-yellow-400 px-4 font-serif italic text-yellow-100/50">Past & Upcoming</span></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${active===cat ? 'bg-red-900 border-yellow-500/60 text-yellow-300' : 'border-yellow-500/20 text-yellow-100/50 hover:border-yellow-500/40'}`}>
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => <div key={i} className="aspect-video bg-yellow-500/5 animate-pulse border border-yellow-500/10" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div key={event.id} className="group relative overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition-all hover:-translate-y-1">
                <div className="aspect-video relative bg-red-900/20">
                  <Image src={event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600'} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 text-xs bg-red-900/70 border border-red-700/50 text-yellow-300/80 rounded-sm">{event.category}</div>
                  {event.is_featured && <div className="absolute top-3 right-3 px-2 py-1 text-xs bg-yellow-600/80 text-black font-bold rounded-sm">Featured</div>}
                </div>
                <div className="p-5 bg-gradient-to-b from-[#100008] to-[#0a0005]">
                  <h3 className="font-heading text-lg text-yellow-100/90 mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2">{event.title}</h3>
                  <div className="space-y-1.5 mb-3">
                    {event.event_date && <div className="flex items-center gap-2 text-yellow-100/40 text-xs"><Calendar size={12} className="text-yellow-500/60" />{new Date(event.event_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>}
                    {event.location && <div className="flex items-center gap-2 text-yellow-100/40 text-xs"><MapPin size={12} className="text-yellow-500/60" />{event.location}</div>}
                  </div>
                  {event.description && <p className="text-yellow-100/45 text-xs leading-relaxed line-clamp-2">{event.description}</p>}
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}