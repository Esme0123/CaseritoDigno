/** Punto pulsante que indica actividad en vivo. */
export default function LiveDot({ className = '' }) {
  return (
    <span className={`relative flex h-2.5 w-2.5 shrink-0 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
    </span>
  )
}
