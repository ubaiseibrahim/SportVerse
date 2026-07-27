import { motion } from 'framer-motion'
import {
  Trophy, Swords, RefreshCcw, Gavel,
  Activity, BarChart3, Users, Star, CalendarCheck, Gift,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeUp, fadeLeft, fadeRight, containerVariants } from '../utils/animations'

const formats = [
  {
    icon: Trophy,
    label: 'League',
    description: 'Round-robin style where every team plays each other.',
    color: '#F59E0B',
    popular: true,
  },
  {
    icon: Swords,
    label: 'Knockout',
    description: 'Single-elimination — one loss and you are out.',
    color: '#EF4444',
    popular: false,
  },
  {
    icon: RefreshCcw,
    label: 'Round Robin',
    description: 'Every team guaranteed multiple matches.',
    color: '#2563EB',
    popular: false,
  },
  {
    icon: Gavel,
    label: 'Auction Based',
    description: 'IPL-style auction — draft players, build the best squad.',
    color: '#10B981',
    popular: false,
  },
]

const tournamentFeatures = [
  { icon: Activity,      text: 'Live Fixtures' },
  { icon: BarChart3,     text: 'Points Table' },
  { icon: Star,          text: 'Leaderboards' },
  { icon: Users,         text: 'Player & Team Stats' },
  { icon: CalendarCheck, text: 'Auto Scheduling' },
  { icon: Gavel,         text: 'Auction Management' },
  { icon: Gift,          text: 'Prize Management' },
  { icon: Trophy,        text: 'Live Scoring' },
]

/**
 * Animated bracket visualization.
 */
function BracketIllustration() {
  const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H']
  const semis  = ['A vs B', 'C vs D']
  const final  = 'Semi Winner'

  return (
    <div className="relative p-6 rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Heading */}
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Tournament Bracket</p>

      <div className="flex gap-4 items-stretch min-h-[240px]">
        {/* R1 – 8 teams */}
        <div className="flex flex-col justify-around gap-2 flex-1">
          {teams.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-center px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: i < 2 ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {t}
            </motion.div>
          ))}
        </div>

        {/* SVG connectors */}
        <div className="relative w-8 flex-shrink-0" aria-hidden="true">
          <svg width="32" height="100%" viewBox="0 0 32 240" preserveAspectRatio="none" className="absolute inset-0 h-full">
            {[0, 1, 2, 3].map((i) => {
              const y1 = 15 + i * 60
              const y2 = y1 + 30
              const yMid = (y1 + y2) / 2
              return (
                <g key={i}>
                  <path d={`M 0 ${y1} H 16 V ${yMid}`} stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" fill="none" />
                  <path d={`M 0 ${y2} H 16 V ${yMid}`} stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" fill="none" />
                  <path d={`M 16 ${yMid} H 32`} stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" fill="none" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* QF */}
        <div className="flex flex-col justify-around gap-2 flex-1">
          {['A vs B', 'C vs D', 'E vs F', 'G vs H'].map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-300"
              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
            >
              {m}
            </motion.div>
          ))}
        </div>

        {/* SF connectors */}
        <div className="relative w-8 flex-shrink-0" aria-hidden="true">
          <svg width="32" height="100%" viewBox="0 0 32 240" preserveAspectRatio="none" className="absolute inset-0 h-full">
            {[0, 1].map((i) => {
              const y1 = 30 + i * 120
              const y2 = y1 + 60
              const yMid = (y1 + y2) / 2
              return (
                <g key={i}>
                  <path d={`M 0 ${y1} H 16 V ${yMid}`} stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" fill="none" />
                  <path d={`M 0 ${y2} H 16 V ${yMid}`} stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" fill="none" />
                  <path d={`M 16 ${yMid} H 32`} stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" fill="none" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Semi finals */}
        <div className="flex flex-col justify-around gap-2 flex-1">
          {['Semi-Final 1', 'Semi-Final 2'].map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center px-3 py-2 rounded-lg text-xs font-semibold text-green-300"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              {m}
            </motion.div>
          ))}
        </div>

        {/* Final connector */}
        <div className="relative w-8 flex-shrink-0" aria-hidden="true">
          <svg width="32" height="100%" viewBox="0 0 32 240" preserveAspectRatio="none" className="absolute inset-0 h-full">
            <path d="M 0 60 H 16 V 120" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" fill="none" />
            <path d="M 0 180 H 16 V 120" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" fill="none" />
            <path d="M 16 120 H 32" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Final */}
        <div className="flex flex-col justify-center flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', bounce: 0.4 }}
            className="text-center px-4 py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.2))', border: '1px solid rgba(245,158,11,0.5)' }}
          >
            <Trophy size={20} className="mx-auto mb-1 text-yellow-400" />
            <p className="text-xs font-bold text-yellow-300">GRAND FINAL</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/**
 * Tournaments Section – format cards, features grid, and bracket illustration.
 */
export default function TournamentsSection() {
  return (
    <section
      id="tournaments"
      className="section-padding relative overflow-hidden"
      aria-labelledby="tournaments-title"
    >
      <AnimatedBlobs variant="default" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Tournaments"
          title={`Organize Tournaments\n<span class="gradient-text">Like a Pro</span>`}
          subtitle="Host any tournament format — from quick knockout rounds to full IPL-style auction leagues."
        />

        {/* Format Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {formats.map(({ icon: Icon, label, description, color, popular }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="premium-card p-6"
            >
              {popular && (
                <div
                  className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: color, color: 'white' }}
                >
                  Popular
                </div>
              )}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: color + '18', border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
              <p className="text-sm text-white/55">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column: features + bracket */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Features grid */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-display">
              Everything You Need to{' '}
              <span className="gradient-text">Run a Tournament</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {tournamentFeatures.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 p-3 rounded-2xl glass-strong hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{text}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary mt-8"
              aria-label="Create Tournament Now"
            >
              Create Tournament Now
            </motion.button>
          </motion.div>

          {/* Bracket */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <BracketIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
