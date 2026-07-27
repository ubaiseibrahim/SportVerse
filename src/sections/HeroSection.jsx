import { motion } from 'framer-motion'
import { Smartphone, MapPin, Trophy, CheckCircle2, Activity, Users } from 'lucide-react'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeUp, zoomIn, containerVariants } from '../utils/animations'

/* ── Floating UI Card ── */
function FloatingCard({ children, className = '', delay = 0, floatClass = 'animate-float' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-strong rounded-2xl px-4 py-3 shadow-2xl ${floatClass} ${className}`}
      style={{ minWidth: 190 }}
    >
      {children}
    </motion.div>
  )
}

/* ── Sport Icon Orb ── */
function SportOrb({ emoji, label, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.12, rotate: 4 }}
      className="flex flex-col items-center gap-2 cursor-default"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
        style={{ background: color }}
      >
        {emoji}
      </div>
      <span className="text-white/55 text-xs font-medium tracking-wide">{label}</span>
    </motion.div>
  )
}

/**
 * Hero Section – fully responsive, perfect alignment.
 */
export default function HeroSection() {
  const handleScroll = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const sports = [
    { emoji: '🏏', label: 'Cricket',    color: 'rgba(37,99,235,0.35)',  delay: 0.95 },
    { emoji: '⚽', label: 'Football',   color: 'rgba(16,185,129,0.35)', delay: 1.05 },
    { emoji: '🏸', label: 'Badminton',  color: 'rgba(245,158,11,0.35)', delay: 1.15 },
    { emoji: '🏓', label: 'Pickleball', color: 'rgba(139,92,246,0.35)', delay: 1.25 },
    { emoji: '🏀', label: 'Basketball', color: 'rgba(239,68,68,0.35)',   delay: 1.35 },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* ── Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(37,99,235,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 90%, rgba(16,185,129,0.12) 0%, transparent 65%), #0D1117',
        }}
        aria-hidden="true"
      />
      <AnimatedBlobs variant="default" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ══════════════════════════════
              LEFT – Text content
          ══════════════════════════════ */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              🇮🇳 India's Smartest Sports Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-hero text-white mb-6 w-full"
            >
              <motion.span variants={fadeUp} className="block">Book.</motion.span>
              <motion.span variants={fadeUp} className="block gradient-text">Play.</motion.span>
              <motion.span variants={fadeUp} className="block">Compete.</motion.span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-[520px]"
            >
              SportVerse makes booking turfs, joining tournaments, tracking live scores,
              managing teams, participating in auctions, and organizing sports events{' '}
              <span className="text-white font-semibold">simple, fast, and reliable.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(37,99,235,0.5)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScroll('#download')}
                id="hero-download-btn"
                className="btn-primary"
                aria-label="Download SportVerse App"
              >
                <Smartphone size={17} />
                Download App
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScroll('#features')}
                id="hero-features-btn"
                className="btn-secondary"
                aria-label="Explore Features"
              >
                Explore Features →
              </motion.button>
            </motion.div>

            {/* Sports orbs row */}
            <div className="flex flex-wrap gap-5 sm:gap-6">
              {sports.map((s) => (
                <SportOrb key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* ══════════════════════════════
              RIGHT – Floating cards visual
          ══════════════════════════════ */}
          <div className="hidden lg:flex items-center justify-center relative" style={{ minHeight: 520 }}>

            {/* Central turf card */}
            <motion.div
              variants={zoomIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="absolute inset-12 rounded-3xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(37,99,235,0.12) 100%), #111827',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Turf field illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-60 h-40">
                  <div className="absolute inset-0 border-2 border-white/15 rounded-xl" />
                  <div className="absolute inset-0 border border-white/08 rounded-xl m-5" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/15 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg" style={{ boxShadow: '0 0 10px rgba(16,185,129,0.8)' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-12 border border-white/20 border-l-0 rounded-r" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-12 border border-white/20 border-r-0 rounded-l" />
                </div>
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 rounded-full glass text-xs text-white/75 font-medium border border-white/12">
                  ⚡ Premium Sports Turf
                </div>
              </div>
            </motion.div>

            {/* Floating card – Nearby Turf */}
            <FloatingCard delay={0.85} className="absolute left-0 top-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin size={15} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50 font-medium">Nearby Turf</p>
                  <p className="text-sm font-semibold text-white leading-tight">Green Arena</p>
                  <p className="text-[11px] text-green-400 font-medium">0.4 km · Available</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card – Tournament Live */}
            <FloatingCard delay={0.95} floatClass="animate-float-slow" className="absolute right-0 top-14">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                  <Trophy size={15} className="text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50 font-medium">Tournament</p>
                  <p className="text-sm font-semibold text-white leading-tight">City League S2</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[11px] text-red-400 font-semibold">LIVE</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card – Booked Successfully */}
            <FloatingCard delay={1.05} className="absolute left-0 bottom-28">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={15} className="text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-green-400 font-semibold">Booked!</p>
                  <p className="text-sm font-semibold text-white leading-tight">6:00 PM – 7:00 PM</p>
                  <p className="text-[11px] text-white/45">Sunday, July 27</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card – Live Score */}
            <FloatingCard delay={1.15} floatClass="animate-float-slow" className="absolute right-0 bottom-24">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Activity size={15} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50 font-medium">Live Score 🏏</p>
                  <p className="text-sm font-bold text-white leading-tight">156/4 (18.2 ov)</p>
                  <p className="text-[11px] text-blue-400 font-medium">RRR: 7.8</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating card – Auction */}
            <FloatingCard delay={1.25} className="absolute left-1/2 -translate-x-1/2 bottom-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Users size={15} className="text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50 font-medium">Player Auction</p>
                  <p className="text-sm font-semibold text-white leading-tight">Rohit – ₹4.5L</p>
                  <p className="text-[11px] text-yellow-400 font-bold">🔨 SOLD</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* ══════════════════════════════
            Stats Bar
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-20 glass rounded-2xl border border-white/08"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
            {[
              { value: '500+',  label: 'Turfs Listed'   },
              { value: '10K+',  label: 'Bookings Made'  },
              { value: '200+',  label: 'Tournaments'    },
              { value: '50K+',  label: 'Active Players' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6 px-4">
                <p
                  className="text-2xl sm:text-3xl font-bold gradient-text"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
