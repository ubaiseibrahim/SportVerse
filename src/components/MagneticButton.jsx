import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Wraps any button/link with a subtle magnetic pull toward the cursor.
 * Desktop (fine pointer) only — plain passthrough everywhere else.
 */
export default function MagneticButton({ as: Component = motion.button, className = '', style, children, strength = 0.35, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const handleMouseMove = (e) => {
    if (!isFinePointer || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Component>
  )
}
