import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Bell, Timer } from 'lucide-react'

export default function LaunchBanner({ onNotifyClick }) {
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // The target date is August 22, 2026
    const launchDate = new Date('2026-08-22T00:00:00+05:30').getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = launchDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    // Run once immediately
    updateTimer()
    
    // Update every second
    const intervalId = setInterval(updateTimer, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="sv-launch-banner" role="banner" aria-label="Launch announcement">
      <div className="container-xl position-relative z-10">
        {/* Mobile */}
        <div className="d-flex d-md-none align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <Rocket size={13} style={{ color: '#FFD400' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              Launching in{' '}
              <span className="sv-countdown-pill" style={{ padding: '2px 8px', fontSize: 10, marginLeft: 4 }}>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
            </span>
          </div>
          <button
            onClick={onNotifyClick}
            className="sv-btn sv-btn-primary"
            style={{ padding: '5px 10px', fontSize: 10, borderRadius: 8, gap: 4 }}
          >
            <Bell size={10} />
            Notify
          </button>
        </div>

        {/* Desktop */}
        <div className="d-none d-md-flex align-items-center justify-content-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <img src="/SportVerse.png" alt="ScoreVerse" style={{ height: 22, width: 'auto', opacity: 0.85 }} />
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="sv-countdown-pill" style={{ display: 'flex', gap: 6 }}>
              <Timer size={11} />
              {timeLeft.days} DAYS {timeLeft.hours} HRS {timeLeft.minutes} MIN
            </span>
          </div>

          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}
          >
            🇮🇳 Get Ready India — The Ultimate Sports Platform is Almost Here
            <Rocket size={13} style={{ color: '#FFD400', marginLeft: 6 }} />
          </motion.span>

          <button
            onClick={onNotifyClick}
            className="sv-btn sv-btn-primary"
            style={{ padding: '6px 18px', fontSize: 12, borderRadius: 10 }}
          >
            <Bell size={12} />
            Join Launch List
          </button>
        </div>
      </div>
    </div>
  )
}
