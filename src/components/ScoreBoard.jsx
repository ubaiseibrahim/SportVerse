import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

function ballClass(ball) {
  if (ball === '6') return 'six'
  if (ball === '4') return 'boundary'
  if (ball === 'W') return 'wicket'
  return ''
}

/**
 * Reusable broadcast-style live scoreboard.
 * Fully controlled — pass `revealCount` to stage-reveal the last-ball strip
 * (used for the one-time cinematic demo animation on the homepage).
 */
export default function ScoreBoard({
  status = 'LIVE',
  team,
  opponent,
  runRate,
  target,
  needRuns,
  needBalls,
  batsmen = [],
  bowler,
  recentBalls = [],
  revealCount = recentBalls.length,
}) {
  return (
    <div className="sv-scorebar">
      <div className="sv-scorebar-head">
        <div className="d-flex align-items-center gap-2">
          <span className="sv-live-badge">
            <span className="sv-live-dot" />
            {status}
          </span>
          {team.overs && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              {team.overs} OVERS
            </span>
          )}
        </div>
        {runRate && (
          <span style={{ fontSize: 12, color: 'var(--sv-gold)', fontWeight: 700, letterSpacing: '0.02em' }}>
            RR {runRate}
          </span>
        )}
      </div>

      <div className="sv-scorebar-body">
        <div className="sv-score-team-row">
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{team.name}</span>
          <span className="sv-score-num">
            {team.runs}
            <span style={{ fontSize: '0.55em', color: 'rgba(255,255,255,0.45)' }}>/{team.wickets}</span>
          </span>
        </div>

        {opponent && (
          <div className="sv-score-team-row" style={{ opacity: 0.55 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{opponent.name}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{opponent.summary}</span>
          </div>
        )}

        {target && (
          <div
            className="d-flex align-items-center justify-content-between mt-3 pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div>
              <p className="mb-0" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Target</p>
              <p className="mb-0" style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{target}</p>
            </div>
            {needRuns != null && (
              <div className="text-end">
                <p className="mb-0" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Need</p>
                <p className="mb-0" style={{ fontSize: 15, fontWeight: 800, color: 'var(--sv-gold)' }}>
                  {needRuns} runs · {needBalls} balls
                </p>
              </div>
            )}
          </div>
        )}

        {(batsmen.length > 0 || bowler) && (
          <div className="row g-2 mt-3">
            {batsmen.map((b) => (
              <div key={b.name} className="col-6">
                <div className="sv-card-simple p-2 px-3 d-flex align-items-center justify-content-between">
                  <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
                    {b.name}{b.isStriker ? '*' : ''}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--sv-gold)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {b.runs}({b.balls})
                  </span>
                </div>
              </div>
            ))}
            {bowler && (
              <div className="col-12">
                <div className="sv-card-simple p-2 px-3 d-flex align-items-center justify-content-between">
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                    🎯 {bowler.name}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {bowler.overs}-{bowler.runs}-{bowler.wickets}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {recentBalls.length > 0 && (
          <div className="mt-3">
            <p className="mb-2" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Last {recentBalls.length} Balls
            </p>
            <div className="d-flex gap-2">
              <AnimatePresence>
                {recentBalls.slice(0, revealCount).map((ball, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.6, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={clsx('sv-ball-chip', ballClass(ball))}
                  >
                    {ball}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
