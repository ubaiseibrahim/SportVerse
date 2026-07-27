import { motion } from 'framer-motion'
import {
  CalendarCheck, TrendingUp, Users, CreditCard, QrCode,
  BarChart3, Wifi, Star, Building2,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const ownerFeatures = [
  { icon: CalendarCheck, title: 'Manage Bookings',   desc: 'Accept or reschedule bookings with one tap.',                color: '#3B82F6' },
  { icon: BarChart3,     title: 'Revenue Analytics', desc: 'Track daily, weekly & monthly earnings in detail.',           color: '#10B981' },
  { icon: Users,         title: 'Customer Mgmt',     desc: 'Know your regulars and keep them coming back.',               color: '#8B5CF6' },
  { icon: CreditCard,    title: 'Online Payments',   desc: 'Receive payments online. Zero hassle, instant credit.',       color: '#F59E0B' },
  { icon: QrCode,        title: 'QR Payments',       desc: 'Generate QR codes for on-site quick payments.',               color: '#06B6D4' },
  { icon: Wifi,          title: 'Live Availability', desc: 'Update slot availability in real time from anywhere.',        color: '#EF4444' },
  { icon: Star,          title: 'Ratings & Reviews', desc: 'Build trust with verified player reviews.',                   color: '#F97316' },
  { icon: TrendingUp,    title: 'Booking Analytics', desc: 'Visualise peak hours, popular sports & more.',               color: '#EC4899' },
]

function DashboardMockup() {
  const days   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const values = [38, 60, 52, 78, 68, 96, 82]

  return (
    <div className="sv-dashboard">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <p className="fs-7 text-uppercase tracking-wider sv-text-dim fw-bold mb-1">
            Owner Dashboard
          </p>
          <h3 className="fs-5 fw-bold text-white mb-0">
            Greenfield Arena
          </h3>
        </div>
        <div className="sv-icon-box sv-gradient-bg mb-0" style={{ width: 44, height: 44, borderRadius: 12 }}>
          <Building2 size={18} className="text-white" />
        </div>
      </div>

      <div className="row g-2 mb-4">
        {[
          { label: 'Today Revenue', value: '₹8,400', color: '#10B981' },
          { label: 'Bookings',      value: '14',      color: '#3B82F6' },
          { label: 'Rating',        value: '4.8 ★',   color: '#F59E0B' },
        ].map(({ label, value, color }) => (
          <div key={label} className="col-4">
            <div className="sv-mini-stat" style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
              <div className="sv-mini-stat-val" style={{ color }}>{value}</div>
              <div className="sv-mini-stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="fs-7 text-uppercase tracking-wider sv-text-dim fw-bold mb-3">
          Weekly Revenue
        </p>
        <div className="d-flex align-items-end gap-2" style={{ height: 90 }}>
          {days.map((day, i) => (
            <div key={day} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
              <div
                className="sv-bar"
                style={{
                  height: `${values[i]}%`,
                  background: i === 5 ? 'linear-gradient(180deg, #3B82F6, #10B981)' : 'rgba(59,130,246,0.25)',
                }}
              />
              <span className="fs-7 sv-text-dim" style={{ fontSize: 10 }}>{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="fs-7 text-uppercase tracking-wider sv-text-dim fw-bold mb-2">
          Recent Bookings
        </p>
        <div>
          {[
            { name: 'Arjun S.',  time: '6 PM – 7 PM',  sport: '🏏', status: 'Confirmed' },
            { name: 'Team FC',   time: '7 PM – 8 PM',  sport: '⚽', status: 'Pending'   },
            { name: 'Priya M.', time: '8 PM – 9 PM',  sport: '🏸', status: 'Confirmed' },
          ].map((b) => (
            <div key={b.name} className="sv-booking-row">
              <span className="fs-5">{b.sport}</span>
              <div className="flex-grow-1 min-w-0">
                <p className="mb-0 fs-7 fw-bold text-white text-truncate">{b.name}</p>
                <p className="mb-0 fs-7 sv-text-dim" style={{ fontSize: 11 }}>{b.time}</p>
              </div>
              <span
                className="sv-status-pill"
                style={{
                  background: b.status === 'Confirmed' ? 'rgba(16,185,129,0.14)' : 'rgba(245,158,11,0.14)',
                  color:      b.status === 'Confirmed' ? '#34D399' : '#FBBF24',
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

      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="For Turf Owners"
          title={`Grow Your Turf <span class="sv-gradient-text-green">Business</span>`}
          subtitle="Join hundreds of turf owners already using SportVerse to fill slots, get paid, and delight customers."
        />

        <div className="row g-5 align-items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="col-lg-6"
          >
            <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4">
              {ownerFeatures.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="col">
                  <motion.div variants={fadeUp} className="sv-owner-card">
                    <div
                      className="sv-icon-box mb-3"
                      style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: `${color}15`, border: `1.5px solid ${color}28`,
                      }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="fs-6 fw-bold text-white mb-1">{title}</h3>
                    <p className="fs-7 sv-text-muted mb-0 leading-relaxed">{desc}</p>
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
              <Building2 size={17} />
              Register Your Turf
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="col-lg-6"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
