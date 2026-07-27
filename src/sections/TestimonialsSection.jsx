import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'

const testimonials = [
  {
    id: 1,
    name: 'Rahul Krishnan',
    role: 'Cricket Player · Chennai',
    avatar: '🏏',
    avatarBg: 'rgba(37,99,235,0.2)',
    rating: 5,
    review:
      'SportVerse completely changed how I book turfs! Earlier I had to call 5-6 places, now it\'s done in under a minute. The live slot view is a game changer. Best sports app in India hands down.',
  },
  {
    id: 2,
    name: 'Meera Nair',
    role: 'Tournament Organizer · Kochi',
    avatar: '🏆',
    avatarBg: 'rgba(16,185,129,0.2)',
    rating: 5,
    review:
      'I organized a 32-team cricket knockout league through SportVerse. The automatic fixture generator, live scoring, and leaderboards saved me 20+ hours of manual work. Absolutely outstanding!',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Turf Owner · Delhi',
    avatar: '🏟',
    avatarBg: 'rgba(245,158,11,0.2)',
    rating: 5,
    review:
      'Since listing on SportVerse, my bookings went up by 70%. The owner dashboard is clean, payments are instant, and customer management is a breeze. I\'d recommend this to every turf owner.',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    role: 'Badminton Player · Ahmedabad',
    avatar: '🏸',
    avatarBg: 'rgba(139,92,246,0.2)',
    rating: 5,
    review:
      'The player statistics feature is incredible! I can track my performance across every game, see trends, and compete on the leaderboard. It\'s like having a personal sports coach in my pocket.',
  },
  {
    id: 5,
    name: 'Aryan Mehta',
    role: 'Team Captain · Mumbai',
    avatar: '⚽',
    avatarBg: 'rgba(239,68,68,0.2)',
    rating: 5,
    review:
      'The player auction feature is insane! We ran a full IPL-style auction for our local football league with 10 teams. The live bidding, budget tracking, and team squads worked flawlessly.',
  },
]

/**
 * Testimonials Section – auto-sliding glassmorphism carousel.
 */
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  /* Auto-advance every 5s */
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <AnimatedBlobs variant="default" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Testimonials"
          title={`Loved by India's\n<span class="gradient-text">Sports Community</span>`}
          subtitle="Real reviews from real players, organizers, and turf owners."
        />

        {/* Main carousel */}
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {/* Decorative quote mark */}
              <Quote
                size={64}
                className="absolute top-6 right-6 opacity-[0.04]"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" className="text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/85 text-lg leading-relaxed mb-8 relative z-10">
                "{testimonials[current].review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: testimonials[current].avatarBg, border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[current].name}</p>
                  <p className="text-sm text-white/50">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: current === i ? 24 : 8,
                    height: 8,
                    background: current === i
                      ? 'linear-gradient(90deg, #2563EB, #10B981)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-pressed={current === i}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mini cards row — other reviews */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {testimonials.filter((_, i) => i !== current).slice(0, 3).map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ y: -3 }}
              onClick={() => setCurrent(testimonials.indexOf(t))}
              className="text-left p-5 rounded-2xl glass"
              style={{ border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: t.avatarBg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                "{t.review}"
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
