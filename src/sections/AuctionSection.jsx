import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gavel, Wallet, TrendingUp, Users, ChevronUp } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp } from '../utils/animations'

/* ── Mock auction players data ── */
const auctionPlayers = [
  { name: 'Arjun Sharma',   role: 'Batsman',    base: '₹50K',  sold: '₹1.2L',  status: 'sold',   team: 'Royal XI',   avatar: '🧢' },
  { name: 'Priya Menon',    role: 'All-Rounder', base: '₹40K',  sold: '₹95K',   status: 'sold',   team: 'Storm FC',   avatar: '🎯' },
  { name: 'Karthik Rao',    role: 'Bowler',      base: '₹30K',  sold: null,      status: 'unsold', team: null,         avatar: '⚡' },
  { name: 'Nikhil Verma',   role: 'Wicket-Keeper',base: '₹60K', sold: '₹2.1L',  status: 'sold',   team: 'Blue Bulls', avatar: '🧤' },
  { name: 'Sneha Iyer',     role: 'Batsman',    base: '₹45K',  sold: null,      status: 'live',   team: null,         avatar: '🏏' },
]

const teams = [
  { name: 'Royal XI',    budget: '₹10L', spent: '₹6.5L', players: 8,  color: '#2563EB' },
  { name: 'Storm FC',    budget: '₹8L',  spent: '₹5.2L', players: 7,  color: '#10B981' },
  { name: 'Blue Bulls',  budget: '₹12L', spent: '₹9.1L', players: 9,  color: '#8B5CF6' },
  { name: 'Gold Kings',  budget: '₹9L',  spent: '₹4.8L', players: 6,  color: '#F59E0B' },
]

/**
 * Auction Section – Smart Player Auction module showcase.
 */
export default function AuctionSection() {
  const [activeTeam, setActiveTeam] = useState(0)
  const livePlayer = auctionPlayers[4] // Sneha Iyer is "live"

  return (
    <section
      id="auction"
      className="section-padding relative overflow-hidden"
      aria-labelledby="auction-title"
    >
      <AnimatedBlobs variant="mixed" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Auction"
          title={`Smart Player\n<span class="gradient-text">Auction System</span>`}
          subtitle="Run IPL-style live auctions with real-time bidding, budget tracking, and automatic player assignments."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left – Auction UI Mockup ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {/* Live bidding card */}
            <div
              className="rounded-3xl p-6 relative overflow-hidden"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              {/* Glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Live Auction</span>
              </div>

              {/* Current player */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  {livePlayer.avatar}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{livePlayer.name}</p>
                  <p className="text-sm text-white/60">{livePlayer.role}</p>
                  <p className="text-xs text-yellow-400 font-medium">Base: {livePlayer.base}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-white/50">Current Bid</p>
                  <motion.p
                    key="bid"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl font-bold text-yellow-400"
                  >
                    ₹1.8L
                  </motion.p>
                </div>
              </div>

              {/* Bid buttons */}
              <div className="flex gap-2">
                {['₹10K', '₹25K', '₹50K', '₹1L'].map((amt) => (
                  <motion.button
                    key={amt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-yellow-300"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
                  >
                    +{amt}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  className="py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                >
                  🔨 SOLD
                </button>
                <button
                  className="py-2.5 rounded-xl text-sm font-bold text-white/60"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  ❌ UNSOLD
                </button>
              </div>
            </div>

            {/* Player list */}
            <div className="premium-card p-5">
              <h4 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">
                Auction Board
              </h4>
              <div className="space-y-2">
                {auctionPlayers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{
                      background: p.status === 'live'
                        ? 'rgba(245,158,11,0.1)'
                        : p.status === 'sold'
                        ? 'rgba(16,185,129,0.05)'
                        : 'rgba(239,68,68,0.05)',
                      border: `1px solid ${
                        p.status === 'live' ? 'rgba(245,158,11,0.3)'
                        : p.status === 'sold' ? 'rgba(16,185,129,0.2)'
                        : 'rgba(239,68,68,0.2)'
                      }`,
                    }}
                  >
                    <span className="text-lg">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                      <p className="text-xs text-white/50">{p.role}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {p.status === 'sold' && (
                        <>
                          <p className="text-xs font-bold text-green-400">{p.sold}</p>
                          <p className="text-xs text-white/40">{p.team}</p>
                        </>
                      )}
                      {p.status === 'unsold' && (
                        <span className="text-xs font-bold text-red-400">UNSOLD</span>
                      )}
                      {p.status === 'live' && (
                        <span className="text-xs font-bold text-yellow-400 animate-pulse">LIVE</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right – Feature list + Team cards ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                Auction Features
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Gavel,    title: 'Live Bidding',        desc: 'Real-time bid increments with instant updates across all participants.' },
                  { icon: Wallet,   title: 'Budget Management',   desc: 'Each team gets a purse. Overspending is automatically prevented.' },
                  { icon: TrendingUp, title: 'Player Profiles',   desc: 'Full stats, history, and performance metrics for every player.' },
                  { icon: Users,    title: 'Organizer Controls',  desc: 'Start, pause, or cancel auctions. Assign unsold players to RTM.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="premium-card !flex-row gap-4 p-4 items-center"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{title}</p>
                      <p className="text-xs text-white/55 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Budget Cards */}
            <div>
              <h4 className="text-sm font-semibold text-white/50 mb-3 uppercase tracking-wider">
                Team Budgets
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {teams.map((team, i) => {
                  const pct = parseInt(team.spent) / parseInt(team.budget) * 100
                  return (
                    <motion.div
                      key={team.name}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setActiveTeam(i)}
                      className="p-4 rounded-2xl cursor-pointer"
                      style={{
                        background: activeTeam === i ? team.color + '15' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${activeTeam === i ? team.color + '50' : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <p className="text-sm font-semibold text-white">{team.name}</p>
                      <p className="text-xs text-white/50 mb-2">{team.players} players</p>
                      {/* Budget bar */}
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(pct, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ background: team.color }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs" style={{ color: team.color }}>{team.spent}</span>
                        <span className="text-xs text-white/40">{team.budget}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
