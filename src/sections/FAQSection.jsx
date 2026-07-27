import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

const faqs = [
  { q: 'How do I book a turf on SportVerse?', a: 'Simply download the SportVerse app, search for turfs near you, select your preferred sport and time slot, and pay securely online. You\'ll receive an instant booking confirmation with a QR code on your phone.' },
  { q: 'How do I register my turf on SportVerse?', a: 'Click "Register Your Turf" on our website or app. Fill in your turf details — name, location, sports available, pricing, photos, and slot timing. Our team will verify and activate your listing within 24 hours.' },
  { q: 'Can I organize tournaments on SportVerse?', a: 'Absolutely! SportVerse supports League, Knockout, Round Robin, and Auction-based tournament formats. You can set fixtures, manage teams, track live scores, publish leaderboards, and manage prize distribution — all from one dashboard.' },
  { q: 'Can I conduct player auctions for my tournament?', a: 'Yes! SportVerse has a full IPL-style player auction system. Set team budgets, list players with profiles and base prices, and run live bidding sessions. The system auto-tracks spending and updates team squads in real time.' },
  { q: 'Are online payments on SportVerse secure?', a: 'All transactions are processed through RBI-compliant payment gateways with AES-256 encryption. We support UPI, debit/credit cards, net banking, and QR payments.' },
  { q: 'Is SportVerse free to use for players?', a: 'Yes! SportVerse is completely free to download and use for players. You only pay for what you book — turf fees and tournament registrations.' },
]

function FAQItem({ q, a, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`accordion-item ${open ? 'border-primary' : ''}`} style={{ transition: 'all 0.25s ease' }}>
      <h2 className="accordion-header">
        <button
          onClick={() => setOpen(!open)}
          className={`accordion-button ${open ? '' : 'collapsed'} d-flex align-items-center justify-content-between`}
          type="button"
          aria-expanded={open}
        >
          <div className="d-flex align-items-center me-3">
            <span className="sv-faq-num">{String(index + 1).padStart(2, '0')}</span>
            <span>{q}</span>
          </div>
          <ChevronDown
            size={18}
            className="flex-shrink-0 transition-transform"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              color: open ? '#3B82F6' : 'rgba(255,255,255,0.4)',
            }}
          />
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="accordion-body text-white-50">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" className="sv-section bg-glow-center">
      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="FAQ"
          title={`Got Questions?<br/><span class="sv-gradient-text">We've Got Answers</span>`}
          subtitle="Everything you need to know about SportVerse."
        />

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion sv-faq">
              {faqs.map((faq, i) => (
                <FAQItem key={i} index={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
