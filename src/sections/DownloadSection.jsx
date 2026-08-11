import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { fadeLeft, fadeRight } from '../utils/animations'

export default function DownloadSection({ onDownloadClick }) {
  return (
    <section id="download" className="sv-section bg-glow-blue">
      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <div className="sv-download-wrap">
          <div className="row align-items-center g-5">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="col-lg-7"
            >
              <div className="sv-tag mb-4">
                <Smartphone size={12} />
                Available on all platforms
              </div>

              <h2 id="download-title" className="sv-section-title text-white mb-3">
                Ready to Play?{' '}
                <span className="sv-gradient-text">Download Now.</span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.74, marginBottom: '1.5rem', maxWidth: 500 }}>
                Join 50,000+ players, organizers, and turf owners already on ScoreVerse.
                Your game starts here.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-4">
                {/* Google Play */}
                <button
                  onClick={onDownloadClick}
                  className="sv-store-btn border-0"
                  aria-label="Download on Google Play"
                >
                  <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, flexShrink: 0 }} fill="none">
                    <path d="M3 20.5v-17a.5.5 0 0 1 .75-.43l16 8.5a.5.5 0 0 1 0 .86l-16 8.5A.5.5 0 0 1 3 20.5z" fill="url(#pg)" />
                    <defs>
                      <linearGradient id="pg" x1="3" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD400" />
                        <stop offset="0.5" stopColor="#FFD400" />
                        <stop offset="1" stopColor="#E6BF00" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-start">
                    <p className="mb-0 sv-text-dim" style={{ fontSize: '10px', lineHeight: 1 }}>Get it on</p>
                    <p className="mb-0 text-white fw-bold" style={{ fontSize: '0.95rem' }}>Google Play</p>
                  </div>
                </button>

                {/* App Store */}
                <button
                  onClick={onDownloadClick}
                  className="sv-store-btn border-0 position-relative"
                  aria-label="Download on App Store"
                >
                  <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, flexShrink: 0 }} fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-start">
                    <p className="mb-0 sv-text-dim" style={{ fontSize: '10px', lineHeight: 1 }}>Download on the</p>
                    <p className="mb-0 text-white fw-bold" style={{ fontSize: '0.95rem' }}>App Store</p>
                  </div>
                  <span
                    className="position-absolute top-0 end-0 translate-middle-y badge me-2"
                    style={{ background: '#FFD400', color: '#000', fontSize: '0.65rem', fontWeight: 800 }}
                  >
                    Soon
                  </span>
                </button>
              </div>

              <div className="d-flex flex-wrap gap-4">
                {['50K+ Downloads', '4.8★ Rating', 'Free Forever'].map((b) => (
                  <div key={b} className="d-flex align-items-center gap-2">
                    <span className="sv-live-dot" style={{ background: '#FFD400' }} />
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ScoreVerse Brand Image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="col-lg-5 d-flex justify-content-center"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="sv-card overflow-hidden cursor-pointer text-center d-flex align-items-center justify-content-center"
                onClick={onDownloadClick}
                style={{
                  width: '100%',
                  maxWidth: 300,
                  minHeight: 200,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '2rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 60px rgba(255,212,0,0.15)',
                }}
              >
                <img
                  src="/SportVerse.png"
                  alt="ScoreVerse"
                  className="img-fluid"
                  style={{ maxHeight: 130, objectFit: 'contain', filter: 'drop-shadow(0 8px 28px rgba(255,212,0,0.5))' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
