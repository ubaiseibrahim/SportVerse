import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'

/**
 * Root Application
 * Sets up routing and page entrance animation.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  )
}
