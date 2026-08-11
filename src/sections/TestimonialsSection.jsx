import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Award, Building2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'

const testimonials = [
  {
    id: 1,
    name: 'Rahul Krishnan',
    role: 'Cricket Player · Chennai',
    icon: Trophy,
    iconColor: '#FFD400',
    avatarBg: 'rgba(230,191,0,0.2)',
    rating: 5,
    review: "ScoreVerse completely changed how I book turfs! Earlier I had to call 5-6 places, now it's done in under a minute. The live slot view is a game changer. Best sports app in India hands down.",
  },
  {
    id: 2,
    name: 'Meera Nair',
    role: 'Tournament Organizer · Kochi',
    icon: Award,
    iconColor: '#FFD400',
    avatarBg: 'rgba(255,212,0,0.2)',
    rating: 5,
    review: "I organized a 32-team cricket knockout league through ScoreVerse. The automatic fixture generator, live scoring, and leaderboards saved me 20+ hours of manual work. Absolutely outstanding!",
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Turf Owner · Delhi',
    icon: Building2,
    iconColor: '#FFD400',
    avatarBg: 'rgba(245,158,11,0.2)',
    rating: 5,
    review: "Since listing on ScoreVerse, my bookings went up by 70%. The owner dashboard is clean, payments are instant, and customer management is a breeze. I'd recommend this to every turf owner.",
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="sv-section bg-dark-alt">
      <AnimatedBlobs variant="default" />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="Testimonials"
          title={`Loved by <span class="sv-gradient-text">Players & Owners</span>`}
          subtitle="See what our community has to say about their ScoreVerse experience."
        />

        {/* Desktop: 3 cards side by side */}
        <div className="d-none d-md-block">
          <div className="row g-4">
            {testimonials.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="col-md-4"
                >
                  <div
                    className="sv-testimonial-card"
                    style={{ cursor: 'default' }}
                  >
                    <span className="sv-quote-icon">"</span>
                    <div className="sv-stars mb-3">{'★'.repeat(t.rating)}</div>
                    <p
                      className="text-white mb-4"
                      style={{ fontWeight: 500, lineHeight: 1.75, fontSize: '0.93rem' }}
                    >
                      "{t.review}"
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <div className="sv-avatar" style={{ background: t.avatarBg }}>
                        <Icon size={18} style={{ color: t.iconColor }} />
                      </div>
                      <div>
                        <h4 className="text-white mb-0" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</h4>
                        <p className="sv-text-dim mb-0" style={{ fontSize: '0.78rem' }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: auto-carousel */}
        <div className="d-md-none">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="sv-testimonial-card position-relative">
                <span className="sv-quote-icon">"</span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonials[active].id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="sv-stars mb-3">{'★'.repeat(testimonials[active].rating)}</div>
                    <p className="text-white mb-4" style={{ fontWeight: 500, lineHeight: 1.75, fontSize: '0.95rem' }}>
                      "{testimonials[active].review}"
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      {(() => {
                        const Icon = testimonials[active].icon
                        return (
                          <div className="sv-avatar" style={{ background: testimonials[active].avatarBg }}>
                            <Icon size={18} style={{ color: testimonials[active].iconColor }} />
                          </div>
                        )
                      })()}
                      <div>
                        <h4 className="text-white mb-0" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{testimonials[active].name}</h4>
                        <p className="sv-text-dim mb-0" style={{ fontSize: '0.78rem' }}>{testimonials[active].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="border-0"
                      style={{
                        width: active === i ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: active === i ? '#FFD400' : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
