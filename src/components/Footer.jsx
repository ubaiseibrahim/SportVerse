import { Smartphone, Phone, Instagram } from 'lucide-react'

export default function Footer({ onDownloadClick }) {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="sv-footer">
      <div className="container-xl">
        <div className="row g-4">
          <div className="col-lg-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home') }} className="d-inline-block mb-3">
              <img src="/SportVerse.png" alt="SportVerse" style={{ height: 40 }} />
            </a>
            <p className="fs-7 sv-text-muted mb-3" style={{ maxWidth: 320 }}>
              India's all-in-one sports booking, tournament management, and player auction platform. Book turfs, manage teams, track scores.
            </p>
            <div className="d-flex gap-2">
              <a
                href="https://www.instagram.com/sportverse.in?igsh=M3NrOXB2Y28ydTc1&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="sv-contact-icon-wrap"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white-50" />
              </a>
              <a
                href="tel:+918428676150"
                className="sv-contact-icon-wrap"
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Phone"
              >
                <Phone size={16} className="text-white-50" />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="fs-6 fw-bold text-white mb-3">Quick Links</h4>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home') }} className="sv-footer-link">Home</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); handleNav('#features') }} className="sv-footer-link">Features</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNav('#how-it-works') }} className="sv-footer-link">How It Works</a>
            <a href="#tournaments" onClick={(e) => { e.preventDefault(); handleNav('#tournaments') }} className="sv-footer-link">Tournaments</a>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="fs-6 fw-bold text-white mb-3">For Business</h4>
            <a href="#owners" onClick={(e) => { e.preventDefault(); handleNav('#owners') }} className="sv-footer-link">Turf Owners</a>
            <a href="#auction" onClick={(e) => { e.preventDefault(); handleNav('#auction') }} className="sv-footer-link">Player Auction</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact') }} className="sv-footer-link">Partner With Us</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); handleNav('#faq') }} className="sv-footer-link">FAQ</a>
          </div>

          <div className="col-md-6 col-lg-4">
            <h4 className="fs-6 fw-bold text-white mb-3">Get the App</h4>
            <p className="fs-7 sv-text-muted mb-3">
              Download SportVerse on Android and iOS to book turfs and join tournaments on the go.
            </p>
            <button onClick={onDownloadClick} className="sv-btn sv-btn-primary">
              <Smartphone size={16} />
              Download SportVerse App
            </button>
          </div>
        </div>

        <hr className="sv-footer-divider" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 fs-7 sv-text-dim">
          <p className="mb-0">© {new Date().getFullYear()} SportVerse Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="#" className="sv-footer-link mb-0">Privacy Policy</a>
            <a href="#" className="sv-footer-link mb-0">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
