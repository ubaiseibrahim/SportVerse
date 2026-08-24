import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Smartphone, User, LogOut } from 'lucide-react'
import { scrollToSection } from '../utils/scroll'
import AuthModal from './AuthModal'

export default function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#home')
  
  // Auth states
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const checkAuth = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setCurrentUser(JSON.parse(userStr))
    } else {
      setCurrentUser(null)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of ScoreVerse?')) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.dispatchEvent(new Event('authChange'))
      window.location.href = '/'
    }
  }

  useEffect(() => {
    checkAuth()
    window.addEventListener('authChange', checkAuth)
    
    // Highlight correct tab on page load
    const pathname = window.location.pathname
    if (pathname.includes('/search')) {
      setActive('/search')
    } else if (pathname.includes('/dashboard')) {
      setActive('/dashboard')
    } else {
      setActive('#home')
    }

    return () => window.removeEventListener('authChange', checkAuth)
  }, [])

  const getNavLinks = () => {
    const links = [
      { label: 'Home', href: '#home', isAnchor: true },
      { label: 'Book Turf', href: '#book-turf', isAnchor: true }
    ]
    
    if (currentUser) {
      links.push({ label: 'My Bookings', href: '/dashboard', isAnchor: false })
    }
    
    links.push(
      { label: 'Features', href: '#features', isAnchor: true },
      { label: 'Live Scores', href: '#live-scoring', isAnchor: true },
      { label: 'Tournaments', href: '#tournaments', isAnchor: true },
      { label: 'FAQ', href: '#faq', isAnchor: true },
      { label: 'Contact', href: '#contact', isAnchor: true }
    )
    
    return links
  }

  useEffect(() => {
    const pathname = window.location.pathname
    // Disable scroll listener on sub-pages (e.g. search, dashboard)
    if (pathname !== '/' && pathname !== '/index.html') {
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const pos = window.scrollY + 120
      const links = getNavLinks().filter(l => l.isAnchor)
      links.forEach(({ href }) => {
        const el = document.querySelector(href)
        if (el && el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) {
          setActive(href)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentUser])

  const handleNav = (link) => {
    setOpen(false)
    if (!link.isAnchor) {
      window.location.href = link.href
      return
    }
    
    setActive(link.href)
    const pathname = window.location.pathname
    if (pathname !== '/' && pathname !== '/index.html') {
      window.location.href = '/' + link.href
    } else {
      scrollToSection(link.href)
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
            onClick={(e) => { e.preventDefault(); handleNav({ href: '#home', isAnchor: true }) }}
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
            {getNavLinks().map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                className={`sv-nav-link ${active === link.href ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="d-none d-lg-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
            {currentUser ? (
              <div className="d-flex align-items-center gap-3">
                <a href="/dashboard" className="text-white text-decoration-none d-flex align-items-center gap-2 hover-primary">
                  <div className="rounded-circle overflow-hidden border border-secondary" style={{ width: '32px', height: '32px', background: '#222' }}>
                    {currentUser.photo ? (
                      <img src={currentUser.photo} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={16} className="text-white m-1" />
                    )}
                  </div>
                  <span className="fs-7 fw-semibold text-white">{currentUser.name.split(' ')[0]}</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm border-0 bg-transparent text-danger p-1 opacity-75 hover-white"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn btn-sm border border-secondary text-white rounded-pill px-3 py-1.5 fs-7 hover-white me-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  Sign In
                </button>
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
              </>
            )}
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
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 16, right: 16,
              borderRadius: 20,
              padding: '12px 8px',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="d-flex flex-column gap-1">
              {getNavLinks().map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.35 }}
                  onClick={() => handleNav(link)}
                  style={{
                    background: active === link.href ? 'rgba(255,212,0,0.08)' : 'transparent',
                    color: active === link.href ? '#fff' : 'rgba(255,255,255,0.7)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 500,
                    border: active === link.href ? '1px solid rgba(255,212,0,0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                  {active === link.href && (
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
                {currentUser ? (
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <a href="/dashboard" className="text-white text-decoration-none d-flex align-items-center gap-2" onClick={() => setOpen(false)}>
                      <div className="rounded-circle overflow-hidden border border-secondary" style={{ width: '36px', height: '36px', background: '#222' }}>
                        {currentUser.photo ? (
                          <img src={currentUser.photo} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <User size={18} className="text-white m-1" />
                        )}
                      </div>
                      <span className="fs-7 fw-semibold text-white">{currentUser.name}</span>
                    </a>
                    <button
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                      className="btn text-danger p-2 fs-7"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={() => { setOpen(false); setIsAuthModalOpen(true) }}
                      className="btn border border-secondary text-white w-100 py-2.5 rounded-3 fs-7"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setOpen(false); onDownloadClick() }}
                      className="sv-btn sv-btn-primary w-100 justify-content-center"
                      style={{ padding: '12px 20px', borderRadius: 14 }}
                    >
                      <Smartphone size={15} />
                      Download App
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navbar Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => checkAuth()}
      />
    </motion.nav>
  )
}
