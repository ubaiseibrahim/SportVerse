import { Suspense, lazy } from 'react'
import HeroSection from '../sections/HeroSection'
import SearchPage from './SearchPage'
import SectionDivider from '../components/SectionDivider'

// Lazy-load heavier sections for faster initial load
const AboutSection       = lazy(() => import('../sections/AboutSection'))
const FeaturesSection    = lazy(() => import('../sections/FeaturesSection'))
const HowItWorksSection  = lazy(() => import('../sections/HowItWorksSection'))
const LiveScoringSection = lazy(() => import('../sections/LiveScoringSection'))
const TournamentsSection = lazy(() => import('../sections/TournamentsSection'))
const AuctionSection     = lazy(() => import('../sections/AuctionSection'))
const OwnersSection      = lazy(() => import('../sections/OwnersSection'))
const WhyChooseSection   = lazy(() => import('../sections/WhyChooseSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const FAQSection          = lazy(() => import('../sections/FAQSection'))
const PrivacyPolicy       = lazy(() => import('./PrivacyPolicy'))
const DownloadSection     = lazy(() => import('../sections/DownloadSection'))
const ContactSection      = lazy(() => import('../sections/ContactSection'))

/**
 * ScoreVerse Home Page
 * Header container wraps LaunchBanner + Navbar. Mobile Screen Video Ad showcase is placed at first.
 */
export default function HomePage({ onDownloadClick }) {
  return (
    <>
      {/* Hero Section */}
      <HeroSection onDownloadClick={onDownloadClick} />

      {/* Book Turf / Search Section */}
      <div id="book-turf">
        <SearchPage />
      </div>

      <Suspense fallback={<div className="h-32" />}>
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SectionDivider />
        <LiveScoringSection />
        <TournamentsSection />
        <AuctionSection />
        <OwnersSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <FAQSection />
        {/* <PrivacyPolicy /> */}
        <SectionDivider />
        <DownloadSection onDownloadClick={onDownloadClick} />
        <ContactSection />
      </Suspense>
    </>
  )
}
