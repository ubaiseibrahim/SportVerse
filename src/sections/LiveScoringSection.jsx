import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Trophy, Zap, Target, Award } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import ScoreBoard from '../components/ScoreBoard'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { useInView } from '../hooks/useInView'
import { fadeUp, fadeLeft } from '../utils/animations'

const recentBalls = ['1', '4', '0', 'W', '2', '6']

const multiSport = [
  { icon: Trophy,  label: 'Cricket' },
  { icon: Activity, label: 'Football' },
  { icon: Award,   label: 'Badminton' },
  { icon: Target,  label: 'Basketball' },
  { icon: Zap,     label: 'Box Cricket' },
]

export default function LiveScoringSection() {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const [revealCount, setRevealCount] = useState(0)
  const played = useRef(false)

  useEffect(() => {
    if (!inView || played.current) return
    played.current = true

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setRevealCount(recentBalls.length)
      return
    }

    let i = 0
    const timer = setInterval(() => {
      i += 1
      setRevealCount(i)
      if (i >= recentBalls.length) clearInterval(timer)
    }, 420)

    return () => clearInterval(timer)
  }, [inView])

  return (
    <section id="live-scoring" className="sv-section bg-glow-center" ref={ref}>
      <AnimatedBlobs variant="default" />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="Live Scoring"
          title={`Every Ball. Every Point. <span class="sv-gradient-text">Live.</span>`}
          subtitle="Broadcast-quality live scoring for cricket, football, badminton, and more — updated in real time as the match unfolds."
        />

        <div className="row g-5 align-items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6 mx-auto"
            style={{ maxWidth: 460 }}
          >
            <ScoreBoard
              status="LIVE"
              team={{ name: 'Velocity XI', runs: 142, wickets: 5, overs: '18.4' }}
              opponent={{ name: 'Storm FC', summary: '10 wkts · Innings 1' }}
              runRate="7.61"
              target="163"
              needRuns={21}
              needBalls={8}
              batsmen={[
                { name: 'Arjun', runs: 48, balls: 32, isStriker: true },
                { name: 'Rohit', runs: 27, balls: 19, isStriker: false },
              ]}
              bowler={{ name: 'Karthik R.', overs: '3.2', runs: 24, wickets: 1 }}
              recentBalls={recentBalls}
              revealCount={revealCount}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6"
          >
            <h3 className="text-white mb-3" style={{ fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.01em' }}>
              One Scoreboard. <span className="sv-gradient-text">Every Sport.</span>
            </h3>
            <p className="sv-text-muted mb-4" style={{ lineHeight: 1.75, fontSize: '0.95rem', maxWidth: 460 }}>
              From run-rates and wicket partnerships to goals, sets, and match points —
              ScoreVerse renders a broadcast-grade scoreboard for every format your community plays.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              {multiSport.map(({ icon: Icon, label }) => (
                <div key={label} className="sv-chip" style={{ cursor: 'default' }}>
                  <div className="sv-chip-icon sv-gradient-bg">
                    <Icon size={13} className="text-dark" />
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#fff' }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="row g-3">
              {[
                { label: 'Ball-by-ball updates', desc: 'Live commentary synced with every delivery.' },
                { label: 'Run-rate intelligence', desc: 'Current & required run-rate calculated live.' },
                { label: 'Player statistics', desc: 'Batting, bowling & fielding stats tracked in real time.' },
              ].map((f) => (
                <div key={f.label} className="col-12">
                  <div className="d-flex align-items-start gap-3">
                    <span className="sv-live-dot mt-2" />
                    <div>
                      <p className="mb-0 text-white" style={{ fontWeight: 700, fontSize: '0.88rem' }}>{f.label}</p>
                      <p className="mb-0 sv-text-muted" style={{ fontSize: '0.8rem' }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
