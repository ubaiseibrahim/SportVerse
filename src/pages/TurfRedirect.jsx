import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Download, Calendar, Clock, Sparkles, Check, AlertTriangle } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'
import AuthModal from '../components/AuthModal'
import { Helmet } from 'react-helmet-async'

export default function TurfRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const turfId = pathParts[1]
  const dateInputRef = useRef(null)

  const [turfData, setTurfData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // Slots & Booking states
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([]) // Array of slot objects
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [platformFeePercent, setPlatformFeePercent] = useState(5)
  
  // Auth states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  
  // Payment states
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Fetch dynamic platform fee settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/public-settings`)
        if (response.ok) {
          const data = await response.json()
          const settings = data.data || data
          if (settings.bookingPlatformFeePercent !== undefined) {
            setPlatformFeePercent(Number(settings.bookingPlatformFeePercent))
          }
        }
      } catch (err) {
        console.error('Error fetching settings:', err)
      }
    }
    fetchSettings()
  }, [])

  // Load auth state on init and custom event
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

  // Generate next 7 days for the date picker (Indian format: Day first, e.g. Mon, 24 Aug)
  useEffect(() => {
    const generatedDates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const dateStr = d.toISOString().split('T')[0] // YYYY-MM-DD
      const options = { weekday: 'short', day: 'numeric', month: 'short' }
      const label = d.toLocaleDateString('en-IN', options)
      generatedDates.push({ dateStr, label })
    }
    setDates(generatedDates)
    if (generatedDates.length > 0) {
      setSelectedDate(generatedDates[0].dateStr)
    }
  }, [])

  // Fetch Turf Details
  useEffect(() => {
    if (!turfId) {
      setLoading(false)
      setError(true)
      return
    }

    const fetchTurf = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/turfs/${turfId}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setTurfData(data.data || data)
      } catch (err) {
        console.error('Error fetching turf:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTurf()
  }, [turfId])

  const fetchSlots = async () => {
    if (!turfId || !selectedDate) return
    setLoadingSlots(true)
    try {
      const response = await fetch(`${API_BASE_URL}/slots/${turfId}/${selectedDate}`)
      if (response.ok) {
        const data = await response.json()
        setSlots(data.data || data || [])
      }
    } catch (err) {
      console.error('Error fetching slots:', err)
    } finally {
      setLoadingSlots(false)
    }
  }

  // Fetch Slots when Date changes
  useEffect(() => {
    if (turfId && selectedDate) {
      fetchSlots()
      // Reset selected slots when date changes to prevent cross-date bookings
      setSelectedSlots([])
    }
  }, [turfId, selectedDate])

  const handleCustomDateSelect = (dateStr) => {
    const d = new Date(dateStr)
    const options = { weekday: 'short', day: 'numeric', month: 'short' }
    const label = d.toLocaleDateString('en-IN', options)
    
    const exists = dates.some((item) => item.dateStr === dateStr)
    if (!exists) {
      setDates((prev) => [...prev, { dateStr, label }])
    }
    setSelectedDate(dateStr)
  }

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return ''
    const [hourStr, minStr] = time24.split(':')
    let hour = parseInt(hourStr, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12
    const formattedHour = hour.toString().padStart(2, '0')
    return `${formattedHour}:${minStr} ${ampm}`
  }

  const toggleSlotSelection = (slot) => {
    if (slot.status !== 'available') return
    
    setSelectedSlots((prev) => {
      const exists = prev.find((s) => s._id === slot._id)
      if (exists) {
        return prev.filter((s) => s._id !== slot._id)
      } else {
        return [...prev, slot]
      }
    })
  }

  // Load Razorpay Checkout library dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // Execute Slot Booking via Razorpay
  const handleProceedBooking = async () => {
    if (!currentUser || !accessToken) {
      setIsAuthModalOpen(true)
      return
    }

    if (selectedSlots.length === 0) return

    setBookingLoading(true)
    setBookingError('')

    let bookingId = null

    try {
      // 1. Create Booking (Locks slots)
      const bookingResponse = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          slots: selectedSlots.map((s) => s._id),
          bookingType: 'normal'
        })
      })

      const bookingResult = await bookingResponse.json()
      if (!bookingResponse.ok) {
        throw new Error(bookingResult.message || 'Failed to lock slots')
      }

      const payload = bookingResult.data || bookingResult
      bookingId = payload.booking?._id || payload._id

      // 2. Create Razorpay Order
      const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bookingId })
      })

      const orderResult = await orderResponse.json()
      if (!orderResponse.ok) {
        throw new Error(orderResult.message || 'Failed to create payment order')
      }

      const { order, key } = orderResult.data || orderResult

      // 3. Load Razorpay overlay script
      const scriptLoaded = await loadRazorpay()
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.')
      }

      // 4. Open Razorpay standard checkout
      const options = {
        key: key,
        amount: order.amount,
        currency: 'INR',
        name: 'ScoreVerse',
        description: `Booking for ${selectedSlots.length} slot(s) at ${turfData.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            setBookingLoading(true)
            // Verify payment on backend
            const verifyResponse = await fetch(`${API_BASE_URL}/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId
              })
            })

            const verifyResult = await verifyResponse.json()
            if (!verifyResponse.ok) {
              throw new Error(verifyResult.message || 'Payment verification failed')
            }

            // Show success animation then redirect
            setBookingSuccess(true)
            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 2500)
          } catch (err) {
            setBookingError(err.message || 'Failed to verify payment.')
            setBookingLoading(false)
          }
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.mobile || ''
        },
        theme: {
          color: '#FFD400'
        },
        modal: {
          ondismiss: async function () {
            // Cancel booking on backend if user dismisses payment
            try {
              await fetch(`${API_BASE_URL}/bookings/${bookingId}/payment-failed`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${accessToken}` }
              })
              await fetchSlots()
              setSelectedSlots([])
            } catch (err) {
              console.error('Error canceling pending booking:', err)
            }
            setBookingLoading(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', async function (response) {
        console.error('Razorpay payment failed:', response.error)
        try {
          await fetch(`${API_BASE_URL}/bookings/${bookingId}/payment-failed`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })
          await fetchSlots()
          setSelectedSlots([])
        } catch (err) {
          console.error('Error releasing slots:', err)
        }
        setBookingError(`Payment failed: ${response.error.description}`)
        setBookingLoading(false)
      })

      rzp.open()
    } catch (err) {
      setBookingError(err.message || 'An error occurred during booking setup.')
      // If we failed after booking creation but before Razorpay open, release slots
      if (bookingId) {
        try {
          await fetch(`${API_BASE_URL}/bookings/${bookingId}/payment-failed`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })
          await fetchSlots()
          setSelectedSlots([])
        } catch (releaseErr) {
          console.error('Error releasing slots:', releaseErr)
        }
      }
      setBookingLoading(false)
    }
  }

  // Calculate pricing breakdown
  const calculateTotalBase = () => {
    return selectedSlots.reduce((sum, slot) => sum + (slot.discountPrice || slot.price), 0)
  }

  const calculatePlatformFee = () => {
    const base = calculateTotalBase()
    return Math.round(base * (platformFeePercent / 100))
  }

  const calculateGrandTotal = () => {
    return calculateTotalBase() + calculatePlatformFee()
  }

  return (
    <div 
      className="position-relative overflow-hidden w-100"
      style={{ minHeight: '90vh', backgroundColor: 'var(--sv-bg)', paddingTop: '100px', paddingBottom: '80px' }}
    >
      {turfData && (
        <Helmet>
          <title>{`${turfData.name} – Book Turf on ScoreVerse`}</title>
          <meta name="description" content={turfData.description || `Book ${turfData.name} in ${turfData.city}. Check available slots and book instantly.`} />
          <meta property="og:title" content={`${turfData.name} – Book Turf on ScoreVerse`} />
          <meta property="og:description" content={turfData.description || `Book ${turfData.name} in ${turfData.city}. Check available slots and book instantly.`} />
          {turfData.coverImage && <meta property="og:image" content={getImageUrl(turfData.coverImage)} />}
          <meta property="twitter:title" content={`${turfData.name} – Book Turf on ScoreVerse`} />
          <meta property="twitter:description" content={turfData.description || `Book ${turfData.name} in ${turfData.city}. Check available slots and book instantly.`} />
          {turfData.coverImage && <meta property="twitter:image" content={getImageUrl(turfData.coverImage)} />}
          
          {/* JSON-LD Schema for LocalBusiness */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": turfData.name,
              "image": turfData.coverImage ? getImageUrl(turfData.coverImage) : "https://scoreverse.in/SportVerse.png",
              "description": turfData.description || `Sports turf located in ${turfData.city}.`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": turfData.city || "India",
                "addressCountry": "IN"
              },
              "url": `https://scoreverse.in/turf/${turfId}`
            })}
          </script>
        </Helmet>
      )}
      {/* Background glow atmospheric */}
      <div 
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(var(--sv-primary-rgb), 0.08) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border sv-text-primary" role="status" />
            <p className="sv-text-muted mt-3">Loading turf details...</p>
          </div>
        ) : error || !turfData ? (
          <div className="text-center py-5 glass-strong p-5 rounded-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <AlertTriangle size={48} className="text-danger mb-3" />
            <h2 className="text-white fw-bold mb-3">Turf Not Found</h2>
            <p className="sv-text-muted">This turf does not exist or has been deactivated. Please return to the search page.</p>
            <a href="/search" className="btn border border-secondary text-white rounded-pill mt-3 px-4">
              Return to Search
            </a>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            
            {/* Left Column: Turf Info Card */}
            <div className="col-12 col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-4 overflow-hidden border"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Cover Image */}
                <div style={{ width: '100%', height: '260px', background: 'rgba(var(--sv-primary-rgb), 0.1)', position: 'relative' }}>
                  {turfData.coverImage ? (
                    <img 
                      src={getImageUrl(turfData.coverImage)} 
                      alt={turfData.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                      <MapPin size={48} className="sv-text-primary opacity-50" />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0, height: '80px',
                    background: 'linear-gradient(to top, rgba(15, 15, 20, 1), transparent)'
                  }} />
                </div>

                {/* Details Section */}
                <div className="p-4 mt-n3 position-relative" style={{ zIndex: 2 }}>
                  <h1 className="fw-black text-white mb-2" style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
                    {turfData.name}
                  </h1>

                  <div className="d-flex align-items-center mb-3">
                    {turfData.googleMapsUrl ? (
                      <a 
                        href={turfData.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-sm border border-secondary text-light rounded-pill px-3 py-1 text-decoration-none d-inline-flex align-items-center gap-1 hover-white"
                        style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.02)' }}
                      >
                        <MapPin size={12} className="sv-text-primary" />
                        {turfData.city ? `Find in ${turfData.city}` : 'Find on Map'}
                      </a>
                    ) : (
                      <p className="sv-text-muted fs-7 mb-0">
                        <MapPin size={14} className="sv-text-primary me-1" style={{ verticalAlign: 'text-bottom' }} />
                        {turfData.city || 'Location unavailable'}
                      </p>
                    )}
                  </div>

                  <p className="sv-text-muted fs-7 mb-4" style={{ lineHeight: '1.6' }}>
                    {turfData.description || 'No description available for this sports venue.'}
                  </p>

                  <h4 className="text-white fs-6 fw-bold mb-2">Amenities</h4>
                  {turfData.amenities && (
                    <div className="d-flex flex-wrap gap-1-5 mb-4">
                      {Object.entries(turfData.amenities)
                        .filter(([_, val]) => val)
                        .map(([key]) => (
                          <span 
                            key={key} 
                            className="badge bg-dark border border-secondary text-light px-2.5 py-1.5 rounded-pill" 
                            style={{ fontSize: '10px', textTransform: 'uppercase', borderColor: 'rgba(255,255,255,0.06) !important' }}
                          >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        ))
                      }
                    </div>
                  )}

                  <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  
                  {/* Share info link back to search */}
                  <a href="/search" className="sv-text-dim text-decoration-none hover-white fs-7 d-flex align-items-center gap-1">
                    <ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} /> Back to search results
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Booking Selector */}
            <div className="col-12 col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-4 border p-3 d-flex flex-column h-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <Calendar size={16} className="sv-text-primary" />
                    <h3 className="text-white fw-bold mb-0" style={{ fontSize: '1.1rem' }}>Select Booking Schedule</h3>
                  </div>

                  {/* Custom Date Input Picker */}
                  <div className="position-relative">
                    <input
                      ref={dateInputRef}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        if (e.target.value) {
                          handleCustomDateSelect(e.target.value)
                        }
                      }}
                      className="position-absolute opacity-0 start-0 top-0 w-100 h-100"
                      style={{ pointerEvents: 'none' }}
                    />
                    <button 
                      onClick={() => dateInputRef.current?.showPicker()}
                      className="btn btn-sm border border-secondary text-white rounded-pill px-3 py-1.5 d-flex align-items-center gap-1 hover-white"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)', fontSize: '0.8rem', zIndex: 10 }}
                    >
                      <Calendar size={12} className="sv-text-primary" />
                      <span>Custom...</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Date Picker */}
                <div className="d-flex gap-2 overflow-auto pb-3 mb-4 scrollbar-thin" style={{ whiteSpace: 'nowrap' }}>
                  {dates.map(({ dateStr, label }) => {
                    const isSelected = selectedDate === dateStr
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className="btn py-1.5 px-2 rounded-3 text-center d-inline-block border"
                        style={{
                          background: isSelected ? 'var(--sv-gold)' : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#000' : '#fff',
                          borderColor: isSelected ? 'var(--sv-gold)' : 'rgba(255,255,255,0.08)',
                          minWidth: '75px',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ fontSize: '9px', textTransform: 'uppercase', opacity: isSelected ? 0.7 : 0.5 }}>
                          {label.split(' ')[0]}
                        </div>
                        <div className="fw-bold fs-7">
                          {label.split(' ')[1]} {label.split(' ')[2]}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Slots Grid Area */}
                <div className="flex-grow-1 mb-4">
                  <h4 className="text-white fs-7 fw-semibold mb-3">Available Hourly Slots</h4>

                  {loadingSlots ? (
                    <div className="text-center py-5">
                      <div className="spinner-border spinner-border-sm sv-text-primary" role="status" />
                      <p className="sv-text-muted fs-7 mt-2">Fetching open slots...</p>
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-4 border border-secondary rounded-3" style={{ background: 'rgba(255,255,255,0.01)' }}>
                      <Clock size={28} className="sv-text-primary opacity-30 mb-2" />
                      <p className="sv-text-muted fs-7 mb-0">No slots defined for this date. Check another date.</p>
                    </div>
                  ) : (
                    <motion.div 
                      className="row row-cols-3 row-cols-sm-3 row-cols-md-4 g-2"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.05 }
                        }
                      }}
                    >
                      {slots.map((slot) => {
                        const isSelected = selectedSlots.some((s) => s._id === slot._id)
                        
                        // Check if slot startTime is in the past for today
                        const todayStr = new Date().toISOString().split('T')[0]
                        const isToday = selectedDate === todayStr
                        const slotHour = parseInt(slot.startTime.split(':')[0], 10)
                        const isPastHour = isToday && slotHour <= new Date().getHours()

                        const isAvailable = slot.status === 'available' && !isPastHour
                        const isBooked = slot.status === 'booked' || slot.status === 'offline_booking'
                        
                        return (
                          <motion.div 
                            key={slot._id} 
                            className="col"
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                            }}
                          >
                            <motion.button
                              whileHover={isAvailable ? { scale: 1.05, boxShadow: '0 5px 15px rgba(255,212,0,0.15)' } : {}}
                              whileTap={isAvailable ? { scale: 0.95 } : {}}
                              disabled={!isAvailable}
                              onClick={() => toggleSlotSelection(slot)}
                              className={`w-100 py-2 px-1 rounded-3 border text-center transition-all d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden ${isSelected ? 'text-black fw-bold' : ''}`}
                              style={{
                                borderColor: isSelected 
                                  ? 'var(--sv-gold)' 
                                  : isBooked || isPastHour
                                    ? 'rgba(255,255,255,0.02)' 
                                    : 'rgba(255,255,255,0.12)',
                                background: isSelected 
                                  ? 'linear-gradient(135deg, var(--sv-gold) 0%, #ffea70 100%)'
                                  : isBooked || isPastHour
                                    ? 'rgba(255, 255, 255, 0.02)' 
                                    : 'rgba(255,255,255,0.05)',
                                opacity: (isBooked || isPastHour) ? 0.35 : 1,
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                backdropFilter: 'blur(10px)',
                                boxShadow: isSelected ? '0 10px 30px rgba(255,212,0,0.25)' : 'none'
                              }}
                            >
                              {/* Selection glow indicator */}
                              {isSelected && (
                                <motion.div 
                                  layoutId="outline"
                                  className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                                  style={{ border: '2px solid rgba(255,255,255,0.5)', pointerEvents: 'none' }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                />
                              )}
                              <span className={isSelected ? 'text-black fw-black' : 'text-light fw-medium'} style={{ fontSize: '0.75rem', zIndex: 1 }}>
                                {formatTimeTo12Hour(slot.startTime)} - {formatTimeTo12Hour(slot.endTime)}
                              </span>
                              <span className="mt-1" style={{ fontSize: '0.65rem', color: isSelected ? 'rgba(0,0,0,0.7)' : 'var(--sv-text-muted)', fontWeight: isSelected ? '800' : '600', zIndex: 1 }}>
                                {isBooked ? 'Booked' : isPastHour ? 'Passed' : `₹${slot.discountPrice || slot.price}`}
                              </span>
                            </motion.button>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </div>

                {/* Booking Pricing Breakdown basket */}
                {selectedSlots.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 px-3 rounded-3 mb-2 border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="d-flex justify-content-between fs-8 mb-1">
                      <span className="sv-text-muted">Selected Slots ({selectedSlots.length})</span>
                      <span className="text-white fw-medium">₹{calculateTotalBase()}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-8 mb-2">
                      <span className="sv-text-muted">Platform Fee ({platformFeePercent}%)</span>
                      <span className="text-white fw-medium">+ ₹{calculatePlatformFee()}</span>
                    </div>
                    <div className="border-top border-secondary my-1" />
                    <div className="d-flex justify-content-between fs-7 fw-bold mb-1">
                      <span className="text-white">Total Amount</span>
                      <span className="sv-text-primary">₹{calculateGrandTotal()}</span>
                    </div>
                  </motion.div>
                )}

                {bookingError && (
                  <div className="alert alert-danger py-2 fs-7 mb-3 d-flex align-items-center gap-2">
                    <AlertTriangle size={14} />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* Checkout button */}
                <button
                  disabled={selectedSlots.length === 0 || bookingLoading}
                  onClick={handleProceedBooking}
                  className="sv-btn sv-btn-primary w-100 py-3 justify-content-center fw-bold fs-6 mt-auto"
                  style={{ borderRadius: '12px' }}
                >
                  {bookingLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Processing Checkout...
                    </>
                  ) : !currentUser ? (
                    'Log in with Google to Book'
                  ) : (
                    `Confirm and Book (₹${selectedSlots.length > 0 ? calculateGrandTotal() : 0})`
                  )}
                </button>
              </motion.div>
            </div>

          </div>
        )}
      </div>

      {/* Animated Success Overlay */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ 
              background: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(10px)', 
              zIndex: 9999 
            }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="text-center p-5 rounded-4"
              style={{ background: 'rgba(255,212,0,0.1)', border: '1px solid var(--sv-gold)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Check size={80} className="mb-4 mx-auto" style={{ color: 'var(--sv-gold)' }} />
              </motion.div>
              <h2 className="text-white fw-bold mb-2">Booking Confirmed!</h2>
              <p className="sv-text-muted mb-0">Redirecting to your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Google Identity OAuth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => { checkAuth(); fetchSlots(); }} 
      />
    </div>
  )
}
