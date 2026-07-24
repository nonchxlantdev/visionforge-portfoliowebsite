import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'

/**
 * Scroll-triggered reveal wrapper. Animates only opacity + y (transform),
 * scoped to its own container so ScrollTrigger doesn't rescan the page,
 * and reverts cleanly under prefers-reduced-motion.
 *
 * - `stagger`: if true, animates direct children with a stagger instead
 *   of the wrapper as a single block.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  stagger = false,
  y = 28,
  duration = 0.6,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Snapshot to a static array — GSAP staggering a *live* HTMLCollection
      // (ref.current.children) can desync mid-animation if anything nearby
      // mutates the DOM while the tween is running.
      const targets = stagger ? Array.from(ref.current.children) : ref.current

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power2.out',
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          // Play once and self-destroy rather than reversing on scroll-up —
          // simpler, and avoids re-triggering churn on a fast/anchor-jump
          // scroll (e.g. clicking a nav link straight to this section).
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
