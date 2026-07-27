import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Smartphone, Home, Star, Trophy, Building2, HelpCircle, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home',        href: '#home',        icon: Home },
  { label: 'Features',    href: '#features',    icon: Star },
  { label: 'Tournaments', href: '#tournaments', icon: Trophy },
  { label: 'Owners',      href: '#owners',      icon: Building2 },
  { label: 'FAQ',         href: '#faq',         icon: HelpCircle },
  { label: 'Contact',     href: '#contact',     icon: Mail },
]

export default function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const pos = window.scrollY + 100
      navLinks.forEach(({ href }) => {
        const el = document.querySelector(href)
        if (el && el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) {
          setActive(href)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sv-navbar ${scrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <div className="container-xl">
        <div className="d-flex align-items-center justify-content-between gap-3">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home') }}
            aria-label="SportVerse Home"
            style={{ flexShrink: 0 }}
          >
            <img
              src="/SportVerse.png"
              alt="SportVerse"
              style={{ height: 44, width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(59,130,246,0.3))' }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="d-none d-lg-flex align-items-center gap-1 flex-grow-1 justify-content-center" aria-label="Main navigation">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className={`sv-nav-link border-0 bg-transparent ${active === href ? 'active' : ''}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="d-none d-lg-block" style={{ flexShrink: 0 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onDownloadClick}
              className="sv-btn sv-btn-primary"
              style={{ fontSize: 13, padding: '10px 22px' }}
            >
              <Smartphone size={15} />
              Download App
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sv-navbar-toggler d-lg-none"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 16, right: 16,
              borderRadius: 20,
              padding: 16,
              boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="d-flex flex-column gap-1">
              {navLinks.map(({ label, href, icon: Icon }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={() => handleNav(href)}
                  className="border-0 d-flex align-items-center gap-3"
                  style={{
                    background: active === href ? 'rgba(59,130,246,0.1)' : 'transparent',
                    color: active === href ? '#fff' : 'rgba(255,255,255,0.72)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 500,
                    border: active === href ? '1px solid rgba(59,130,246,0.22)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: active === href ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                    color: active === href ? '#10B981' : 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={15} />
                  </div>
                  {label}
                  {active === href && (
                    <div className="ms-auto" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
                  )}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, marginTop: 8 }}
              >
                <button
                  onClick={() => { setOpen(false); onDownloadClick(); }}
                  className="sv-btn sv-btn-primary w-100 justify-content-center"
                  style={{ padding: '12px 20px' }}
                >
                  <Smartphone size={15} />
                  Download SportVerse App
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
