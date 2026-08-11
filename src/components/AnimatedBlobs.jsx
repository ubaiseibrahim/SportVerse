/**
 * Animated background blobs — decorative ambient light blobs
 * placed behind main content sections.
 */
const blobStyle = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(80px)',
  pointerEvents: 'none',
  willChange: 'transform',
  animation: 'sv-blob-move 12s ease-in-out infinite',
}

export default function AnimatedBlobs({ variant = 'default' }) {
  if (variant === 'green') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        <div
          style={{
            ...blobStyle,
            width: 400, height: 400,
            top: -100, right: '25%',
            background: 'radial-gradient(circle, rgba(255,212,0,0.18), transparent 70%)',
            opacity: 0.55,
          }}
        />
        <div
          style={{
            ...blobStyle,
            width: 320, height: 320,
            bottom: 0, left: '33%',
            background: 'radial-gradient(circle, rgba(255,212,0,0.12), transparent 70%)',
            animationDelay: '4s', animationDuration: '15s',
            opacity: 0.4,
          }}
        />
      </div>
    )
  }

  if (variant === 'mixed') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        <div
          style={{
            ...blobStyle,
            width: 500, height: 500,
            top: -100, left: -100,
            background: 'radial-gradient(circle, rgba(255,212,0,0.1), transparent 70%)',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            ...blobStyle,
            width: 380, height: 380,
            top: '40%', right: -120,
            background: 'radial-gradient(circle, rgba(255,212,0,0.12), transparent 70%)',
            animationDelay: '3s', animationDuration: '14s',
            opacity: 0.4,
          }}
        />
        <div
          style={{
            ...blobStyle,
            width: 340, height: 340,
            bottom: -100, left: '45%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)',
            animationDelay: '6s', animationDuration: '11s',
            opacity: 0.35,
          }}
        />
      </div>
    )
  }

  // default
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      <div
        style={{
          ...blobStyle,
          width: 420, height: 420,
          top: -120, left: -60,
          background: 'radial-gradient(circle, rgba(255,212,0,0.1), transparent 70%)',
          opacity: 0.45,
        }}
      />
      <div
        style={{
          ...blobStyle,
          width: 340, height: 340,
          top: '30%', right: 0,
          background: 'radial-gradient(circle, rgba(255,212,0,0.1), transparent 70%)',
          animationDelay: '3s', animationDuration: '15s',
          opacity: 0.38,
        }}
      />
      <div
        style={{
          ...blobStyle,
          width: 300, height: 300,
          bottom: -80, left: '33%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)',
          animationDelay: '6s', animationDuration: '13s',
          opacity: 0.35,
        }}
      />
    </div>
  )
}
