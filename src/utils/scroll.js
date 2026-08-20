/**
 * Scrolls to a section, routing through the active Lenis instance (if smooth
 * scroll is enabled) so the cinematic momentum scroll doesn't fight the
 * browser's native smooth-scroll. Falls back to native scrollIntoView.
 */
export function scrollToSection(selector) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!el) return

  const lenis = window.__svLenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -84, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
