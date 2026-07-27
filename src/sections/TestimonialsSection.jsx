import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Trophy, Award, Building2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'

const testimonials = [
  {
    id: 1,
    name: 'Rahul Krishnan',
    role: 'Cricket Player · Chennai',
    icon: Trophy,
    iconColor: '#3B82F6',
    avatarBg: 'rgba(37,99,235,0.2)',
    rating: 5,
    review: "SportVerse completely changed how I book turfs! Earlier I had to call 5-6 places, now it's done in under a minute. The live slot view is a game changer. Best sports app in India hands down.",
  },
  {
    id: 2,
    name: 'Meera Nair',
    role: 'Tournament Organizer · Kochi',
    icon: Award,
    iconColor: '#10B981',
    avatarBg: 'rgba(16,185,129,0.2)',
    rating: 5,
    review: "I organized a 32-team cricket knockout league through SportVerse. The automatic fixture generator, live scoring, and leaderboards saved me 20+ hours of manual work. Absolutely outstanding!",
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Turf Owner · Delhi',
    icon: Building2,
    iconColor: '#F59E0B',
    avatarBg: 'rgba(245,158,11,0.2)',
    rating: 5,
    review: "Since listing on SportVerse, my bookings went up by 70%. The owner dashboard is clean, payments are instant, and customer management is a breeze. I'd recommend this to every turf owner.",
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

      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Testimonials"
          title={`Loved by <span class="sv-gradient-text">Players & Owners</span>`}
          subtitle="See what our community has to say about their SportVerse experience."
        />

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="sv-testimonial-card position-relative">
              <span className="sv-quote-icon">“</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[active].id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="sv-stars mb-3">
                    {'★'.repeat(testimonials[active].rating)}
                  </div>
                  <p className="fs-5 text-white fw-medium leading-relaxed mb-4">
                    "{testimonials[active].review}"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    {(() => {
                      const Icon = testimonials[active].icon
                      return (
                        <div className="sv-avatar" style={{ background: testimonials[active].avatarBg }}>
                          <Icon size={20} style={{ color: testimonials[active].iconColor }} />
                        </div>
                      )
                    })()}
                    <div>
                      <h4 className="fs-6 fw-bold text-white mb-0">{testimonials[active].name}</h4>
                      <p className="fs-7 sv-text-dim mb-0">{testimonials[active].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="d-flex justify-content-center gap-2 mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="border-0 rounded-circle"
                    style={{
                      width: active === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: active === i ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
