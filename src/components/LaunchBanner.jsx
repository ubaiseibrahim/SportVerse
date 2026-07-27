import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, Bell, Rocket, Sparkles } from 'lucide-react'

export default function LaunchBanner({ onNotifyClick }) {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="position-relative overflow-hidden text-center py-2 px-2"
      style={{
        background: 'linear-gradient(90deg, #1E1B4B 0%, #312E81 40%, #064E3B 70%, #1E1B4B 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}
    >
      <div className="container-xl position-relative z-10">
        {/* Mobile View: Compact single-row bar */}
        <div className="d-flex d-md-none align-items-center justify-content-between gap-1 fs-7">
          <div className="d-flex align-items-center gap-1">
            <span className="badge bg-warning text-dark font-bold px-2 py-1 d-inline-flex align-items-center gap-1" style={{ fontSize: 10 }}>
              <PartyPopper size={11} /> LAUNCHING SOON
            </span>
            <span className="text-white font-bold" style={{ fontSize: 11 }}>
              {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:{String(timeLeft.minutes).padStart(2, '0')}m
            </span>
          </div>
          <button
            onClick={onNotifyClick}
            className="sv-btn sv-btn-green py-0 px-2 fs-7 d-inline-flex align-items-center gap-1"
            style={{ fontSize: 10, height: 26 }}
          >
            <Bell size={10} /> Notify Me
          </button>
        </div>

        {/* Desktop View: Full horizontal bar */}
        <div className="d-none d-md-flex align-items-center justify-content-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-warning text-dark fw-bold fs-7 shadow-sm"
          >
            <PartyPopper size={13} />
            OFFICIAL LAUNCHING SOON
          </motion.div>

          <span className="fs-7 fw-bold text-white mb-0 d-inline-flex align-items-center gap-1">
            Get Ready India! The Ultimate Sports Platform is Almost Here! <Rocket size={14} className="text-warning ms-1" />
          </span>

          <div className="d-flex align-items-center gap-1">
            {[
              { val: timeLeft.days, label: 'D' },
              { val: timeLeft.hours, label: 'H' },
              { val: timeLeft.minutes, label: 'M' },
              { val: timeLeft.seconds, label: 'S' },
            ].map(({ val, label }, i) => (
              <div
                key={i}
                className="px-2 py-0.5 rounded-1 text-center"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', minWidth: 28 }}
              >
                <span className="fw-bold text-warning fs-7 d-block leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11 }}>
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-white-50 d-block" style={{ fontSize: 8 }}>{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onNotifyClick}
            className="sv-btn sv-btn-green py-1 px-3 fs-7 ms-2 d-inline-flex align-items-center gap-1"
            style={{ fontSize: 12 }}
          >
            <Bell size={12} />
            Join Launch List
          </button>
        </div>
      </div>
    </div>
  )
}
