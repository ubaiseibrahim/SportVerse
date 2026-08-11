import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, ArrowRight, Download, Activity, Shield } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

export default function MatchRedirect() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const matchId = pathParts[1]

  const [matchData, setMatchData] = useState(null)
  const [liveData, setLiveData] = useState(null)
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

        try {
          const liveResponse = await fetch(`${API_BASE_URL}/matches/${matchId}/live`)
          if (liveResponse.ok) {
            const liveJson = await liveResponse.json()
            setLiveData(liveJson.data || liveJson)
          }
        } catch (liveErr) {
          console.error('Error fetching live match:', liveErr)
        }

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
          {loading ? (
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
          ) : error || !matchData ? (
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
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="d-flex align-items-center justify-content-center mb-4 gap-4"
            >
              {/* Team A Logo */}
              <div className="d-flex flex-column align-items-center gap-2">
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', background: '#1a1a24', border: '2px solid rgba(var(--sv-primary-rgb), 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {matchData?.teamA?.logo ? (
                    <img src={getImageUrl(matchData.teamA.logo)} alt={matchData.teamA.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Shield size={36} className="sv-text-muted" />
                  )}
                </div>
              </div>

              {/* VS Badge */}
              <div style={{ 
                width: 40, height: 40, borderRadius: '50%', background: 'var(--sv-primary)', color: '#000', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', zIndex: 1
              }}>
                VS
              </div>

              {/* Team B Logo */}
              <div className="d-flex flex-column align-items-center gap-2">
                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', background: '#1a1a24', border: '2px solid rgba(var(--sv-primary-rgb), 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {matchData?.teamB?.logo ? (
                    <img src={getImageUrl(matchData.teamB.logo)} alt={matchData.teamB.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Shield size={36} className="sv-text-muted" />
                  )}
                </div>
              </div>
            </motion.div>
          )}

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
              
              {/* Match Score */}
              {(liveData?.teamAScore || liveData?.teamBScore) && (
                <div className="mb-4 d-flex flex-column align-items-center justify-content-center p-3 rounded-4 glass-strong" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                   {liveData.teamAScore && (
                     <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                       <span className="text-white fw-bold">{matchData?.teamA?.name || 'Team A'}</span>
                       <span className="text-white fw-bold fs-5">{liveData.teamAScore.runs}/{liveData.teamAScore.wickets} <span className="sv-text-muted fs-7">({liveData.teamAScore.overs})</span></span>
                     </div>
                   )}
                   {liveData.teamBScore && (
                     <div className="d-flex align-items-center justify-content-between w-100">
                       <span className="text-white fw-bold">{matchData?.teamB?.name || 'Team B'}</span>
                       <span className="text-white fw-bold fs-5">{liveData.teamBScore.runs}/{liveData.teamBScore.wickets} <span className="sv-text-muted fs-7">({liveData.teamBScore.overs})</span></span>
                     </div>
                   )}
                   {liveData.status && (
                     <div className="mt-3 pt-3 border-top border-secondary w-100 text-center">
                       <span className="sv-text-primary fw-bold text-uppercase fs-7">{liveData.status.replace('_', ' ')}</span>
                     </div>
                   )}
                </div>
              )}

              <p className="sv-text-muted fs-6 mb-4 px-md-3" style={{ lineHeight: '1.6' }}>
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
