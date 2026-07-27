import { motion } from 'framer-motion'

export default function SectionTitle({ tag, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-5 ${center ? 'text-center' : 'text-start'}`}
    >
      {tag && (
        <div className={center ? 'd-flex justify-content-center mb-3' : 'mb-3'}>
          <span className="sv-tag">
            <span className="sv-tag-dot" />
            {tag}
          </span>
        </div>
      )}
      <h2
        className="sv-section-title text-white mb-3"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className={`fs-6 ${center ? 'mx-auto' : ''}`}
          style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.72, maxWidth: 600 }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
