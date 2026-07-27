import { motion } from 'framer-motion'
import { Search, CalendarClock, ShieldCheck, PartyPopper } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeUp } from '../utils/animations'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Find Turf',
    description: 'Search for turfs near you based on sport, date, time, and location filters.',
    color: '#2563EB',
    glow: 'rgba(37,99,235,0.3)',
  },
  {
    step: '02',
    icon: CalendarClock,
    title: 'Choose Slot',
    description: 'Pick the perfect slot from real-time availability across your preferred venues.',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Pay Securely',
    description: 'Pay safely via UPI, cards, or QR. Instant confirmation sent to your phone.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    step: '04',
    icon: PartyPopper,
    title: 'Play & Enjoy',
    description: 'Show your booking QR at the venue and enjoy your game. That simple!',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
  },
]

/**
 * Individual timeline step card.
 */
function StepCard({ step, icon: Icon, title, description, color, glow, index, isLast }) {
  return (
    <div className="flex flex-col items-center relative">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: index * 0.15 }}
        className="premium-card w-full p-6 text-center h-full"
        style={{ border: `1px solid ${color}30` }}
      >
        {/* Step number */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold tracking-widest"
          style={{ background: color, color: 'white' }}
        >
          STEP {step}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg"
          style={{ background: color + '18', border: `1.5px solid ${color}40` }}
        >
          <Icon size={28} style={{ color }} />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
      </motion.div>

      {/* Connector arrow between steps */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.15 }}
          className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-10"
          aria-hidden="true"
        >
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path
              d="M0 12 H24 M20 6 L28 12 L20 18"
              stroke="url(#arrow-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="arrow-gradient" x1="0" y1="0" x2="32" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </div>
  )
}

/**
 * How It Works Section – animated timeline with 4 steps.
 */
export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Subtle separator gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="How It Works"
          title={`Book a Turf in\n<span class="gradient-text">4 Simple Steps</span>`}
          subtitle="From searching to playing — the entire journey takes less than 60 seconds."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <StepCard key={step.step} {...step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            aria-label="Start Booking Now"
          >
            Start Booking Now →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
