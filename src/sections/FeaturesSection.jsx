import { motion } from 'framer-motion'
import {
  CalendarCheck, Wifi, CreditCard, Activity, Trophy, Users,
  BarChart3, Award, Bell, QrCode, LayoutDashboard, History,
  Gavel, MapPin, Clock, Shield,
} from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeUp, containerVariants } from '../utils/animations'

const features = [
  { icon: CalendarCheck,   title: 'Instant Turf Booking',      description: 'Book your favorite sports turf in seconds. No calls, no queues.',             color: '#2563EB', glow: 'rgba(37,99,235,0.2)'   },
  { icon: Wifi,            title: 'Real-Time Availability',     description: 'See live slot availability and pick the perfect time for your game.',          color: '#10B981', glow: 'rgba(16,185,129,0.2)'  },
  { icon: CreditCard,      title: 'Secure Payments',            description: 'Pay safely via UPI, cards, or net banking with encrypted transactions.',        color: '#8B5CF6', glow: 'rgba(139,92,246,0.2)' },
  { icon: Activity,        title: 'Live Match Scoring',         description: 'Follow every ball, goal, and point in real time with live updates.',            color: '#EF4444', glow: 'rgba(239,68,68,0.2)'  },
  { icon: Trophy,          title: 'Tournament Management',      description: 'Create and broadcast tournaments with automated scheduling.',                   color: '#F59E0B', glow: 'rgba(245,158,11,0.2)' },
  { icon: Users,           title: 'Team Management',            description: 'Build squads, assign roles, and coordinate strategies seamlessly.',             color: '#06B6D4', glow: 'rgba(6,182,212,0.2)'  },
  { icon: BarChart3,       title: 'Player Statistics',          description: 'Track detailed stats — runs, wickets, goals, assists, and much more.',          color: '#10B981', glow: 'rgba(16,185,129,0.2)'  },
  { icon: Award,           title: 'Leaderboards',               description: 'Compete and rise in city, state, and national leaderboards.',                   color: '#F97316', glow: 'rgba(249,115,22,0.2)'  },
  { icon: Bell,            title: 'Push Notifications',         description: 'Never miss a slot opening, match update, or auction bid.',                     color: '#6366F1', glow: 'rgba(99,102,241,0.2)'  },
  { icon: QrCode,          title: 'QR Payment Support',         description: 'Scan and pay at venues instantly with integrated QR code payments.',            color: '#2563EB', glow: 'rgba(37,99,235,0.2)'   },
  { icon: LayoutDashboard, title: 'Owner Dashboard',            description: 'Complete analytics, booking management, and revenue tracking for owners.',      color: '#EC4899', glow: 'rgba(236,72,153,0.2)'  },
  { icon: History,         title: 'Booking History',            description: 'Access all past and upcoming bookings in one organised place.',                 color: '#14B8A6', glow: 'rgba(20,184,166,0.2)'  },
  { icon: Gavel,           title: 'Player Auction System',      description: 'Run live IPL-style player auctions with budgets, bids, and results.',          color: '#F59E0B', glow: 'rgba(245,158,11,0.2)' },
  { icon: MapPin,          title: 'Venue Discovery',            description: 'Explore sports venues near you with photos, ratings, and availability.',        color: '#8B5CF6', glow: 'rgba(139,92,246,0.2)' },
  { icon: Clock,           title: 'Smart Scheduling',           description: 'AI-powered scheduling that finds the best slots for your entire team.',         color: '#EF4444', glow: 'rgba(239,68,68,0.2)'  },
  { icon: Shield,          title: 'Admin Dashboard',            description: 'Super admin controls for platform management, analytics, and oversight.',       color: '#10B981', glow: 'rgba(16,185,129,0.2)'  },
]

/**
 * Feature card — uses premium-card class for a sleek Apple/Linear aesthetic.
 */
function FeatureCard({ icon: Icon, title, description, color, glow }) {
  return (
    <motion.article
      variants={fadeUp}
      className="premium-card p-6 h-full group"
    >
      {/* Subtle background glow from the specific color */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(120% 100% at 50% 0%, ${glow} 0%, transparent 60%)` }}
        aria-hidden="true"
      />

      {/* Gradient top border line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
        style={{
          background: color + '16',
          border: `1.5px solid ${color}28`,
        }}
      >
        <Icon size={21} style={{ color }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">{title}</h3>
        <p className="text-[13px] text-white/52 leading-relaxed flex-1">{description}</p>
      </div>
    </motion.article>
  )
}

/**
 * Features Section – 16 perfectly-aligned cards in a responsive grid.
 */
export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <AnimatedBlobs variant="mixed" />

      {/* Edge fades */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(180deg, #0D1117, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-20">
        <SectionTitle
          tag="Features"
          title={`Everything You Need,<br/><span class="gradient-text">All in One App</span>`}
          subtitle="From booking a turf to conducting a full tournament with live auctions — SportVerse is the only platform you'll ever need."
        />

        {/* Grid — items-stretch ensures equal height per row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch"
        >
          {features.map((feat) => (
            <FeatureCard key={feat.title} {...feat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
