import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BlogList from './BlogList'
import BlogPost from './BlogPost'

export default function BlogRouter() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--sv-bg)' }}>
      <Navbar />
      <main className="flex-grow-1" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
