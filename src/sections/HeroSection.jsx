import { motion } from 'framer-motion'
import { Smartphone, MapPin, Trophy, CheckCircle2, Activity, Users, Award, Zap, Target } from 'lucide-react'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { zoomIn } from '../utils/animations'

function FloatingCard({ children, style = {}, delay = 0, floatClass = 'sv-float' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sv-float-card ${floatClass}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function SportOrb({ icon: Icon, label, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="sv-sport-orb"
    >
      <div className="sv-sport-orb-inner" style={{ background: color }}>
        <Icon size={16} className="text-white" />
      </div>
      <span>{label}</span>
    </motion.div>
  )
}

export default function HeroSection({ onDownloadClick }) {
  const handleScroll = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const sports = [
    { icon: Trophy,   label: 'Cricket',    color: 'rgba(59,130,246,0.35)',  delay: 0.6 },
    { icon: Activity, label: 'Football',   color: 'rgba(16,185,129,0.35)', delay: 0.7 },
    { icon: Award,    label: 'Badminton',  color: 'rgba(245,158,11,0.35)', delay: 0.8 },
    { icon: Zap,      label: 'Pickleball', color: 'rgba(139,92,246,0.35)', delay: 0.9 },
    { icon: Target,   label: 'Basketball', color: 'rgba(239,68,68,0.35)',   delay: 1.0 },
  ]

  return (
    <section id="home" className="sv-hero position-relative">
      <div className="sv-hero-bg" aria-hidden="true" />
      <AnimatedBlobs variant="default" />
      <div className="sv-grid-overlay" aria-hidden="true" />

      <div className="container-xl position-relative z-10 w-100">
        <div className="row align-items-center g-5">

          {/* Left Column */}
          <div className="col-lg-6 d-flex flex-column align-items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="sv-hero-badge"
            >
              <span className="sv-live-dot" style={{ background: '#34D399' }} />
              🇮🇳 India's Smartest Sports Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sv-hero-title text-white mb-4 w-100"
            >
              <span className="d-block text-white">Book.</span>
              <span className="d-block sv-gradient-text">Play.</span>
              <span className="d-block text-white">Compete.</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="fs-5 text-white-50 mb-4"
              style={{ maxWidth: 520, lineHeight: 1.72, color: 'rgba(255,255,255,0.7)' }}
            >
              SportVerse makes booking turfs, joining tournaments, tracking live scores,
              managing teams, participating in auctions, and organizing sports events{' '}
              <strong className="text-white fw-semibold">simple, fast, and reliable.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="d-flex flex-wrap gap-3 mb-5"
            >
              <button
                onClick={onDownloadClick}
                className="sv-btn sv-btn-primary"
              >
                <Smartphone size={17} />
                Download App
              </button>
              <button
                onClick={() => handleScroll('#features')}
                className="sv-btn sv-btn-outline"
              >
                Explore Features →
              </button>
            </motion.div>

            <div className="d-flex flex-wrap gap-4">
              {sports.map((s) => (
                <SportOrb key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Mobile Right Column: Clean Grid Layout */}
          <div className="col-lg-6 d-lg-none mt-4">
            <div className="row g-3">
              <div className="col-6">
                <div className="sv-card p-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <MapPin size={16} className="text-primary" />
                    <span className="fs-7 fw-bold text-white">Nearby Turf</span>
                  </div>
                  <p className="fs-7 text-success mb-0 fw-semibold">Green Arena</p>
                  <p className="fs-7 sv-text-dim mb-0" style={{ fontSize: 11 }}>0.4 km · Available</p>
                </div>
              </div>
              <div className="col-6">
                <div className="sv-card p-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <Trophy size={16} className="text-warning" />
                    <span className="fs-7 fw-bold text-white">Tournament</span>
                  </div>
                  <p className="fs-7 text-danger mb-0 fw-bold">City League S2</p>
                  <p className="fs-7 sv-text-dim mb-0" style={{ fontSize: 11 }}>🔴 LIVE NOW</p>
                </div>
              </div>
              <div className="col-6">
                <div className="sv-card p-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <CheckCircle2 size={16} className="text-success" />
                    <span className="fs-7 fw-bold text-white">Booked!</span>
                  </div>
                  <p className="fs-7 text-white mb-0 fw-semibold">6:00 - 7:00 PM</p>
                  <p className="fs-7 sv-text-dim mb-0" style={{ fontSize: 11 }}>Sunday Slot</p>
                </div>
              </div>
              <div className="col-6">
                <div className="sv-card p-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <Activity size={16} className="text-info" />
                    <span className="fs-7 fw-bold text-white">Live Score</span>
                  </div>
                  <p className="fs-7 text-primary mb-0 fw-bold">156/4 (18.2 ov)</p>
                  <p className="fs-7 sv-text-dim mb-0" style={{ fontSize: 11 }}>RRR: 7.8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Column: Floating Field Showcase */}
          <div className="col-lg-6 d-none d-lg-flex justify-content-center position-relative" style={{ minHeight: 520 }}>
            {/* Field Illustration */}
            <motion.div
              variants={zoomIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="position-absolute overflow-hidden rounded-sv-lg"
              style={{
                top: 40, bottom: 40, left: 40, right: 40,
                background: 'linear-gradient(145deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%), #111827',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="position-relative" style={{ width: 250, height: 170 }}>
                  <div className="position-absolute top-0 bottom-0 start-0 end-0 border rounded-3" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                  <div className="position-absolute top-0 bottom-0 start-0 end-0 border rounded-3 m-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
                  <div className="position-absolute top-50 start-50 translate-middle border rounded-circle" style={{ width: 80, height: 80, borderColor: 'rgba(255,255,255,0.12)' }} />
                  <div className="position-absolute top-50 start-50 translate-middle rounded-circle bg-success" style={{ width: 10, height: 10, boxShadow: '0 0 14px rgba(16,185,129,0.9)' }} />
                </div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            <FloatingCard delay={0.5} style={{ position: 'absolute', left: 0, top: 10 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box sv-gradient-bg mb-0" style={{ width: 40, height: 40, borderRadius: 12 }}>
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <p className="fc-label">Nearby Turf</p>
                  <p className="fc-title">Green Arena</p>
                  <p className="fc-sub text-success">0.4 km · Available</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.6} floatClass="sv-float-slow" style={{ position: 'absolute', right: 0, top: 20 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.35)' }}>
                  <Trophy size={16} style={{ color: '#FBBF24' }} />
                </div>
                <div>
                  <p className="fc-label">Tournament</p>
                  <p className="fc-title">City League S2</p>
                  <div className="d-flex align-items-center gap-1 mt-1">
                    <span className="sv-live-dot" />
                    <span className="fc-sub text-danger">LIVE</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.7} style={{ position: 'absolute', left: 0, bottom: 90 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle2 size={16} style={{ color: '#34D399' }} />
                </div>
                <div>
                  <p className="fc-sub text-success">Booked!</p>
                  <p className="fc-title">6:00 PM – 7:00 PM</p>
                  <p className="fc-label">Sunday, July 27</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.8} floatClass="sv-float-slow" style={{ position: 'absolute', right: 0, bottom: 80 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}>
                  <Activity size={16} style={{ color: '#60A5FA' }} />
                </div>
                <div>
                  <p className="fc-label">Live Score</p>
                  <p className="fc-title">156/4 (18.2 ov)</p>
                  <p className="fc-sub text-primary">RRR: 7.8</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.9} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 10 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <Users size={16} style={{ color: '#A78BFA' }} />
                </div>
                <div>
                  <p className="fc-label">Player Auction</p>
                  <p className="fc-title">Rohit – ₹4.5L</p>
                  <p className="fc-sub text-warning">SOLD</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="sv-stats-bar"
        >
          <div className="row g-0">
            {[
              { value: '500+',  label: 'Turfs Listed'   },
              { value: '10K+',  label: 'Bookings Made'  },
              { value: '200+',  label: 'Tournaments'    },
              { value: '50K+',  label: 'Active Players' },
            ].map((stat) => (
              <div key={stat.label} className="col-6 col-md-3 sv-stat-item">
                <div className="sv-stat-num">{stat.value}</div>
                <div className="sv-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
