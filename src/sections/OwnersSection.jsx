import { motion } from 'framer-motion'
import {
  CalendarCheck, TrendingUp, Users, CreditCard, QrCode,
  BarChart3, Wifi, Star, Building2,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const ownerFeatures = [
  { icon: CalendarCheck, title: 'Manage Bookings',   desc: 'Accept or reschedule bookings with one tap.',                color: '#FFD400' },
  { icon: BarChart3,     title: 'Revenue Analytics', desc: 'Track daily, weekly & monthly earnings in detail.',           color: '#FFD400' },
  { icon: Users,         title: 'Customer Mgmt',     desc: 'Know your regulars and keep them coming back.',               color: '#E6BF00' },
  { icon: CreditCard,    title: 'Online Payments',   desc: 'Receive payments online. Zero hassle, instant credit.',       color: '#FFD400' },
  { icon: QrCode,        title: 'QR Payments',       desc: 'Generate QR codes for on-site quick payments.',               color: '#FFD400' },
  { icon: Wifi,          title: 'Live Availability', desc: 'Update slot availability in real time from anywhere.',        color: '#FFD400' },
  { icon: Star,          title: 'Ratings & Reviews', desc: 'Build trust with verified player reviews.',                   color: '#FFD400' },
  { icon: TrendingUp,    title: 'Booking Analytics', desc: 'Visualise peak hours, popular sports & more.',               color: '#FFD400' },
]

function DashboardMockup() {
  const days   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const values = [38, 60, 52, 78, 68, 96, 82]

  return (
    <div className="sv-dashboard">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }} className="mb-1">
            Owner Dashboard
          </p>
          <h3 className="text-white mb-0" style={{ fontWeight: 700, fontSize: '1.05rem' }}>
            Greenfield Arena
          </h3>
        </div>
        <div
          className="sv-icon-box sv-gradient-bg mb-0 d-flex align-items-center justify-content-center"
          style={{ width: 42, height: 42, borderRadius: 12 }}
        >
          <Building2 size={16} className="text-dark" />
        </div>
      </div>

      <div className="row g-2 mb-4">
        {[
          { label: 'Today Revenue', value: '₹8,400', color: '#FFD400' },
          { label: 'Bookings',      value: '14',      color: '#FFD400' },
          { label: 'Rating',        value: '4.8 ★',   color: '#FFD400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="col-4">
            <div className="sv-mini-stat" style={{ background: `${color}0e`, border: `1px solid ${color}22` }}>
              <div className="sv-mini-stat-val" style={{ color }}>{value}</div>
              <div className="sv-mini-stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }} className="mb-3">
          Weekly Revenue
        </p>
        <div className="d-flex align-items-end gap-2" style={{ height: 85 }}>
          {days.map((day, i) => (
            <div key={day} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
              <div
                className="sv-bar"
                style={{
                  height: `${values[i]}%`,
                  background: i === 5
                    ? 'linear-gradient(180deg, #FFD400, #FFD400)'
                    : 'rgba(255,212,0,0.18)',
                }}
              />
              <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)' }}>{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }} className="mb-2">
          Recent Bookings
        </p>
        <div>
          {[
            { name: 'Arjun S.',  time: '6 PM – 7 PM', sport: '🏏', status: 'Confirmed' },
            { name: 'Team FC',   time: '7 PM – 8 PM', sport: '⚽', status: 'Pending'   },
            { name: 'Priya M.', time: '8 PM – 9 PM',  sport: '🏸', status: 'Confirmed' },
          ].map((b) => (
            <div key={b.name} className="sv-booking-row">
              <span style={{ fontSize: '1.1rem' }}>{b.sport}</span>
              <div className="flex-grow-1 min-w-0">
                <p className="mb-0 text-white fw-bold text-truncate" style={{ fontSize: '0.82rem' }}>{b.name}</p>
                <p className="mb-0 sv-text-dim" style={{ fontSize: '0.7rem' }}>{b.time}</p>
              </div>
              <span
                className="sv-status-pill"
                style={{
                  background: b.status === 'Confirmed' ? 'rgba(255,212,0,0.12)' : 'rgba(251,191,36,0.12)',
                  color:      b.status === 'Confirmed' ? '#FFD400' : '#FFD400',
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

export default function OwnersSection() {
  return (
    <section id="owners" className="sv-section bg-dark-alt">
      <AnimatedBlobs variant="green" />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="For Turf Owners"
          title={`Grow Your Turf <span class="sv-gradient-text-green">Business</span>`}
          subtitle="Join hundreds of turf owners already using ScoreVerse to fill slots, get paid, and delight customers."
        />

        <div className="row g-5 align-items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="col-lg-6"
          >
            <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4">
              {ownerFeatures.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="col">
                  <motion.div variants={fadeUp} className="sv-owner-card">
                    <div
                      className="sv-icon-box mb-3"
                      style={{ width: 38, height: 38, borderRadius: 11, background: `${color}14`, border: `1.5px solid ${color}26` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</h3>
                    <p className="sv-text-muted mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.65 }}>{desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="sv-btn sv-btn-green"
            >
              <Building2 size={16} />
              Register Your Turf
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="col-lg-6"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
