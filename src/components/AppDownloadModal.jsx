import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, CheckCircle2, Sparkles, Bell } from 'lucide-react'
import { sendAppNotifyRequest } from '../utils/api'

export default function AppDownloadModal({ isOpen, onClose }) {
  const [contactInfo, setContactInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contactInfo.trim()) {
      setError('Please enter either your email address or phone number.')
      return
    }

    setLoading(true)
    setError('')

    const val = contactInfo.trim()
    const isEmail = val.includes('@')
    const payload = {
      name: 'iOS User',
      email: isEmail ? val : '',
      phone: !isEmail ? val : ''
    }

    try {
      await sendAppNotifyRequest(payload)
      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setContactInfo('')
      setError('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 9999, background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sv-card p-4 position-relative w-100 overflow-hidden"
            style={{
              maxWidth: 460,
              background: '#000000',
              border: '2px solid #FFD400',
              boxShadow: '0 0 50px rgba(255, 212, 0, 0.18)',
              borderRadius: '16px'
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="position-absolute top-0 end-0 m-3 btn p-2 border-0"
              style={{ background: 'rgba(255, 212, 0, 0.1)', color: '#FFD400', borderRadius: '50%', zIndex: 10 }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: 60, height: 60, background: '#FFD400', color: '#000000', boxShadow: '0 8px 32px rgba(255,212,0,0.45)' }}
                >
                  <CheckCircle2 size={32} className="text-dark" />
                </div>
                <h3 className="fs-5 fw-bold text-white mb-2">You're On The VIP List! 🎉</h3>
                <p className="fs-7 sv-text-muted mb-4 px-2">
                  We will send you an early-access notification as soon as the ScoreVerse app launches on iOS.
                </p>
                <button onClick={handleClose} className="sv-btn sv-btn-primary w-100">
                  Got It, Thanks!
                </button>
              </div>
            ) : (
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark fw-bold px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                    <Sparkles size={11} /> Android App Live!
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="mb-0 flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 44, height: 44, borderRadius: 12, background: '#FFD400' }}
                  >
                    <Smartphone size={22} className="text-dark" />
                  </div>
                  <div>
                    <h3 className="fs-5 fw-bold text-white mb-0">Get ScoreVerse App</h3>
                    <p className="sv-text-dim mb-0" style={{ fontSize: '0.78rem' }}>Android is live • iOS coming soon</p>
                  </div>
                </div>

                {/* Google Play Download Link - Highlighted */}
                <div className="mb-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.scoreverse.sports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sv-btn sv-btn-primary justify-content-center py-3 w-100 fw-bold text-decoration-none"
                    style={{
                      borderRadius: '12px',
                      gap: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.98rem',
                      boxShadow: '0 0 30px rgba(255,212,0,0.55)',
                      transition: 'all 0.25s ease',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 38px rgba(255,212,0,0.7)';
                      e.currentTarget.style.transform = 'translateY(-1.5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(255,212,0,0.55)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <svg viewBox="0 0 512 512" style={{ width: 22, height: 22, flexShrink: 0 }} fill="currentColor">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.3-60.7 60.7 60.7 60.7 58-33.3c15.2-8.7 25.5-24.9 25.5-42.4s-10.3-33.7-25.5-42.4zM385.4 337.8L104.6 499c10.4 6 22.8 5.6 32.8-.2l248-142.3-60-58.7z" />
                    </svg>
                    Download on Google Play
                  </a>
                </div>

                {/* Divider for iOS */}
                <div className="position-relative text-center my-3">
                  <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
                  <span className="position-absolute top-50 start-50 translate-middle px-3 text-uppercase fw-semibold" style={{ background: '#000000', color: '#FFD400', opacity: 0.85, fontSize: '0.62rem', letterSpacing: '0.08em' }}>
                    iOS Coming Soon
                  </span>
                </div>

                <p className="sv-text-muted mb-2 text-center" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
                  Want early access when the iOS version goes live on the App Store? Get notified instantly on release day:
                </p>

                {error && (
                  <div className="alert alert-danger fs-7 py-2 px-3 mb-3 text-start" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#FFD400' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Email or WhatsApp Number"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      style={{
                        borderRadius: '10px',
                        height: '42px',
                        fontSize: '0.85rem',
                        background: '#000000',
                        border: '1px solid rgba(255, 212, 0, 0.4)',
                        color: '#ffffff'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FFD400';
                        e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 212, 0, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 212, 0, 0.4)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="sv-btn w-100 justify-content-center py-2"
                    style={{
                      borderRadius: '10px',
                      height: '42px',
                      fontSize: '0.85rem',
                      gap: '8px',
                      background: '#FFD400',
                      color: '#000000',
                      border: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 14px rgba(255, 212, 0, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E6BF00';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFD400';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Bell size={14} />
                        Notify Me on Launch
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
