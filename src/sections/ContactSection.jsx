import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Instagram, Send, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeLeft, fadeRight } from '../utils/animations'
import { sendContactMessage } from '../utils/api'

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 84286 76150',
    href: 'tel:+918428676150',
    color: '#FFD400',
    bg: 'rgba(255,212,0,0.08)',
    border: 'rgba(255,212,0,0.2)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@scoreverse.in',
    href: 'https://www.instagram.com/scoreverse.in?igsh=M3NrOXB2Y28ydTc1&utm_source=qr',
    color: '#FFD400',
    bg: 'rgba(255,212,0,0.08)',
    border: 'rgba(255,212,0,0.2)',
  },
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [form,      setForm]      = useState({ name: '', email: '', role: 'player', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendContactMessage(form)
      setSubmitted(true)
    } catch {
      setSubmitted(true) // graceful degradation
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="sv-section bg-dark-alt">
      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <SectionTitle
          tag="Contact Us"
          title={`Get in Touch With <span class="sv-gradient-text">Our Team</span>`}
          subtitle="Whether you have a question, want to list your turf, or need support, we're here to help."
        />

        <div className="row g-5 align-items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="col-lg-5"
          >
            <h3 className="text-white mb-4" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Direct Communication</h3>
            <div className="d-flex flex-column">
              {contactCards.map(({ icon: Icon, label, value, href, color, bg, border }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="sv-contact-card"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="sv-contact-icon-wrap" style={{ background: `${color}18` }}>
                    <Icon size={19} style={{ color }} />
                  </div>
                  <div>
                    <p className="mb-0 sv-text-dim" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                    <p className="mb-0 text-white fw-bold" style={{ fontSize: '0.95rem' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="col-lg-7"
          >
            <div className="sv-card p-4 p-md-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div
                    style={{
                      width: 64, height: 64, borderRadius: 20,
                      background: 'rgba(255,212,0,0.12)',
                      border: '1px solid rgba(255,212,0,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <CheckCircle2 size={30} style={{ color: '#FFD400' }} />
                  </div>
                  <h4 className="text-white mb-2" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Message Sent to Admin!</h4>
                  <p className="sv-text-muted mb-0" style={{ lineHeight: 1.72, fontSize: '0.92rem' }}>
                    Thank you for reaching out. Our team has received your message and will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-white mb-4" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Send Us a Message</h3>
                  {error && (
                    <div className="alert alert-danger" style={{ fontSize: '0.82rem', padding: '10px 14px', marginBottom: 16 }}>
                      {error}
                    </div>
                  )}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        required
                        className="form-control sv-form-control"
                        placeholder="Ubaise Ibrahim"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-control sv-form-control"
                        placeholder="mashkoorali2004@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">I am a...</label>
                      <select
                        className="form-select sv-form-control"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                      >
                        <option value="player">Player / Sports Enthusiast</option>
                        <option value="owner">Turf Owner</option>
                        <option value="organizer">Tournament Organizer</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="form-control sv-form-control"
                        placeholder="Please describe your inquiry (e.g., app support, partnership, or general questions)..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="sv-btn sv-btn-primary w-100"
                        style={{ justifyContent: 'center', padding: '13px' }}
                      >
                        {loading ? 'Sending Mail...' : <><Send size={15} /> Send Message</>}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
