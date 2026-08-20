import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .sv-cursor-hover'

/**
 * Subtle premium custom cursor — desktop with a fine pointer only.
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export default function CinematicCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const checkEnabled = () => {
      const fine = window.matchMedia('(pointer: fine)').matches
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
      const isDesktop = window.innerWidth >= 1024
      setEnabled(fine && !reduced && !isTouch && isDesktop)
    }

    checkEnabled()
    window.addEventListener('resize', checkEnabled)
    return () => window.removeEventListener('resize', checkEnabled)
  }, [])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('sv-cursor-on')

    const dot = dotRef.current
    const ring = ringRef.current
    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2

    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      ringX += (e.clientX - ringX) * 0.18
      ringY += (e.clientY - ringY) * 0.18
    }

    let rafId
    const tick = () => {
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) ring.classList.add('is-active')
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) ring.classList.remove('is-active')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('sv-cursor-on')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="sv-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="sv-cursor-dot" aria-hidden="true" />
    </>
  )
}
