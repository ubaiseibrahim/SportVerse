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
    color: '#3B82F6',
  },
  {
    step: '02',
    icon: CalendarClock,
    title: 'Choose Slot',
    description: 'Pick the perfect slot from real-time availability across your preferred venues.',
    color: '#8B5CF6',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Pay Securely',
    description: 'Pay safely via UPI, cards, or QR. Instant confirmation sent to your phone.',
    color: '#10B981',
  },
  {
    step: '04',
    icon: PartyPopper,
    title: 'Play & Enjoy',
    description: 'Show your booking QR at the venue and enjoy your game. That simple!',
    color: '#F59E0B',
  },
]

function StepCard({ step, icon: Icon, title, description, color, index, isLast }) {
  return (
    <div className="position-relative h-100">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.12 }}
        className="sv-step-card d-flex flex-column align-items-center"
      >
        <span
          className="sv-step-num"
          style={{
            background: `${color}22`,
            border: `1.5px solid ${color}50`,
            color,
          }}
        >
          {step}
        </span>

        <div
          className="sv-step-icon-wrap"
          style={{
            background: `linear-gradient(135deg, ${color}22 0%, ${color}0a 100%)`,
            border: `1.5px solid ${color}40`,
            boxShadow: `0 6px 24px ${color}20`,
          }}
        >
          <Icon size={30} style={{ color }} />
        </div>

        <h3 className="fs-5 fw-bold text-white mb-2">{title}</h3>
        <p className="fs-7 sv-text-muted mb-0 leading-relaxed">{description}</p>
      </motion.div>

      {!isLast && (
        <div
          className="d-none d-lg-flex align-items-center justify-content-center position-absolute top-50 start-100 translate-middle z-3"
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <ArrowRight size={14} className="text-white-50" />
        </div>
      )}
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="sv-section bg-glow-center">
      <div className="container-xl position-relative z-10">
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
          className="text-center mt-5"
        >
          <button
            onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
            className="sv-btn sv-btn-primary"
          >
            Start Booking Now →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
