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
  { icon: CalendarCheck,   title: 'Instant Turf Booking',      description: 'Book your favorite sports turf in seconds. No calls, no queues.',              color: '#3B82F6' },
  { icon: Wifi,            title: 'Real-Time Availability',     description: 'See live slot availability and pick the perfect time for your game.',           color: '#10B981' },
  { icon: CreditCard,      title: 'Secure Payments',            description: 'Pay safely via UPI, cards, or net banking with encrypted transactions.',         color: '#8B5CF6' },
  { icon: Activity,        title: 'Live Match Scoring',         description: 'Follow every ball, goal, and point in real time with live updates.',             color: '#EF4444' },
  { icon: Trophy,          title: 'Tournament Management',      description: 'Create and broadcast tournaments with automated scheduling.',                    color: '#F59E0B' },
  { icon: Users,           title: 'Team Management',            description: 'Build squads, assign roles, and coordinate strategies seamlessly.',              color: '#06B6D4' },
  { icon: BarChart3,       title: 'Player Statistics',          description: 'Track detailed stats — runs, wickets, goals, assists, and much more.',           color: '#10B981' },
  { icon: Award,           title: 'Leaderboards',               description: 'Compete and rise in city, state, and national leaderboards.',                    color: '#F97316' },
  { icon: Bell,            title: 'Push Notifications',         description: 'Never miss a slot opening, match update, or auction bid.',                      color: '#6366F1' },
  { icon: QrCode,          title: 'QR Payment Support',         description: 'Scan and pay at venues instantly with integrated QR code payments.',             color: '#3B82F6' },
  { icon: LayoutDashboard, title: 'Owner Dashboard',            description: 'Complete analytics, booking management, and revenue tracking for owners.',       color: '#EC4899' },
  { icon: History,         title: 'Booking History',            description: 'Access all past and upcoming bookings in one organised place.',                  color: '#14B8A6' },
  { icon: Gavel,           title: 'Player Auction System',      description: 'Run live IPL-style player auctions with budgets, bids, and results.',            color: '#F59E0B' },
  { icon: MapPin,          title: 'Venue Discovery',            description: 'Explore sports venues near you with photos, ratings, and availability.',         color: '#8B5CF6' },
  { icon: Clock,           title: 'Smart Scheduling',           description: 'AI-powered scheduling that finds the best slots for your entire team.',          color: '#EF4444' },
  { icon: Shield,          title: 'Admin Dashboard',            description: 'Super admin controls for platform management, analytics, and oversight.',        color: '#10B981' },
]

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <motion.article variants={fadeUp} className="sv-feature-card">
      <div
        className="sv-icon-box"
        style={{
          background: `${color}18`,
          border: `1.5px solid ${color}35`,
          boxShadow: `0 4px 16px ${color}15`,
        }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      <h3 className="fs-6 fw-bold text-white mb-2">{title}</h3>
      <p className="fs-7 sv-text-muted mb-0 leading-relaxed">{description}</p>
    </motion.article>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="sv-section bg-dark-alt">
      <AnimatedBlobs variant="mixed" />

      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Features"
          title={`Everything You Need,<br/><span class="sv-gradient-text">All in One App</span>`}
          subtitle="From booking a turf to conducting a full tournament with live auctions — SportVerse is the only platform you'll ever need."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4"
        >
          {features.map((feat) => (
            <div key={feat.title} className="col">
              <FeatureCard {...feat} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
