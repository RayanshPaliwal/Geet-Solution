import type { Metadata } from 'next'
import '../../styles/globals.css'
export const metadata: Metadata = { title: 'Admin — Geet Solutions', robots: 'noindex, nofollow' }
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-[#0a0005] min-h-screen">{children}</body></html>)
}