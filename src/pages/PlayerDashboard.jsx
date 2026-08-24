import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, AlertCircle, XCircle, LogOut, CheckCircle2, User, ChevronRight, MessageSquare, X, Smartphone, QrCode, Download } from 'lucide-react'
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
                    <h2 className="text-white fw-bold mb-3 fs-4">Active Game Bookings</h2>
                    
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border spinner-border-sm sv-text-primary" />
                      </div>
                    ) : getActiveBookings().length === 0 ? (
                      <div className="text-center py-5 border border-secondary rounded-4" style={{ background: 'rgba(255,255,255,0.01)' }}>
                        <Calendar size={32} className="sv-text-primary opacity-30 mb-2" />
                        <p className="sv-text-muted fs-7 mb-0">No active bookings found. Go search some fields!</p>
                        <a href="/search" className="btn btn-sm border border-secondary text-white rounded-pill mt-3 px-3">
                          Book a Turf
                        </a>
                      </div>
                    ) : (
                      <div className="row row-cols-1 g-3">
                        {getActiveBookings().map((booking) => {
                          const snapshot = booking.slotsSnapshot?.[0]
                          return (
                            <div key={booking._id} className="col">
                              <div 
                                className="p-4 rounded-4 border d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center"
                                style={{
                                  background: 'rgba(255,255,255,0.02)',
                                  borderColor: 'rgba(255,255,255,0.06)'
                                }}
                              >
                                <div className="text-start">
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className="badge rounded-pill bg-success-subtle border border-success text-success px-2.5 py-1" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                                      {booking.status}
                                    </span>
                                    <span className="sv-text-dim font-size-11">Ref: {booking.bookingRef || booking._id.slice(-6).toUpperCase()}</span>
                                  </div>
                                  <h3 className="text-white fs-5 fw-bold mb-2">{snapshot?.turfName || 'Sports Turf'}</h3>
                                  <div className="d-flex flex-column gap-1.5 sv-text-muted fs-7">
                                    <div className="d-flex align-items-center gap-1.5">
                                      <Calendar size={13} className="sv-text-primary" />
                                      <span>{snapshot ? new Date(snapshot.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1.5">
                                      <Clock size={13} className="sv-text-primary" />
                                      <span>{booking.slotsSnapshot?.map(s => s.startTime).join(', ')}</span>
                                    </div>
                                    {snapshot?.turfAddress && (
                                      <div className="d-flex align-items-center gap-1.5 text-truncate" style={{ maxWidth: '320px' }}>
                                        <MapPin size={13} className="sv-text-primary" />
                                        <span>{snapshot.turfAddress}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="d-flex flex-row flex-md-column justify-content-between align-items-end gap-2 border-top border-md-0 pt-3 pt-md-0" style={{ borderColor: 'rgba(255,255,255,0.05)', minWidth: '150px' }}>
                                  <div className="text-start text-md-end mb-md-2">
                                    <div className="sv-text-muted font-size-11">Paid Amount</div>
                                    <div className="sv-text-primary fw-black fs-5">₹{booking.finalAmount}</div>
                                  </div>
                                  
                                  <div className="d-flex gap-2">
                                    <button 
                                      onClick={() => openCancelModal()}
                                      className="btn btn-sm border border-secondary text-light opacity-75 rounded-pill px-3 py-1-5 fs-8 hover-white"
                                    >
                                      Cancel Booking
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                    <h2 className="text-white fw-bold mb-3 fs-4">Past Bookings & History</h2>
                    
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border spinner-border-sm sv-text-primary" />
                      </div>
                    ) : getPastBookings().length === 0 ? (
                      <div className="text-center py-5 border border-secondary rounded-4" style={{ background: 'rgba(255,255,255,0.01)' }}>
                        <XCircle size={32} className="sv-text-primary opacity-30 mb-2" />
                        <p className="sv-text-muted fs-7 mb-0">No booking history records found.</p>
                      </div>
                    ) : (
                      <div className="table-responsive rounded-4 border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <table className="table table-dark table-striped align-middle mb-0 text-start" style={{ background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.06)' }}>
                          <thead className="table-dark" style={{ background: '#111' }}>
                            <tr style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--sv-text-muted)' }}>
                              <th className="py-3 px-4">Turf / Venue</th>
                              <th className="py-3">Date & Time</th>
                              <th className="py-3">Amount</th>
                              <th className="py-3 px-4 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: '13px' }}>
                            {getPastBookings().map((booking) => {
                              const snapshot = booking.slotsSnapshot?.[0]
                              const isCancelled = booking.status === 'cancelled'
                              
                              return (
                                <tr key={booking._id} style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                                  <td className="py-3 px-4 fw-bold text-white">
                                    {snapshot?.turfName || 'Sports Turf'}
                                    <div className="font-size-10 sv-text-dim mt-0.5">Ref: {booking.bookingRef || booking._id.slice(-6).toUpperCase()}</div>
                                  </td>
                                  <td className="py-3 sv-text-muted">
                                    <div>{snapshot ? new Date(snapshot.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</div>
                                    <div className="font-size-11 opacity-75">{booking.slotsSnapshot?.map(s => s.startTime).join(', ')}</div>
                                  </td>
                                  <td className="py-3 sv-text-primary fw-bold">₹{booking.finalAmount}</td>
                                  <td className="py-3 px-4 text-center">
                                    <span className={`badge rounded-pill px-2.5 py-1 ${isCancelled ? 'bg-danger-subtle border border-danger text-danger' : 'bg-secondary-subtle border border-secondary text-light'}`} style={{ fontSize: '9px', textTransform: 'uppercase' }}>
                                      {booking.status}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
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
                    className="p-4 rounded-4 border text-start"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: 'rgba(255,255,255,0.06)'
                    }}
                  >
                    <h3 className="text-white fw-bold mb-4 fs-5 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      Player Profile Details
                    </h3>

                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <div className="sv-text-muted font-size-11">Full Name</div>
                        <div className="text-white fw-medium fs-6 mt-1">{currentUser.name}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="sv-text-muted font-size-11">Email Address</div>
                        <div className="text-white fw-medium fs-6 mt-1">{currentUser.email}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="sv-text-muted font-size-11">Mobile Number</div>
                        <div className="text-white fw-medium fs-6 mt-1">{currentUser.mobile || 'Not provided'}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="sv-text-muted font-size-11">City / Region</div>
                        <div className="text-white fw-medium fs-6 mt-1">{currentUser.city || 'Not selected'}</div>
                      </div>
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
