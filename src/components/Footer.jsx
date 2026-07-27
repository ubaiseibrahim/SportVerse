import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react'

const links = {
  Company: [
    { label: 'About',            href: '#about'   },
    { label: 'Features',         href: '#features' },
    { label: 'Tournaments',      href: '#tournaments' },
    { label: 'Auction System',   href: '#auction'  },
  ],
  'For Owners': [
    { label: 'Register Turf',    href: '#owners'   },
    { label: 'Owner Dashboard',  href: '#owners'   },
    { label: 'Revenue Insights', href: '#owners'   },
    { label: 'QR Payments',      href: '#owners'   },
  ],
  Legal: [
    { label: 'Privacy Policy',      href: '#' },
    { label: 'Terms & Conditions',  href: '#' },
    { label: 'Refund Policy',       href: '#' },
    { label: 'Cookie Policy',       href: '#' },
  ],
  Support: [
    { label: 'Contact',          href: '#contact'  },
    { label: 'FAQ',              href: '#faq'      },
    { label: 'WhatsApp',         href: 'https://wa.me/919876543210' },
    { label: 'Email Us',         href: 'mailto:hello@sportverse.in' },
  ],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram', color: '#E1306C' },
  { icon: Facebook,  href: '#', label: 'Facebook',  color: '#1877F2' },
  { icon: Twitter,   href: '#', label: 'Twitter',   color: '#1DA1F2' },
  { icon: Youtube,   href: '#', label: 'YouTube',   color: '#FF0000' },
  { icon: Linkedin,  href: '#', label: 'LinkedIn',  color: '#0A66C2' },
]

/**
 * Footer – logo, link columns, social icons, copyright.
 */
export default function Footer() {
  const handleNav = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: '#080C14', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      role="contentinfo"
    >
      {/* Subtle gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), rgba(16,185,129,0.4), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-custom">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <img
                src="/SportVerse.png"
                alt="SportVerse"
                className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 10px rgba(16,185,129,0.25))' }}
              />
            </div>


            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              India's smartest sports booking platform for players, teams, turf owners, and
              tournament organizers.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label={label}
                >
                  <Icon size={15} style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('#') ? (
                      <button
                        onClick={() => handleNav(href)}
                        className="text-sm text-white/55 hover:text-white transition-colors duration-200 cursor-pointer text-left"
                      >
                        {label}
                      </button>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2026 SportVerse. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Made with ❤️ by{' '}
            <span className="text-white/50 font-medium">Decolz</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
