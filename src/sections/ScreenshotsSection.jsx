import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeUp } from '../utils/animations'

/* ── Phone screen content ── */
const screens = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-white/50 text-xs">Good Evening</p>
            <p className="text-white font-bold text-sm">Arjun Kumar 👋</p>
          </div>
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">AK</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3">
          <p className="text-xs text-blue-300 mb-1">🔥 Today's Highlight</p>
          <p className="text-white text-xs font-medium">City League Final – Live Now!</p>
        </div>
        {['Cricket', 'Football', 'Badminton'].map((s) => (
          <div key={s} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="text-base">{s === 'Cricket' ? '🏏' : s === 'Football' ? '⚽' : '🏸'}</span>
            <span className="text-white text-xs font-medium">{s}</span>
            <span className="ml-auto text-xs text-green-400">12 turfs</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'nearby',
    label: 'Nearby Turf',
    icon: '📍',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider">Nearby Turfs</p>
        {[
          { name: 'Green Arena',    dist: '0.4 km', price: '₹600/hr', rating: '4.8', sport: '🏏⚽' },
          { name: 'Sports Hub',     dist: '1.2 km', price: '₹500/hr', rating: '4.6', sport: '🏸🏀' },
          { name: 'Victory Ground', dist: '2.1 km', price: '₹450/hr', rating: '4.5', sport: '⚽🏏' },
        ].map((t) => (
          <div key={t.name} className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex justify-between items-start mb-1">
              <p className="text-white text-xs font-semibold">{t.name}</p>
              <span className="text-yellow-400 text-xs">★ {t.rating}</span>
            </div>
            <p className="text-xs text-white/40">{t.dist} · {t.sport}</p>
            <p className="text-xs text-blue-400 font-semibold mt-1">{t.price}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'booking',
    label: 'Booking',
    icon: '📅',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider">Book a Slot</p>
        <div className="rounded-2xl p-3" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
          <p className="text-white text-sm font-bold">Green Arena</p>
          <p className="text-xs text-white/50">Cricket · Sunday</p>
        </div>
        <p className="text-xs text-white/50">Select Time Slot</p>
        <div className="grid grid-cols-3 gap-1.5">
          {['6 AM', '7 AM', '8 AM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'].map((t, i) => (
            <div key={t} className="py-2 rounded-xl text-center text-xs font-medium"
              style={{
                background: i === 4 ? 'linear-gradient(135deg,#2563EB,#10B981)' : i === 0 || i === 3 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                color: i === 4 ? 'white' : i === 0 || i === 3 ? '#EF4444' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${i === 4 ? 'transparent' : i === 0 || i === 3 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'}`,
              }}
            >{t}</div>
          ))}
        </div>
        <div className="py-2.5 rounded-xl text-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
          Pay ₹600 →
        </div>
      </div>
    ),
  },
  {
    id: 'tournament',
    label: 'Tournament',
    icon: '🏆',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider">Live Tournaments</p>
        {[
          { name: 'City Cricket League', teams: 16, status: 'Live', prize: '₹50K' },
          { name: 'Football Cup S3',     teams: 8,  status: 'Reg.',  prize: '₹25K' },
          { name: 'Badminton Open',      teams: 32, status: 'Live', prize: '₹15K' },
        ].map((t) => (
          <div key={t.name} className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-white text-xs font-semibold">{t.name}</p>
              <span className={`text-xs font-bold ${t.status === 'Live' ? 'text-red-400' : 'text-green-400'}`}>
                {t.status === 'Live' ? '🔴' : '🟢'} {t.status}
              </span>
            </div>
            <p className="text-xs text-white/40">{t.teams} Teams · Prize: {t.prize}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'livescore',
    label: 'Live Score',
    icon: '📊',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Live Score</p>
        </div>
        <div className="rounded-2xl p-3" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
          <p className="text-xs text-white/50 mb-2">City League – Final</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-white font-bold text-sm">Royal XI</p>
              <p className="text-xl font-bold text-blue-400">156/4</p>
              <p className="text-xs text-white/40">(18.2 ov)</p>
            </div>
            <p className="text-white/30 text-lg font-bold">vs</p>
            <div className="text-center">
              <p className="text-white font-bold text-sm">Storm FC</p>
              <p className="text-xl font-bold text-green-400">Yet to bat</p>
              <p className="text-xs text-white/40">Target: 157</p>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {[
            { name: 'Arjun S.', stat: '42 (28)', role: 'Batting' },
            { name: 'Rahul K.', stat: '38* (22)', role: 'Batting' },
            { name: 'Priya M.', stat: '2/24',     role: 'Bowling' },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-2 py-1.5 border-b border-white/5">
              <span className="text-white text-xs font-medium flex-1">{p.name}</span>
              <span className="text-xs text-white/40">{p.role}</span>
              <span className="text-blue-400 text-xs font-bold">{p.stat}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'auction',
    label: 'Auction',
    icon: '🔨',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Live Auction</p>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <span className="text-4xl">🏏</span>
          <p className="text-white font-bold mt-2">Sneha Iyer</p>
          <p className="text-xs text-white/50">All-Rounder · Base ₹50K</p>
          <p className="text-yellow-400 text-2xl font-bold mt-2">₹1,80,000</p>
          <p className="text-xs text-white/40">Current Bid · Blue Bulls</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['₹10K', '₹25K', '₹50K', '₹1L'].map((a) => (
            <div key={a} className="py-2 rounded-xl text-center text-xs font-bold text-yellow-300" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
              +{a}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: '🏟',
    bg: 'linear-gradient(180deg, #111827 0%, #1E2535 100%)',
    content: (
      <div className="p-4 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider">Owner Dashboard</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Revenue', value: '₹8.4K', color: '#10B981' },
            { label: 'Bookings', value: '14',  color: '#2563EB' },
            { label: 'Rating',   value: '4.8★', color: '#F59E0B' },
            { label: 'Slots',    value: '6/8',  color: '#8B5CF6' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 rounded-2xl text-center" style={{ background: color + '12', border: `1px solid ${color}25` }}>
              <p className="text-base font-bold" style={{ color }}>{value}</p>
              <p className="text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/50 uppercase tracking-wider">Today's Bookings</p>
        {['6 PM - 7 PM · 🏏 Cricket', '7 PM - 8 PM · ⚽ Football', '8 PM - 9 PM · 🏸 Badminton'].map((b) => (
          <div key={b} className="py-2 px-3 rounded-xl text-xs text-white/70" style={{ background: 'rgba(255,255,255,0.05)' }}>{b}</div>
        ))}
      </div>
    ),
  },
]

/**
 * Phone Frame SVG wrapper.
 */
function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto" style={{ width: 260 }}>
      {/* Outer bezel */}
      <div
        className="rounded-[44px] p-[2px] shadow-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))' }}
      >
        <div
          className="rounded-[42px] overflow-hidden relative"
          style={{ background: '#0A0F1C', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-2 bg-black/40">
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="w-16 h-4 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-0" />
            <div className="flex gap-1">
              <div className="w-3 h-2 rounded-sm bg-white/60" />
            </div>
          </div>
          {/* Screen */}
          <div className="h-[500px] overflow-hidden relative" aria-live="polite">
            {children}
          </div>
          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-black/20">
            <div className="w-20 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
      {/* Side button */}
      <div className="absolute right-[-3px] top-20 w-[3px] h-12 bg-white/20 rounded-l-sm" aria-hidden="true" />
      {/* Volume buttons */}
      <div className="absolute left-[-3px] top-16 w-[3px] h-8 bg-white/20 rounded-r-sm" aria-hidden="true" />
      <div className="absolute left-[-3px] top-28 w-[3px] h-8 bg-white/20 rounded-r-sm" aria-hidden="true" />
    </div>
  )
}

/**
 * Screenshots Section – phone carousel.
 */
export default function ScreenshotsSection() {
  const [current, setCurrent] = useState(0)

  /* Auto-advance every 3s */
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % screens.length), 3000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + screens.length) % screens.length)
  const next = () => setCurrent((c) => (c + 1) % screens.length)

  return (
    <section
      id="screenshots"
      className="section-padding relative overflow-hidden"
      aria-labelledby="screenshots-title"
    >
      {/* Gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="App Preview"
          title={`See SportVerse\n<span class="gradient-text">In Action</span>`}
          subtitle="Seven powerful screens. One seamless sports experience."
        />

        {/* Carousel + phone */}
        <div className="flex flex-col items-center gap-8">

          {/* Phone + side arrows (arrows only visible on md+) */}
          <div className="flex items-center gap-6">
            {/* Left arrow – desktop only */}
            <button
              onClick={prev}
              className="hidden md:flex w-11 h-11 rounded-full glass items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Previous screen"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-y-auto"
                  style={{ background: screens[current].bg }}
                >
                  {screens[current].content}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            {/* Right arrow – desktop only */}
            <button
              onClick={next}
              className="hidden md:flex w-11 h-11 rounded-full glass items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Next screen"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* Mobile prev/next row */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Previous">
              <ChevronLeft size={18} className="text-white" />
            </button>
            <span className="text-white/40 text-sm font-medium">{screens[current].label}</span>
            <button onClick={next} className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Next">
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>

          {/* Tabs – horizontal scroll on mobile */}
          <div className="w-full overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-2 w-max mx-auto px-4">
              {screens.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0"
                  style={{
                    background: current === i ? 'linear-gradient(135deg, #2563EB, #10B981)' : 'rgba(255,255,255,0.06)',
                    color: current === i ? 'white' : 'rgba(255,255,255,0.55)',
                    border: current === i ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}
                  aria-pressed={current === i}
                  aria-label={`View ${s.label} screen`}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
