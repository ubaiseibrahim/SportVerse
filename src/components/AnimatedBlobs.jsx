/**
 * Animated background blobs — decorative ambient light blobs
 * placed behind main content sections.
 */
export default function AnimatedBlobs({ variant = 'default' }) {
  if (variant === 'green') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="animate-blob absolute -top-32 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
        />
        <div
          className="animate-blob animation-delay-4 absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
        />
      </div>
    )
  }

  if (variant === 'mixed') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="animate-blob absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
        />
        <div
          className="animate-blob animation-delay-2 absolute top-1/2 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
        />
        <div
          className="animate-blob animation-delay-4 absolute -bottom-24 left-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }}
        />
      </div>
    )
  }

  // default — blue
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="animate-blob absolute -top-32 -left-16 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />
      <div
        className="animate-blob animation-delay-2 absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }}
      />
      <div
        className="animate-blob animation-delay-4 absolute -bottom-24 left-1/3 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }}
      />
    </div>
  )
}
