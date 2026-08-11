import { Smartphone, Phone, Instagram } from 'lucide-react'

export default function Footer({ onDownloadClick }) {
  const handleNav = (href) => {
    const pathname = window.location.pathname
    if (pathname !== '/' && pathname !== '/index.html') {
      window.location.href = '/' + href
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="sv-footer">
      {/* Top ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 160,
          background: 'radial-gradient(ellipse at center, rgba(255,212,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-xl position-relative" style={{ zIndex: 2 }}>
        <div className="row g-4">
          {/* Brand column */}
          <div className="col-lg-4">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNav('#home') }}
              className="d-inline-block mb-3"
              aria-label="ScoreVerse Home"
            >
              <img
                src="/SportVerse.png"
                alt="ScoreVerse"
                style={{ height: 44, width: 'auto', filter: 'drop-shadow(0 2px 12px rgba(255,212,0,0.3))' }}
              />
            </a>
            <p className="sv-text-muted mb-3" style={{ maxWidth: 300, lineHeight: 1.72, fontSize: '0.88rem' }}>
              India's all-in-one sports booking, tournament management, and player auction platform.
              Book turfs, manage teams, track scores.
            </p>
            <div className="d-flex gap-2">
              <a
                href="https://www.instagram.com/scoreverse.in?igsh=M3NrOXB2Y28ydTc1&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="sv-contact-icon-wrap"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', transition: 'all 0.2s' }}
                aria-label="Instagram"
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,212,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,212,0,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
              >
                <Instagram size={15} style={{ color: 'rgba(255,255,255,0.55)' }} />
              </a>
              <a
                href="tel:+918428676150"
                className="sv-contact-icon-wrap"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', transition: 'all 0.2s' }}
                aria-label="Phone"
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,212,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,212,0,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
              >
                <Phone size={15} style={{ color: 'rgba(255,255,255,0.55)' }} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="text-white mb-3" style={{ fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9) !important' }}>
              Quick Links
            </h4>
            <a href="#home"         onClick={(e) => { e.preventDefault(); handleNav('#home')         }} className="sv-footer-link">Home</a>
            <a href="#features"     onClick={(e) => { e.preventDefault(); handleNav('#features')     }} className="sv-footer-link">Features</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNav('#how-it-works') }} className="sv-footer-link">How It Works</a>
            <a href="#tournaments"  onClick={(e) => { e.preventDefault(); handleNav('#tournaments')  }} className="sv-footer-link">Tournaments</a>
          </div>

          {/* For business */}
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="text-white mb-3" style={{ fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              For Business
            </h4>
            <a href="#owners"  onClick={(e) => { e.preventDefault(); handleNav('#owners')  }} className="sv-footer-link">Turf Owners</a>
            <a href="#auction" onClick={(e) => { e.preventDefault(); handleNav('#auction') }} className="sv-footer-link">Player Auction</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact') }} className="sv-footer-link">Partner With Us</a>
            <a href="#faq"     onClick={(e) => { e.preventDefault(); handleNav('#faq')     }} className="sv-footer-link">FAQ</a>
          </div>

          {/* Get the app */}
          <div className="col-md-6 col-lg-4">
            <h4 className="text-white mb-3" style={{ fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Get the App
            </h4>
            <p className="sv-text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
              Download ScoreVerse on Android and iOS to book turfs and join tournaments on the go.
            </p>
            <button
              onClick={onDownloadClick}
              className="sv-btn sv-btn-primary mb-4"
              style={{ fontSize: 13, padding: '11px 22px' }}
            >
              <Smartphone size={15} />
              Download ScoreVerse App
            </button>

            <div className="mt-1">
              <span className="sv-text-dim d-block mb-2" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Powered By</span>
              <img
                src="/Banner.png"
                alt="ScoreVerse Banner"
                style={{ height: 40, width: 'auto', borderRadius: 8, objectFit: 'contain', opacity: 0.85 }}
              />
            </div>
          </div>
        </div>

        <hr className="sv-footer-divider" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          <p className="mb-0">© {new Date().getFullYear()} ScoreVerse Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="/privacy" className="sv-footer-link mb-0" style={{ fontSize: '0.8rem' }}>Privacy Policy</a>
            <a href="/terms" className="sv-footer-link mb-0" style={{ fontSize: '0.8rem' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
