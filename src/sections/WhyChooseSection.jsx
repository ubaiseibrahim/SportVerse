import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { useInView } from '../hooks/useInView'
import { fadeUp, containerVariants } from '../utils/animations'

const stats = [
  { label: 'Instant Booking',      value: 100,  suffix: '%',    desc: 'Real-time slot confirmation'        },
  { label: 'Secure Payments',       value: 100,  suffix: '%',    desc: 'Encrypted & verified transactions'  },
  { label: 'Platform Uptime',       value: 99.9, suffix: '%', decimals: 1, desc: 'Rock-solid reliability'  },
  { label: 'Tournament Management', value: 100,  suffix: '%',    desc: 'End-to-end tournament control'      },
  { label: 'Live Score Accuracy',   value: 99.8, suffix: '%', decimals: 1, desc: 'Real-time every ball'    },
  { label: 'Turf Owners',           value: 500,  suffix: '+',    desc: 'Trusted & growing daily'            },
  { label: 'Active Players',        value: 50,   suffix: 'K+',   desc: 'Passionate sportspersons'           },
  { label: 'Cities & Towns',        value: 40,   suffix: '+',    desc: 'Across India'                       },
]

/**
 * Individual stat card with scroll-triggered CountUp.
 */
function StatCard({ label, value, suffix, decimals = 0, desc, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="premium-card p-7 group text-center"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.07), transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Counter */}
      <p
        className="text-4xl font-bold gradient-text mb-2 relative z-10"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {inView ? (
          <CountUp
            start={0}
            end={value}
            duration={2.2}
            delay={index * 0.1}
            decimals={decimals}
            suffix={suffix}
          />
        ) : (
          `0${suffix}`
        )}
      </p>

      <p className="text-[15px] font-semibold text-white mb-1.5 relative z-10">{label}</p>
      <p className="text-[13px] text-white/48 leading-snug relative z-10">{desc}</p>
    </motion.div>
  )
}

/**
 * Why Choose SportVerse Section – animated counters grid.
 */
export default function WhyChooseSection() {
  return (
    <section
      id="why-us"
      className="section-padding relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Why SportVerse"
          title={`Numbers That\n<span class="gradient-text">Speak For Themselves</span>`}
          subtitle="Built for performance, trusted by India's sports community."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
