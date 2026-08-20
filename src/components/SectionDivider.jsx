import { motion } from 'framer-motion'

/**
 * Thin cinematic motif used sparingly between key story beats to
 * create visual continuity (turf floodlight line) without a hard section cut.
 */
export default function SectionDivider() {
  return (
    <div className="position-relative" style={{ height: 1 }} aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="sv-turf-divider"
      />
    </div>
  )
}
