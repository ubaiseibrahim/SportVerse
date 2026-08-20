import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import LaunchBanner from './LaunchBanner'
import AppDownloadModal from './AppDownloadModal'
import ScrollToTop from './ScrollToTop'
import SmoothScroll from './SmoothScroll'
import CinematicCursor from './CinematicCursor'

export default function Layout({ children, isLegalPage = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <SmoothScroll />
      <CinematicCursor />
      <ScrollToTop />
      <header className="sticky-top w-100" style={{ zIndex: 1050 }}>
        <LaunchBanner onNotifyClick={handleOpenModal} />
        {!isLegalPage && <Navbar onDownloadClick={handleOpenModal} />}
      </header>

      <main>{children}</main>

      {!isLegalPage && <Footer onDownloadClick={handleOpenModal} />}
      <AppDownloadModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
