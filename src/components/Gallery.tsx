'use client'
import {useEffect,useState} from 'react'
import {X} from 'lucide-react'
import {getGallery,type GalleryItem} from '@/lib/supabase'
const sample:GalleryItem[]=[
  {id:'1',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',title:'Wedding',category:'Weddings',event_id:'',is_published:true,sort_order:1,created_at:''},
  {id:'2',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',title:'Corporate',category:'Corporate',event_id:'',is_published:true,sort_order:2,created_at:''},
  {id:'3',image_url:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',title:'Concert',category:'Musical',event_id:'',is_published:true,sort_order:3,created_at:''},
  {id:'4',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',title:'Ghazal',category:'Musical',event_id:'',is_published:true,sort_order:4,created_at:''},
  {id:'5',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',title:'Stage',category:'Cultural',event_id:'',is_published:true,sort_order:5,created_at:''},
  {id:'6',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800',title:'Cultural',category:'Cultural',event_id:'',is_published:true,sort_order:6,created_at:''},
  {id:'7',image_url:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=800',title:'Artists',category:'Musical',event_id:'',is_published:true,sort_order:7,created_at:''},
  {id:'8',image_url:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800',title:'Awards',category:'Corporate',event_id:'',is_published:true,sort_order:8,created_at:''},
  {id:'9',image_url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800',title:'Festival',category:'Cultural',event_id:'',is_published:true,sort_order:9,created_at:''},
  {id:'10',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',title:'Literary',category:'Literary',event_id:'',is_published:true,sort_order:10,created_at:''},
]
const cats=['All','Weddings','Corporate','Musical','Cultural','Literary']
const widths=['w-64','w-48','w-56','w-64','w-52','w-60']
export default function Gallery(){
  const [items,setItems]=useState<GalleryItem[]>([])
  const [lb,setLb]=useState<GalleryItem|null>(null)
  const [f,setF]=useState('All')
  useEffect(()=>{getGallery().then(d=>setItems(d.length?d:sample)).catch(()=>setItems(sample))},[])
  const filtered=f==='All'?items:items.filter(i=>i.category===f)
  return(
    <section id="gallery" className="bg-[#C1121F] py-24 relative overflow-hidden">
      {/* Corner lotus decorations - hardcoded SVG */}
      <div className="absolute top-5 left-5 opacity-15 pointer-events-none">
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(45 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(90 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(135 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(180 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(225 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(270 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(315 30 30)"/>
          <circle cx="30" cy="30" r="7" fill="white"/>
        </svg>
      </div>
      <div className="absolute top-5 right-5 opacity-15 pointer-events-none">
        <svg viewBox="0 0 60 60" className="w-16 h-16">
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(45 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(90 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(135 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(180 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(225 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(270 30 30)"/>
          <ellipse cx="30" cy="10" rx="5" ry="11" fill="white" transform="rotate(315 30 30)"/>
          <circle cx="30" cy="30" r="7" fill="white"/>
        </svg>
      </div>
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-3">Portfolio</span>
            <h2 className="font-display text-white text-4xl md:text-5xl font-extrabold tracking-tight">Gallery</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c=>(
              <button key={c} onClick={()=>setF(c)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-sm ${f===c?'bg-white text-[#C1121F]':'bg-white/10 text-white hover:bg-white/20'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
          <div className="flex gap-3" style={{width:'max-content'}}>
            {filtered.map((item,i)=>(
              <div key={item.id}
                className={`group relative flex-shrink-0 overflow-hidden cursor-pointer border-2 border-transparent hover:border-white transition-all duration-300 h-72 ${widths[i%6]}`}
                onClick={()=>setLb(item)}>
                <img src={item.image_url} alt={item.title||''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-[#C1121F]/0 group-hover:bg-[#C1121F]/30 transition-all duration-300"/>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 border-2 border-white flex items-center justify-center text-white text-2xl font-light">+</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {lb&&(
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={()=>setLb(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={()=>setLb(null)}><X size={28}/></button>
          <div className="max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
            <img src={lb.image_url} alt={lb.title||''} className="w-full max-h-[85vh] object-contain"/>
            {lb.title&&<p className="text-center text-white/40 mt-3 text-xs tracking-widest uppercase">{lb.title}</p>}
          </div>
        </div>
      )}
    </section>
  )
}