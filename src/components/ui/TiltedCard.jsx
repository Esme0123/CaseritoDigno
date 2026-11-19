import { useRef, useState } from 'react'
import { ArrowUpRight, Check, MapPin, Play } from 'lucide-react'
import {
  CarmenScene,
  CommunityScene,
  LuisScene,
  MarisolScene,
} from './TestimonialScenes'

/**
 * TiltedCard: Tarjeta Inclinada 3D inspirada en "Tilted Card" de React Bits.
 *
 * Características:
 * - Física 3D reactiva al puntero (perspective(1000px) rotateX(...) rotateY(...) scale(1.04))
 * - Reflejo de luz dinámico (glare radial siguiendo el cursor)
 * - Sombra profunda elevada al interactuar
 * - Capas internas flotantes con translateZ(24px)
 * - Composición visual documental con soporte de fotografía real e ilustración de respaldo
 */
export default function TiltedCard({
  testimonial,
  imageSrc,
  alt,
  isExpanded = false,
  onToggleExpand,
  className = '',
}) {
  const cardRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  })

  // Física 3D reactiva al cursor
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Ángulo máximo de inclinación (en grados)
    const maxTilt = 12
    const rotateX = -(((y - centerY) / centerY) * maxTilt).toFixed(2)
    const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2)

    // Coordenadas relativas en porcentaje para el reflejo (glare)
    const glareX = ((x / rect.width) * 100).toFixed(1)
    const glareY = ((y / rect.height) * 100).toFixed(1)

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true,
    })
  }

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    })
  }

  // Selección de escena documental de respaldo
  const renderFallbackScene = () => {
    const id = testimonial?.id || ''
    if (id === 'carmen') return <CarmenScene />
    if (id === 'luis') return <LuisScene />
    if (id === 'marisol') return <MarisolScene />
    return <CommunityScene zone={testimonial?.zone || 'La Paz'} />
  }

  const src = imageSrc || `/testimonios/${testimonial?.id || 'comunidad'}.jpg`
  const displayName = testimonial?.anonymous || !testimonial?.name ? 'Persona anónima' : testimonial?.name
  const roleText = testimonial?.roleDetail || testimonial?.role || 'Comercio popular paceño'
  const zoneBadge = testimonial?.experience
    ? `📍 ${testimonial.zone || 'La Paz'} · ${testimonial.experience}`
    : `📍 ${testimonial.zone || 'La Paz'}`

  return (
    <div
      className={`relative mx-auto w-full max-w-[420px] select-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-ink/15 bg-ink shadow-card transition-all"
        style={{
          transformStyle: 'preserve-3d',
          transform: tilt.isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.04)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          boxShadow: tilt.isHovered
            ? '0 32px 64px -16px rgba(25, 67, 80, 0.45), 0 12px 24px -8px rgba(25, 67, 80, 0.25)'
            : '0 18px 40px -24px rgba(25, 67, 80, 0.22)',
          transition: tilt.isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.2s ease-out'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
        }}
      >
        {/* ============================================================
            Capa 0: Fotografía o composición documental con fallback
            ============================================================ */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          {/* Escena vectorial de alta calidad */}
          {renderFallbackScene()}

          {/* Fotografía opcional si existe en el path indicado */}
          {!imgFailed && (
            <img
              src={src}
              alt={alt || `Fotografía documental de ${displayName}`}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            />
          )}

          {/* Sutil viñeta oscura para garantizar contraste con las capas flotantes */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/60"
            aria-hidden="true"
          />
        </div>

        {/* ============================================================
            Capa 1: Reflejo dinámico de luz (Glare) siguiendo el cursor
            ============================================================ */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-300"
          style={{
            opacity: tilt.isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.85), transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* ============================================================
            Capa 2 (Flotante translateZ(24px)): Insignia superior
            ============================================================ */}
        <div
          className="absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-2"
          style={{
            transform: 'translateZ(26px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <span className="inline-flex max-w-[85%] items-center gap-1.5 truncate rounded-full border border-white/20 bg-ink/75 px-3 py-1.5 text-xs font-semibold text-white shadow-soft backdrop-blur-md">
            <span className="truncate">{zoneBadge}</span>
          </span>

          {testimonial?.isNew && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-soft">
              Nueva voz
            </span>
          )}
        </div>

        {/* ============================================================
            Capa 3 (Flotante translateZ(24px)): Tarjeta de glassmorphism inferior
            ============================================================ */}
        <div
          className="absolute inset-x-4 bottom-4 z-20"
          style={{
            transform: 'translateZ(28px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-ink/80 p-3.5 shadow-lift backdrop-blur-md">
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-extrabold tracking-tight text-white">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-peach">
                {roleText}
              </p>
            </div>

            {/* Botón flotante circular (↗ o ▶) */}
            <button
              type="button"
              onClick={onToggleExpand}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-ink shadow-card transition-transform duration-200 hover:scale-110 hover:bg-peach focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isExpanded ? 'Contraer historia' : 'Resaltar historia completa'}
              title={isExpanded ? 'Contraer historia' : 'Leer historia completa'}
            >
              <ArrowUpRight
                className={`h-5 w-5 transition-transform duration-300 ${
                  isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

