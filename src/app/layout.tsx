import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Geet Solutions - Premium Event Management | Udaipur, Rajasthan',
  description: 'Premium Event Management in Udaipur, Rajasthan — Weddings, Corporate Events, Musical Nights, Ghazal Evenings, Government Programs.',
  manifest: '/manifest.json',
}
export const viewport: Viewport = { themeColor: '#D4AF37', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">{children}</body>
    </html>
  )
}