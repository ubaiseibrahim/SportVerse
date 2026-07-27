import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

/**
 * Reusable section title with animated tag badge and subtitle.
 * title prop supports basic HTML tags (span, br) via dangerouslySetInnerHTML.
 */
export default function SectionTitle({ tag, title, subtitle, center = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={`mb-14 ${center ? 'text-center' : 'text-left'}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue text-blue-400 text-[11px] font-semibold uppercase tracking-[0.12em] mb-5 ${
            center ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {tag}
        </div>
      )}

      <h2
        className="text-section-title text-white mb-4"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle && (
        <p
          className={`text-white/58 text-base sm:text-lg leading-relaxed max-w-2xl ${
            center ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
