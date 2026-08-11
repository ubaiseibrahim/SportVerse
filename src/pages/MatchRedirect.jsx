import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowRight, Download, Activity } from 'lucide-react'
import { API_BASE_URL } from '../utils/api'

export default function MatchRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const matchId = pathParts[1]

  const [matchData, setMatchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.scoreverse.sports'

  useEffect(() => {
    if (!matchId) {
      setLoading(false)
      setError(true)
      return
    }

    const fetchMatch = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/matches/${matchId}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setMatchData(data.data || data)
      } catch (err) {
        console.error('Error fetching match:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [matchId])

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
          className="text-center p-4 p-md-5 rounded-4 glass-strong"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: 88,
              height: 88,
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(var(--sv-primary-rgb), 0.25), rgba(var(--sv-primary-rgb), 0.05))',
              border: '1px solid rgba(var(--sv-primary-rgb), 0.4)',
              boxShadow: '0 8px 32px rgba(var(--sv-primary-rgb), 0.2)',
            }}
          >
            <Activity size={44} className="sv-text-primary" />
          </motion.div>

          {loading ? (
            <p className="text-white">Loading match details...</p>
          ) : error || !matchData ? (
            <>
              <h1 className="fw-bold text-white mb-3" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                View Match on <span className="sv-text-primary">ScoreVerse</span>
              </h1>
              <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                Track live scores, player stats, and match highlights directly from our mobile app.
              </p>
            </>
          ) : (
            <>
              <h1 className="fw-bold text-white mb-3" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
                {matchData?.teamA?.name || 'Team A'} vs {matchData?.teamB?.name || 'Team B'}
              </h1>
              {matchData?.tournament && (
                <p className="sv-text-primary mb-2 fw-semibold">{matchData.tournament.name}</p>
              )}
              <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
                Status: {matchData.status}<br/>
                Download ScoreVerse to view the full scorecard, live commentary, and more!
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

        </motion.div>
      </div>
    </div>
  )
}
