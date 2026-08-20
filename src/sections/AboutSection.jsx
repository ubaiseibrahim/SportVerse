import { motion } from 'framer-motion'
import { MapPin, Trophy, Activity, Users, BarChart3, Bell } from 'lucide-react'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'
import { scrollToSection } from '../utils/scroll'

const features = [
  { icon: MapPin,    text: 'Book nearby turfs instantly',      color: '#FFD400' },
  { icon: Trophy,    text: 'Join & organize tournaments',      color: '#FFD400' },
  { icon: Activity,  text: 'Track live match scores',          color: '#FFD400' },
  { icon: BarChart3, text: 'View detailed player statistics',  color: '#FFD400' },
  { icon: Users,     text: 'Create & manage teams',            color: '#E6BF00' },
  { icon: Bell,      text: 'Get smart push notifications',     color: '#FFD400' },
]

const liveStats = [
  { label: 'Players Online',   value: '12,480', icon: '🏃', color: '#FFD400', border: 'rgba(255,212,0,0.25)' },
  { label: 'Turfs Available',  value: '347',    icon: '🏟', color: '#FFD400', border: 'rgba(255,212,0,0.25)' },
  { label: 'Live Tournaments', value: '24',     icon: '🏆', color: '#FFD400', border: 'rgba(245,158,11,0.25)' },
  { label: 'Matches Today',    value: '183',    icon: '⚽', color: '#E6BF00', border: 'rgba(230,191,0,0.25)' },
]

export default function AboutSection() {
  return (
    <section id="about" className="sv-section bg-glow-green">
      <AnimatedBlobs variant="green" />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">

          {/* Left Column */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="col-lg-6"
          >
            <div className="sv-tag">
              <span className="sv-tag-dot" />
              About ScoreVerse
            </div>

            <h2 id="about-title" className="sv-section-title text-white mb-3">
              Everything Sports.{' '}
              <span className="sv-gradient-text">One Platform.</span>
            </h2>

            <p className="sv-text-muted mb-4" style={{ maxWidth: 500, lineHeight: 1.75, fontSize: '1rem' }}>
              ScoreVerse is India's all-in-one sports ecosystem — built for passionate
              players, ambitious organizers, and smart turf owners. Whether you want to
              book a slot, run a league, or host a live auction, ScoreVerse has you covered.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="d-flex flex-column gap-3 mb-4"
            >
              {features.map(({ icon: Icon, text, color }) => (
                <motion.div
                  key={text}
                  variants={fadeUp}
                  className="d-flex align-items-center gap-3"
                >
                  <div
                    className="sv-icon-box mb-0"
                    style={{
                      width: 36, height: 36, borderRadius: 11,
                      background: `${color}18`, border: `1.5px solid ${color}28`,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="d-flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToSection('#features')}
                className="sv-btn sv-btn-primary"
              >
                Explore Features
              </button>
              <button
                onClick={() => scrollToSection('#download')}
                className="sv-btn sv-btn-outline"
              >
                Download App
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="col-lg-6"
          >
            <div className="sv-dashboard">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <p className="sv-text-dim mb-1" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Live Platform Stats
                  </p>
                  <h3 className="text-white mb-0" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    Real-time Activity
                  </h3>
                </div>
                <div className="sv-live-badge">
                  <span className="sv-live-dot" />
                  LIVE
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                {liveStats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.1, duration: 0.5 }}
                    className="sv-card-simple p-3 d-flex align-items-center gap-3"
                    style={{
                      background: `${item.color}0c`,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
                    <div className="flex-grow-1 min-w-0">
                      <p className="mb-0 sv-text-dim" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.label}</p>
                      <p className="mb-0 fw-800" style={{ color: item.color, fontSize: '1.15rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {item.value}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span className="sv-live-dot" />
                      <span className="text-success fw-bold" style={{ fontSize: '0.7rem' }}>Live</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="d-inline-flex align-items-center gap-3 px-4 py-2 mt-3 rounded-sv glass-strong"
            >
              <div
                className="sv-gradient-bg d-flex align-items-center justify-content-center text-dark fw-800 rounded-2"
                style={{ width: 32, height: 32, fontSize: 12, flexShrink: 0 }}
              >
                SV
              </div>
              <div>
                <p className="mb-0 sv-text-dim" style={{ fontSize: '0.7rem' }}>Powered by</p>
                <p className="mb-0 fw-700 sv-gradient-text-gold" style={{ fontSize: '0.85rem' }}>ScoreVerse™</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
