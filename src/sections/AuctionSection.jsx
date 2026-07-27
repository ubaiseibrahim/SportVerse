import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gavel, Wallet, TrendingUp, Users, ChevronUp } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight, fadeUp } from '../utils/animations'

const auctionPlayers = [
  { name: 'Arjun Sharma',   role: 'Batsman',       base: '₹50K',  sold: '₹1.2L',  status: 'sold',   team: 'Royal XI',   avatar: '🧢' },
  { name: 'Priya Menon',    role: 'All-Rounder',    base: '₹40K',  sold: '₹95K',   status: 'sold',   team: 'Storm FC',   avatar: '🎯' },
  { name: 'Karthik Rao',    role: 'Bowler',         base: '₹30K',  sold: null,      status: 'unsold', team: null,         avatar: '⚡' },
  { name: 'Nikhil Verma',   role: 'Wicket-Keeper',  base: '₹60K',  sold: '₹2.1L',  status: 'sold',   team: 'Blue Bulls', avatar: '🧤' },
  { name: 'Sneha Iyer',     role: 'Batsman',       base: '₹45K',  sold: null,      status: 'live',   team: null,         avatar: '🏏' },
]

const teams = [
  { name: 'Royal XI',    budget: '₹10L', spent: '₹6.5L', players: 8,  color: '#3B82F6' },
  { name: 'Storm FC',    budget: '₹8L',  spent: '₹5.2L', players: 7,  color: '#10B981' },
  { name: 'Blue Bulls',  budget: '₹12L', spent: '₹9.1L', players: 9,  color: '#8B5CF6' },
  { name: 'Gold Kings',  budget: '₹9L',  spent: '₹4.8L', players: 6,  color: '#F59E0B' },
]

export default function AuctionSection() {
  const [activeTeam, setActiveTeam] = useState(0)
  const livePlayer = auctionPlayers[4]

  return (
    <section id="auction" className="sv-section bg-glow-center">
      <AnimatedBlobs variant="mixed" />

      <div className="container-xl position-relative z-10">
        <SectionTitle
          tag="Auction"
          title={`Smart Player <span class="sv-gradient-text">Auction System</span>`}
          subtitle="Run IPL-style live auctions with real-time bidding, budget tracking, and automatic player assignments."
        />

        <div className="row g-5 align-items-start">
          {/* Left Column - Mockup */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6"
          >
            {/* Live Bidding Card */}
            <div
              className="sv-card p-4 mb-3"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              <div className="d-flex align-items-center gap-2 mb-4">
                <span className="sv-live-dot" />
                <span className="fs-7 fw-bold text-danger text-uppercase tracking-wider">Live Auction</span>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center fs-2"
                  style={{ width: 60, height: 60, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  {livePlayer.avatar}
                </div>
                <div>
                  <h4 className="fs-5 fw-bold text-white mb-0">{livePlayer.name}</h4>
                  <p className="fs-7 sv-text-dim mb-0">{livePlayer.role} · Base: {livePlayer.base}</p>
                </div>
                <div className="ms-auto text-end">
                  <p className="fs-7 sv-text-dim mb-0">Current Bid</p>
                  <p className="fs-4 fw-bold text-warning mb-0">₹1.8L</p>
                </div>
              </div>

              <div className="row g-2 mb-3">
                {['+₹10K', '+₹25K', '+₹50K', '+₹1L'].map((bid) => (
                  <div key={bid} className="col-3">
                    <button
                      className="btn w-100 py-2 fs-7 fw-bold text-white border-0"
                      style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}
                    >
                      {bid}
                    </button>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-2">
                <button className="sv-btn sv-btn-green flex-grow-1">
                  🔨 SOLD
                </button>
                <button className="sv-btn sv-btn-outline flex-grow-1">
                  ❌ UNSOLD
                </button>
              </div>
            </div>

            {/* Auction Board List */}
            <div className="sv-card p-3">
              <p className="fs-7 text-uppercase tracking-wider sv-text-dim fw-bold mb-2">
                Auction Board
              </p>
              <div className="d-flex flex-column gap-2">
                {auctionPlayers.slice(0, 4).map((p) => (
                  <div
                    key={p.name}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-6">{p.avatar}</span>
                      <div>
                        <p className="mb-0 fs-7 fw-bold text-white">{p.name}</p>
                        <p className="mb-0 fs-7 sv-text-dim" style={{ fontSize: 11 }}>{p.role}</p>
                      </div>
                    </div>
                    <div>
                      {p.status === 'sold' ? (
                        <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-25">
                          Sold ({p.sold})
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary border-opacity-25">
                          Unsold
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Team Purse & Details */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-6"
          >
            <h3 className="fs-4 fw-bold text-white mb-4">
              Real-Time Team Purse & Squad Trackers
            </h3>

            <div className="row g-3 mb-4">
              {teams.map((t, i) => (
                <div key={t.name} className="col-6">
                  <div
                    onClick={() => setActiveTeam(i)}
                    className="sv-card p-3 cursor-pointer"
                    style={{
                      border: activeTeam === i ? `1.5px solid ${t.color}` : '1px solid rgba(255,255,255,0.08)',
                      background: activeTeam === i ? `${t.color}15` : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h4 className="fs-6 fw-bold text-white mb-0">{t.name}</h4>
                      <span className="fs-7 badge" style={{ background: `${t.color}30`, color: t.color }}>
                        {t.players} P
                      </span>
                    </div>
                    <div className="d-flex justify-content-between fs-7 sv-text-dim">
                      <span>Spent: {t.spent}</span>
                      <span>Purse: {t.budget}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sv-card p-4">
              <h4 className="fs-5 fw-bold text-white mb-3">
                Key Auction System Features
              </h4>
              <div className="d-flex flex-column gap-3">
                {[
                  { icon: Gavel, title: 'Live Real-Time Bidding', desc: 'Instant socket updates across all participants.' },
                  { icon: Wallet, title: 'Automated Budget Checks', desc: 'Prevents overspending beyond total allocated team purse.' },
                  { icon: TrendingUp, title: 'Instant Squad Assignment', desc: 'Players instantly move to winning team roster.' },
                  { icon: Users, title: 'Public & Owner Views', desc: 'Custom viewports for organizers, owners, and viewers.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="d-flex align-items-start gap-3">
                    <div className="sv-icon-box mb-0" style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fs-6 fw-bold text-white mb-1">{title}</h5>
                      <p className="fs-7 sv-text-muted mb-0">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
