import { useEffect, useRef, lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import './Hero.css'

const Ferrofluid = lazy(() => import('./Ferrofluid'))

const FERRO_COLORS = ['#0A0E1A', '#2F6FED', '#F5B700']

const CODE_SNIPPETS = [
  'forge.render()',
  'await ship()',
  'useSignal(true)',
  'deploy({ env: "prod" })',
  'gsap.to(".hero", { y: 0 })',
  'const vision = () => {}',
  'npm run build',
  'git commit -m "ship"',
  'map(x => x * 2)',
  'fetch("/api/build")',
  'new Promise(resolve)',
  'console.log("forged")',
  'export default App',
  'useEffect(() => {}, [])',
  'tailwind.merge(cls)',
  'ScrollTrigger.create()',
  'router.push("#contact")',
  'JSON.parse(payload)',
  'async function launch()',
  'return <Vision />',
  'crypto.randomUUID()',
  'localStorage.setItem()',
  'requestAnimationFrame(tick)',
  'filter(Boolean)',
  'Object.freeze(config)',
]

const POP_COLORS = ['#F5B700', '#5B8BFF', '#7DFFA3', '#E8ECF5', '#2F6FED']
const MAX_POPS = 12

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function resolveHeroDpr() {
  if (typeof window === 'undefined') return 1
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5)
}

export default function Hero() {
  const ref = useRef(null)
  const codeLayerRef = useRef(null)
  const popCountRef = useRef(0)
  const dprRef = useRef(resolveHeroDpr())

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        gsap.set('.hero-in', { opacity: 1, y: 0 })
        return
      }
      gsap.from('.hero-in', {
        opacity: 0,
        y: 22,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power2.out',
        delay: 0.1,
      })
    },
    { scope: ref }
  )

  useEffect(() => {
    const layer = codeLayerRef.current
    return () => {
      if (layer) {
        gsap.killTweensOf(layer.querySelectorAll('.hero-code-pop'))
        layer.replaceChildren()
      }
      popCountRef.current = 0
    }
  }, [])

  function spawnCodePops(e) {
    if (e.target.closest('a, button')) return
    const layer = codeLayerRef.current
    const section = ref.current
    if (!layer || !section) return
    if (popCountRef.current >= MAX_POPS) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rect = section.getBoundingClientRect()
    const baseX = e.clientX - rect.left
    const baseY = e.clientY - rect.top
    const slots = MAX_POPS - popCountRef.current
    const count = Math.min(1 + Math.floor(Math.random() * 3), slots)

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span')
      el.className = 'hero-code-pop'
      // textContent only — never innerHTML (XSS-safe for this DOM path)
      el.textContent = pick(CODE_SNIPPETS)
      el.style.left = `${baseX + (Math.random() - 0.5) * 48}px`
      el.style.top = `${baseY + (Math.random() - 0.5) * 24}px`
      el.style.color = pick(POP_COLORS)
      layer.appendChild(el)
      popCountRef.current += 1

      const driftY = -36 - Math.random() * 28
      const rot = (Math.random() - 0.5) * 14

      const cleanup = () => {
        el.remove()
        popCountRef.current = Math.max(0, popCountRef.current - 1)
      }

      if (reduceMotion) {
        gsap.fromTo(
          el,
          { opacity: 0, xPercent: -50, yPercent: -50 },
          {
            opacity: 1,
            duration: 0.15,
            onComplete: () => {
              gsap.to(el, {
                opacity: 0,
                duration: 0.35,
                delay: 0.45,
                onComplete: cleanup,
              })
            },
          }
        )
        continue
      }

      gsap.fromTo(
        el,
        { opacity: 0, xPercent: -50, yPercent: -50, y: 10, scale: 0.82, rotate: rot },
        {
          opacity: 1,
          y: driftY,
          scale: 1,
          duration: 0.55,
          delay: i * 0.04,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              y: driftY - 18,
              duration: 0.45,
              delay: 0.2 + Math.random() * 0.25,
              ease: 'power1.in',
              onComplete: cleanup,
            })
          },
        }
      )
    }
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
      onClick={spawnCodePops}
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <Ferrofluid
            colors={FERRO_COLORS}
            backgroundColor="#0A0E1A"
            speed={0.35}
            scale={1.4}
            turbulence={0.9}
            fluidity={0.12}
            rimWidth={0.18}
            sharpness={2.8}
            shimmer={0.8}
            glow={1.4}
            flowDirection="up"
            opacity={0.65}
            mouseInteraction={true}
            mouseStrength={0.8}
            mouseRadius={0.28}
            mouseDampening={0.12}
            dpr={dprRef.current}
          />
        </Suspense>
      </div>

      <div ref={codeLayerRef} className="hero-code-layer" aria-hidden="true" />

      <div className="container-vf relative z-[1] pointer-events-none">
        <div className="max-w-2xl">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-yellow uppercase">
            Powering Your Vision
          </p>

          <h1 className="hero-in text-balance mt-6 font-display text-4xl font-semibold leading-[1.08] text-paper sm:text-5xl lg:text-[3.4rem]">
            Building digital experiences that <span className="text-blue-bright">drive results.</span>
          </h1>

          <p className="hero-in mt-6 max-w-lg text-lg leading-relaxed text-mist">
            Vision Forge designs and builds custom websites, apps, software and AI-powered
            tools that elevate your brand and grow your business, end to end.
          </p>

          <div className="hero-in mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="pointer-events-auto group inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-3.5 text-sm font-bold tracking-wide text-ink transition-all hover:bg-yellow-bright hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_var(--color-yellow)]"
            >
              Let's Build
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#services"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-blue-bright"
            >
              See Our Services
            </a>
          </div>

          <div className="hero-in mt-14 flex flex-wrap gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-widest text-mist-dim">
            <span>Smart</span>
            <span className="text-line">•</span>
            <span>Reliable</span>
            <span className="text-line">•</span>
            <span>Impactful</span>
          </div>
        </div>
      </div>
    </section>
  )
}
