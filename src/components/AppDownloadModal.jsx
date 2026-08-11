import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, CheckCircle2, Send, Sparkles, Bell } from 'lucide-react'
import { sendAppNotifyRequest } from '../utils/api'

export default function AppDownloadModal({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email && !phone) {
      setError('Please enter either your email address or phone number.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await sendAppNotifyRequest({ name, email, phone })
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
      setName('')
      setEmail('')
      setPhone('')
      setError('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 9999, background: 'rgba(5, 8, 18, 0.82)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sv-card p-4 p-sm-5 position-relative w-100 overflow-hidden"
            style={{ maxWidth: 500, background: 'linear-gradient(145deg, #0F172A 0%, #0A0F1C 100%)', border: '1px solid rgba(255,212,0,0.3)', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="position-absolute top-0 end-0 m-3 btn p-2 text-white-50 border-0"
              style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div
                  className="sv-gradient-bg d-inline-flex align-items-center justify-content-center text-white rounded-circle mb-3"
                  style={{ width: 64, height: 64, boxShadow: '0 8px 32px rgba(255,212,0,0.4)' }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="fs-4 fw-bold text-white mb-2">You're On The VIP List! 🎉</h3>
                <p className="fs-6 sv-text-muted mb-4">
                  Thank you, <strong>{name || 'Sports Fan'}</strong>! We will send you an exclusive early-access notification as soon as the ScoreVerse app launches on Android & iOS.
                </p>
                <button onClick={handleClose} className="sv-btn sv-btn-primary w-100">
                  Got It, Thanks!
                </button>
              </div>
            ) : (
              <div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1">
                    <Sparkles size={12} /> Under Final Progress
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="sv-icon-box sv-gradient-bg mb-0 flex-shrink-0"
                    style={{ width: 48, height: 48, borderRadius: 14 }}
                  >
                    <Smartphone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="fs-4 fw-bold text-white mb-0">App Coming Soon!</h3>
                    <p className="fs-7 sv-text-dim mb-0">Android & iOS release in progress</p>
                  </div>
                </div>

                <p className="fs-6 sv-text-muted mb-4" style={{ lineHeight: 1.6 }}>
                  Our mobile app is currently undergoing final quality testing. Enter your contact info below to get notified instantly on launch day!
                </p>

                {error && (
                  <div className="alert alert-danger fs-7 py-2 px-3 mb-3 text-start" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#FFD400' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fs-7 sv-text-dim fw-medium">Your Name</label>
                    <input
                      type="text"
                      className="form-control sv-form-control"
                      placeholder="e.g. Arjun Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fs-7 sv-text-dim fw-medium">Email Address</label>
                    <input
                      type="email"
                      className="form-control sv-form-control"
                      placeholder="arjun@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fs-7 sv-text-dim fw-medium">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      className="form-control sv-form-control"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="sv-btn sv-btn-green w-100 justify-content-center"
                    style={{ padding: '14px 20px' }}
                  >
                    {loading ? (
                      <span>Sending to Admin...</span>
                    ) : (
                      <>
                        <Bell size={16} />
                        Notify Me On Launch
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
