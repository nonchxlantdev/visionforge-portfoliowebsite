import { useLayoutEffect, useRef, useState } from 'react'
import gsap from '../lib/gsap'
import { GoArrowUpRight } from 'react-icons/go'
import { Wordmark } from './Logo'
import './CardNav.css'

const NAV_TOP = 56

const CardNav = ({
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef(null)
  const cardsRef = useRef([])
  const tlRef = useRef(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 280

    const contentEl = navEl.querySelector('.card-nav-content')
    if (!contentEl) return NAV_TOP + 220

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const wasVisible = contentEl.style.visibility
    const wasPointerEvents = contentEl.style.pointerEvents
    const wasPosition = contentEl.style.position
    const wasHeight = contentEl.style.height
    const wasOverflow = contentEl.style.overflow

    // Temporarily unwrap absolute layout so scrollHeight reflects real content.
    contentEl.style.visibility = 'visible'
    contentEl.style.pointerEvents = 'auto'
    contentEl.style.position = 'static'
    contentEl.style.height = 'auto'
    contentEl.style.overflow = 'visible'

    const cards = Array.from(contentEl.querySelectorAll('.nav-card'))
    const cardHeightResets = cards.map((card) => {
      const prev = card.style.height
      card.style.height = 'auto'
      return prev
    })

    void contentEl.offsetHeight

    const topBar = NAV_TOP
    const contentPad = 16 // matches .card-nav-content padding (0.5rem * 2)
    let measured

    if (isMobile) {
      measured = topBar + contentEl.scrollHeight + contentPad
    } else {
      // Horizontal cards: size to the tallest card (Services has 3 links).
      const tallest = cards.reduce((max, card) => Math.max(max, card.scrollHeight), 0)
      measured = topBar + tallest + contentPad
    }

    cards.forEach((card, i) => {
      card.style.height = cardHeightResets[i]
    })
    contentEl.style.visibility = wasVisible
    contentEl.style.pointerEvents = wasPointerEvents
    contentEl.style.position = wasPosition
    contentEl.style.height = wasHeight
    contentEl.style.overflow = wasOverflow

    // Small buffer so the last link never kisses/clips the border (iPad Safari).
    return measured + 8
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: NAV_TOP, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    })

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1')

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })

        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          tlRef.current = newTl
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      collapseMenu()
    }
  }

  const collapseMenu = () => {
    const tl = tlRef.current
    if (!tl || !isExpanded) return
    setIsHamburgerOpen(false)
    tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
    tl.reverse()
  }

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el
  }

  // Let CSS own the frosted background when baseColor is transparent
  const navStyle =
    baseColor && baseColor !== 'transparent' ? { backgroundColor: baseColor } : undefined

  return (
    <div
      className={`card-nav-container ${className}`}
      onPointerLeave={collapseMenu}
    >
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={navStyle}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleMenu()
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <a href="#home" aria-label={logoAlt}>
              <Wordmark className="card-nav-wordmark" />
            </a>
          </div>

          <a href="#contact" className="card-nav-cta-button">
            Let's Build <span className="cta-code">&lt;/&gt;</span>
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    {...(lnk.href?.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default CardNav
