import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Site-wide smooth scroll. No-ops when the user prefers reduced motion,
 * on touch devices, or if Lenis fails to init — native scroll is always the fallback.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isCoarsePointer) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })
    window.__svLenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__svLenis
    }
  }, [])

  return null
}
