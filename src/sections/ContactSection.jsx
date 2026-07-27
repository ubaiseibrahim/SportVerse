import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { fadeLeft, fadeRight, fadeUp, containerVariants } from '../utils/animations'

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@sportverse.in',
    href: 'mailto:hello@sportverse.in',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.1)',
    border: 'rgba(37,99,235,0.25)',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/919876543210',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
    border: 'rgba(37,211,102,0.25)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@sportverse.in',
    href: 'https://instagram.com/sportverse.in',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.1)',
    border: 'rgba(225,48,108,0.25)',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: '/SportVerse',
    href: 'https://facebook.com/SportVerse',
    color: '#1877F2',
    bg: 'rgba(24,119,242,0.1)',
    border: 'rgba(24,119,242,0.25)',
  },
]

/**
 * Contact Section – cards + contact form.
 */
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    // In production, send to backend or service like EmailJS/Formspree
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      {/* Ambient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(37,99,235,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 70% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Contact"
          title={`We'd Love to\n<span class="gradient-text">Hear From You</span>`}
          subtitle="Have questions, partnership requests, or want to register your turf? Reach out anytime."
        />

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── Left – Contact Cards ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 font-display">Get in Touch</h3>
            <div className="space-y-3">
              {contactCards.map(({ icon: Icon, label, value, href, color, bg, border }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, borderColor: border }}
                  className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-300"
                  style={{ background: bg, border: `1px solid ${border}30` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: color + '20', border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/50">{label}</p>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {value}
                    </p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right – Contact Form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-3xl"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <CheckCircle2 size={60} className="text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 font-display">Message Sent!</h3>
                <p className="text-white/60">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="btn-secondary mt-6 text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="premium-card p-6 md:p-8 space-y-5 h-auto"
                aria-label="Contact form"
              >
                <h3 className="text-xl font-bold text-white font-display">Send a Message</h3>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-white/60 mb-2">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Arjun Sharma"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none focus:ring-2 ring-blue-500/50 transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white/60 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="arjun@example.com"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none focus:ring-2 ring-blue-500/50 transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-white/60 mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Partnership / Turf Registration / Support"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none focus:ring-2 ring-blue-500/50 transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-white/60 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 outline-none focus:ring-2 ring-blue-500/50 resize-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full justify-center"
                  id="contact-submit"
                >
                  <Send size={16} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
