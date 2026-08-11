import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

const faqs = [
  { q: 'How do I book a turf on ScoreVerse?', a: "Simply download the ScoreVerse app, search for turfs near you, select your preferred sport and time slot, and pay securely online. You'll receive an instant booking confirmation with a QR code on your phone." },
  { q: 'How do I register my turf on ScoreVerse?', a: 'Click "Register Your Turf" on our website or app. Fill in your turf details — name, location, sports available, pricing, photos, and slot timing. Our team will verify and activate your listing within 24 hours.' },
  { q: 'Can I organize tournaments on ScoreVerse?', a: 'Absolutely! ScoreVerse supports League, Knockout, Round Robin, and Auction-based tournament formats. You can set fixtures, manage teams, track live scores, publish leaderboards, and manage prize distribution — all from one dashboard.' },
  { q: 'Can I conduct player auctions for my tournament?', a: 'Yes! ScoreVerse has a full IPL-style player auction system. Set team budgets, list players with profiles and base prices, and run live bidding sessions. The system auto-tracks spending and updates team squads in real time.' },
  { q: 'Are online payments on ScoreVerse secure?', a: 'All transactions are processed through RBI-compliant payment gateways with AES-256 encryption. We support UPI, debit/credit cards, net banking, and QR payments.' },
  { q: 'Is ScoreVerse free to use for players?', a: 'Yes! ScoreVerse is completely free to download and use for players. You only pay for what you book — turf fees and tournament registrations.' },
]

function FAQItem({ q, a, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={`accordion-item ${open ? 'border-primary' : ''}`}
      style={{ transition: 'all 0.25s ease' }}
    >
      <h2 className="accordion-header">
        <button
          onClick={() => setOpen(!open)}
          className={`accordion-button ${open ? '' : 'collapsed'} d-flex align-items-center justify-content-between`}
          type="button"
          aria-expanded={open}
        >
          <div className="d-flex align-items-center me-3">
            <span className="sv-faq-num">{String(index + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.93rem' }}>{q}</span>
          </div>
          <ChevronDown
            size={17}
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              color: open ? '#FFD400' : 'rgba(255,255,255,0.35)',
              flexShrink: 0,
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
            <div className="accordion-body sv-text-muted" style={{ lineHeight: 1.78, fontSize: '0.88rem' }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const half = Math.ceil(faqs.length / 2)
  const col1 = faqs.slice(0, half)
  const col2 = faqs.slice(half)

  return (
    <section id="faq" className="sv-section bg-glow-center">
      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="FAQ"
          title={`Got Questions?<br/><span class="sv-gradient-text">We've Got Answers</span>`}
          subtitle="Everything you need to know about ScoreVerse."
        />

        {/* Desktop: two-column layout */}
        <div className="d-none d-md-block">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="accordion sv-faq">
                {col1.map((faq, i) => (
                  <FAQItem key={i} index={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="accordion sv-faq">
                {col2.map((faq, i) => (
                  <FAQItem key={i + half} index={i + half} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="d-md-none">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="accordion sv-faq">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} index={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
