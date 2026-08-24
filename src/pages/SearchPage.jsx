import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Sparkles, Navigation, X, DollarSign, Calendar, Info } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

const searchStyles = `
  .sv-search-input::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
    opacity: 1;
  }
`;

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [selectedCity, setSelectedCity] = useState(null) // { name, latitude, longitude, state }
  const [citySuggestions, setCitySuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [cityError, setCityError] = useState(false)
  
  const suggestionsRef = useRef(null)

  // Client-side filtering by name
  const filteredTurfs = turfs.filter((turf) => {
    if (!keyword.trim()) return true
    return turf.name.toLowerCase().includes(keyword.trim().toLowerCase())
  })

  // Close city suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  // Fetch city suggestions from backend as the user types
  useEffect(() => {
    if (cityInput.trim().length < 2) {
      setCitySuggestions([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setLoadingSuggestions(true)
      try {
        const response = await fetch(`${API_BASE_URL}/location/search?q=${encodeURIComponent(cityInput)}`)
        if (response.ok) {
          const data = await response.json()
          setCitySuggestions(data)
          setShowSuggestions(true)
        }
      } catch (err) {
        console.error('Error fetching cities:', err)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [cityInput])

  // Perform search query to retrieve turfs
  const handleSearch = async (targetPage = 1) => {
    if (!cityInput.trim() && !selectedCity) {
      setCityError(true)
      return
    }
    setCityError(false)
    setLoading(true)
    setSearched(true)
    setPage(targetPage)

    try {
      let queryParams = new URLSearchParams({
        page: targetPage.toString(),
        limit: '15' // Fetch larger results to allow fluent client-side filtering
      })

      if (selectedCity) {
        queryParams.append('city', selectedCity.name)
        if (selectedCity.latitude && selectedCity.longitude) {
          queryParams.append('lat', selectedCity.latitude)
          queryParams.append('lng', selectedCity.longitude)
        }
      } else if (cityInput.trim()) {
        queryParams.append('city', cityInput.trim())
      }

      const url = `${API_BASE_URL}/turfs?${queryParams.toString()}`
      const response = await fetch(url)
      
      if (!response.ok) throw new Error('Search failed')
      
      const resData = await response.json()
      // API response matches { data: [turfs], pagination: { page, totalPages, totalResults } }
      setTurfs(resData.data || resData.turfs || [])
      setTotalPages(resData.pagination?.totalPages || 1)
    } catch (err) {
      console.error('Error searching turfs:', err)
      setTurfs([])
    } finally {
      setLoading(false)
    }
  }

  const selectCitySuggestion = (city) => {
    setSelectedCity(city)
    setCityInput(city.name)
    setCitySuggestions([])
    setShowSuggestions(false)
  }

  const clearCity = () => {
    setSelectedCity(null)
    setCityInput('')
    setCitySuggestions([])
  }

  return (
    <div 
      className="position-relative overflow-hidden w-100"
      style={{ minHeight: '95vh', backgroundColor: 'var(--sv-bg)', paddingTop: '110px', paddingBottom: '90px' }}
    >
      {/* Dynamic light glows */}
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

      <div className="container position-relative" style={{ zIndex: 2 }}>
        
        {/* Page Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-secondary bg-dark mb-3"
            style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            <Sparkles size={13} className="sv-text-primary animate-pulse" />
            <span className="text-light opacity-75">Interactive Booking Engine</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fw-black text-white"
            style={{ fontSize: '3rem', letterSpacing: '-0.03em' }}
          >
            Find Your Perfect <span className="sv-text-primary">Turf</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sv-text-muted fs-6 mx-auto"
            style={{ maxWidth: '540px' }}
          >
            Search by city or venue name, browse real-time slot availability, and book instantly using online payments.
          </motion.p>
        </div>

        <style>{searchStyles}</style>

        {/* Search Panel Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-4 p-md-4 rounded-4 mb-5 border"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="row g-3 align-items-center">
            
            {/* Search Input */}
            {searched && turfs.length > 0 && (
              <div className="col-12 col-md-5">
                <div className="position-relative">
                  <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 sv-text-dim" />
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="form-control text-white ps-5 py-3 border-0 rounded-3 sv-search-input"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* City Dropdown Auto-Complete */}
            <div className={searched && turfs.length > 0 ? "col-12 col-md-5 position-relative" : "col-12 col-md-10 position-relative"} ref={suggestionsRef}>
              <div className="position-relative">
                <MapPin size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 sv-text-dim" />
                <input
                  type="text"
                  placeholder="Select city (e.g. Bangalore, Chennai)..."
                  value={cityInput}
                  onChange={(e) => {
                    setCityInput(e.target.value)
                    if (selectedCity && e.target.value !== selectedCity.name) {
                      setSelectedCity(null)
                    }
                  }}
                  onFocus={() => {
                    citySuggestions.length > 0 && setShowSuggestions(true)
                    setCityError(false)
                  }}
                  className="form-control text-white ps-5 pe-4 py-3 border-0 rounded-3 sv-search-input"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: cityError ? '1px solid #ff4d4d' : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: cityError ? '0 0 10px rgba(255,77,77,0.2)' : 'none'
                  }}
                />
                
                {cityInput && (
                  <button 
                    onClick={clearCity}
                    className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent text-light opacity-50 me-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* City Suggestions Menu */}
              <AnimatePresence>
                {showSuggestions && citySuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="position-absolute start-0 end-0 mt-2 p-2 rounded-3 border"
                    style={{
                      background: '#111',
                      borderColor: 'rgba(255,255,255,0.1)',
                      zIndex: 1000,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                    }}
                  >
                    {citySuggestions.map((city) => (
                      <button
                        key={city._id || city.name}
                        onClick={() => selectCitySuggestion(city)}
                        className="w-100 border-0 bg-transparent text-start text-white p-2 rounded-2 hover-white-05 d-flex align-items-center gap-2"
                        style={{ fontSize: '14px', transition: 'all 0.15s' }}
                      >
                        <Navigation size={12} className="sv-text-primary" />
                        <span>{city.name}, {city.state || ''}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="col-12 col-md-2">
              <button
                onClick={() => handleSearch(1)}
                className="sv-btn sv-btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 fs-6 fw-bold"
                style={{ borderRadius: '10px' }}
                disabled={loading}
              >
                <Search size={18} />
                Search
              </button>
            </div>
            
          </div>
        </motion.div>

        {/* Results Area */}
        {!searched ? (
          /* Initial State - Prompt to select city */
          <div className="text-center py-5 rounded-4 glass-strong p-5" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.06)' }}>
            <MapPin size={48} className="sv-text-primary opacity-50 mb-3 animate-bounce" style={{ animationDuration: '3s' }} />
            <h3 className="text-white fw-bold mb-2">Search Turfs by Location</h3>
            <p className="sv-text-muted fs-6 mx-auto mb-4" style={{ maxWidth: '400px' }}>
              Please select or type your city in the location input above and click Search to discover available sports venues.
            </p>
          </div>
        ) : loading ? (
          /* Skeletons loader */
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col">
                <div className="rounded-4 overflow-hidden border border-secondary bg-dark-alt animate-pulse" style={{ height: '360px', opacity: 0.5 }} />
              </div>
            ))}
          </div>
        ) : turfs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-5 rounded-4 glass-strong p-5" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.06)' }}>
            <MapPin size={48} className="sv-text-primary opacity-50 mb-3" />
            <h3 className="text-white fw-bold mb-2">No Turfs Registered</h3>
            <p className="sv-text-muted fs-6 mx-auto mb-4" style={{ maxWidth: '400px' }}>
              We couldn't find any turfs matching your filters in {selectedCity?.name || cityInput || 'this location'}. Try searching for a different city.
            </p>
            <button onClick={clearCity} className="btn border border-secondary text-white rounded-pill px-4">
              Clear Location
            </button>
          </div>
        ) : filteredTurfs.length === 0 ? (
          /* Name Filter Empty State */
          <div className="text-center py-5 rounded-4 glass-strong p-5" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.06)' }}>
            <Search size={48} className="sv-text-primary opacity-50 mb-3" />
            <h3 className="text-white fw-bold mb-2">No Venues Match Filter</h3>
            <p className="sv-text-muted fs-6 mx-auto mb-4" style={{ maxWidth: '400px' }}>
              No turfs match the name filter "{keyword}" in {selectedCity?.name || cityInput}. Try clearing the name filter.
            </p>
            <button onClick={() => setKeyword('')} className="btn border border-secondary text-white rounded-pill px-4">
              Clear Filter
            </button>
          </div>
        ) : (
          /* Results grid */
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
              {filteredTurfs.map((turf) => (
                <div key={turf._id} className="col">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
                    onClick={() => window.location.href = `/turf/${turf._id}`}
                    className="h-100 rounded-4 border overflow-hidden d-flex flex-column"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: 'rgba(255, 255, 255, 0.06)',
                      transition: 'border-color 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Header Image */}
                    <div style={{ height: '180px', width: '100%', overflow: 'hidden', position: 'relative', background: '#222' }}>
                      {turf.coverImage ? (
                        <img 
                          src={getImageUrl(turf.coverImage)} 
                          alt={turf.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                          <MapPin size={36} className="sv-text-primary opacity-30" />
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div 
                        className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill"
                        style={{
                          background: 'rgba(0, 0, 0, 0.75)',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <span className="sv-text-primary fw-bold">₹{turf.pricing?.weekdayDay || 0}</span>
                        <span className="text-light opacity-50 font-size-11">/hr</span>
                      </div>

                      {/* Distance Badge (if geosorted) */}
                      {turf.distance !== undefined && (
                        <div 
                          className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-3"
                          style={{
                            background: 'rgba(255, 212, 0, 0.95)',
                            color: '#000',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}
                        >
                          {(turf.distance / 1000).toFixed(1)} km away
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h3 className="text-white fs-5 fw-bold mb-2 text-truncate">{turf.name}</h3>
                      
                      <div className="d-flex align-items-center mb-3">
                        {turf.googleMapsUrl ? (
                          <a 
                            href={turf.googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-sm border border-secondary text-light rounded-pill px-3 py-1 text-decoration-none d-inline-flex align-items-center gap-1 hover-white"
                            style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)' }}
                          >
                            <MapPin size={12} className="sv-text-primary" />
                            View on Map
                          </a>
                        ) : (
                          <p className="sv-text-muted fs-7 text-truncate mb-0">
                            <MapPin size={12} className="sv-text-primary me-1" style={{ verticalAlign: 'middle' }} />
                            {turf.landmark ? `${turf.landmark}, ` : ''}{turf.city}
                          </p>
                        )}
                      </div>

                      {/* Amenities Icons */}
                      {turf.amenities && (
                        <div className="d-flex flex-wrap gap-1 mb-4 mt-auto">
                          {Object.entries(turf.amenities)
                            .filter(([_, value]) => value)
                            .slice(0, 4)
                            .map(([key]) => (
                              <span 
                                key={key} 
                                className="badge bg-transparent border border-secondary text-white rounded-pill px-2 py-1"
                                style={{ fontSize: '10px', textTransform: 'uppercase', borderColor: 'rgba(255,255,255,0.06) !important' }}
                              >
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            ))
                          }
                        </div>
                      )}

                      {/* CTA Booking Link */}
                      <a
                        href={`/turf/${turf._id}`}
                        className="sv-btn border border-secondary text-white justify-content-center py-2 fs-7 hover-primary w-100"
                        style={{ borderRadius: '10px', transition: 'all 0.2s' }}
                      >
                        <Calendar size={14} className="me-2" />
                        Book Slots
                      </a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex align-items-center justify-content-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => handleSearch(page - 1)}
                  className="btn border border-secondary text-white px-3 py-1 rounded-pill"
                  style={{ opacity: page === 1 ? 0.4 : 1 }}
                >
                  Previous
                </button>
                <span className="text-white">Page {page} of {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => handleSearch(page + 1)}
                  className="btn border border-secondary text-white px-3 py-1 rounded-pill"
                  style={{ opacity: page === totalPages ? 0.4 : 1 }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        
      </div>
    </div>
  )
}
