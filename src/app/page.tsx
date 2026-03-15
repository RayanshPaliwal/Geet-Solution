import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Events from '@/components/Events'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Events />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}