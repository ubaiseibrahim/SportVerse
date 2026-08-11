import { motion } from 'framer-motion'
import { Search, CalendarClock, ShieldCheck, PartyPopper, ArrowRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeUp } from '../utils/animations'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Find Turf',
    description: 'Search for turfs near you based on sport, date, time, and location filters.',
    color: '#FFD400',
  },
  {
    step: '02',
    icon: CalendarClock,
    title: 'Choose Slot',
    description: 'Pick the perfect slot from real-time availability across your preferred venues.',
    color: '#E6BF00',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Pay Securely',
    description: 'Pay safely via UPI, cards, or QR. Instant confirmation sent to your phone.',
    color: '#FFD400',
  },
  {
    step: '04',
    icon: PartyPopper,
    title: 'Play & Enjoy',
    description: 'Show your booking QR at the venue and enjoy your game. That simple!',
    color: '#FFD400',
  },
]

function StepCard({ step, icon: Icon, title, description, color, index, isLast }) {
  return (
    <div className="position-relative h-100">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
        transition={{ delay: index * 0.1 }}
        className="sv-step-card d-flex flex-column align-items-center"
      >
        <span
          className="sv-step-num"
          style={{ background: `${color}20`, border: `1.5px solid ${color}45`, color }}
        >
          {step}
        </span>

        <div
          className="sv-step-icon-wrap"
          style={{
            background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)`,
            border: `1.5px solid ${color}35`,
            boxShadow: `0 8px 28px ${color}22`,
          }}
        >
          <Icon size={30} style={{ color }} />
        </div>

        <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{title}</h3>
        <p className="sv-text-muted mb-0 text-center" style={{ fontSize: '0.84rem', lineHeight: 1.68 }}>{description}</p>
      </motion.div>

      {!isLast && (
        <div
          className="d-none d-lg-flex align-items-center justify-content-center position-absolute top-50 start-100 translate-middle"
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 3,
          }}
        >
          <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </div>
      )}
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="sv-section bg-glow-center">
      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="How It Works"
          title={`Book a Turf in <span class="sv-gradient-text">4 Simple Steps</span>`}
          subtitle="From searching to playing — the entire journey takes less than 60 seconds."
        />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
          {steps.map((step, i) => (
            <div key={step.step} className="col">
              <StepCard {...step} index={i} isLast={i === steps.length - 1} />
            </div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <button
            onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
            className="sv-btn sv-btn-primary"
            style={{ fontSize: 15, padding: '14px 32px' }}
          >
            Start Booking Now →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
