import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { useInView } from '../hooks/useInView'
import { fadeUp, containerVariants } from '../utils/animations'

const stats = [
  { label: 'Instant Booking',      value: 100,  suffix: '%',  desc: 'Real-time slot confirmation' },
  { label: 'Secure Payments',       value: 100,  suffix: '%',  desc: 'Encrypted & verified transactions' },
  { label: 'Platform Uptime',       value: 99.9, suffix: '%',  decimals: 1, desc: 'Rock-solid reliability' },
  { label: 'Tournament Control',    value: 100,  suffix: '%',  desc: 'End-to-end tournament management' },
  { label: 'Live Score Accuracy',   value: 99.8, suffix: '%',  decimals: 1, desc: 'Real-time every ball' },
  { label: 'Turf Owners',           value: 500,  suffix: '+',  desc: 'Trusted & growing daily' },
  { label: 'Active Players',        value: 50,   suffix: 'K+', desc: 'Passionate sportspersons' },
  { label: 'Cities & Towns',        value: 40,   suffix: '+',  desc: 'Across India' },
]

function StatCard({ label, value, suffix, decimals = 0, desc, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 })

  return (
    <motion.div ref={ref} variants={fadeUp} className="sv-card p-4 text-center h-100">
      <p className="fs-2 fw-bold sv-gradient-text mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {inView ? (
          <CountUp start={0} end={value} duration={2} delay={index * 0.05} decimals={decimals} suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </p>
      <p className="fs-6 fw-bold text-white mb-1">{label}</p>
      <p className="fs-7 sv-text-dim mb-0">{desc}</p>
    </motion.div>
  )
}

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="sv-section bg-glow-green">
      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Why SportVerse"
          title={`Numbers That<br/><span class="sv-gradient-text">Speak For Themselves</span>`}
          subtitle="Built for performance, trusted by India's sports community."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="row row-cols-2 row-cols-md-4 g-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="col">
              <StatCard {...stat} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
