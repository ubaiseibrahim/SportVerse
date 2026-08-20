import { motion } from 'framer-motion'
import {
  Trophy, Swords, RefreshCcw, Gavel,
  Activity, BarChart3, Users, Star, CalendarCheck, Gift,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeUp, fadeLeft, fadeRight, containerVariants } from '../utils/animations'
import { scrollToSection } from '../utils/scroll'

const formats = [
  { icon: Trophy,     label: 'League',        description: 'Round-robin style where every team plays each other.', color: '#FFD400', popular: true },
  { icon: Swords,     label: 'Knockout',      description: 'Single-elimination — one loss and you are out.',       color: '#FFD400' },
  { icon: RefreshCcw, label: 'Round Robin',   description: 'Every team guaranteed multiple matches.',               color: '#FFD400' },
  { icon: Gavel,      label: 'Auction Based', description: 'IPL-style auction — draft players, build the squad.',  color: '#FFD400' },
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
      <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }} className="mb-4">
        Tournament Bracket
      </p>

      <div className="d-flex gap-2 align-items-stretch" style={{ minHeight: 240 }}>
        {/* Round 1 */}
        <div className="d-flex flex-column justify-content-around flex-grow-1 gap-1">
          {teams.map((t, i) => (
            <div
              key={t}
              className="text-center py-1 px-2 rounded-2"
              style={{
                background: i < 2 ? 'rgba(255,212,0,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i < 2 ? 'rgba(255,212,0,0.28)' : 'rgba(255,255,255,0.07)'}`,
                color: i < 2 ? '#FFD400' : 'rgba(255,255,255,0.6)',
                fontSize: '0.7rem',
                fontWeight: 600,
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
              className="text-center py-1 px-2 rounded-2"
              style={{
                background: 'rgba(255,212,0,0.1)',
                border: '1px solid rgba(255,212,0,0.24)',
                color: '#FFD400',
                fontSize: '0.7rem',
                fontWeight: 700,
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
              className="text-center py-2 px-2 rounded-2"
              style={{
                background: 'rgba(255,212,0,0.12)',
                border: '1px solid rgba(255,212,0,0.28)',
                color: '#FFD400',
                fontSize: '0.7rem',
                fontWeight: 700,
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
              background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(255,212,0,0.12))',
              border: '1.5px solid rgba(245,158,11,0.4)',
            }}
          >
            <Trophy size={16} style={{ color: '#FFD400', marginBottom: 4 }} />
            <p className="mb-0 fw-bold" style={{ fontSize: '0.68rem', color: '#FFD400', letterSpacing: '0.08em' }}>FINAL</p>
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

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
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
          viewport={{ once: true, amount: 0.08 }}
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-5"
        >
          {formats.map(({ icon: Icon, label, description, color, popular }) => (
            <div key={label} className="col">
              <motion.div variants={fadeUp} className="sv-card p-4 h-100 position-relative">
                {popular && (
                  <span
                    className="position-absolute top-0 end-0 m-3 badge rounded-pill"
                    style={{ background: color, fontSize: 10, color: '#000', fontWeight: 700 }}
                  >
                    Popular
                  </span>
                )}
                <div
                  className="sv-icon-box"
                  style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
                >
                  <Icon size={21} style={{ color }} />
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: '1rem' }}>{label}</h3>
                <p className="sv-text-muted mb-0" style={{ fontSize: '0.83rem', lineHeight: 1.65 }}>{description}</p>
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
            viewport={{ once: true, amount: 0.18 }}
            className="col-lg-6"
          >
            <h3 className="text-white mb-4" style={{ fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.01em' }}>
              Everything You Need to{' '}
              <span className="sv-gradient-text">Run a Tournament</span>
            </h3>
            <div className="row row-cols-2 g-3 mb-4">
              {tournamentFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="col">
                  <div className="sv-chip">
                    <div className="sv-chip-icon sv-gradient-bg">
                      <Icon size={13} className="text-dark" />
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#fff' }}>{text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('#download')}
              className="sv-btn sv-btn-primary"
            >
              Create Tournament Now
            </button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="col-lg-6"
          >
            <BracketIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
