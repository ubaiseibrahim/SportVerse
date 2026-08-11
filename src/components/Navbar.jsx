import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Smartphone } from 'lucide-react'

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Features',    href: '#features' },
  { label: 'Tournaments', href: '#tournaments' },
  { label: 'Owners',      href: '#owners' },
  { label: 'FAQ',         href: '#faq' },
  { label: 'Contact',     href: '#contact' },
]

export default function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const pos = window.scrollY + 120
      navLinks.forEach(({ href }) => {
        const el = document.querySelector(href)
        if (el && el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) {
          setActive(href)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    setActive(href)
    const pathname = window.location.pathname
    if (pathname !== '/' && pathname !== '/index.html') {
      window.location.href = '/' + href
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
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
            aria-label="ScoreVerse Home"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/SportVerse.png"
              alt="ScoreVerse"
              style={{
                height: 40, width: 'auto',
                filter: 'drop-shadow(0 2px 10px rgba(255,212,0,0.35))',
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="d-none d-lg-flex align-items-center gap-1 flex-grow-1 justify-content-center"
            aria-label="Main navigation"
          >
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className={`sv-nav-link ${active === href ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="d-none d-lg-block" style={{ flexShrink: 0 }}>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDownloadClick}
              className="sv-btn sv-btn-primary"
              style={{ fontSize: 13, padding: '10px 22px' }}
            >
              <Smartphone size={14} />
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 16, right: 16,
              borderRadius: 20,
              padding: '12px 8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="d-flex flex-column gap-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.35 }}
                  onClick={() => handleNav(href)}
                  style={{
                    background: active === href ? 'rgba(255,212,0,0.08)' : 'transparent',
                    color: active === href ? '#fff' : 'rgba(255,255,255,0.7)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 500,
                    border: active === href ? '1px solid rgba(255,212,0,0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                  }}
                >
                  {label}
                  {active === href && (
                    <div style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: '#FFD400',
                      boxShadow: '0 0 8px rgba(255,212,0,0.8)',
                    }} />
                  )}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  paddingTop: 10,
                  marginTop: 6,
                  paddingLeft: 8, paddingRight: 8,
                }}
              >
                <button
                  onClick={() => { setOpen(false); onDownloadClick() }}
                  className="sv-btn sv-btn-primary w-100 justify-content-center"
                  style={{ padding: '12px 20px', borderRadius: 14 }}
                >
                  <Smartphone size={15} />
                  Download ScoreVerse
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
