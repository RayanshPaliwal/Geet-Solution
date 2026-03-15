'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { getGallery, type GalleryItem } from '@/lib/supabase'

const sample: GalleryItem[] = [
  {id:'1',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',title:'Wedding',category:'Weddings',event_id:'',is_published:true,sort_order:1,created_at:''},
  {id:'2',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',title:'Corporate',category:'Corporate',event_id:'',is_published:true,sort_order:2,created_at:''},
  {id:'3',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',title:'Concert',category:'Musical',event_id:'',is_published:true,sort_order:3,created_at:''},
  {id:'4',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800',title:'Cultural',category:'Cultural',event_id:'',is_published:true,sort_order:4,created_at:''},
  {id:'5',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',title:'Stage',category:'Cultural',event_id:'',is_published:true,sort_order:5,created_at:''},
  {id:'6',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',title:'Literary',category:'Literary',event_id:'',is_published:true,sort_order:6,created_at:''},
  {id:'7',image_url:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=800',title:'Celebration',category:'Celebrations',event_id:'',is_published:true,sort_order:7,created_at:''},
  {id:'8',image_url:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',title:'Concert',category:'Musical',event_id:'',is_published:true,sort_order:8,created_at:''},
  {id:'9',image_url:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800',title:'Award',category:'Corporate',event_id:'',is_published:true,sort_order:9,created_at:''},
  {id:'10',image_url:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',title:'Conference',category:'Corporate',event_id:'',is_published:true,sort_order:10,created_at:''},
  {id:'11',image_url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800',title:'Festival',category:'Cultural',event_id:'',is_published:true,sort_order:11,created_at:''},
  {id:'12',image_url:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',title:'Party',category:'Celebrations',event_id:'',is_published:true,sort_order:12,created_at:''},
]

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [lightbox, setLightbox] = useState<GalleryItem|null>(null)
  useEffect(() => {
    getGallery().then(d => setItems(d.length ? d : sample)).catch(() => setItems(sample))
  }, [])

  return (
    <section id="gallery" className="bg-black py-20">
      <div className="text-center mb-12 px-6">
        <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Our Portfolio</p>
        <h2 className="text-white text-4xl md:text-5xl font-serif">Gallery</h2>
      </div>

      {/* Tight grid - no gaps almost */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
        {items.map((item, i) => (
          <div key={item.id}
            className={`group relative overflow-hidden cursor-pointer ${i === 0 || i === 5 || i === 10 ? 'md:col-span-2 md:row-span-2' : ''}`}
            style={{aspectRatio: (i === 0 || i === 5 || i === 10) ? '1/1' : '4/3'}}
            onClick={() => setLightbox(item)}>
            <img src={item.image_url} alt={item.title||'Gallery'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"/>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 border-2 border-yellow-400 flex items-center justify-center">
                <span className="text-yellow-400 text-2xl">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors" onClick={() => setLightbox(null)}>
            <X size={32}/>
          </button>
          <div className="max-w-5xl w-full max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.title||''} className="w-full h-full object-contain max-h-[85vh]"/>
            {lightbox.title && <p className="text-center text-white/60 mt-3 font-serif text-lg">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </section>
  )
}