import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import ConsultationConsole from '../components/ConsultationConsole'
import SectionDivider from '../components/SectionDivider'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [hash])

  return (
    <main>
      <Hero />
      <SectionDivider fromLabel="home" toLabel="services" />
      <Services />
      <SectionDivider fromLabel="services" toLabel="about" flip />
      <About />
      <SectionDivider fromLabel="about" toLabel="contact" />
      <ConsultationConsole />
    </main>
  )
}
