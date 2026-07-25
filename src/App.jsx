import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BootScreen from './components/BootScreen'
import CardNav from './components/CardNav'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'

const NAV_ITEMS = [
  {
    label: 'Services',
    bgColor: '#10162A',
    textColor: '#E8ECF5',
    links: [
      {
        label: 'Website & App Development',
        ariaLabel: 'Website and App Development',
        href: '/#services',
      },
      { label: 'Custom Software', ariaLabel: 'Custom Software', href: '/#services' },
      { label: 'AI Solutions', ariaLabel: 'AI Solutions', href: '/#services' },
    ],
  },
  {
    label: 'About',
    bgColor: '#131B33',
    textColor: '#E8ECF5',
    links: [
      { label: 'Our Mission', ariaLabel: 'Our Mission', href: '/#about' },
      { label: 'Pricing', ariaLabel: 'Build Your Package', href: '/pricing' },
    ],
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
      { label: 'Build Your Package', ariaLabel: 'Build Your Package', href: '/pricing' },
    ],
  },
]

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BootScreen />
      <ScrollProgress />
      <CardNav
        logoAlt="Vision Forge"
        baseColor="transparent"
        menuColor="#E8ECF5"
        ease="power3.out"
        items={NAV_ITEMS}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
