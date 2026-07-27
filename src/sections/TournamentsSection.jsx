import { motion } from 'framer-motion'
import {
  Trophy, Swords, RefreshCcw, Gavel,
  Activity, BarChart3, Users, Star, CalendarCheck, Gift,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeUp, fadeLeft, fadeRight, containerVariants } from '../utils/animations'

const formats = [
  { icon: Trophy,     label: 'League',        description: 'Round-robin style where every team plays each other.', color: '#F59E0B', popular: true },
  { icon: Swords,     label: 'Knockout',      description: 'Single-elimination — one loss and you are out.',      color: '#EF4444' },
  { icon: RefreshCcw, label: 'Round Robin',   description: 'Every team guaranteed multiple matches.',              color: '#3B82F6' },
  { icon: Gavel,      label: 'Auction Based', description: 'IPL-style auction — draft players, build the squad.', color: '#10B981' },
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

function BracketIllustration() {
  const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H']

  return (
    <div className="sv-card p-4 h-100">
      <p className="fs-7 text-uppercase tracking-wider sv-text-dim fw-bold mb-4">
        Tournament Bracket
      </p>

      <div className="d-flex gap-2 align-items-stretch" style={{ minHeight: 240 }}>
        {/* R1 */}
        <div className="d-flex flex-column justify-content-around flex-grow-1 gap-1">
          {teams.map((t, i) => (
            <div
              key={t}
              className="text-center py-1 px-2 rounded-2 fs-7 fw-semibold"
              style={{
                background: i < 2 ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i < 2 ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
                color: i < 2 ? '#93C5FD' : 'rgba(255,255,255,0.7)',
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* QF */}
        <div className="d-flex flex-column justify-content-around flex-grow-1 gap-1">
          {['A vs B', 'C vs D', 'E vs F', 'G vs H'].map((m) => (
            <div
              key={m}
              className="text-center py-1 px-2 rounded-2 fs-7 fw-bold"
              style={{
                background: 'rgba(59,130,246,0.14)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#93C5FD',
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* SF */}
        <div className="d-flex flex-column justify-content-around flex-grow-1 gap-1">
          {['Semi 1', 'Semi 2'].map((m) => (
            <div
              key={m}
              className="text-center py-2 px-2 rounded-2 fs-7 fw-bold"
              style={{
                background: 'rgba(16,185,129,0.14)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#6EE7B7',
              }}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Final */}
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <div
            className="text-center p-2 rounded-3"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.15))',
              border: '1.5px solid rgba(245,158,11,0.45)',
            }}
          >
            <Trophy size={18} className="text-warning mb-1" />
            <p className="mb-0 fs-7 fw-bold text-warning">FINAL</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TournamentsSection() {
  return (
    <section id="tournaments" className="sv-section bg-glow-blue">
      <AnimatedBlobs variant="default" />

      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Tournaments"
          title={`Organize Tournaments <span class="sv-gradient-text">Like a Pro</span>`}
          subtitle="Host any tournament format — from quick knockout rounds to full IPL-style auction leagues."
        />

        {/* Format Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-5"
        >
          {formats.map(({ icon: Icon, label, description, color, popular }) => (
            <div key={label} className="col">
              <motion.div variants={fadeUp} className="sv-card p-4 h-100 position-relative">
                {popular && (
                  <span
                    className="position-absolute top-0 end-0 m-3 badge rounded-pill"
                    style={{ background: color, fontSize: 10 }}
                  >
                    Popular
                  </span>
                )}
                <div
                  className="sv-icon-box"
                  style={{
                    background: `${color}18`,
                    border: `1.5px solid ${color}35`,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="fs-6 fw-bold text-white mb-2">{label}</h3>
                <p className="fs-7 sv-text-muted mb-0 leading-relaxed">{description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Features + Bracket */}
        <div className="row g-5 align-items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6"
          >
            <h3 className="fs-4 fw-bold text-white mb-4">
              Everything You Need to <span className="sv-gradient-text">Run a Tournament</span>
            </h3>
            <div className="row row-cols-2 g-3 mb-4">
              {tournamentFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="col">
                  <div className="sv-chip">
                    <div className="sv-chip-icon sv-gradient-bg">
                      <Icon size={14} className="text-white" />
                    </div>
                    <span className="fs-7 fw-medium text-white">{text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
              className="sv-btn sv-btn-primary"
            >
              Create Tournament Now
            </button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6"
          >
            <BracketIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
