'use client'
import {useEffect,useState} from 'react'
import {X} from 'lucide-react'
import {getGallery,type GalleryItem} from '@/lib/supabase'

const sample:GalleryItem[]=[
  {id:'1',image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',title:'Wedding',category:'Weddings',event_id:'',is_published:true,sort_order:1,created_at:''},
  {id:'2',image_url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',title:'Corporate',category:'Corporate',event_id:'',is_published:true,sort_order:2,created_at:''},
  {id:'3',image_url:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000',title:'Concert',category:'Musical',event_id:'',is_published:true,sort_order:3,created_at:''},
  {id:'4',image_url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',title:'Ghazal',category:'Musical',event_id:'',is_published:true,sort_order:4,created_at:''},
  {id:'5',image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',title:'Stage',category:'Cultural',event_id:'',is_published:true,sort_order:5,created_at:''},
  {id:'6',image_url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000',title:'Cultural',category:'Cultural',event_id:'',is_published:true,sort_order:6,created_at:''},
  {id:'7',image_url:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000',title:'Awards',category:'Corporate',event_id:'',is_published:true,sort_order:7,created_at:''},
  {id:'8',image_url:'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=1000',title:'Artists',category:'Musical',event_id:'',is_published:true,sort_order:8,created_at:''},
  {id:'9',image_url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000',title:'Festival',category:'Cultural',event_id:'',is_published:true,sort_order:9,created_at:''},
  {id:'10',image_url:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000',title:'Literary',category:'Literary',event_id:'',is_published:true,sort_order:10,created_at:''},
  {id:'11',image_url:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',title:'Conference',category:'Corporate',event_id:'',is_published:true,sort_order:11,created_at:''},
  {id:'12',image_url:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',title:'Party',category:'Celebrations',event_id:'',is_published:true,sort_order:12,created_at:''},
]

export default function Gallery(){
  const [items,setItems]=useState<GalleryItem[]>([])
  const [lb,setLb]=useState<GalleryItem|null>(null)
  const [filter,setFilter]=useState('All')
  useEffect(()=>{getGallery().then(d=>setItems(d.length?d:sample)).catch(()=>setItems(sample))},[])
  const cats=['All','Weddings','Corporate','Musical','Cultural','Literary','Celebrations']
  const filtered=filter==='All'?items:items.filter(i=>i.category===filter)
  return(
    <section id="gallery" className="bg-[#0d0d0d] py-24 border-t border-white/5">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mb-4">Our Portfolio</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">Gallery</h2>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {cats.map(c=>(
              <button key={c} onClick={()=>setFilter(c)}
                className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-all border ${filter===c?'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]':'border-white/10 text-white/30 hover:border-white/30 hover:text-white/60'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto scrollbar-none pl-8 md:pl-16 lg:pl-24">
        <div className="flex gap-3 pb-2" style={{width:'max-content'}}>
          {filtered.map((item,i)=>(
            <div key={item.id}
              className={`group relative flex-shrink-0 overflow-hidden cursor-pointer ${i%4===0?'w-72 h-80':i%4===1?'w-52 h-80':'w-60 h-80'}`}
              onClick={()=>setLb(item)}>
              <img src={item.image_url} alt={item.title||''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border-2 border-[#C9A84C] flex items-center justify-center">
                  <span className="text-[#C9A84C] text-xl font-light">+</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#C9A84C] text-[9px] tracking-widest uppercase">{item.category}</p>
                {item.title&&<p className="text-white text-sm font-medium mt-0.5">{item.title}</p>}
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-8"/>
        </div>
      </div>

      {/* Lightbox */}
      {lb&&(
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={()=>setLb(null)}>
          <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors" onClick={()=>setLb(null)}><X size={28}/></button>
          <div className="max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
            <img src={lb.image_url} alt={lb.title||''} className="w-full max-h-[85vh] object-contain"/>
            {lb.title&&<p className="text-center text-white/40 mt-4 text-sm tracking-widest uppercase">{lb.title}</p>}
          </div>
        </div>
      )}
    </section>
  )
}