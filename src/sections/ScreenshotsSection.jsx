import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Home, MapPin, Activity } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

const screens = [
  {
    id: 'video',
    label: 'Video Ad',
    icon: Play,
    isCustomVideo: true,
    content: (
      <div className="position-relative w-100 h-100 overflow-hidden bg-black d-flex align-items-center justify-content-center" style={{ minHeight: 460 }}>
        <video
          src="/SportVerse.mp4"
          autoPlay
          controls
          loop
          playsInline
          className="w-100 h-100 position-absolute top-0 start-0"
          style={{ objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fb = document.getElementById('video-fallback')
            if (fb) fb.style.display = 'flex'
          }}
        />
        {/* Fallback container if video fails to load */}
        <div
          id="video-fallback"
          className="d-none flex-column align-items-center justify-content-center text-center p-3 w-100 h-100 position-relative z-10"
          style={{
            background: 'linear-gradient(145deg, #1A1500 0%, #0F172A 100%)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="sv-gradient-bg rounded-circle d-flex align-items-center justify-content-center mb-3 text-white shadow-lg"
            style={{ width: 60, height: 60 }}
          >
            <Play size={28} className="ms-1 text-white" />
          </motion.div>
          <span className="badge bg-warning text-dark fw-bold mb-2">Mobile Video Ad</span>
          <h4 className="fs-6 fw-bold text-white mb-1">ScoreVerse Video Ad</h4>
          <p className="fs-7 sv-text-muted mb-0" style={{ fontSize: 11 }}>
            Playing <code>SportVerse.mp4</code> live
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    content: (
      <div className="w-100 h-100 overflow-hidden bg-black" style={{ minHeight: 460 }}>
        <img
          src="/home.png"
          alt="ScoreVerse Home Screen"
          className="w-100 h-100"
          style={{ objectFit: 'cover', display: 'block', minHeight: 460 }}
        />
      </div>
    ),
  },
  {
    id: 'nearby',
    label: 'Nearby Turf',
    icon: MapPin,
    content: (
      <div className="w-100 h-100 overflow-hidden bg-black" style={{ minHeight: 460 }}>
        <img
          src="/turf.png"
          alt="ScoreVerse Nearby Turf Screen"
          className="w-100 h-100"
          style={{ objectFit: 'cover', display: 'block', minHeight: 460 }}
        />
      </div>
    ),
  },
  {
    id: 'score',
    label: 'Live Score',
    icon: Activity,
    content: (
      <div className="w-100 h-100 overflow-hidden bg-black" style={{ minHeight: 460 }}>
        <img
          src="/score.png"
          alt="ScoreVerse Live Score Screen"
          className="w-100 h-100"
          style={{ objectFit: 'cover', display: 'block', minHeight: 460 }}
        />
      </div>
    ),
  },
]

export default function ScreenshotsSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="screenshots" className="sv-section bg-glow-blue">
      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Mobile App Showcase"
          title={`See ScoreVerse <span class="sv-gradient-text">In Action</span>`}
          subtitle="Watch our mobile video ad and explore real app screenshots."
        />

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {screens.map((s, i) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="sv-btn py-2 px-3 fs-7"
                style={{
                  background: active === i ? 'rgba(255,212,0,0.25)' : 'rgba(255,255,255,0.05)',
                  color: active === i ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: active === i ? '1px solid rgba(255,212,0,0.45)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon size={14} className="me-1" />
                {s.label}
              </button>
            )
          })}
        </div>

        <div className="sv-screen-phone mx-auto overflow-hidden" style={{ maxWidth: 280, minHeight: 460 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screens[active].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: 460, height: '100%' }}
            >
              {screens[active].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
