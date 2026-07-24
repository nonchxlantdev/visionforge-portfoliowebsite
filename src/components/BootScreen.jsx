import { useEffect, useRef } from 'react'
import gsap, { ScrollTrigger } from '../lib/gsap'
import './BootScreen.css'

const MIN_MS = 720
const MAX_MS = 2400

function markReady() {
  document.documentElement.dataset.boot = 'done'
  document.body.classList.remove('is-booting')
  window.dispatchEvent(new CustomEvent('vf:boot-done'))
  // Layout was locked during boot — refresh scroll triggers once scroll is free.
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

/**
 * Owns the #vf-boot splash from index.html.
 * Waits for fonts + a short minimum, then exits with a compositor fade
 * so the first paint never flashes empty navy → content.
 */
export default function BootScreen() {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const boot = document.getElementById('vf-boot')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('is-booting')
    document.documentElement.dataset.boot = 'loading'

    const t0 = performance.now()
    let finished = false
    let maxTimer = null

    const exit = () => {
      if (finished) return
      finished = true
      if (maxTimer) window.clearTimeout(maxTimer)

      if (!boot) {
        markReady()
        return
      }

      boot.setAttribute('aria-busy', 'false')

      if (reduceMotion) {
        boot.remove()
        markReady()
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          boot.remove()
          markReady()
        },
      })

      tl.to(boot.querySelector('.vf-boot-inner'), {
        opacity: 0,
        y: -10,
        duration: 0.35,
      }).to(
        boot,
        {
          opacity: 0,
          duration: 0.45,
        },
        '-=0.12'
      )
    }

    const tryExit = () => {
      const elapsed = performance.now() - t0
      const wait = Math.max(0, MIN_MS - elapsed)
      window.setTimeout(exit, wait)
    }

    const fontsReady =
      document.fonts?.ready?.catch?.(() => {}) ?? Promise.resolve()

    // Also wait a frame after React commit so layout is settled under the curtain.
    const frameReady = new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    })

    Promise.all([fontsReady, frameReady]).then(tryExit)

    maxTimer = window.setTimeout(exit, MAX_MS)

    return () => {
      if (maxTimer) window.clearTimeout(maxTimer)
    }
  }, [])

  return null
}
