import clsx from 'clsx'

export { clsx }

/**
 * Framer Motion premium animation variants — ScoreVerse Design System
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -24, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -48, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 48, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = (delay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.1 },
  },
})

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const fastStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

/* Blur-only reveal (no position shift) */
export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

/* Slide in from bottom with spring */
export const springUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 22 },
  },
}
