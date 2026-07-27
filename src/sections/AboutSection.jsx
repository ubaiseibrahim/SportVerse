import { motion } from 'framer-motion'
import { MapPin, Trophy, Activity, Users, BarChart3, Bell } from 'lucide-react'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const features = [
  { icon: MapPin,    text: 'Book nearby turfs instantly',      color: '#3B82F6' },
  { icon: Trophy,    text: 'Join & organize tournaments',      color: '#F59E0B' },
  { icon: Activity,  text: 'Track live match scores',          color: '#EF4444' },
  { icon: BarChart3, text: 'View detailed player statistics',  color: '#10B981' },
  { icon: Users,     text: 'Create & manage teams',            color: '#8B5CF6' },
  { icon: Bell,      text: 'Get smart push notifications',     color: '#06B6D4' },
]

const liveStats = [
  { label: 'Players Online',   value: '12,480', icon: '🏃', color: '#3B82F6', border: 'rgba(59,130,246,0.3)' },
  { label: 'Turfs Available',  value: '347',    icon: '🏟', color: '#10B981', border: 'rgba(16,185,129,0.3)' },
  { label: 'Live Tournaments', value: '24',     icon: '🏆', color: '#F59E0B', border: 'rgba(245,158,11,0.3)' },
  { label: 'Matches Today',    value: '183',    icon: '⚽', color: '#8B5CF6', border: 'rgba(139,92,246,0.3)' },
]

export default function AboutSection() {
  return (
    <section id="about" className="sv-section bg-glow-green">
      <AnimatedBlobs variant="green" />

      <div className="container-xl position-relative z-10">
        <div className="row align-items-center g-5">

          {/* Left Column */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="col-lg-6"
          >
            <div className="sv-tag">
              <span className="sv-tag-dot" />
              About SportVerse
            </div>

            <h2 id="about-title" className="sv-section-title text-white mb-3">
              Everything Sports.{' '}
              <span className="sv-gradient-text">One Platform.</span>
            </h2>

            <p className="fs-6 sv-text-muted mb-4" style={{ maxWidth: 500, lineHeight: 1.72 }}>
              SportVerse is India's all-in-one sports ecosystem — built for passionate
              players, ambitious organizers, and smart turf owners. Whether you want to
              book a slot, run a league, or host a live auction, SportVerse has you covered.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
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
                      width: 36, height: 36, borderRadius: 10,
                      background: `${color}18`, border: `1.5px solid ${color}30`,
                    }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <span className="fs-6 text-white-80 fw-medium">{text}</span>
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
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="sv-btn sv-btn-primary"
              >
                Explore Features
              </button>
              <button
                onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
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
            viewport={{ once: true, amount: 0.25 }}
            className="col-lg-6"
          >
            <div className="sv-dashboard">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <p className="text-uppercase tracking-wider fs-7 sv-text-dim fw-semibold mb-1">
                    Live Platform Stats
                  </p>
                  <h3 className="fs-5 fw-bold text-white mb-0">
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
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                    className="sv-card-simple p-3 d-flex align-items-center gap-3"
                    style={{
                      background: `${item.color}0f`,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <span className="fs-3">{item.icon}</span>
                    <div className="flex-grow-1 min-w-0">
                      <p className="mb-0 fs-7 sv-text-dim fw-medium">{item.label}</p>
                      <p className="mb-0 fs-5 fw-bold" style={{ color: item.color }}>
                        {item.value}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span className="sv-live-dot" />
                      <span className="fs-7 text-success fw-bold">Live</span>
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
              <div className="sv-gradient-bg d-flex align-items-center justify-content-center text-white fw-bold rounded-2" style={{ width: 32, height: 32, fontSize: 12 }}>
                SV
              </div>
              <div>
                <p className="mb-0 fs-7 sv-text-dim">Powered by</p>
                <p className="mb-0 fw-bold sv-gradient-text">SportVerse™</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
