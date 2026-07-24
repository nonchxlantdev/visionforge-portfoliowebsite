import BootScreen from './components/BootScreen'
import CardNav from './components/CardNav'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import ConsultationConsole from './components/ConsultationConsole'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'

const NAV_ITEMS = [
  {
    label: 'Services',
    bgColor: '#10162A',
    textColor: '#E8ECF5',
    links: [
      {
        label: 'Website & App Development',
        ariaLabel: 'Website and App Development',
        href: '#services',
      },
      { label: 'Custom Software', ariaLabel: 'Custom Software', href: '#services' },
      { label: 'AI Solutions', ariaLabel: 'AI Solutions', href: '#services' },
    ],
  },
  {
    label: 'About',
    bgColor: '#131B33',
    textColor: '#E8ECF5',
    links: [{ label: 'Our Mission', ariaLabel: 'Our Mission', href: '#about' }],
  },
  {
    label: 'Contact',
    bgColor: '#0F1526',
    textColor: '#E8ECF5',
    links: [
      {
        label: 'WhatsApp',
        ariaLabel: 'WhatsApp us',
        href: 'https://wa.me/5016157575',
      },
    ],
  },
]

export default function App() {
  return (
    <>
      <BootScreen />
      <ScrollProgress />
      <CardNav
        logoAlt="Vision Forge"
        baseColor="transparent"
        menuColor="#E8ECF5"
        ease="power3.out"
        items={NAV_ITEMS}
      />
      <main>
        <Hero />
        <SectionDivider fromLabel="home" toLabel="services" />
        <Services />
        <SectionDivider fromLabel="services" toLabel="about" flip />
        <About />
        <SectionDivider fromLabel="about" toLabel="contact" />
        <ConsultationConsole />
      </main>
      <Footer />
    </>
  )
}
