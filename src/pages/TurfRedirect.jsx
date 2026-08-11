import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Download, Image as ImageIcon } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

export default function TurfRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const turfId = pathParts[1]

  const [turfData, setTurfData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.scoreverse.sports'

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

  return (
    <div 
      className="position-relative overflow-hidden d-flex align-items-center justify-content-center"
      style={{ minHeight: '90vh', backgroundColor: 'var(--sv-bg)', paddingTop: '100px', paddingBottom: '80px' }}
    >
      <div 
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(var(--sv-primary-rgb), 0.12) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1, maxWidth: '580px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center p-0 rounded-4 glass-strong overflow-hidden d-flex flex-column"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Header Image Area */}
          <div style={{ width: '100%', height: '220px', background: 'rgba(var(--sv-primary-rgb), 0.1)', position: 'relative' }}>
            {turfData?.coverImage ? (
              <img 
                src={getImageUrl(turfData.coverImage)} 
                alt={turfData?.name || 'Turf'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <MapPin size={44} className="sv-text-primary opacity-50" />
              </div>
            )}
            
            {/* Gradient overlay to blend with the card below */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '80px',
              background: 'linear-gradient(to top, rgba(15, 15, 20, 1), transparent)'
            }} />
          </div>

          <div className="p-4 p-md-5 d-flex flex-column align-items-center" style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
            {loading ? (
              <p className="text-white mt-4">Loading turf details...</p>
            ) : error || !turfData ? (
              <>
                <h1 className="fw-bold text-white mb-3 mt-2" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  View Turf on <span className="sv-text-primary">ScoreVerse</span>
                </h1>
                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  Book turfs, manage your team, and play matches seamlessly with our mobile app.
                </p>
              </>
            ) : (
              <>
                <h1 className="fw-bold text-white mb-3 mt-2" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  {turfData.name}
                </h1>
                <div className="d-flex flex-column align-items-center mb-3 px-md-3">
                  {turfData.googleMapsUrl ? (
                    <a href={turfData.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm border border-secondary text-light rounded-pill px-3 py-1 text-decoration-none d-inline-flex align-items-center gap-1" style={{ transition: 'all 0.2s', fontSize: '0.85rem', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <MapPin size={14} className="sv-text-primary" />
                      {turfData.city ? `Find in ${turfData.city}` : 'Find on Map'}
                    </a>
                  ) : (
                    <p className="sv-text-muted fs-6 mb-0" style={{ lineHeight: '1.6' }}>
                      <MapPin size={16} className="sv-text-primary d-inline me-1" style={{ verticalAlign: 'text-bottom' }} />
                      {turfData.city || 'Location unavailable'}
                    </p>
                  )}
                </div>
                
                {turfData.amenities && (
                  <div className="d-flex flex-wrap gap-2 justify-content-center mb-4 px-3">
                    {Object.entries(turfData.amenities).filter(([_, val]) => val).map(([key]) => (
                      <span key={key} className="badge bg-dark border border-secondary text-light px-2 py-1 rounded-pill" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    ))}
                  </div>
                )}

                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  Download ScoreVerse to view available slots and book instantly!
                </p>
              </>
            )}

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sv-btn sv-btn-primary w-100 justify-content-center py-3 mb-4 fs-6"
            style={{ borderRadius: '14px', gap: '10px' }}
          >
            <Download size={20} />
            Download from Play Store
          </motion.a>

            <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
              <a href="/" className="sv-text-dim text-decoration-none hover-white fs-7 d-flex align-items-center gap-1">
                Visit Homepage <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
