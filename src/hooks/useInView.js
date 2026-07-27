import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook to detect when an element enters the viewport.
 * Used to trigger scroll-reveal animations.
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) {
            observer.disconnect()
          }
        } else if (options.once === false) {
          setInView(false)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px',
      }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [options.threshold, options.rootMargin, options.once])

  return [ref, inView]
}
