import React, { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogPosts } from '../../data/blogPosts'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/blog" />
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.coverImage],
    "datePublished": new Date(post.date).toISOString(),
    "author": [{
        "@type": "Organization",
        "name": post.author,
        "url": "https://scoreverse.in"
      }]
  }

  return (
    <article className="pb-5">
      <Helmet>
        <title>{`${post.title} | ScoreVerse Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="position-relative w-100" style={{ height: '40vh', minHeight: '300px' }}>
        <img src={post.coverImage} alt={post.title} className="w-100 h-100 object-fit-cover" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.6 }}></div>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container position-relative z-index-1">
            <a href="/blog" className="text-white text-decoration-none d-inline-flex align-items-center mb-4 sv-hover-primary">
              <ArrowLeft size={20} className="me-2" /> Back to Blog
            </a>
            <h1 className="display-4 fw-bold text-white mb-3" style={{ maxWidth: '800px' }}>{post.title}</h1>
            <div className="d-flex flex-wrap align-items-center text-white-50 gap-4">
              <span className="d-flex align-items-center"><Calendar size={16} className="me-2 text-white" /> {post.date}</span>
              <span className="d-flex align-items-center"><Clock size={16} className="me-2 text-white" /> {post.readTime}</span>
              <span className="d-flex align-items-center"><User size={16} className="me-2 text-white" /> {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div 
              className="blog-content text-white fs-5 lh-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div 
              className="mt-5 p-4 rounded-4 text-center glass-strong border"
              style={{ borderColor: 'var(--sv-primary)' }}
            >
              <h3 className="text-white mb-3">Ready to Play?</h3>
              <p className="sv-text-muted mb-4">Book your perfect turf instantly on ScoreVerse and enjoy hassle-free sports.</p>
              <a href="/search" className="btn sv-btn-primary px-5 py-3 rounded-pill fw-bold fs-5">
                Book a Turf Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
