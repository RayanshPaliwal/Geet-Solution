'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'
import { getGallery, type GalleryItem } from '@/lib/supabase'
const sample: GalleryItem[] = [
  {id:'1',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',title:'Royal Wedding',category:'Weddings',event_id:'',is_published:true,sort_order:1,created_at:''},
  {id:'2',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',title:'Corporate Meet',category:'Corporate',event_id:'',is_published:true,sort_order:2,created_at:''},
  {id:'3',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',title:'Musical Night',category:'Musical',event_id:'',is_published:true,sort_order:3,created_at:''},
  {id:'4',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',title:'Cultural Show',category:'Cultural',event_id:'',is_published:true,sort_order:4,created_at:''},
  {id:'5',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',title:'Grand Stage',category:'Cultural',event_id:'',is_published:true,sort_order:5,created_at:''},
  {id:'6',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',title:'Literary Event',category:'Literary',event_id:'',is_published:true,sort_order:6,created_at:''},
  {id:'7',image_url:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=600',title:'Celebration',category:'Celebrations',event_id:'',is_published:true,sort_order:7,created_at:''},
  {id:'8',image_url:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600',title:'Award Night',category:'Corporate',event_id:'',is_published:true,sort_order:8,created_at:''},
  {id:'9',image_url:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',title:'Concert',category:'Musical',event_id:'',is_published:true,sort_order:9,created_at:''},
]
const filters = ['All','Weddings','Corporate','Musical','Cultural','Celebrations']
export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [lightbox, setLightbox] = useState<GalleryItem|null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  useEffect(() => {
    getGallery().then(d => setGallery(d.length ? d : sample)).catch(() => setGallery(sample))
  }, [])
  const filtered = activeFilter === 'All' ? gallery : gallery.filter(g => g.category === activeFilter)
  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0005] to-red-950/10 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-hindi text-yellow-400/60 text-base mb-2">हमारी झलकियां</p>
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">Gallery</h2>
          <div className="ornament-divider max-w-xs mx-auto"><span className="text-yellow-400 px-4 font-serif italic text-yellow-100/50">Moments Captured</span></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${activeFilter===f ? 'bg-red-900 border-yellow-500/60 text-yellow-300' : 'border-yellow-500/20 text-yellow-100/50 hover:border-yellow-500/40'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item,i) => (
            <div key={item.id} className="break-inside-avoid group relative overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition-all cursor-pointer" onClick={() => setLightbox(item)}>
              <div className={`relative overflow-hidden ${i%3===0?'aspect-square':i%3===1?'aspect-[3/4]':'aspect-[4/3]'}`}>
                <Image src={item.image_url} alt={item.title||'Gallery'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0a0005]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center">
                    <ZoomIn size={18} className="text-yellow-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#0a0005]/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-yellow-400 p-2" onClick={() => setLightbox(null)}><X size={28}/></button>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video border border-yellow-500/20">
              <Image src={lightbox.image_url} alt={lightbox.title||'Gallery'} fill className="object-contain" />
            </div>
            {lightbox.title && <p className="text-center mt-3 font-heading text-yellow-300 text-lg">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </section>
  )
}