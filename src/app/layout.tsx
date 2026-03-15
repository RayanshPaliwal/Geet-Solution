import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
export const metadata: Metadata = {
  title: 'Geet Solutions - Premium Event Management | Udaipur, Rajasthan',
  description: 'Premium Event Management & Creative Solutions in Udaipur, Rajasthan. Corporate events, weddings, cultural programs, musical nights.',
  manifest: '/manifest.json',
}
export const viewport: Viewport = { themeColor: '#8B0000', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="rajasthani-bg min-h-screen">{children}</body>
    </html>
  )
}