import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import './SectionDivider.css'

/**
 * Signal Trace divider between page sections.
 * Trace/pulse animate via CSS + SVG SMIL (not GSAP/Motion).
 * Hex readout only ticks while the divider is on-screen.
 */
export default function SectionDivider({ fromLabel, toLabel, flip = false }) {
  const rootRef = useRef(null)
  const [hex, setHex] = useState('0x0000')

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setHex('0xA1B2')
      return
    }

    let timer = null
    const tick = () => {
      const v = Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0')
      setHex('0x' + v)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!timer) {
            tick()
            timer = window.setInterval(tick, 900)
          }
        } else if (timer) {
          window.clearInterval(timer)
          timer = null
        }
      },
      { rootMargin: '40px' }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (timer) window.clearInterval(timer)
    }
  }, [])

  const path = flip
    ? 'M1440,44 L1020,44 L970,17 L470,17 L420,44 L0,44'
    : 'M0,44 L420,44 L470,17 L970,17 L1020,44 L1440,44'

  return (
    <div ref={rootRef} className="section-divider" aria-hidden="true">
      <div className="sd-grid" />
      <svg className="sd-svg" viewBox="0 0 1440 88" preserveAspectRatio="none">
        <path className="sd-trace" d={path} />
        <g>
          <circle className="sd-node" cx={flip ? 970 : 470} cy="17" r="5.5" />
          <circle className="sd-node-inner" cx={flip ? 970 : 470} cy="17" r="2" />
        </g>
        <g>
          <circle className="sd-node" cx={flip ? 420 : 1020} cy="44" r="5.5" />
          <circle className="sd-node-inner" cx={flip ? 420 : 1020} cy="44" r="2" />
        </g>
        <circle className="sd-pulse" r="4">
          <animateMotion dur="3.4s" repeatCount="indefinite" path={path} />
        </circle>
      </svg>

      <Reveal as="div" className="sd-reveal" y={16}>
        <div className="sd-label sd-label-left">/{fromLabel}</div>
        <div className="sd-label sd-label-right">/{toLabel}</div>
        <div className="sd-hex">{hex}</div>
      </Reveal>
    </div>
  )
}
