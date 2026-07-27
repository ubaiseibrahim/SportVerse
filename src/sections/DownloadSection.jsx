import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { fadeLeft, fadeRight } from '../utils/animations'

export default function DownloadSection({ onDownloadClick }) {
  return (
    <section id="download" className="sv-section bg-glow-blue">
      <div className="container-xl position-relative z-10">
        <div className="sv-download-wrap">
          <div className="row align-items-center g-5">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
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

              <p className="fs-5 sv-text-muted mb-4" style={{ lineHeight: 1.7 }}>
                Join 50,000+ players, organizers, and turf owners already on SportVerse.
                Your game starts here.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <button onClick={onDownloadClick} className="sv-store-btn border-0" aria-label="Download on Google Play">
                  <svg viewBox="0 0 24 24" className="flex-shrink-0" style={{ width: 28, height: 28 }} fill="none">
                    <path d="M3 20.5v-17a.5.5 0 0 1 .75-.43l16 8.5a.5.5 0 0 1 0 .86l-16 8.5A.5.5 0 0 1 3 20.5z" fill="url(#play-g)" />
                    <defs>
                      <linearGradient id="play-g" x1="3" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" />
                        <stop offset="0.5" stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-start">
                    <p className="mb-0 fs-7 sv-text-dim" style={{ fontSize: 11 }}>Get it on</p>
                    <p className="mb-0 fs-6 fw-bold text-white">Google Play</p>
                  </div>
                </button>

                <button onClick={onDownloadClick} className="sv-store-btn border-0 position-relative" aria-label="Download on App Store">
                  <svg viewBox="0 0 24 24" className="flex-shrink-0" style={{ width: 28, height: 28 }} fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-start">
                    <p className="mb-0 fs-7 sv-text-dim" style={{ fontSize: 11 }}>Download on the</p>
                    <p className="mb-0 fs-6 fw-bold text-white">App Store</p>
                  </div>
                  <span className="position-absolute top-0 end-0 translate-middle-y badge bg-warning text-dark me-2">Soon</span>
                </button>
              </div>

              <div className="d-flex gap-4">
                {['50K+ Downloads', '4.8★ Rating', 'Free Forever'].map((b) => (
                  <div key={b} className="d-flex align-items-center gap-2">
                    <span className="sv-live-dot" style={{ background: '#34D399' }} />
                    <span className="fs-7 sv-text-dim fw-medium">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SportVerse Brand Image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="col-lg-5 d-flex justify-content-center"
            >
              <div
                className="sv-card p-4 overflow-hidden shadow-lg cursor-pointer text-center d-flex align-items-center justify-content-center w-100"
                onClick={onDownloadClick}
                style={{
                  maxWidth: 320,
                  minHeight: 220,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <img
                  src="/SportVerse.png"
                  alt="SportVerse"
                  className="img-fluid"
                  style={{ maxHeight: 130, objectFit: 'contain', filter: 'drop-shadow(0 6px 24px rgba(59,130,246,0.45))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
