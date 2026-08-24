import React from 'react'
import { Helmet } from 'react-helmet-async'
import { blogPosts } from '../../data/blogPosts'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'

export default function BlogList() {
  return (
    <div 
      className="position-relative overflow-hidden w-100"
      style={{ minHeight: '95vh', backgroundColor: 'var(--sv-bg)', paddingTop: '110px', paddingBottom: '90px' }}
    >
      <Helmet>
        <title>ScoreVerse Blog – Sports Tips, Turf Reviews & Guides</title>
        <meta name="description" content="Discover the best sports turfs in India, tips for organizing tournaments, and guides for football and cricket players." />
      </Helmet>

      {/* Dynamic light glows to match Search Page */}
      <div 
        className="position-absolute top-0 start-50 translate-middle-x"
        style={{
          width: '70%',
          height: '400px',
          background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(var(--sv-primary-rgb), 0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative py-4" style={{ zIndex: 2 }}>
        <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white mb-3">ScoreVerse <span className="sv-text-primary">Blog</span></h1>
        <p className="lead sv-text-muted">The ultimate resource for sports enthusiasts, players, and organizers.</p>
      </div>

      <div className="row g-4">
        {blogPosts.map((post) => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <a href={`/blog/${post.slug}`} className="text-decoration-none h-100 d-block">
              <div 
                className="card h-100 border-0 rounded-4 overflow-hidden sv-hover-lift"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)', 
                  transition: 'all 0.3s ease' 
                }}
              >
                <div className="position-relative" style={{ height: '220px', background: '#222' }}>
                  <img 
                    src={post.coverImage} 
                    className="w-100 h-100 object-fit-cover" 
                    alt={post.title}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80'; // Fallback sports image
                    }}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span 
                      className="badge rounded-pill px-3 py-2 fw-bold"
                      style={{ backgroundColor: 'var(--sv-primary)', color: '#000' }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3 text-white-50 small">
                    <span className="d-flex align-items-center me-3"><Calendar size={14} className="me-1 sv-text-primary" /> {post.date}</span>
                    <span className="d-flex align-items-center"><Clock size={14} className="me-1 sv-text-primary" /> {post.readTime}</span>
                  </div>
                  <h4 className="card-title text-white fw-bold mb-3">{post.title}</h4>
                  <p className="card-text sv-text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>{post.excerpt}</p>
                  <div className="mt-4 pt-3 border-top border-secondary d-flex align-items-center sv-text-primary fw-bold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                    Read Article <ArrowRight size={16} className="ms-2" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
