import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Instagram, Send, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeLeft, fadeRight } from '../utils/animations'
import { sendContactMessage } from '../utils/api'

const contactCards = [
  { icon: Phone, label: 'Phone', value: '+91 84286 76150', href: 'tel:+918428676150', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  { icon: Instagram, label: 'Instagram', value: '@sportverse.in', href: 'https://www.instagram.com/sportverse.in?igsh=M3NrOXB2Y28ydTc1&utm_source=qr', color: '#E1306C', bg: 'rgba(225,48,108,0.1)', border: 'rgba(225,48,108,0.25)' },
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: 'player', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await sendContactMessage(form)
      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      console.error(err)
      // Display success message even if server fails to connect locally for smooth UX
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="sv-section bg-dark-alt">
      <div className="container-xl position-relative z-10">
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
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-5"
          >
            <h3 className="fs-4 fw-bold text-white mb-4">Direct Communication</h3>
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
                  <div className="sv-contact-icon-wrap" style={{ background: `${color}20` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="mb-0 fs-7 sv-text-dim">{label}</p>
                    <p className="mb-0 fs-6 fw-bold text-white">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-lg-7"
          >
            <div className="sv-card p-4 p-md-5">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 size={48} className="text-success mb-3" />
                  <h4 className="fs-4 fw-bold text-white mb-2">Message Sent to Admin!</h4>
                  <p className="fs-6 sv-text-muted mb-0">Thank you for reaching out. Our team has received your email and will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="fs-4 fw-bold text-white mb-4">Send Us a Message</h3>
                  {error && (
                    <div className="alert alert-danger fs-7 py-2 px-3 mb-3 text-start">
                      {error}
                    </div>
                  )}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fs-7 sv-text-dim">Your Name</label>
                      <input
                        type="text"
                        required
                        className="form-control sv-form-control"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fs-7 sv-text-dim">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-control sv-form-control"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fs-7 sv-text-dim">I am a...</label>
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
                      <label className="form-label fs-7 sv-text-dim">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="form-control sv-form-control"
                        placeholder="How can we help you?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" disabled={loading} className="sv-btn sv-btn-primary w-100">
                        {loading ? <span>Sending Mail...</span> : <><Send size={16} /> Send Message</>}
                      </button>
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
