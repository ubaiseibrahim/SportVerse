import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeLeft, fadeRight, fadeUp } from '../utils/animations'

/**
 * Animated phone illustration for the download section.
 */
function PhoneIllustration() {
  return (
    <div className="relative w-48 mx-auto">
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-[40px] opacity-40 blur-3xl"
        style={{ background: 'linear-gradient(180deg, #2563EB, #10B981)' }}
        aria-hidden="true"
      />

      {/* Phone body */}
      <motion.div
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-[40px] p-[2px]"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.04))' }}
      >
        <div
          className="rounded-[38px] overflow-hidden"
          style={{ background: '#0A0F1C', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-black/30">
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="w-12 h-3 bg-black rounded-full" aria-hidden="true" />
            <div className="w-3 h-2 rounded-sm bg-white/60" aria-hidden="true" />
          </div>

          {/* Screen */}
          <div className="px-4 pb-6 pt-4 space-y-3">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-bg mx-auto flex items-center justify-center mb-2">
                <span className="text-white text-xl font-bold">SV</span>
              </div>
              <p className="text-white text-xs font-bold">SportVerse</p>
              <p className="text-white/40 text-xs">India's Sports Platform</p>
            </div>

            {['Book Turfs', 'Join Tournaments', 'Live Scores'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white text-xs">{item}</span>
              </motion.div>
            ))}

            <div
              className="py-2.5 rounded-xl text-center text-xs font-bold text-white mt-2"
              style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}
            >
              Open App →
            </div>
          </div>

          {/* Home bar */}
          <div className="flex justify-center py-2">
            <div className="w-16 h-1 bg-white/25 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ x: [-4, 4, -4], y: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -right-8 glass rounded-xl px-3 py-1.5 text-xs font-bold text-green-400 border border-green-500/20"
      >
        ✅ 50K+ Users
      </motion.div>
      <motion.div
        animate={{ x: [4, -4, 4], y: [3, -3, 3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-10 glass rounded-xl px-3 py-1.5 text-xs font-bold text-yellow-400 border border-yellow-500/20"
      >
        ⭐ 4.8 Rating
      </motion.div>
    </div>
  )
}

/**
 * Download Section – CTA with store buttons.
 */
export default function DownloadSection() {
  return (
    <section
      id="download"
      className="section-padding relative overflow-hidden"
      aria-labelledby="download-title"
    >
      {/* Premium gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.12) 0%, rgba(16,185,129,0.06) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main card */}
          <div className="premium-card p-8 md:p-16">
            {/* Corner glow */}
            <div
              className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

              {/* Text */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  <Smartphone size={12} />
                  Available on all platforms
                </div>

                <h2
                  id="download-title"
                  className="text-section-title text-white mb-4"
                >
                  Ready to Play?{' '}
                  <span className="gradient-text">Download Now.</span>
                </h2>

                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Join 50,000+ players, organizers, and turf owners already on SportVerse.
                  Your game starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Google Play */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
                    aria-label="Download on Google Play"
                  >
                    {/* Play Store icon */}
                    <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="none">
                      <path d="M3 20.5v-17a.5.5 0 0 1 .75-.43l16 8.5a.5.5 0 0 1 0 .86l-16 8.5A.5.5 0 0 1 3 20.5z" fill="url(#play-g)" />
                      <defs>
                        <linearGradient id="play-g" x1="3" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#10B981" />
                          <stop offset="0.5" stopColor="#2563EB" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div>
                      <p className="text-xs text-white/50">Get it on</p>
                      <p className="text-base font-semibold text-white">Google Play</p>
                    </div>
                  </motion.a>

                  {/* App Store */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-4 px-5 py-3.5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
                    aria-label="Download on App Store (Coming Soon)"
                  >
                    {/* Apple icon */}
                    <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <p className="text-xs text-white/50">Download on the</p>
                      <p className="text-base font-semibold text-white">App Store</p>
                    </div>
                    {/* Coming soon badge */}
                    <div
                      className="absolute -top-2.5 -right-2.5 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
                    >
                      Soon
                    </div>
                  </motion.a>
                </div>

                {/* Trust badges */}
                <div className="flex gap-6 mt-6">
                  {['50K+ Downloads', '4.8★ Rating', 'Free Forever'].map((badge) => (
                    <div key={badge} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-white/50 font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Phone illustration */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="flex justify-center"
              >
                <PhoneIllustration />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
