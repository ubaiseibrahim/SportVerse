import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  Smartphone, MapPin, Trophy, CheckCircle2,
  Activity, Users, Award, Zap, Target,
} from 'lucide-react'
import AnimatedBlobs from '../components/AnimatedBlobs'
import MagneticButton from '../components/MagneticButton'
import { fadeUp, containerVariants } from '../utils/animations'
import { scrollToSection } from '../utils/scroll'

/* ── Floating card ────────────────────────────────────────── */
function FloatingCard({ children, style = {}, delay = 0, floatClass = 'sv-float' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sv-float-card ${floatClass}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── Sport orb ────────────────────────────────────────────── */
function SportOrb({ icon: Icon, label, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sv-sport-orb"
    >
      <div className="sv-sport-orb-inner" style={{ background: color }}>
        <Icon size={15} className="text-white" />
      </div>
      <span>{label}</span>
    </motion.div>
  )
}

/* ── Stat item ────────────────────────────────────────────── */
function StatItem({ value, label }) {
  return (
    <div className="col-6 col-md-3 sv-stat-item">
      <div className="sv-stat-num">{value}</div>
      <div className="sv-stat-label">{label}</div>
    </div>
  )
}

export default function HeroSection({ onDownloadClick }) {
  const handleScroll = (id) => scrollToSection(id)

  const fieldRef = useRef(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 20 })

  const handleFieldMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches || !fieldRef.current) return
    const rect = fieldRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltY.set(px * 10)
    tiltX.set(py * -10)
  }
  const handleFieldLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const sports = [
    { icon: Trophy,   label: 'Cricket',    color: 'rgba(255,212,0,0.3)',   delay: 0.6 },
    { icon: Activity, label: 'Football',   color: 'rgba(255,212,0,0.3)',  delay: 0.7 },
    { icon: Award,    label: 'Badminton',  color: 'rgba(245,158,11,0.3)',  delay: 0.8 },
    { icon: Zap,      label: 'Pickleball', color: 'rgba(230,191,0,0.3)',  delay: 0.9 },
    { icon: Target,   label: 'Basketball', color: 'rgba(245,158,11,0.28)',  delay: 1.0 },
  ]

  const stats = [
    { value: '500+',  label: 'Turfs Listed'   },
    { value: '10K+',  label: 'Bookings Made'  },
    { value: '200+',  label: 'Tournaments'    },
    { value: '50K+',  label: 'Active Players' },
  ]

  return (
    <section id="home" className="sv-hero position-relative">
      {/* Layered background */}
      <div className="sv-hero-bg" aria-hidden="true" />
      <div className="sv-hero-spotlight" aria-hidden="true" />
      <div className="sv-grid-overlay" aria-hidden="true" />
      <div className="sv-noise" aria-hidden="true" />
      <div className="sv-light-sweep" aria-hidden="true" />
      <AnimatedBlobs variant="default" />

      <div className="container-xl position-relative" style={{ zIndex: 10, width: '100%' }}>
        <div className="row align-items-center g-5">

          {/* ── Left Column ──────────────────────────────── */}
          <div className="col-lg-6 d-flex flex-column align-items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="sv-hero-badge"
            >
              <span className="sv-live-dot" style={{ background: '#FFD400' }} />
              🇮🇳 India's Smartest Sports Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="sv-hero-title text-white mb-4 w-100"
            >
              <motion.span
                className="d-block text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
              >
                Book.
              </motion.span>
              <motion.span
                className="d-block sv-gradient-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Play.
              </motion.span>
              <motion.span
                className="d-block text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                Compete.
              </motion.span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{ maxWidth: 500, lineHeight: 1.74, color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', marginBottom: '1.5rem' }}
            >
              ScoreVerse makes booking turfs, joining tournaments, tracking live scores,
              managing teams, participating in auctions, and organizing sports events{' '}
              <strong style={{ color: '#fff', fontWeight: 600 }}>simple, fast, and reliable.</strong>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="d-flex flex-wrap gap-3 mb-4"
            >
              <MagneticButton
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDownloadClick}
                className="sv-btn sv-btn-primary"
                style={{ fontSize: 15, padding: '14px 30px' }}
              >
                <Smartphone size={17} />
                Book a Turf
              </MagneticButton>
              <MagneticButton
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('#live-scoring')}
                className="sv-btn sv-btn-outline"
                style={{ fontSize: 15, padding: '14px 28px' }}
              >
                Explore Scoring →
              </MagneticButton>
            </motion.div>

            {/* Sport orbs */}
            <div className="d-flex flex-wrap gap-3">
              {sports.map((s) => (
                <SportOrb key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* ── Mobile: simple bento grid ─────────────────── */}
          <div className="col-lg-6 d-lg-none mt-4">
            <div className="row g-3">
              {[
                { icon: MapPin,        label: 'Nearby Turf',  val: 'Green Arena',      sub: '0.4 km · Available',  col: '#FFD400' },
                { icon: Trophy,        label: 'Tournament',   val: 'City League S2',   sub: '🔴 LIVE NOW',          col: '#FFD400' },
                { icon: CheckCircle2,  label: 'Booked!',      val: '6:00 – 7:00 PM',  sub: 'Sunday Slot',          col: '#FFD400' },
                { icon: Activity,      label: 'Live Score',   val: '156/4 (18.2 ov)',  sub: 'RRR: 7.8',             col: '#FFD400' },
              ].map(({ icon: Icon, label, val, sub, col }) => (
                <div key={label} className="col-6">
                  <div className="sv-card p-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Icon size={14} style={{ color: col }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>{label}</span>
                    </div>
                    <p style={{ fontSize: 13, color: col, fontWeight: 700, margin: '2px 0 0' }}>{val}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop: floating field showcase ─────────── */}
          <div
            ref={fieldRef}
            onMouseMove={handleFieldMove}
            onMouseLeave={handleFieldLeave}
            className="col-lg-6 d-none d-lg-flex justify-content-center position-relative"
            style={{ minHeight: 500, perspective: 1200 }}
          >
            {/* Central field illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="position-absolute overflow-hidden"
              style={{
                top: 30, bottom: 30, left: 40, right: 40,
                background: 'linear-gradient(145deg, rgba(255,212,0,0.08) 0%, rgba(255,212,0,0.08) 100%), #0A0F18',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 28,
                boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
                rotateX: springTiltX,
                rotateY: springTiltY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Cricket pitch geometry */}
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="position-relative" style={{ width: 220, height: 155 }}>
                  <div className="position-absolute top-0 bottom-0 start-0 end-0 border" style={{ borderColor: 'rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <div className="position-absolute top-0 bottom-0 start-0 end-0 border m-3" style={{ borderColor: 'rgba(255,255,255,0.06)', borderRadius: 6 }} />
                  <div className="position-absolute top-50 start-50 translate-middle border rounded-circle" style={{ width: 70, height: 70, borderColor: 'rgba(255,255,255,0.1)' }} />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="position-absolute top-50 start-50 translate-middle rounded-circle"
                    style={{ width: 10, height: 10, background: '#FFD400', boxShadow: '0 0 18px rgba(255,212,0,1)' }}
                  />
                </div>
              </div>
              {/* Ambient glow */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,212,0,0.04), transparent 70%)' }} />
            </motion.div>

            {/* Floating cards */}
            <FloatingCard delay={0.55} style={{ position: 'absolute', left: -12, top: 20 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box sv-gradient-bg mb-0" style={{ width: 38, height: 38, borderRadius: 11 }}>
                  <MapPin size={15} className="text-white" />
                </div>
                <div>
                  <p className="fc-label">Nearby Turf</p>
                  <p className="fc-title">Green Arena</p>
                  <p className="fc-sub" style={{ color: '#FFD400' }}>0.4 km · Available</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.65} floatClass="sv-float-slow" style={{ position: 'absolute', right: -12, top: 30 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <Trophy size={15} style={{ color: '#FFD400' }} />
                </div>
                <div>
                  <p className="fc-label">Tournament</p>
                  <p className="fc-title">City League S2</p>
                  <div className="d-flex align-items-center gap-1 mt-1">
                    <span className="sv-live-dot" />
                    <span className="fc-sub" style={{ color: '#FFD400' }}>LIVE</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.75} style={{ position: 'absolute', left: -12, bottom: 100 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,212,0,0.15)', border: '1px solid rgba(255,212,0,0.25)' }}>
                  <CheckCircle2 size={15} style={{ color: '#FFD400' }} />
                </div>
                <div>
                  <p className="fc-sub" style={{ color: '#FFD400' }}>Booked!</p>
                  <p className="fc-title">6:00 PM – 7:00 PM</p>
                  <p className="fc-label">Sunday, Jul 27</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.85} floatClass="sv-float-slow" style={{ position: 'absolute', right: -12, bottom: 90 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}>
                  <Activity size={15} style={{ color: '#FFD400' }} />
                </div>
                <div>
                  <p className="fc-label">Live Score</p>
                  <p className="fc-title">156/4 (18.2 ov)</p>
                  <p className="fc-sub" style={{ color: '#FFD400' }}>RRR: 7.8</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.95} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 14 }}>
              <div className="d-flex align-items-center gap-3">
                <div className="sv-icon-box mb-0" style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)' }}>
                  <Users size={15} style={{ color: '#FFD400' }} />
                </div>
                <div>
                  <p className="fc-label">Player Auction</p>
                  <p className="fc-title">Rohit – ₹4.5L</p>
                  <p className="fc-sub" style={{ color: '#FFD400' }}>SOLD</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="sv-stats-bar"
        >
          <div className="row g-0">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
