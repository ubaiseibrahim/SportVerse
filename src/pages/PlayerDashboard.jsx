import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, AlertCircle, XCircle, LogOut, CheckCircle2, User, ChevronRight, MessageSquare, X, Smartphone, QrCode, Download, Mail, Phone, Locate, Shield, Star, TrendingUp, Award } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'
import AuthModal from '../components/AuthModal'

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState('active') // 'active', 'history', 'profile'
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Auth states
  const [currentUser, setCurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  // Cancellation action states
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')
    if (token && userStr) {
      setAccessToken(token)
      setCurrentUser(JSON.parse(userStr))
    } else {
      setAccessToken('')
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    checkAuth()
    window.addEventListener('authChange', checkAuth)
    return () => window.removeEventListener('authChange', checkAuth)
  }, [])

  // Fetch Bookings when authenticated
  useEffect(() => {
    if (!accessToken) {
      setBookings([])
      return
    }
    fetchMyBookings()
  }, [accessToken])

  const fetchMyBookings = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/my`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch bookings')
      }
      
      // API returns result.bookings or result directly
      setBookings(result.data || result.bookings || result || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError(err.message || 'Failed to load bookings.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of ScoreVerse?')) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.dispatchEvent(new Event('authChange'))
      window.location.href = '/'
    }
  }

  // Filter Bookings on the client
  const getActiveBookings = () => {
    const now = new Date()
    return bookings.filter((booking) => {
      // Find the latest slot date/time in this booking
      const snapshot = booking.slotsSnapshot?.[0]
      if (!snapshot) return false
      const slotDate = new Date(snapshot.date)
      const [hour, min] = snapshot.startTime.split(':').map(Number)
      slotDate.setHours(hour, min, 0, 0)
      
      return slotDate >= now && (booking.status === 'confirmed' || booking.status === 'pending')
    })
  }

  const getPastBookings = () => {
    const now = new Date()
    return bookings.filter((booking) => {
      const snapshot = booking.slotsSnapshot?.[0]
      if (!snapshot) return true
      const slotDate = new Date(snapshot.date)
      const [hour, min] = snapshot.startTime.split(':').map(Number)
      slotDate.setHours(hour, min, 0, 0)
      
      return slotDate < now || booking.status === 'cancelled' || booking.status === 'completed'
    })
  }

  // Initiate cancellation flow
  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  }

  return (
    <div 
      className="position-relative overflow-hidden w-100"
      style={{ minHeight: '95vh', backgroundColor: 'var(--sv-bg)', paddingTop: '110px', paddingBottom: '90px' }}
    >
      {/* Background radial glow atmosphere */}
      <div 
        className="position-absolute top-0 start-50 translate-middle-x"
        style={{
          width: '80%',
          height: '450px',
          background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(var(--sv-primary-rgb), 0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        
        {!currentUser ? (
          /* =================================================================
             AUTH GUARD EMPTY STATE
             ================================================================= */
          <div className="text-center py-5 glass-strong p-5 rounded-4 mx-auto" style={{ maxWidth: '520px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Calendar size={48} className="sv-text-primary opacity-50 mb-3" />
            <h2 className="text-white fw-bold mb-2">View Your Bookings</h2>
            <p className="sv-text-muted fs-7 mb-4 px-3" style={{ lineHeight: '1.5' }}>
              Log in with Google to view active slots, download payment receipts, request cancellations, or manage your playing city.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="sv-btn sv-btn-primary px-4 py-2.5 fs-7 fw-bold"
              style={{ borderRadius: '10px' }}
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          /* =================================================================
             AUTHENTICATED PLAYER DASHBOARD LAYOUT
             ================================================================= */
          <div className="row g-4">
            
            {/* Left Column: Side Navigation Menu */}
            <div className="col-12 col-md-4 col-lg-3">
              <div 
                className="rounded-4 border p-3"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* User Summary */}
                <div className="d-flex align-items-center gap-3 p-2 mb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="rounded-circle overflow-hidden border border-secondary" style={{ width: '44px', height: '44px', background: '#333' }}>
                    {currentUser.photo ? (
                      <img src={currentUser.photo} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={20} className="text-light m-2" />
                    )}
                  </div>
                  <div className="text-start overflow-hidden">
                    <div className="text-white fw-bold fs-7 text-truncate" style={{ maxWidth: '140px' }}>{currentUser.name}</div>
                    <div className="sv-text-muted font-size-11 text-truncate" style={{ maxWidth: '140px' }}>{currentUser.email}</div>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="d-flex flex-column gap-1.5">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`btn text-start p-2.5 rounded-3 d-flex align-items-center justify-content-between fs-7 ${activeTab === 'active' ? 'sv-text-primary' : 'text-light opacity-75'}`}
                    style={{ background: activeTab === 'active' ? 'rgba(255,212,0,0.06)' : 'transparent', transition: 'all 0.15s' }}
                  >
                    <span>Active Bookings</span>
                    <ChevronRight size={14} className={activeTab === 'active' ? 'sv-text-primary' : 'opacity-30'} />
                  </button>

                  <button
                    onClick={() => setActiveTab('history')}
                    className={`btn text-start p-2.5 rounded-3 d-flex align-items-center justify-content-between fs-7 ${activeTab === 'history' ? 'sv-text-primary' : 'text-light opacity-75'}`}
                    style={{ background: activeTab === 'history' ? 'rgba(255,212,0,0.06)' : 'transparent', transition: 'all 0.15s' }}
                  >
                    <span>Booking History</span>
                    <ChevronRight size={14} className={activeTab === 'history' ? 'sv-text-primary' : 'opacity-30'} />
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`btn text-start p-2.5 rounded-3 d-flex align-items-center justify-content-between fs-7 ${activeTab === 'profile' ? 'sv-text-primary' : 'text-light opacity-75'}`}
                    style={{ background: activeTab === 'profile' ? 'rgba(255,212,0,0.06)' : 'transparent', transition: 'all 0.15s' }}
                  >
                    <span>My Profile</span>
                    <ChevronRight size={14} className={activeTab === 'profile' ? 'sv-text-primary' : 'opacity-30'} />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="btn text-start p-2.5 rounded-3 d-flex align-items-center gap-2 text-danger opacity-75 mt-3 hover-white"
                    style={{ background: 'transparent' }}
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Tab Contents */}
            <div className="col-12 col-md-8 col-lg-9">
              <AnimatePresence mode="wait">
                
                {/* ACTIVE BOOKINGS TAB */}
                {activeTab === 'active' && (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Section header */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div>
                        <h2 className="text-white fw-bold mb-0" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                          Active Game Bookings
                        </h2>
                        <p className="sv-text-muted fs-8 mb-0 mt-1">Your upcoming confirmed & pending slots</p>
                      </div>
                      {!loading && getActiveBookings().length > 0 && (
                        <span
                          className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-bold"
                          style={{
                            background: 'rgba(74,222,128,0.1)',
                            border: '1px solid rgba(74,222,128,0.3)',
                            color: '#4ade80',
                            fontSize: '12px',
                          }}
                        >
                          <span
                            style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: '#4ade80',
                              boxShadow: '0 0 6px #4ade80',
                              display: 'inline-block',
                            }}
                          />
                          {getActiveBookings().length} Active
                        </span>
                      )}
                    </div>

                    {loading ? (
                      <div className="text-center py-5">
                        <div
                          className="d-inline-block"
                          style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            border: '3px solid rgba(255,212,0,0.15)',
                            borderTopColor: '#FFD400',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                      </div>
                    ) : getActiveBookings().length === 0 ? (
                      /* ── Empty State ── */
                      <div
                        className="text-center py-5 rounded-4"
                        style={{
                          background: 'rgba(255,255,255,0.015)',
                          border: '1px dashed rgba(255,255,255,0.1)',
                        }}
                      >
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                          style={{
                            width: '64px', height: '64px',
                            background: 'rgba(255,212,0,0.06)',
                            border: '1px solid rgba(255,212,0,0.15)',
                          }}
                        >
                          <Calendar size={26} style={{ color: 'rgba(255,212,0,0.5)' }} />
                        </div>
                        <p className="text-white fw-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>No Active Slots</p>
                        <p className="sv-text-muted fs-8 mb-4">You don't have any upcoming bookings. Find a field and play!</p>
                        <a
                          href="/search"
                          className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold fs-7"
                          style={{
                            background: '#FFD400', color: '#000',
                            textDecoration: 'none', fontFamily: 'var(--font-display)',
                          }}
                        >
                          <MapPin size={14} />
                          Find a Turf
                        </a>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {getActiveBookings().map((booking, idx) => {
                          const snapshot = booking.slotsSnapshot?.[0]
                          const isConfirmed = booking.status === 'confirmed'
                          return (
                            <motion.div
                              key={booking._id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.06 }}
                              className="position-relative rounded-4 overflow-hidden"
                              style={{
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                backdropFilter: 'blur(16px)',
                              }}
                            >
                              {/* Status color stripe */}
                              <div
                                style={{
                                  position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
                                  background: isConfirmed
                                    ? 'linear-gradient(180deg, #4ade80, #22c55e)'
                                    : 'linear-gradient(180deg, #FFD400, #f59e0b)',
                                  borderRadius: '4px 0 0 4px',
                                }}
                              />

                              <div className="p-4 ps-5 d-flex flex-column flex-lg-row justify-content-between gap-4">
                                {/* Left: info */}
                                <div className="flex-grow-1 text-start">
                                  {/* Status + ref row */}
                                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                    <span
                                      className="d-inline-flex align-items-center gap-1 px-2 py-0-5 rounded-pill fw-bold"
                                      style={{
                                        fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em',
                                        background: isConfirmed ? 'rgba(74,222,128,0.1)' : 'rgba(255,212,0,0.1)',
                                        border: `1px solid ${isConfirmed ? 'rgba(74,222,128,0.35)' : 'rgba(255,212,0,0.35)'}`,
                                        color: isConfirmed ? '#4ade80' : '#FFD400',
                                      }}
                                    >
                                      <CheckCircle2 size={8} />
                                      {booking.status}
                                    </span>
                                    <span className="sv-text-dim" style={{ fontSize: '10px' }}>
                                      # {booking.bookingRef || booking._id.slice(-6).toUpperCase()}
                                    </span>
                                  </div>

                                  {/* Turf name */}
                                  <h3
                                    className="text-white fw-bold mb-3"
                                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
                                  >
                                    {snapshot?.turfName || 'Sports Turf'}
                                  </h3>

                                  {/* Meta chips */}
                                  <div className="d-flex flex-wrap gap-2">
                                    <span
                                      className="d-inline-flex align-items-center gap-1 px-2-5 py-1 rounded-pill sv-text-muted"
                                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '12px' }}
                                    >
                                      <Calendar size={11} style={{ color: '#FFD400' }} />
                                      {snapshot
                                        ? new Date(snapshot.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
                                        : 'N/A'}
                                    </span>
                                    <span
                                      className="d-inline-flex align-items-center gap-1 px-2-5 py-1 rounded-pill sv-text-muted"
                                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '12px' }}
                                    >
                                      <Clock size={11} style={{ color: '#FFD400' }} />
                                      {booking.slotsSnapshot?.map(s => s.startTime).join(' · ')}
                                    </span>
                                    {snapshot?.turfAddress && (
                                      <span
                                        className="d-inline-flex align-items-center gap-1 px-2-5 py-1 rounded-pill sv-text-muted text-truncate"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '12px', maxWidth: '280px' }}
                                      >
                                        <MapPin size={11} style={{ color: '#FFD400' }} />
                                        {snapshot.turfAddress}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Right: amount + action */}
                                <div
                                  className="d-flex flex-row flex-lg-column align-items-center align-items-lg-end justify-content-between gap-3 flex-shrink-0 pt-3 pt-lg-0"
                                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderTopWidth: '1px' }}
                                >
                                  <div className="text-end">
                                    <div className="sv-text-dim mb-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Paid</div>
                                    <div
                                      className="fw-black"
                                      style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: '#FFD400', lineHeight: 1 }}
                                    >
                                      ₹{booking.finalAmount?.toLocaleString('en-IN')}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => openCancelModal()}
                                    className="d-inline-flex align-items-center gap-1 px-3 py-1-5 rounded-pill fs-8 fw-semibold"
                                    style={{
                                      background: 'transparent',
                                      border: '1px solid rgba(255,255,255,0.12)',
                                      color: 'rgba(255,255,255,0.55)',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s',
                                      whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#f87171' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                                  >
                                    <XCircle size={12} />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* BOOKING HISTORY TAB */}
                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Section header */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div>
                        <h2 className="text-white fw-bold mb-0" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                          Booking History
                        </h2>
                        <p className="sv-text-muted fs-8 mb-0 mt-1">All your past games and cancelled slots</p>
                      </div>
                      {!loading && getPastBookings().length > 0 && (
                        <span
                          className="px-3 py-1 rounded-pill sv-text-muted fw-semibold"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '12px',
                          }}
                        >
                          {getPastBookings().length} records
                        </span>
                      )}
                    </div>

                    {loading ? (
                      <div className="text-center py-5">
                        <div
                          className="d-inline-block"
                          style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            border: '3px solid rgba(255,212,0,0.15)',
                            borderTopColor: '#FFD400',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                      </div>
                    ) : getPastBookings().length === 0 ? (
                      <div
                        className="text-center py-5 rounded-4"
                        style={{
                          background: 'rgba(255,255,255,0.015)',
                          border: '1px dashed rgba(255,255,255,0.1)',
                        }}
                      >
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                          style={{
                            width: '64px', height: '64px',
                            background: 'rgba(255,212,0,0.06)',
                            border: '1px solid rgba(255,212,0,0.15)',
                          }}
                        >
                          <XCircle size={26} style={{ color: 'rgba(255,212,0,0.5)' }} />
                        </div>
                        <p className="text-white fw-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>No History Yet</p>
                        <p className="sv-text-muted fs-8 mb-0">Completed and cancelled bookings will appear here.</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-2">
                        {getPastBookings().map((booking, idx) => {
                          const snapshot = booking.slotsSnapshot?.[0]
                          const isCancelled = booking.status === 'cancelled'
                          const isCompleted = booking.status === 'completed'
                          const stripeColor = isCancelled
                            ? 'linear-gradient(180deg,#f87171,#ef4444)'
                            : isCompleted
                            ? 'linear-gradient(180deg,#4ade80,#22c55e)'
                            : 'linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))'
                          const badgeBg = isCancelled
                            ? { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#f87171' }
                            : isCompleted
                            ? { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)', color: '#4ade80' }
                            : { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }

                          return (
                            <motion.div
                              key={booking._id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.04 }}
                              className="position-relative rounded-3 overflow-hidden"
                              style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.055)',
                              }}
                            >
                              {/* Status stripe */}
                              <div
                                style={{
                                  position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
                                  background: stripeColor,
                                }}
                              />

                              <div className="ps-4 pe-3 py-3 d-flex align-items-center gap-3 flex-wrap">
                                {/* Venue block */}
                                <div className="flex-grow-1" style={{ minWidth: '160px' }}>
                                  <div className="text-white fw-semibold" style={{ fontSize: '13px', fontFamily: 'var(--font-display)' }}>
                                    {snapshot?.turfName || 'Sports Turf'}
                                  </div>
                                  <div className="sv-text-dim" style={{ fontSize: '10px', marginTop: '2px' }}>
                                    # {booking.bookingRef || booking._id.slice(-6).toUpperCase()}
                                  </div>
                                </div>

                                {/* Date & time */}
                                <div className="sv-text-muted text-center" style={{ fontSize: '12px', minWidth: '110px' }}>
                                  <div className="text-white fw-medium" style={{ fontSize: '12px' }}>
                                    {snapshot
                                      ? new Date(snapshot.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                      : 'N/A'}
                                  </div>
                                  <div style={{ fontSize: '11px', marginTop: '2px', color: 'rgba(255,255,255,0.4)' }}>
                                    {booking.slotsSnapshot?.map(s => s.startTime).join(' · ')}
                                  </div>
                                </div>

                                {/* Amount */}
                                <div
                                  className="fw-bold text-center"
                                  style={{ fontSize: '15px', fontFamily: 'var(--font-display)', color: '#FFD400', minWidth: '70px' }}
                                >
                                  ₹{booking.finalAmount?.toLocaleString('en-IN')}
                                </div>

                                {/* Status badge */}
                                <div style={{ minWidth: '80px', textAlign: 'right' }}>
                                  <span
                                    className="d-inline-flex align-items-center gap-1 px-2-5 py-1 rounded-pill fw-bold"
                                    style={{
                                      fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em',
                                      background: badgeBg.bg,
                                      border: `1px solid ${badgeBg.border}`,
                                      color: badgeBg.color,
                                    }}
                                  >
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* PROFILE INFORMATION TAB */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="text-start"
                  >
                    {/* ── Hero Banner ─────────────────────────────────── */}
                    <div
                      className="position-relative rounded-4 overflow-hidden mb-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,212,0,0.12) 0%, rgba(255,212,0,0.03) 40%, rgba(0,0,0,0) 70%), rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,212,0,0.15)',
                        minHeight: '180px',
                      }}
                    >
                      {/* Decorative radial glow */}
                      <div
                        className="position-absolute"
                        style={{
                          top: '-60px', left: '-60px', width: '280px', height: '280px',
                          background: 'radial-gradient(circle, rgba(255,212,0,0.18) 0%, transparent 70%)',
                          pointerEvents: 'none',
                        }}
                      />
                      {/* Decorative grid lines */}
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(255,212,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,212,0,0.04) 1px, transparent 1px)',
                          backgroundSize: '32px 32px',
                          pointerEvents: 'none',
                        }}
                      />

                      <div className="position-relative d-flex flex-column flex-sm-row align-items-center align-items-sm-end gap-4 p-4 p-sm-5">
                        {/* Avatar with glow ring */}
                        <div className="position-relative flex-shrink-0">
                          <div
                            className="position-absolute top-50 start-50 translate-middle rounded-circle"
                            style={{
                              width: '96px', height: '96px',
                              background: 'radial-gradient(circle, rgba(255,212,0,0.5) 0%, transparent 70%)',
                              filter: 'blur(12px)',
                            }}
                          />
                          <div
                            className="rounded-circle overflow-hidden position-relative"
                            style={{
                              width: '84px', height: '84px',
                              border: '2.5px solid rgba(255,212,0,0.7)',
                              boxShadow: '0 0 24px rgba(255,212,0,0.25)',
                              background: '#111',
                            }}
                          >
                            {currentUser.photo ? (
                              <img
                                src={currentUser.photo}
                                alt={currentUser.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                <User size={36} style={{ color: 'rgba(255,212,0,0.6)' }} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Name + meta */}
                        <div className="flex-grow-1 text-center text-sm-start">
                          <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                            <h2 className="text-white fw-bold mb-0" style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>
                              {currentUser.name}
                            </h2>
                            {/* Verified badge */}
                            <span
                              className="d-inline-flex align-items-center gap-1 px-2 py-0-5 rounded-pill"
                              style={{
                                background: 'rgba(255,212,0,0.12)',
                                border: '1px solid rgba(255,212,0,0.3)',
                                fontSize: '9px',
                                fontWeight: 700,
                                color: '#FFD400',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                              }}
                            >
                              <Shield size={9} />
                              Verified
                            </span>
                          </div>
                          <div className="sv-text-muted fs-7">{currentUser.email}</div>
                          {currentUser.city && (
                            <div className="d-inline-flex align-items-center gap-1 mt-2 sv-text-dim fs-8">
                              <MapPin size={11} style={{ color: '#FFD400' }} />
                              <span>{currentUser.city}</span>
                            </div>
                          )}
                        </div>

                        {/* Member since pill */}
                        <div
                          className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill flex-shrink-0"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <Award size={13} style={{ color: '#FFD400' }} />
                          <span className="sv-text-muted fs-8 fw-medium">ScoreVerse Player</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Quick Stats Row ──────────────────────────────── */}
                    <div className="row g-3 mb-4">
                      {[
                        {
                          label: 'Total Bookings',
                          value: bookings.length,
                          icon: <Calendar size={18} />,
                          color: '#FFD400',
                        },
                        {
                          label: 'Active Slots',
                          value: getActiveBookings().length,
                          icon: <TrendingUp size={18} />,
                          color: '#4ade80',
                        },
                        {
                          label: 'Past Games',
                          value: getPastBookings().length,
                          icon: <Star size={18} />,
                          color: '#a78bfa',
                        },
                      ].map((stat) => (
                        <div className="col-4" key={stat.label}>
                          <div
                            className="p-3 rounded-4 text-center"
                            style={{
                              background: 'rgba(255,255,255,0.025)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <div className="mb-1" style={{ color: stat.color }}>{stat.icon}</div>
                            <div className="text-white fw-bold fs-4" style={{ fontFamily: 'var(--font-display)' }}>
                              {stat.value}
                            </div>
                            <div className="sv-text-dim" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── Info Cards ───────────────────────────────────── */}
                    <div
                      className="p-4 rounded-4"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <User size={15} style={{ color: '#FFD400' }} />
                        <span className="text-white fw-semibold fs-7" style={{ fontFamily: 'var(--font-display)' }}>Account Information</span>
                      </div>

                      <div className="row g-3">
                        {[
                          { label: 'Full Name', value: currentUser.name, icon: <User size={14} />, color: '#FFD400' },
                          { label: 'Email Address', value: currentUser.email, icon: <Mail size={14} />, color: '#60a5fa' },
                          { label: 'Mobile Number', value: currentUser.mobile || 'Not provided', icon: <Phone size={14} />, color: '#34d399' },
                          { label: 'City / Region', value: currentUser.city || 'Not selected', icon: <MapPin size={14} />, color: '#f472b6' },
                        ].map((field) => (
                          <div className="col-12 col-sm-6" key={field.label}>
                            <div
                              className="p-3 rounded-3 h-100"
                              style={{
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'border-color 0.2s',
                              }}
                            >
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span style={{ color: field.color }}>{field.icon}</span>
                                <span className="sv-text-dim" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                                  {field.label}
                                </span>
                              </div>
                              <div
                                className="text-white fw-semibold"
                                style={{ fontSize: '14px', fontFamily: 'var(--font-display)', wordBreak: 'break-word' }}
                              >
                                {field.value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Footer note ─────────────────────────────────── */}
                    <div className="d-flex align-items-center gap-2 mt-3 px-1">
                      <Shield size={12} style={{ color: 'rgba(255,212,0,0.5)' }} />
                      <span className="sv-text-dim" style={{ fontSize: '11px' }}>
                        Your data is protected and never shared with third parties.
                      </span>
                    </div>
                  </motion.div>
                )}


              </AnimatePresence>
            </div>

          </div>
        )}
      </div>

      {/* Embedded Google Identity OAuth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => checkAuth()} 
      />

      {/* Download App to Cancel Modal */}
      <AnimatePresence>
        {isCancelModalOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 10000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 p-md-5 rounded-4 position-relative border text-center"
              style={{
                width: '100%',
                maxWidth: '430px',
                background: 'rgba(15, 15, 20, 0.95)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsCancelModalOpen(false)}
                className="position-absolute top-0 end-0 m-4 border-0 bg-transparent text-light opacity-50 hover-white"
              >
                <X size={20} />
              </button>

              <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-3 border border-warning" style={{ background: 'rgba(255, 212, 0, 0.05)' }}>
                <Smartphone size={28} className="sv-text-primary" />
              </div>

              <h4 className="text-white fw-bold mb-2">Cancel via Mobile App</h4>
              <p className="sv-text-muted fs-8 mb-4 px-2" style={{ lineHeight: '1.6' }}>
                For security, slot releases and automated refund management are processed exclusively through the **ScoreVerse** mobile application.
              </p>

              {/* Live Scannable Play Store QR Code */}
              <div className="d-flex flex-column align-items-center justify-content-center p-3 rounded-3 mb-4 border border-secondary" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://play.google.com/store/apps/details?id=com.scoreverse.sports" 
                  alt="Scan to Download ScoreVerse App" 
                  style={{ width: '140px', height: '140px' }}
                  className="mb-2"
                />
                <span className="fs-8 text-black fw-bold">Scan to download app</span>
              </div>

              <a 
                href="https://play.google.com/store/apps/details?id=com.scoreverse.sports" 
                target="_blank" 
                rel="noreferrer"
                className="sv-btn sv-btn-primary w-100 py-3 justify-content-center fw-bold fs-7 d-flex align-items-center gap-2 mb-2"
                style={{ borderRadius: '12px', color: '#000000' }}
              >
                <Download size={16} />
                Download for Android
              </a>
              
              <button 
                onClick={() => setIsCancelModalOpen(false)}
                className="btn btn-link text-decoration-none text-light opacity-50 hover-white fs-8 py-2 mt-1"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
