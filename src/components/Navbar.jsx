import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Smartphone, Home, Star, Trophy, Building2, HelpCircle, Mail } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'

const navLinks = [
  { label: 'Home',        href: '#home',        icon: Home },
  { label: 'Features',    href: '#features',    icon: Star },
  { label: 'Tournaments', href: '#tournaments', icon: Trophy },
  { label: 'Owners',      href: '#owners',      icon: Building2 },
  { label: 'FAQ',         href: '#faq',         icon: HelpCircle },
  { label: 'Contact',     href: '#contact',     icon: Mail },
]

/**
 * Premium Sticky Navbar – glassmorphism, animated icons, responsive mobile menu.
 */
export default function Navbar() {
  const scrolled = useScrolled(60)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  const handleNav = (href) => {
    setOpen(false)
    setActive(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Optional: Update active link on scroll (simplified version)
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href))
      const scrollPos = window.scrollY + 100
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          setActive('#' + section.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 glass border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
      role="banner"
    >
      <div className="container-custom flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home') }}
          className="flex items-center gap-0 flex-shrink-0 group relative"
          aria-label="SportVerse Home"
        >
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <img
            src="/SportVerse.png"
            alt="SportVerse"
            className="w-auto object-contain group-hover:scale-105 transition-transform duration-300 relative z-10"
            style={{ height: '48px', filter: 'drop-shadow(0 2px 8px rgba(16,185,129,0.3))' }}
          />
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center" aria-label="Main navigation">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = active === href
            return (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap group overflow-hidden"
                style={{
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                }}
              >
                {/* Active/Hover Background */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                  }}
                />
                
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2563EB, #10B981)' }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <Icon size={14} className={isActive ? 'text-green-400' : 'text-white/50 group-hover:text-white/80'} />
                  {label}
                </div>
              </button>
            )
          })}
        </nav>

        {/* ── CTA Button – Download App only ── */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(37,99,235,0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleNav('#download')}
            className="btn-primary text-sm py-2.5 px-6 flex items-center gap-2 relative overflow-hidden group"
            aria-label="Download App"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <Smartphone size={16} />
            Download App
          </motion.button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden p-2 rounded-xl text-white flex-shrink-0 relative overflow-hidden group"
          onClick={() => setOpen((v) => !v)}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          {open ? <X size={20} className="relative z-10" /> : <Menu size={20} className="relative z-10" />}
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-[calc(100%+8px)] left-4 right-4 p-4 rounded-3xl glass-strong shadow-2xl border border-white/10 origin-top"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(({ label, href, icon: Icon }, i) => {
                const isActive = active === href
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    key={label}
                    onClick={() => handleNav(href)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: isActive ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                        color: isActive ? '#10B981' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    {label}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    )}
                  </motion.button>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4 mt-2 border-t border-white/10"
              >
                <button
                  onClick={() => handleNav('#download')}
                  className="btn-primary text-sm w-full justify-center py-3"
                >
                  <Smartphone size={16} />
                  Download SportVerse App
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
