export function Loading({ label = 'Loading', fullScreen = false }: { label?: string; fullScreen?: boolean }) {
  return (
    <div className={`loading ${fullScreen ? 'loading-screen' : ''}`} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
