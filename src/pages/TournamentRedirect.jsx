import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Smartphone, ArrowRight, Download, Calendar, Shield } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

export default function TournamentRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const id = pathParts[1]
  const searchParams = new URLSearchParams(window.location.search)
  const isInvite = searchParams.get('action') === 'join-team'
  const isRegister = window.location.pathname.includes('/register')

  const [tournamentData, setTournamentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.scoreverse.sports'

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError(true)
      return
    }

    const fetchTournament = async () => {
      try {
        const { API_BASE_URL } = await import('../utils/api')
        const response = await fetch(`${API_BASE_URL}/tournaments/${id}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setTournamentData(data.data || data)
      } catch (err) {
        console.error('Error fetching tournament:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTournament()
  }, [id])

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
          <div style={{ width: '100%', height: '180px', background: 'rgba(var(--sv-primary-rgb), 0.1)', position: 'relative' }}>
            {tournamentData?.banner ? (
              <img 
                src={getImageUrl(tournamentData.banner)} 
                alt={tournamentData?.name || 'Tournament'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <Trophy size={44} className="sv-text-primary opacity-50" />
              </div>
            )}
            
            {/* Gradient overlay to blend with the card below */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '60px',
              background: 'linear-gradient(to top, rgba(15, 15, 20, 1), transparent)'
            }} />
          </div>

          <div className="p-4 p-md-5 d-flex flex-column align-items-center" style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="d-inline-flex align-items-center justify-content-center mb-4 overflow-hidden"
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: '#1a1a24',
                border: '3px solid rgba(var(--sv-primary-rgb), 1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                backgroundColor: 'rgba(var(--sv-primary-rgb), 0.1)'
              }}
            >
              {tournamentData?.logo ? (
                <img src={getImageUrl(tournamentData.logo)} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : isInvite ? (
                <Shield size={44} className="sv-text-primary" />
              ) : (
                <Trophy size={44} className="sv-text-primary" />
              )}
            </motion.div>

            {loading ? (
              <p className="text-white">Loading tournament details...</p>
            ) : error || !tournamentData ? (
              <>
                <h1 className="fw-bold text-white mb-3" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  {isInvite ? (
                    <>You're Invited to <span className="sv-text-primary">Join a Team</span>!</>
                  ) : isRegister ? (
                    <>Register for the <span className="sv-text-primary">Player Pool</span></>
                  ) : (
                    <>View Tournament on <span className="sv-text-primary">ScoreVerse</span></>
                  )}
                </h1>
                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  {isInvite 
                    ? 'A team captain has invited you to join their squad. Download the ScoreVerse app to accept the invitation and start competing.'
                    : 'Book turfs, manage teams, track live scores, and register for active tournaments directly from our mobile app.'}
                </p>
              </>
            ) : (
              <>
                <h1 className="fw-bold text-white mb-3" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                  {isInvite ? (
                    <>Join a Team in <span className="sv-text-primary">{tournamentData.name}</span></>
                  ) : isRegister ? (
                    <>Register for <span className="sv-text-primary">{tournamentData.name}</span></>
                  ) : (
                    <>{tournamentData.name}</>
                  )}
                </h1>
                {tournamentData.organizerName && (
                  <p className="sv-text-muted fs-6 mb-2">
                    Organized by {tournamentData.organizerName}
                  </p>
                )}

                <div className="d-flex flex-wrap gap-2 justify-content-center mb-4 mt-3">
                  {tournamentData.format && (
                    <span className="badge bg-dark border border-secondary text-light px-3 py-2 rounded-pill">
                      {tournamentData.format}
                    </span>
                  )}
                  {tournamentData.ballType && (
                    <span className="badge bg-dark border border-secondary text-light px-3 py-2 rounded-pill">
                      {tournamentData.ballType}
                    </span>
                  )}
                  {tournamentData.overs && (
                    <span className="badge bg-dark border border-secondary text-light px-3 py-2 rounded-pill">
                      {tournamentData.overs} Overs
                    </span>
                  )}
                  {(tournamentData.groundName || tournamentData.city) && (
                    <span className="badge bg-dark border border-secondary text-light px-3 py-2 rounded-pill">
                      📍 {tournamentData.groundName ? `${tournamentData.groundName}, ` : ''}{tournamentData.city}
                    </span>
                  )}
                </div>

                <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                  Download ScoreVerse to view the full schedule, register, and track live scores!
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
