import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export type Event = { id:string; title:string; description:string; category:string; event_date:string; location:string; image_url:string; is_featured:boolean; is_published:boolean; created_at:string }
export type GalleryItem = { id:string; title:string; image_url:string; category:string; event_id:string; is_published:boolean; sort_order:number; created_at:string }
export type Testimonial = { id:string; client_name:string; client_company:string; message:string; rating:number; is_published:boolean; created_at:string }
export type Inquiry = { id:string; name:string; email:string; phone:string; event_type:string; message:string; is_read:boolean; created_at:string }
export async function getEvents(featured?: boolean) {
  let q = supabase.from('events').select('*').eq('is_published',true).order('event_date',{ascending:false})
  if(featured) q = q.eq('is_featured',true)
  const {data,error} = await q; if(error) throw error; return data as Event[]
}
export async function getGallery(category?: string) {
  let q = supabase.from('gallery').select('*').eq('is_published',true).order('sort_order',{ascending:true})
  if(category) q = q.eq('category',category)
  const {data,error} = await q; if(error) throw error; return data as GalleryItem[]
}
export async function getTestimonials() {
  const {data,error} = await supabase.from('testimonials').select('*').eq('is_published',true).order('created_at',{ascending:false})
  if(error) throw error; return data as Testimonial[]
}
export async function submitInquiry(inquiry: Omit<Inquiry,'id'|'is_read'|'created_at'>) {
  const {data,error} = await supabase.from('inquiries').insert([inquiry]); if(error) throw error; return data
}