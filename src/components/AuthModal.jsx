import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, MapPin, Sparkles, Navigation, CheckCircle } from 'lucide-react'
import { API_BASE_URL } from '../utils/api'

// Retrieve Google Client ID from Vite environment, or use placeholder for config
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1088656111195-placeholder.apps.googleusercontent.com'

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1) // 1: Google login, 2: Complete signup
  const [tempIdToken, setTempIdToken] = useState('')
  const [tempEmail, setTempEmail] = useState('')
  const [tempName, setTempName] = useState('')
  const [mobile, setMobile] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [citySuggestions, setCitySuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  const googleButtonRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Load Google Client Script
  useEffect(() => {
    if (!isOpen) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        })
        
        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'filled_blue',
            size: 'large',
            width: 320,
            text: 'signin_with',
            shape: 'pill'
          })
        }
      }
    }
    
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [isOpen, step])

  // Handle outside click for city suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // City Search logic
  useEffect(() => {
    if (cityInput.trim().length < 2) {
      setCitySuggestions([])
      return
    }
    if (selectedCity && cityInput === selectedCity.name) return

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
        console.error('Error fetching suggestions:', err)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [cityInput])

  // Process the ID token returned from Google
  const handleGoogleCredentialResponse = async (response) => {
    const idToken = response.credential
    setTempIdToken(idToken)
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const apiResponse = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })

      const result = await apiResponse.json()
      if (!apiResponse.ok) {
        throw new Error(result.message || 'Verification failed')
      }

      if (result.data?.signUpRequired || result.signUpRequired) {
        // Switch to Step 2 (Phone & Location selector)
        const payload = result.data || result
        setTempEmail(payload.email)
        setTempName(payload.name)
        setStep(2)
      } else {
        // Success login
        saveSession(result.data || result)
      }
    } catch (err) {
      setErrorMessage(err.message || 'Google authentication failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Complete Registration Form Submit
  const handleCompleteSignup = async (e) => {
    e.preventDefault()
    if (!mobile || mobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.')
      return
    }
    if (!selectedCity) {
      setErrorMessage('Please select a valid city from the dropdown.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const payload = {
        idToken: tempIdToken,
        mobile: mobile.trim(),
        city: selectedCity.name,
        state: selectedCity.state || '',
        locationObj: {
          name: `${selectedCity.name}, ${selectedCity.state || ''}`,
          latitude: parseFloat(selectedCity.latitude),
          longitude: parseFloat(selectedCity.longitude)
        }
      }

      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      setSignupSuccess(true)
      setTimeout(() => {
        saveSession(result.data || result)
      }, 1500)
    } catch (err) {
      setErrorMessage(err.message || 'Signup failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveSession = (data) => {
    // Save tokens and profile details in localStorage
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    // Dispatch auth update custom event for reactive rendering
    window.dispatchEvent(new Event('authChange'))
    
    onSuccess(data.user)
    onClose()
    
    // Reset state
    setStep(1)
    setTempIdToken('')
    setMobile('')
    setCityInput('')
    setSelectedCity(null)
    setSignupSuccess(false)
  }

  const selectCitySuggestion = (city) => {
    setSelectedCity(city)
    setCityInput(city.name)
    setCitySuggestions([])
    setShowSuggestions(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      >
        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-4 p-md-5 rounded-4 position-relative border text-center"
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'rgba(15, 15, 20, 0.95)',
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="position-absolute top-0 end-0 m-4 border-0 bg-transparent text-light opacity-50 hover-white"
          >
            <X size={20} />
          </button>

          {step === 1 ? (
            /* =================================================================
               STEP 1: GOOGLE LOGIN OR SIGNUP
               ================================================================= */
            <div>
              <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-3 border border-warning" style={{ background: 'rgba(255, 212, 0, 0.05)' }}>
                <Sparkles size={24} className="sv-text-primary" />
              </div>
              <h2 className="fw-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                Join <span className="sv-text-primary">ScoreVerse</span>
              </h2>
              <p className="sv-text-muted fs-7 mb-4 px-3" style={{ lineHeight: '1.5' }}>
                Sign in using your Google account to book turfs, view active slots, and manage matches instantly.
              </p>

              {errorMessage && (
                <div className="alert alert-danger py-2 fs-7 mb-3" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="position-relative d-flex justify-content-center align-items-center py-3" style={{ minHeight: '60px' }}>
                {isSubmitting && (
                  <div className="position-absolute d-flex align-items-center justify-content-center rounded-pill" style={{
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '320px', height: '44px',
                    background: 'rgba(15, 15, 20, 0.92)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 10,
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <div className="spinner-border spinner-border-sm sv-text-primary me-2" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '0.18em' }} />
                    <span className="text-white fs-7 fw-semibold">Verifying Google Account...</span>
                  </div>
                )}
                <div 
                  ref={googleButtonRef} 
                  id="googleSignInButton" 
                  style={{ 
                    opacity: isSubmitting ? 0.25 : 1, 
                    pointerEvents: isSubmitting ? 'none' : 'auto',
                    transition: 'opacity 0.25s ease'
                  }} 
                />
              </div>

              <p className="sv-text-dim text-center mt-3" style={{ fontSize: '11px' }}>
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          ) : (
            /* =================================================================
               STEP 2: REGISTER PROFILE DETAILS (MOBILE + LOCATION)
               ================================================================= */
            <div>
              {signupSuccess ? (
                <div className="py-4">
                  <CheckCircle size={44} className="sv-text-primary mb-3" />
                  <h3 className="text-white fw-bold">Registration Complete!</h3>
                  <p className="sv-text-muted fs-7">Setting up your secure wallet & player stats...</p>
                </div>
              ) : (
                <form onSubmit={handleCompleteSignup} className="text-start">
                  <h3 className="text-white fw-bold text-center mb-2" style={{ letterSpacing: '-0.01em' }}>
                    Complete Your Profile
                  </h3>
                  <p className="sv-text-muted text-center fs-7 mb-4">
                    Enter your details to match existing statistics and view relevant city fields.
                  </p>

                  {errorMessage && (
                    <div className="alert alert-danger py-2 fs-7 mb-3" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  {/* Pre-filled Name/Email indicators */}
                  <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="fs-7 text-white fw-medium">{tempName}</div>
                    <div className="fs-8 sv-text-muted">{tempEmail}</div>
                  </div>

                  {/* Phone input */}
                  <div className="mb-3">
                    <label className="form-label text-light fs-7 fw-semibold">Mobile Number</label>
                    <div className="position-relative">
                      <Smartphone size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 sv-text-dim" />
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit mobile number..."
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className="form-control text-white ps-5 py-2-5 border-0 rounded-3"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* City dropdown */}
                  <div className="mb-4 position-relative" ref={suggestionsRef}>
                    <label className="form-label text-light fs-7 fw-semibold">City Location</label>
                    <div className="position-relative">
                      <MapPin size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 sv-text-dim" />
                      <input
                        type="text"
                        placeholder="Search your city..."
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        onFocus={() => citySuggestions.length > 0 && setShowSuggestions(true)}
                        className="form-control text-white ps-5 py-2-5 border-0 rounded-3"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                        required
                      />
                    </div>

                    {/* Suggestions list */}
                    <AnimatePresence>
                      {showSuggestions && citySuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="position-absolute start-0 end-0 mt-2 p-2 rounded-3 border"
                          style={{
                            background: '#151515',
                            borderColor: 'rgba(255,255,255,0.1)',
                            zIndex: 1000,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.8)'
                          }}
                        >
                          {citySuggestions.map((city) => (
                            <button
                              key={city._id || city.name}
                              type="button"
                              onClick={() => selectCitySuggestion(city)}
                              className="w-100 border-0 bg-transparent text-start text-white p-2 rounded-2 hover-white-05 d-flex align-items-center gap-2"
                              style={{ fontSize: '13px', transition: 'all 0.15s' }}
                            >
                              <Navigation size={10} className="sv-text-primary" />
                              <span>{city.name}, {city.state || ''}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sv-btn sv-btn-primary w-100 py-2-5 justify-content-center fw-bold fs-7"
                    style={{ borderRadius: '10px' }}
                  >
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ) : null}
                    Create Profile & Login
                  </button>
                </form>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
