import { useId } from 'react'
import { useInView } from '../../hooks/useInView'

/**
 * Anillo de progreso SVG que se dibuja al entrar en pantalla. Admite contenido
 * central (por ejemplo, el contador animado de una cifra).
 */
export function ProgressRing({
  value,
  size = 148,
  strokeWidth = 10,
  tone = '#FF8382',
  trackColor = 'rgba(255,255,255,0.16)',
  className = '',
  label,
  children,
}) {
  const { ref, inView } = useInView({ threshold: 0.35, once: true })
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percentage = Math.max(0, Math.min(100, value))

  return (
    <div
      ref={ref}
      className={`relative grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? circumference * (1 - percentage / 100) : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}

/** Línea de tendencia viva que se traza al entrar en pantalla. */
export function Sparkline({
  values,
  tone = '#9DBEB8',
  height = 44,
  className = '',
  fillOpacity = 0.2,
}) {
  const { ref, inView } = useInView({ threshold: 0.3, once: true })
  const rawId = useId()
  const gradientId = `spark-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const width = 160
  const safeValues = values.length > 1 ? values : [0, 1]
  const max = Math.max(...safeValues)
  const min = Math.min(...safeValues)
  const span = max - min || 1

  const points = safeValues.map((value, index) => {
    const x = (index / (safeValues.length - 1)) * width
    const y = height - 6 - ((value - min) / span) * (height - 12)
    return [x, y]
  })

  const line = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={tone} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={area}
        fill={`url(#${gradientId})`}
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
      <path
        d={line}
        fill="none"
        stroke={tone}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={inView ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
    </svg>
  )
}

/** Barra comparativa que se llena cuando la tarjeta entra en pantalla. */
export function AnimatedBars({
  value,
  max = 100,
  tone = '#FF8382',
  height = 'h-2',
  trackClassName = 'bg-white/15',
  className = '',
  label,
}) {
  const { ref, inView } = useInView({ threshold: 0.35, once: true })
  const width = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden rounded-full ${height} ${trackClassName} ${className}`}
      role="img"
      aria-label={label ?? `${value} de ${max}`}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: inView ? `${width}%` : '0%',
          backgroundColor: tone,
          transition: 'width 1.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  )
}
