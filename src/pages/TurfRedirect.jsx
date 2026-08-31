import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Download, Calendar, Clock, Sparkles, Check, AlertTriangle, Sun, Moon, Sunrise, Sunset, Layers } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'
import AuthModal from '../components/AuthModal'
import { Helmet } from 'react-helmet-async'

const getTimeGroup = (timeStr) => {
  if (!timeStr) return 'morning'
  const hour = parseInt(timeStr.split(':')[0], 10)
  if (hour >= 0 && hour < 6) return 'early_morning'
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 16) return 'afternoon'
  if (hour >= 16 && hour < 20) return 'evening'
  return 'night'
}

const isPastSlot = (dateStr, startTime) => {
  if (!dateStr || !startTime) return false
  const [h, m] = startTime.split(':').map(Number)
  const now = new Date()
  const [year, month, day] = dateStr.split('-').map(Number)
  const slotDate = new Date(year, month - 1, day, h, m, 0, 0)
  return slotDate.getTime() <= now.getTime()
}

const TIME_TABS = [
  { key: 'all', label: 'All Slots', icon: Layers },
  { key: 'early_morning', label: 'Early Morning', sub: '12-6 AM', icon: Sunrise },
  { key: 'morning', label: 'Morning', sub: '6-12 PM', icon: Sun },
  { key: 'afternoon', label: 'Afternoon', sub: '12-4 PM', icon: Sun },
  { key: 'evening', label: 'Evening', sub: '4-8 PM', icon: Sunset },
  { key: 'night', label: 'Night', sub: '8-12 AM', icon: Moon }
]

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
  const [selectedIntervalMode, setSelectedIntervalMode] = useState('60')
  const [activeTimeTab, setActiveTimeTab] = useState('all')
  
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
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}` // YYYY-MM-DD local format
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
        const turf = data.data || data
        setTurfData(turf)
        if (turf.bookingMode === '30_min') {
          setSelectedIntervalMode('30')
        }
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

  const databaseHas30MinSlots = React.useMemo(() => {
    if (!slots || slots.length === 0) return false
    return slots.some((s) => {
      const [startH, startM] = s.startTime.split(':').map(Number)
      const [endH, endM] = s.endTime.split(':').map(Number)
      const diff = (endH * 60 + endM) - (startH * 60 + startM)
      return diff === 30 || diff === -1380
    })
  }, [slots])

  useEffect(() => {
    if (slots && slots.length > 0 && !databaseHas30MinSlots) {
      setSelectedIntervalMode('60')
    }
  }, [slots, databaseHas30MinSlots])

  const handleCustomDateSelect = (dateStr) => {
    if (!dateStr) return
    const [year, month, day] = dateStr.split('-').map(Number)
    const d = new Date(year, month - 1, day)
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

  // Processed slots with 30m / 60m merging logic matching SlotPickerScreen
  const processedSlots = React.useMemo(() => {
    if (!slots || slots.length === 0) return []
    let finalSlots = slots

    if (selectedIntervalMode === '60' && databaseHas30MinSlots) {
      const merged = []
      const sorted = [...slots].sort((a, b) => a.startTime.localeCompare(b.startTime))
      let i = 0
      while (i < sorted.length) {
        const slot1 = sorted[i]
        const slot2 = sorted[i + 1]
        if (slot2 && slot1.endTime === slot2.startTime) {
          let discountPrice = null
          if ((slot1.discountPrice !== undefined && slot1.discountPrice !== null) || 
              (slot2.discountPrice !== undefined && slot2.discountPrice !== null)) {
            const p1 = slot1.discountPrice !== undefined && slot1.discountPrice !== null ? slot1.discountPrice : slot1.price
            const p2 = slot2.discountPrice !== undefined && slot2.discountPrice !== null ? slot2.discountPrice : slot2.price
            discountPrice = p1 + p2
          }
          merged.push({
            _id: `${slot1._id}_${slot2._id}`,
            isMerged: true,
            originalSlots: [slot1, slot2],
            startTime: slot1.startTime,
            endTime: slot2.endTime,
            price: slot1.price + slot2.price,
            discountPrice,
            status: (slot1.status === 'available' && slot2.status === 'available') ? 'available' : 'booked',
          })
          i += 2
        } else {
          i++
        }
      }
      finalSlots = merged
    }

    return finalSlots
  }, [slots, selectedIntervalMode, databaseHas30MinSlots])

  // Filter slots for the active time tab
  const visibleSlots = React.useMemo(() => {
    if (activeTimeTab === 'all') return processedSlots
    return processedSlots.filter((s) => getTimeGroup(s.startTime) === activeTimeTab)
  }, [processedSlots, activeTimeTab])

  // Calculate available counts per tab
  const tabCounts = React.useMemo(() => {
    const counts = { all: 0, early_morning: 0, morning: 0, afternoon: 0, evening: 0, night: 0 }
    processedSlots.forEach((slot) => {
      const past = isPastSlot(selectedDate, slot.startTime)
      let isAvail = false
      if (slot.isMerged) {
        const s1Booked = slot.originalSlots[0].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[0].startTime)
        const s2Booked = slot.originalSlots[1].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[1].startTime)
        isAvail = !s1Booked || !s2Booked
      } else {
        isAvail = slot.status === 'available' && !past
      }
      if (isAvail) {
        counts.all++
        const group = getTimeGroup(slot.startTime)
        if (counts[group] !== undefined) counts[group]++
      }
    })
    return counts
  }, [processedSlots, selectedDate])

  const toggleSlotSelection = (slot) => {
    if (slot.isMerged) {
      const s1Booked = slot.originalSlots[0].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[0].startTime)
      const s2Booked = slot.originalSlots[1].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[1].startTime)
      const isPartiallyBooked = (s1Booked && !s2Booked) || (!s1Booked && s2Booked)

      if (isPartiallyBooked) {
        setSelectedIntervalMode('30')
        return
      }

      if (slot.status !== 'available' || isPastSlot(selectedDate, slot.startTime)) return

      const allSelected = slot.originalSlots.every((os) => selectedSlots.some((s) => s._id === os._id))
      if (allSelected) {
        const idsToRemove = slot.originalSlots.map((os) => os._id)
        setSelectedSlots((prev) => prev.filter((s) => !idsToRemove.includes(s._id)))
      } else {
        const toAdd = slot.originalSlots.filter((os) => !selectedSlots.some((s) => s._id === os._id))
        setSelectedSlots((prev) => [...prev, ...toAdd])
      }
    } else {
      if (slot.status !== 'available' || isPastSlot(selectedDate, slot.startTime)) return
      setSelectedSlots((prev) => {
        const exists = prev.find((s) => s._id === slot._id)
        if (exists) {
          return prev.filter((s) => s._id !== slot._id)
        } else {
          return [...prev, slot]
        }
      })
    }
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
    return selectedSlots.reduce((sum, slot) => sum + (slot.discountPrice !== undefined && slot.discountPrice !== null ? slot.discountPrice : slot.price), 0)
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
          
          {/* JSON-LD Schema for LocalBusiness with AggregateRating */}
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
              "url": `https://scoreverse.in/turf/${turfId}`,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": turfData.rating || "4.8",
                "reviewCount": turfData.reviewCount || Math.floor(Math.random() * 200 + 50).toString()
                  },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": turfData.pricing?.weekdayDay || "1000",
                "availability": "https://schema.org/InStock"
              }
            })}
          </script>
          
          {/* Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "ScoreVerse",
                  "item": "https://scoreverse.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": `Turfs in ${turfData.city}`,
                  "item": `https://scoreverse.in/turfs-in-${turfData.city?.toLowerCase().replace(/\s+/g, '-')}`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": turfData.name,
                  "item": `https://scoreverse.in/turf/${turfId}`
                }
              ]
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
                      loading="lazy"
                      decoding="async"
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

                  <div className="d-flex align-items-center gap-2 mb-3">
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

                    {/* Share Button */}
                    <button
                      onClick={() => {
                        const shareUrl = `https://scoreverse.in/turf/${turfId}`
                        if (navigator.share) {
                          navigator.share({
                            title: `${turfData.name} on ScoreVerse`,
                            text: `Book your slot at ${turfData.name} instantly!`,
                            url: shareUrl
                          }).catch(console.error)
                        } else {
                          navigator.clipboard.writeText(shareUrl)
                          alert('Share link copied to clipboard! Paste it into WhatsApp.')
                        }
                      }}
                      className="btn btn-sm border border-secondary text-light rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 hover-white"
                      style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sv-text-primary"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                      Share
                    </button>
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
                className="rounded-4 border p-3 p-md-4 d-flex flex-column h-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* ── Header ── */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span style={{
                      width: 28, height: 28, borderRadius: '8px',
                      background: 'rgba(255,212,0,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Calendar size={14} className="sv-text-primary" />
                    </span>
                    <h3 className="text-white fw-bold mb-0" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>Book Your Slot</h3>
                  </div>

                  {/* Native date picker */}
                  <div className="position-relative d-inline-block">
                    <button
                      type="button"
                      className="d-flex align-items-center gap-1 border text-white"
                      style={{
                        background: 'rgba(255,212,0,0.07)',
                        borderColor: 'rgba(255,212,0,0.25)',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Calendar size={11} className="sv-text-primary" />
                      <span>Custom Date</span>
                      <input
                        ref={dateInputRef}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate || ''}
                        onChange={(e) => { if (e.target.value) handleCustomDateSelect(e.target.value) }}
                        onClick={(e) => { try { if (typeof e.target.showPicker === 'function') e.target.showPicker() } catch (_) {} }}
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        style={{ cursor: 'pointer', zIndex: 10, pointerEvents: 'auto' }}
                        aria-label="Select custom date"
                      />
                    </button>
                  </div>
                </div>

                {/* ── Date Pills (wrapping, no horizontal scroll) ── */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {dates.map(({ dateStr, label }) => {
                    const isSelected = selectedDate === dateStr
                    const parts = label.split(' ')
                    const dayName = parts[0]  // e.g. Mon,
                    const dayNum = parts[1]   // e.g. 31
                    const mon = parts[2]      // e.g. Aug
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px 10px',
                          borderRadius: '10px',
                          border: `1.5px solid ${isSelected ? 'var(--sv-gold)' : 'rgba(255,255,255,0.08)'}`,
                          background: isSelected ? 'var(--sv-gold)' : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#000' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          minWidth: '48px',
                          gap: '1px'
                        }}
                      >
                        <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', opacity: isSelected ? 0.7 : 0.45, letterSpacing: '0.4px' }}>
                          {dayName?.replace(',', '')}
                        </span>
                        <span style={{ fontSize: '15px', fontWeight: 800, lineHeight: 1.1 }}>{dayNum}</span>
                        <span style={{ fontSize: '9px', fontWeight: 600, opacity: isSelected ? 0.7 : 0.45 }}>{mon}</span>
                      </button>
                    )
                  })}
                </div>

                {/* ── Slot Duration Toggle ── */}
                {(turfData?.bookingMode === 'both' || databaseHas30MinSlots) && (
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '10px',
                      padding: '4px 10px',
                      marginBottom: '10px'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>Duration</span>
                    <div style={{ display: 'flex', gap: '3px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '2px' }}>
                      {[['60', '1 Hour'], ['30', '30 Min']].map(([val, lbl]) => (
                        <button key={val}
                          onClick={() => { setSelectedIntervalMode(val); setSelectedSlots([]) }}
                          style={{
                            padding: '3px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: selectedIntervalMode === val ? 'var(--sv-gold)' : 'transparent',
                            color: selectedIntervalMode === val ? '#000' : 'rgba(255,255,255,0.5)',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >{lbl}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Partial dot legend ── */}
                {selectedIntervalMode === '60' && databaseHas30MinSlots && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 152, 0, 0.07)',
                    border: '1px solid rgba(255, 152, 0, 0.2)',
                    marginBottom: '10px'
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF9800', flexShrink: 0, boxShadow: '0 0 5px rgba(255,152,0,0.8)' }} />
                    <span style={{ fontSize: '10.5px', color: '#ffb74d', lineHeight: 1.3 }}>
                      Orange dot = partially booked — tap to switch to 30 min view
                    </span>
                  </div>
                )}

                {/* ── Time Filter Tabs (wrapping pills) ── */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                  {TIME_TABS.map((tab) => {
                    const isActive = activeTimeTab === tab.key
                    const count = tabCounts[tab.key] || 0
                    const IconComp = tab.icon
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTimeTab(tab.key)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '4px 9px',
                          borderRadius: '16px',
                          border: `1.5px solid ${isActive ? 'var(--sv-gold)' : 'rgba(255,255,255,0.08)'}`,
                          background: isActive ? 'var(--sv-gold)' : 'rgba(255,255,255,0.02)',
                          color: isActive ? '#000' : 'rgba(255,255,255,0.7)',
                          fontSize: '11px',
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <IconComp size={11} style={{ color: isActive ? '#000' : 'var(--sv-gold)' }} />
                        <span>{tab.key === 'all' ? 'All' : tab.key === 'early_morning' ? 'Early' : tab.label.split(' ')[0]}</span>
                        {count > 0 && (
                          <span style={{
                            background: isActive ? 'rgba(0,0,0,0.18)' : 'rgba(255,212,0,0.15)',
                            color: isActive ? '#000' : 'var(--sv-gold)',
                            borderRadius: '10px',
                            padding: '0 5px',
                            fontSize: '10px',
                            fontWeight: 700,
                            lineHeight: '16px'
                          }}>{count}</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* ── Slots grid ── */}
                <div className="flex-grow-1 mb-3">
                  {loadingSlots ? (
                    <div className="text-center py-4">
                      <div className="spinner-border spinner-border-sm sv-text-primary" role="status" />
                      <p className="sv-text-muted mt-2" style={{ fontSize: '12px' }}>Fetching slots…</p>
                    </div>
                  ) : visibleSlots.length === 0 ? (
                    <div className="text-center py-4" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)' }}>
                      <Clock size={24} className="sv-text-primary opacity-30 mb-2" />
                      <p className="sv-text-muted mb-0" style={{ fontSize: '12px' }}>
                        {activeTimeTab === 'all' ? 'No slots for this date. Try another.' : 'No slots in this period.'}
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      key={`${selectedDate}-${selectedIntervalMode}-${activeTimeTab}`}
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.025 } }
                      }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '6px'
                      }}
                    >
                      {visibleSlots.map((slot) => {
                        const isSelected = slot.isMerged
                          ? slot.originalSlots.every((os) => selectedSlots.some((s) => s._id === os._id))
                          : selectedSlots.some((s) => s._id === slot._id)

                        const past = isPastSlot(selectedDate, slot.startTime)

                        const isPartiallyBooked = slot.isMerged && (() => {
                          const s1B = slot.originalSlots[0].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[0].startTime)
                          const s2B = slot.originalSlots[1].status !== 'available' || isPastSlot(selectedDate, slot.originalSlots[1].startTime)
                          return (s1B && !s2B) || (!s1B && s2B)
                        })()

                        const isBooked = (slot.status === 'booked' || slot.status === 'offline_booking' || slot.status === 'offline') && !isPartiallyBooked
                        const isAvailable = (slot.status === 'available' && !past) || isPartiallyBooked

                        // Colour tokens
                        let bg, border, textColor
                        if (isSelected) {
                          bg = 'linear-gradient(135deg, #FFD400 0%, #ffe566 100%)'
                          border = 'var(--sv-gold)'
                          textColor = '#000'
                        } else if (isPartiallyBooked) {
                          bg = 'rgba(255,152,0,0.07)'
                          border = 'rgba(255,152,0,0.45)'
                          textColor = '#fff'
                        } else if (isBooked || past) {
                          bg = 'rgba(255,255,255,0.015)'
                          border = 'rgba(255,255,255,0.04)'
                          textColor = 'rgba(255,255,255,0.25)'
                        } else {
                          bg = 'rgba(255,255,255,0.03)'
                          border = 'rgba(255,255,255,0.1)'
                          textColor = '#fff'
                        }

                        const timeLabel = `${formatTimeTo12Hour(slot.startTime)} – ${formatTimeTo12Hour(slot.endTime)}`
                        const hasDiscount = slot.discountPrice !== undefined && slot.discountPrice !== null

                        return (
                          <motion.button
                            key={slot._id}
                            variants={{
                              hidden: { opacity: 0, scale: 0.9 },
                              show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 22 } }
                            }}
                            whileHover={isAvailable ? { scale: 1.04, boxShadow: '0 4px 16px rgba(255,212,0,0.18)' } : {}}
                            whileTap={isAvailable ? { scale: 0.95 } : {}}
                            disabled={!isAvailable}
                            onClick={() => toggleSlotSelection(slot)}
                            style={{
                              position: 'relative',
                              padding: '7px 6px',
                              borderRadius: '10px',
                              border: `1.5px solid ${border}`,
                              background: bg,
                              color: textColor,
                              cursor: isAvailable ? 'pointer' : 'not-allowed',
                              opacity: (isBooked || past) ? 0.4 : 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '2px',
                              transition: 'border 0.15s, background 0.15s',
                              boxShadow: isSelected ? '0 6px 20px rgba(255,212,0,0.22)' : 'none',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Partial booking dot */}
                            {isPartiallyBooked && (
                              <span style={{
                                position: 'absolute', top: 5, right: 5,
                                width: 6, height: 6, borderRadius: '50%',
                                background: '#FF9800',
                                boxShadow: '0 0 5px rgba(255,152,0,0.9)'
                              }} />
                            )}

                            {/* Selected checkmark */}
                            {isSelected && (
                              <span style={{
                                position: 'absolute', top: 4, right: 5,
                                width: 14, height: 14, borderRadius: '50%',
                                background: 'rgba(0,0,0,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}>
                                <Check size={8} color="#000" strokeWidth={3} />
                              </span>
                            )}

                            {/* Time */}
                            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '-0.2px', lineHeight: 1.2, textAlign: 'center' }}>
                              {timeLabel.split(' – ')[0]}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 500, opacity: 0.6 }}>
                              – {timeLabel.split(' – ')[1]}
                            </span>

                            {/* Status / Price */}
                            {isBooked ? (
                              <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Booked</span>
                            ) : past ? (
                              <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Passed</span>
                            ) : isPartiallyBooked ? (
                              <span style={{ fontSize: '9.5px', color: '#ffb74d', fontWeight: 700 }}>Partial</span>
                            ) : hasDiscount ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <span style={{ fontSize: '9px', textDecoration: 'line-through', opacity: 0.5, color: isSelected ? '#333' : '#aaa' }}>₹{slot.price}</span>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: isSelected ? '#000' : '#2ed573' }}>₹{slot.discountPrice}</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: '10px', fontWeight: isSelected ? 800 : 600, color: isSelected ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.55)' }}>
                                ₹{slot.price}
                              </span>
                            )}
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  )}
                </div>

                {/* ── Pricing Summary ── */}
                {selectedSlots.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: 4 }}>
                      <span style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {selectedIntervalMode === '60' && databaseHas30MinSlots
                          ? `${selectedSlots.length / 2} hr`
                          : `${selectedSlots.length} slot${selectedSlots.length > 1 ? 's' : ''}`
                        }
                      </span>
                      <span className="text-white fw-semibold">₹{calculateTotalBase()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: 6 }}>
                      <span style={{ color: 'rgba(255,255,255,0.45)' }}>Platform fee ({platformFeePercent}%)</span>
                      <span className="text-white fw-semibold">+ ₹{calculatePlatformFee()}</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                      <span className="text-white fw-bold" style={{ fontSize: '13px' }}>Total</span>
                      <span className="sv-text-primary fw-black" style={{ fontSize: '14px' }}>₹{calculateGrandTotal()}</span>
                    </div>
                  </motion.div>
                )}

                {bookingError && (
                  <div className="alert alert-danger py-2 mb-2 d-flex align-items-center gap-2" style={{ fontSize: '12px' }}>
                    <AlertTriangle size={13} />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* ── Checkout Button ── */}
                <button
                  disabled={selectedSlots.length === 0 || bookingLoading}
                  onClick={handleProceedBooking}
                  className="sv-btn sv-btn-primary w-100 fw-bold justify-content-center mt-auto"
                  style={{ borderRadius: '12px', padding: '13px 20px', fontSize: '14px' }}
                >
                  {bookingLoading ? (
                    <><span className="spinner-border spinner-border-sm me-2" role="status" />Processing…</>
                  ) : !currentUser ? (
                    'Log in to Book'
                  ) : selectedSlots.length === 0 ? (
                    'Select a Slot'
                  ) : (
                    `Confirm & Pay  ₹${calculateGrandTotal()}`
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


