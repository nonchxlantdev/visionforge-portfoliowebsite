import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Sensible global defaults: transform/opacity-friendly easing, no giant
// durations that make the page feel sluggish.
gsap.defaults({ ease: 'power2.out', duration: 0.6 })

export default gsap
export { ScrollTrigger }
