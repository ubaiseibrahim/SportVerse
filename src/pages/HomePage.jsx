import { useState, Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'
import AppDownloadModal from '../components/AppDownloadModal'
import LaunchBanner from '../components/LaunchBanner'

// Lazy-load heavier sections for faster initial load
const ScreenshotsSection = lazy(() => import('../sections/ScreenshotsSection'))
const AboutSection       = lazy(() => import('../sections/AboutSection'))
const FeaturesSection    = lazy(() => import('../sections/FeaturesSection'))
const HowItWorksSection  = lazy(() => import('../sections/HowItWorksSection'))
const TournamentsSection = lazy(() => import('../sections/TournamentsSection'))
const AuctionSection     = lazy(() => import('../sections/AuctionSection'))
const OwnersSection      = lazy(() => import('../sections/OwnersSection'))
const WhyChooseSection   = lazy(() => import('../sections/WhyChooseSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const FAQSection          = lazy(() => import('../sections/FAQSection'))
const DownloadSection     = lazy(() => import('../sections/DownloadSection'))
const ContactSection      = lazy(() => import('../sections/ContactSection'))

/**
 * SportVerse Home Page
 * Header container wraps LaunchBanner + Navbar. Mobile Screen Video Ad showcase is placed at first.
 */
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Sticky Header wrapping Launch Banner + Navbar with zero text collision */}
      <header className="sticky-top w-100" style={{ zIndex: 1050 }}>
        <LaunchBanner onNotifyClick={handleOpenModal} />
        <Navbar onDownloadClick={handleOpenModal} />
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection onDownloadClick={handleOpenModal} />

        <Suspense fallback={<div className="h-32" />}>
          {/* Mobile Screen Showcase & Video Ad Section AT FIRST */}
          <ScreenshotsSection />
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TournamentsSection />
          <AuctionSection />
          <OwnersSection />
          <WhyChooseSection />
          <TestimonialsSection />
          <FAQSection />
          <DownloadSection onDownloadClick={handleOpenModal} />
          <ContactSection />
        </Suspense>
      </main>
      <Footer onDownloadClick={handleOpenModal} />

      {/* Global App Coming Soon Modal */}
      <AppDownloadModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
