import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, ArrowRight, Download, Award, Shield } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

export default function PlayerRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const playerId = pathParts[1]

  const [playerData, setPlayerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.scoreverse.sports'

  useEffect(() => {
    if (!playerId) {
      setLoading(false)
      setError(true)
      return
    }

    const fetchPlayer = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/players/${playerId}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setPlayerData(data.data || data)
      } catch (err) {
        console.error('Error fetching player:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [playerId])

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
          {/* Header Cover Banner */}
          <div style={{ width: '100%', height: '140px', background: 'linear-gradient(135deg, rgba(var(--sv-primary-rgb), 0.2) 0%, rgba(15, 15, 20, 0.8) 100%)', position: 'relative' }}>
            {/* Gradient overlay to blend with the card below */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '60px',
              background: 'linear-gradient(to top, rgba(15, 15, 20, 1), transparent)'
            }} />
          </div>

          <div className="p-4 p-md-5 d-flex flex-column align-items-center" style={{ marginTop: '-70px', position: 'relative', zIndex: 2 }}>
            {/* Player Avatar */}
            <div 
              className="mb-3"
              style={{ 
                width: 110, 
                height: 110, 
                borderRadius: '50%', 
                overflow: 'hidden', 
                background: '#1a1a24', 
                border: '3px solid rgba(var(--sv-primary-rgb), 0.6)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
              }}
            >
              {(playerData?.photo || playerData?.userId?.photo) ? (
                <img 
                  src={getImageUrl(playerData.photo || playerData.userId.photo)} 
                  alt={playerData?.name || 'Player'} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <User size={50} className="sv-text-primary opacity-75" />
              )}
            </div>

            {loading ? (
              <p className="text-white mt-4">Loading player details...</p>
            ) : error || !playerData ? (
              <>
                <h1 className="fw-bold text-white mb-3 mt-2" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  View Profile on <span className="sv-text-primary">ScoreVerse</span>
                </h1>
                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  Track match stats, follow players, and manage matches seamlessly with our mobile app.
                </p>
              </>
            ) : (
              <>
                <h1 className="fw-bold text-white mb-2 mt-2" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  {playerData.name}
                </h1>
                <p className="sv-text-primary fw-semibold mb-3 fs-6">
                  {playerData.playingRole || 'Cricket Player'}
                </p>

                <div className="d-flex flex-column align-items-center mb-4 px-md-3 w-100">
                  <p className="sv-text-muted fs-6 mb-3">
                    {playerData.city || playerData.location || 'Location Not Specified'}
                  </p>

                  {/* Player details grid */}
                  <div className="row g-2 w-100 justify-content-center mb-2">
                    {playerData.battingStyle && (
                      <div className="col-6 col-sm-5">
                        <div className="p-2 rounded bg-dark border border-secondary text-light text-center" style={{ fontSize: '0.85rem' }}>
                          <span className="d-block sv-text-dim text-uppercase fs-8 fw-semibold mb-1">Batting Style</span>
                          <span className="fw-bold">{playerData.battingStyle}</span>
                        </div>
                      </div>
                    )}
                    {playerData.bowlingStyle && (
                      <div className="col-6 col-sm-5">
                        <div className="p-2 rounded bg-dark border border-secondary text-light text-center" style={{ fontSize: '0.85rem' }}>
                          <span className="d-block sv-text-dim text-uppercase fs-8 fw-semibold mb-1">Bowling Style</span>
                          <span className="fw-bold">{playerData.bowlingStyle}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  Download ScoreVerse to view full match history, achievements, and career statistics!
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
