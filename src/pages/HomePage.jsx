import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'

// Lazy-load heavier sections for faster initial load
const AboutSection       = lazy(() => import('../sections/AboutSection'))
const FeaturesSection    = lazy(() => import('../sections/FeaturesSection'))
const HowItWorksSection  = lazy(() => import('../sections/HowItWorksSection'))
const TournamentsSection = lazy(() => import('../sections/TournamentsSection'))
const AuctionSection     = lazy(() => import('../sections/AuctionSection'))
const OwnersSection      = lazy(() => import('../sections/OwnersSection'))
const ScreenshotsSection = lazy(() => import('../sections/ScreenshotsSection'))
const WhyChooseSection   = lazy(() => import('../sections/WhyChooseSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const FAQSection          = lazy(() => import('../sections/FAQSection'))
const DownloadSection     = lazy(() => import('../sections/DownloadSection'))
const ContactSection      = lazy(() => import('../sections/ContactSection'))

/**
 * SportVerse Home Page
 * Assembles all sections with Suspense lazy loading.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero is eagerly loaded for best LCP */}
        <HeroSection />

        <Suspense fallback={<div className="h-32" />}>
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TournamentsSection />
          <AuctionSection />
          <OwnersSection />
          <ScreenshotsSection />
          <WhyChooseSection />
          <TestimonialsSection />
          <FAQSection />
          <DownloadSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
