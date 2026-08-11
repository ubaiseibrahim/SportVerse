import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gavel, Wallet, TrendingUp, Users } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import AnimatedBlobs from '../components/AnimatedBlobs'
import { fadeLeft, fadeRight } from '../utils/animations'

const auctionPlayers = [
  { name: 'Arjun Sharma',   role: 'Batsman',      base: '₹50K',  sold: '₹1.2L',  status: 'sold',   team: 'Royal XI',   avatar: '🧢' },
  { name: 'Priya Menon',    role: 'All-Rounder',  base: '₹40K',  sold: '₹95K',   status: 'sold',   team: 'Storm FC',   avatar: '🎯' },
  { name: 'Karthik Rao',    role: 'Bowler',        base: '₹30K',  sold: null,      status: 'unsold', team: null,         avatar: '⚡' },
  { name: 'Nikhil Verma',   role: 'Wicket-Keeper', base: '₹60K',  sold: '₹2.1L',  status: 'sold',   team: 'Blue Bulls', avatar: '🧤' },
  { name: 'Sneha Iyer',     role: 'Batsman',      base: '₹45K',  sold: null,      status: 'live',   team: null,         avatar: '🏏' },
]

const teams = [
  { name: 'Royal XI',    budget: '₹10L', spent: '₹6.5L', players: 8,  color: '#FFD400' },
  { name: 'Storm FC',    budget: '₹8L',  spent: '₹5.2L', players: 7,  color: '#FFD400' },
  { name: 'Blue Bulls',  budget: '₹12L', spent: '₹9.1L', players: 9,  color: '#E6BF00' },
  { name: 'Gold Kings',  budget: '₹9L',  spent: '₹4.8L', players: 6,  color: '#FFD400' },
]

export default function AuctionSection() {
  const [activeTeam, setActiveTeam] = useState(0)
  const livePlayer = auctionPlayers[4]

  return (
    <section id="auction" className="sv-section bg-glow-center">
      <AnimatedBlobs variant="mixed" />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="Auction"
          title={`Smart Player <span class="sv-gradient-text">Auction System</span>`}
          subtitle="Run IPL-style live auctions with real-time bidding, budget tracking, and automatic player assignments."
        />

        <div className="row g-5 align-items-start">
          {/* Left – Mockup */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="col-lg-6"
          >
            {/* Live bidding card */}
            <div className="sv-card p-4 mb-3" style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div className="d-flex align-items-center gap-2 mb-4">
                <span className="sv-live-dot" />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFD400', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Live Auction
                </span>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 56, height: 56, background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.28)', fontSize: '1.6rem', flexShrink: 0 }}
                >
                  {livePlayer.avatar}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h4 className="text-white mb-0" style={{ fontWeight: 700, fontSize: '1.05rem' }}>{livePlayer.name}</h4>
                  <p className="sv-text-dim mb-0" style={{ fontSize: '0.78rem' }}>{livePlayer.role} · Base: {livePlayer.base}</p>
                </div>
                <div className="text-end" style={{ flexShrink: 0 }}>
                  <p className="sv-text-dim mb-0" style={{ fontSize: '0.7rem' }}>Current Bid</p>
                  <p className="mb-0 fw-800" style={{ color: '#FFD400', fontSize: '1.25rem', fontFamily: 'Space Grotesk' }}>₹1.8L</p>
                </div>
              </div>

              <div className="row g-2 mb-3">
                {['+₹10K', '+₹25K', '+₹50K', '+₹1L'].map((bid) => (
                  <div key={bid} className="col-3">
                    <button
                      className="btn w-100 py-2 text-white border-0"
                      style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-body)' }}
                    >
                      {bid}
                    </button>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-2">
                <button className="sv-btn sv-btn-green flex-grow-1" style={{ padding: '11px 16px', fontSize: 13 }}>
                  🔨 SOLD
                </button>
                <button className="sv-btn sv-btn-outline flex-grow-1" style={{ padding: '11px 16px', fontSize: 13 }}>
                  ❌ UNSOLD
                </button>
              </div>
            </div>

            {/* Auction board */}
            <div className="sv-card p-3">
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }} className="mb-2">
                Auction Board
              </p>
              <div className="d-flex flex-column gap-2">
                {auctionPlayers.slice(0, 4).map((p) => (
                  <div
                    key={p.name}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1rem' }}>{p.avatar}</span>
                      <div>
                        <p className="mb-0 text-white fw-bold" style={{ fontSize: '0.82rem' }}>{p.name}</p>
                        <p className="mb-0 sv-text-dim" style={{ fontSize: '0.7rem' }}>{p.role}</p>
                      </div>
                    </div>
                    <div>
                      {p.status === 'sold' ? (
                        <span className="badge" style={{ background: 'rgba(255,212,0,0.12)', color: '#FFD400', border: '1px solid rgba(255,212,0,0.2)', fontSize: '0.7rem', fontWeight: 700 }}>
                          Sold ({p.sold})
                        </span>
                      ) : (
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                          Unsold
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right – Details */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="col-lg-6"
          >
            <h3 className="text-white mb-4" style={{ fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.01em' }}>
              Real-Time Team Purse & Squad Trackers
            </h3>

            <div className="row g-3 mb-4">
              {teams.map((t, i) => (
                <div key={t.name} className="col-6">
                  <div
                    onClick={() => setActiveTeam(i)}
                    className="sv-card p-3"
                    style={{
                      border: activeTeam === i ? `1.5px solid ${t.color}` : '1px solid rgba(255,255,255,0.07)',
                      background: activeTeam === i ? `${t.color}12` : 'rgba(255,255,255,0.025)',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h4 className="text-white mb-0" style={{ fontWeight: 700, fontSize: '0.88rem' }}>{t.name}</h4>
                      <span className="badge" style={{ background: `${t.color}28`, color: t.color, fontSize: '0.7rem' }}>
                        {t.players}P
                      </span>
                    </div>
                    <div className="d-flex justify-content-between sv-text-dim" style={{ fontSize: '0.75rem' }}>
                      <span>Spent: {t.spent}</span>
                      <span>Purse: {t.budget}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sv-card p-4">
              <h4 className="text-white mb-3" style={{ fontWeight: 700, fontSize: '1rem' }}>
                Key Auction System Features
              </h4>
              <div className="d-flex flex-column gap-3">
                {[
                  { icon: Gavel,      title: 'Live Real-Time Bidding',     desc: 'Instant socket updates across all participants.' },
                  { icon: Wallet,     title: 'Automated Budget Checks',    desc: 'Prevents overspending beyond total allocated team purse.' },
                  { icon: TrendingUp, title: 'Instant Squad Assignment',   desc: 'Players instantly move to winning team roster.' },
                  { icon: Users,      title: 'Public & Owner Views',       desc: 'Custom viewports for organizers, owners, and viewers.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="d-flex align-items-start gap-3">
                    <div
                      className="sv-icon-box mb-0 flex-shrink-0"
                      style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,212,0,0.12)', border: '1px solid rgba(255,212,0,0.22)' }}
                    >
                      <Icon size={15} style={{ color: '#FFD400' }} />
                    </div>
                    <div>
                      <h5 className="text-white mb-1" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</h5>
                      <p className="sv-text-muted mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.65 }}>{desc}</p>
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
