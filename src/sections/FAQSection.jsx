import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeUp, containerVariants } from '../utils/animations'

const faqs = [
  {
    q: 'How do I book a turf on SportVerse?',
    a: 'Simply download the SportVerse app, search for turfs near you, select your preferred sport and time slot, and pay securely online. You\'ll receive an instant booking confirmation with a QR code on your phone.',
  },
  {
    q: 'How do I register my turf on SportVerse?',
    a: 'Click "Register Your Turf" on our website or app. Fill in your turf details — name, location, sports available, pricing, photos, and slot timing. Our team will verify and activate your listing within 24 hours.',
  },
  {
    q: 'Can I organize tournaments on SportVerse?',
    a: 'Absolutely! SportVerse supports League, Knockout, Round Robin, and Auction-based tournament formats. You can set fixtures, manage teams, track live scores, publish leaderboards, and manage prize distribution — all from one dashboard.',
  },
  {
    q: 'Can I conduct player auctions for my tournament?',
    a: 'Yes! SportVerse has a full IPL-style player auction system. Set team budgets, list players with profiles and base prices, and run live bidding sessions. The system auto-tracks spending and updates team squads in real time.',
  },
  {
    q: 'Are online payments on SportVerse secure?',
    a: 'Absolutely. All transactions are processed through RBI-compliant payment gateways with AES-256 encryption. We support UPI, debit/credit cards, net banking, and QR payments. Refunds are processed within 3-5 business days if applicable.',
  },
  {
    q: 'Is SportVerse free to use for players?',
    a: 'Yes! SportVerse is completely free to download and use for players. You only pay for what you book — turf fees and tournament registrations. There are no hidden charges or subscription fees for players.',
  },
  {
    q: 'What sports does SportVerse support?',
    a: 'SportVerse supports Cricket, Football, Badminton, Pickleball, Basketball, Volleyball, Kabaddi, and more. We\'re continuously adding support for new sports based on community demand.',
  },
  {
    q: 'Does SportVerse have a mobile app?',
    a: 'SportVerse is available on Android (Google Play) and iOS (App Store). The app is fully optimized for mobile with offline booking history, push notifications, and a seamless booking experience.',
  },
]

/**
 * Individual accordion item with animated expand/collapse.
 */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'premium-card border-blue-500/30' : 'glass hover:bg-white/5 border-white/10'}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left group"
        aria-expanded={open}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        {/* Number badge */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: open ? 'linear-gradient(135deg, #2563EB, #10B981)' : 'rgba(255,255,255,0.08)', color: open ? 'white' : 'rgba(255,255,255,0.5)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <span className="flex-1 text-sm md:text-base font-medium text-white">
          {q}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={open ? 'text-blue-400' : 'text-white/40'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
          >
            <div className="px-5 pb-5 pl-16">
              <p className="text-white/60 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * FAQ Section – animated accordion.
 */
export default function FAQSection() {
  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      aria-labelledby="faq-title"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="FAQ"
          title={`Got Questions?\n<span class="gradient-text">We've Got Answers</span>`}
          subtitle="Everything you need to know about SportVerse."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} {...item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
