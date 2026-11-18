/** Muro en perspectiva para postales y compromisos. */
export default function DriftWall({ children, className = '' }) {
  return <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ${className}`}>{children}</div>
}

/**
 * Tarjeta flotante del muro. Se endereza y eleva al pasar el cursor o al
 * enfocar un elemento interno. `onActivate` permite copiar el mensaje con un
 * clic en cualquier parte de la tarjeta.
 */
export function DriftCard({
  children,
  className = '',
  itemClassName = '',
  tilt = 0,
  tiltY = 0,
  delay = 0,
  onActivate,
}) {
  return (
    <div
      className={`drift-item h-full ${itemClassName}`}
      style={{ '--tilt': `${tilt}deg`, '--tilt-y': `${tiltY}deg` }}
    >
      <div className="drift-float h-full" style={{ animationDelay: `${delay}ms` }}>
        <div
          className={`drift-card h-full overflow-hidden rounded-3xl border ${className}`}
          onClick={onActivate}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
