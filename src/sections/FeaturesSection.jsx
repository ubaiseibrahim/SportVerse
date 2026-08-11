import { motion } from 'framer-motion'
import { fadeUp, containerVariants } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import {
  CalendarCheck, Wifi, CreditCard, Activity, Trophy, Users,
  BarChart3, Award, Bell, QrCode, LayoutDashboard, History,
  Gavel, MapPin, Clock, Shield,
} from 'lucide-react'

const features = [
  { icon: CalendarCheck,   title: 'Instant Turf Booking',      description: 'Book your favorite sports turf in seconds. No calls, no queues.',              color: '#FFD400', size: 'large' },
  { icon: Activity,        title: 'Live Match Scoring',         description: 'Follow every ball, goal, and point in real time with live updates.',             color: '#FFD400', size: 'medium' },
  { icon: Trophy,          title: 'Tournament Management',      description: 'Create and broadcast tournaments with automated scheduling.',                    color: '#FFD400', size: 'medium' },
  { icon: Wifi,            title: 'Real-Time Availability',     description: 'See live slot availability and pick the perfect time for your game.',           color: '#FFD400', size: 'small' },
  { icon: CreditCard,      title: 'Secure Payments',            description: 'Pay safely via UPI, cards, or net banking.',                                    color: '#E6BF00', size: 'small' },
  { icon: Gavel,           title: 'Player Auction System',      description: 'Run live IPL-style player auctions with budgets, bids, and results.',            color: '#FFD400', size: 'medium' },
  { icon: Users,           title: 'Team Management',            description: 'Build squads, assign roles, and coordinate strategies seamlessly.',              color: '#FFD400', size: 'small' },
  { icon: BarChart3,       title: 'Player Statistics',          description: 'Track detailed stats — runs, wickets, goals, assists, and much more.',           color: '#FFD400', size: 'small' },
  { icon: Award,           title: 'Leaderboards',               description: 'Compete and rise in city, state, and national leaderboards.',                   color: '#FFD400', size: 'small' },
  { icon: Bell,            title: 'Push Notifications',         description: 'Never miss a slot opening, match update, or auction bid.',                      color: '#FFD400', size: 'small' },
  { icon: QrCode,          title: 'QR Payment Support',         description: 'Scan and pay at venues instantly with integrated QR code payments.',             color: '#FFD400', size: 'small' },
  { icon: LayoutDashboard, title: 'Owner Dashboard',            description: 'Complete analytics, booking management, and revenue tracking for owners.',       color: '#FFD400', size: 'small' },
  { icon: History,         title: 'Booking History',            description: 'Access all past and upcoming bookings in one organised place.',                  color: '#FFD400', size: 'small' },
  { icon: MapPin,          title: 'Venue Discovery',            description: 'Explore sports venues near you with photos, ratings, and availability.',         color: '#E6BF00', size: 'small' },
  { icon: Clock,           title: 'Smart Scheduling',           description: 'AI-powered scheduling that finds the best slots for your entire team.',          color: '#FFD400', size: 'small' },
  { icon: Shield,          title: 'Admin Dashboard',            description: 'Super admin controls for platform management, analytics, and oversight.',        color: '#FFD400', size: 'small' },
]

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <motion.article
      variants={fadeUp}
      className="sv-feature-card"
      style={{ height: '100%' }}
    >
      <div
        className="sv-icon-box"
        style={{
          background: `${color}18`,
          border: `1.5px solid ${color}30`,
          boxShadow: `0 4px 16px ${color}15`,
        }}
      >
        <Icon size={21} style={{ color }} />
      </div>
      <h3 className="text-white mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h3>
      <p className="sv-text-muted mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>{description}</p>
    </motion.article>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="sv-section bg-dark-alt">
      <AnimatedBlobs variant="mixed" />
      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="Features"
          title={`Everything You Need,<br/><span class="sv-gradient-text">All in One App</span>`}
          subtitle="From booking a turf to conducting a full tournament with live auctions — ScoreVerse is the only platform you'll ever need."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3"
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
