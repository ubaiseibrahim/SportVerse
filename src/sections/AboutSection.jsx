import { motion } from 'framer-motion'
import { MapPin, Trophy, Activity, Users, BarChart3, Bell } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const features = [
  { icon: MapPin,    text: 'Book nearby turfs instantly' },
  { icon: Trophy,    text: 'Join & organize tournaments' },
  { icon: Activity,  text: 'Track live match scores' },
  { icon: BarChart3, text: 'View detailed player statistics' },
  { icon: Users,     text: 'Create & manage teams' },
  { icon: Bell,      text: 'Get smart push notifications' },
]

/**
 * About Section – "Everything Sports. One Platform."
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <AnimatedBlobs variant="green" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left – Text ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue text-blue-400 text-[11px] font-semibold uppercase tracking-[0.12em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              About SportVerse
            </div>

            <h2
              id="about-title"
              className="text-section-title text-white mb-5"
            >
              Everything Sports.{' '}
              <span className="gradient-text">One Platform.</span>
            </h2>

            <p className="text-white/58 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              SportVerse is India's all-in-one sports ecosystem — built for passionate
              players, ambitious organizers, and smart turf owners. Whether you want to
              book a slot, run a league, or host a live auction, SportVerse has you covered.
            </p>

            {/* Feature List */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-3 mb-10"
              role="list"
            >
              {features.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-white/78"
                  role="listitem"
                >
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-[15px] font-medium">{text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Explore Features
              </button>
              <button
                onClick={() => document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Download App
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right – Live stats dashboard ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(16,185,129,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-3">
                {[
                  { label: 'Players Online',   value: '12,480', icon: '🏃', color: '#2563EB',  border: 'rgba(37,99,235,0.3)'   },
                  { label: 'Turfs Available',  value: '347',    icon: '🏟', color: '#10B981',  border: 'rgba(16,185,129,0.3)'  },
                  { label: 'Live Tournaments', value: '24',     icon: '🏆', color: '#F59E0B',  border: 'rgba(245,158,11,0.3)'  },
                  { label: 'Matches Today',    value: '183',    icon: '⚽', color: '#8B5CF6',  border: 'rgba(139,92,246,0.3)'  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: item.color + '12',
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/55 text-xs font-medium mb-0.5">{item.label}</p>
                      <p
                        className="text-white text-xl font-bold"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {item.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400 font-semibold">Live</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-strong rounded-2xl px-5 py-3 shadow-2xl mt-4 inline-block"
            >
              <p className="text-xs text-white/45 font-medium">Powered by</p>
              <p className="text-lg font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>SportVerse™</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
