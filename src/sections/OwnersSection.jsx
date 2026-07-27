import { motion } from 'framer-motion'
import {
  CalendarCheck, TrendingUp, Users, CreditCard, QrCode,
  BarChart3, Wifi, Star, Building2,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const ownerFeatures = [
  { icon: CalendarCheck, title: 'Manage Bookings',   desc: 'Accept or reschedule bookings with one tap.',                color: '#2563EB' },
  { icon: BarChart3,     title: 'Revenue Analytics', desc: 'Track daily, weekly & monthly earnings in detail.',           color: '#10B981' },
  { icon: Users,         title: 'Customer Mgmt',     desc: 'Know your regulars and keep them coming back.',               color: '#8B5CF6' },
  { icon: CreditCard,    title: 'Online Payments',   desc: 'Receive payments online. Zero hassle, instant credit.',       color: '#F59E0B' },
  { icon: QrCode,        title: 'QR Payments',       desc: 'Generate QR codes for on-site quick payments.',               color: '#06B6D4' },
  { icon: Wifi,          title: 'Live Availability', desc: 'Update slot availability in real time from anywhere.',        color: '#EF4444' },
  { icon: Star,          title: 'Ratings & Reviews', desc: 'Build trust with verified player reviews.',                   color: '#F97316' },
  { icon: TrendingUp,    title: 'Booking Analytics', desc: 'Visualise peak hours, popular sports & more.',               color: '#EC4899' },
]

/**
 * Revenue Dashboard Mockup.
 */
function DashboardMockup() {
  const days   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const values = [38, 60, 52, 78, 68, 96, 82]

  return (
    <div className="premium-card p-6 space-y-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/45 uppercase tracking-widest font-medium">Owner Dashboard</p>
          <p
            className="text-lg font-bold text-white mt-0.5"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Greenfield Arena
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <Building2 size={17} className="text-white" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Today Revenue', value: '₹8,400', color: '#10B981' },
          { label: 'Bookings',      value: '14',      color: '#2563EB' },
          { label: 'Rating',        value: '4.8 ★',   color: '#F59E0B' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="p-3 rounded-2xl text-center"
            style={{ background: color + '10', border: `1px solid ${color}22` }}
          >
            <p className="text-lg font-bold leading-tight" style={{ color, fontFamily: 'Space Grotesk, sans-serif' }}>
              {value}
            </p>
            <p className="text-[11px] text-white/48 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div>
        <p className="text-[11px] text-white/45 mb-3 uppercase tracking-widest font-medium">Weekly Revenue</p>
        <div className="flex items-end gap-2" style={{ height: 88 }}>
          {days.map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: `${values[i]}%`,
                  background: i === 5
                    ? 'linear-gradient(180deg, #2563EB, #10B981)'
                    : 'rgba(37,99,235,0.28)',
                  borderRadius: '4px 4px 0 0',
                  transformOrigin: 'bottom',
                  minHeight: 4,
                  width: '100%',
                }}
              />
              <p className="text-[10px] text-white/38">{day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <div>
        <p className="text-[11px] text-white/45 mb-3 uppercase tracking-widest font-medium">Recent Bookings</p>
        <div className="space-y-0">
          {[
            { name: 'Arjun S.',  time: '6 PM – 7 PM',  sport: '🏏', status: 'Confirmed' },
            { name: 'Team FC',   time: '7 PM – 8 PM',  sport: '⚽', status: 'Pending'   },
            { name: 'Priya M.', time: '8 PM – 9 PM',  sport: '🏸', status: 'Confirmed' },
          ].map((b) => (
            <div
              key={b.name}
              className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0"
            >
              <span className="text-lg flex-shrink-0">{b.sport}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate">{b.name}</p>
                <p className="text-[11px] text-white/40">{b.time}</p>
              </div>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background: b.status === 'Confirmed' ? 'rgba(16,185,129,0.14)' : 'rgba(245,158,11,0.14)',
                  color:      b.status === 'Confirmed' ? '#10B981' : '#F59E0B',
                }}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Owners Section – turf business growth with dashboard mockup.
 */
export default function OwnersSection() {
  return (
    <section
      id="owners"
      className="section-padding relative overflow-hidden"
      aria-labelledby="owners-title"
    >
      <AnimatedBlobs variant="green" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="For Turf Owners"
          title={`Grow Your Turf<br/><span class="gradient-text">Business</span>`}
          subtitle="Join hundreds of turf owners already using SportVerse to fill slots, get paid, and delight customers."
        />

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* ── Left – Feature Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {ownerFeatures.map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  className="premium-card p-5 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                    style={{ background: color + '15', border: `1.5px solid ${color}28` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-white mb-1">{title}</h3>
                  <p className="text-[12px] text-white/52 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-green mt-8 flex items-center gap-2"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Register Your Turf on SportVerse"
            >
              <Building2 size={17} />
              Register Your Turf
            </motion.button>
          </motion.div>

          {/* ── Right – Dashboard Mockup ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
