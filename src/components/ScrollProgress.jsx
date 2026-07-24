import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap, { ScrollTrigger } from '../lib/gsap'

/**
 * Thin top-of-page progress bar. Driven by ScrollTrigger's own scrub
 * (no manual scroll listener/rAF loop), animating only `scaleX` — a
 * compositor-only transform.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: '0% 50%' })

    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress })
      },
    })
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent">
      <div ref={barRef} className="h-full w-full bg-yellow" />
    </div>
  )
}
