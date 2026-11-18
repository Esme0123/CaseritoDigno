import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  Quote,
  UserRound,
} from 'lucide-react'
import { useElementWidth } from '../../hooks/useElementWidth'

function initials(name) {
  return name
    .split(' ')
    .filter((part) => part.length > 1)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function TestimonialCard({ testimonial }) {
  const [expanded, setExpanded] = useState(false)
  const anonymous = testimonial.anonymous || !testimonial.name
  const displayName = anonymous ? 'Persona anónima' : testimonial.name
  const meta = [
    testimonial.role,
    testimonial.experience,
    testimonial.age ? `${testimonial.age} años` : null,
    testimonial.zone,
  ].filter(Boolean)

  const hasQuote = Boolean(testimonial.quote)
  const story = testimonial.story ?? ''
  const isLongStory = story.length > 240
  const featured = Boolean(testimonial.featured)

  return (
    <article
      className={`relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border shadow-card ${
        featured ? 'border-ink/10 bg-peach' : 'border-ink/10 bg-white'
      }`}
    >
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold ${
                featured ? 'bg-ink text-peach' : 'bg-sage/30 text-ink'
              }`}
              aria-hidden="true"
            >
              {anonymous ? <UserRound className="h-5 w-5" /> : initials(displayName)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-extrabold text-ink">{displayName}</p>
              <p
                className={`mt-0.5 flex items-center gap-1.5 text-[11px] font-medium ${
                  featured ? 'text-ink' : 'text-muted'
                }`}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {testimonial.zone ?? 'La Paz'}
              </p>
            </div>
          </div>

          {testimonial.isNew ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
              Nuevo
            </span>
          ) : (
            <Quote className="h-6 w-6 shrink-0 text-ink/20" aria-hidden="true" />
          )}
        </div>

        <p
          className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] ${
            featured ? 'text-ink' : 'text-muted'
          }`}
        >
          {meta.join(' · ')}
        </p>

        {hasQuote && (
          <blockquote className="mt-4 font-display text-lg font-bold leading-snug text-ink sm:text-xl">
            {testimonial.quote}
          </blockquote>
        )}

        {story && story !== testimonial.quote && (
          <div className="mt-3">
            <p
              className={`text-sm leading-relaxed ${
                featured ? 'text-ink' : 'text-muted'
              } ${!expanded && isLongStory ? 'line-clamp-4' : ''}`}
            >
              {story}
            </p>
            {isLongStory && (
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-ink underline decoration-coral decoration-2 underline-offset-4 transition hover:text-coral"
              >
                {expanded ? 'Mostrar menos' : 'Leer su historia'}
              </button>
            )}
          </div>
        )}

        {testimonial.roleDetail && (
          <p
            className={`mt-auto pt-5 text-xs font-medium ${
              featured ? 'text-ink' : 'text-muted'
            }`}
          >
            {testimonial.roleDetail}
          </p>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex h-1.5" aria-hidden="true">
          <span className="flex-1 bg-sage" />
          <span className="flex-1 bg-peach" />
          <span className="flex-1 bg-coral" />
        </div>
        <div
          className={`flex items-center justify-between gap-3 px-6 py-3 ${
            featured ? 'bg-ink text-white' : 'bg-ivory text-ink'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
            Testimonio de la calle
          </span>
          <span
            className={`grid h-7 w-7 place-items-center rounded-full ${
              featured ? 'bg-white/10 text-peach' : 'bg-ink text-white'
            }`}
            aria-hidden="true"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

/**
 * Carrusel editorial con perspectiva, arrastre con inercia, snap, botones y
 * enfoque al hacer clic. La tarjeta central queda nítida; las laterales se
 * inclinan y desvanecen en los bordes.
 */
export default function VoicesCarousel({ testimonials }) {
  const [viewportRef, width] = useElementWidth()
  const [active, setActive] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragState = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    moved: 0,
  })
  const suppressClick = useRef(false)

  const total = testimonials.length
  const isCompact = width > 0 && width < 640
  const cardWidth = width > 0 ? Math.min(isCompact ? Math.max(260, width * 0.84) : 380, width * 0.88) : 340
  const gap = isCompact ? 16 : 24
  const step = cardWidth + gap

  const leadId = testimonials[0]?.id
  const leadIsNew = Boolean(testimonials[0]?.isNew)

  useEffect(() => {
    setActive((current) => clamp(current, 0, Math.max(0, total - 1)))
  }, [total])

  useEffect(() => {
    if (leadIsNew) setActive(0)
  }, [leadId, leadIsNew])

  const goTo = useCallback(
    (index) => {
      if (total === 0) return
      setDragX(0)
      setActive(clamp(index, 0, total - 1))
    },
    [total],
  )

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('button, a, input, label, select, textarea')) return

    dragState.current = {
      active: true,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: 0,
    }
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const state = dragState.current
    if (!state.active) return

    const now = performance.now()
    const delta = event.clientX - state.lastX
    const elapsed = Math.max(1, now - state.lastTime)

    state.velocity = delta / elapsed
    state.lastX = event.clientX
    state.lastTime = now
    state.moved = Math.max(state.moved, Math.abs(event.clientX - state.startX))

    setDragX(event.clientX - state.startX)
  }

  const releaseDrag = (event) => {
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId)
    } catch {
      // El navegador puede haber liberado la captura automáticamente.
    }
  }

  const endDrag = (event) => {
    const state = dragState.current
    if (!state.active) return

    state.active = false
    setDragging(false)

    const projected = event.clientX - state.startX + state.velocity * 120
    const steps = Math.round(projected / step)

    setActive((current) => clamp(current - steps, 0, Math.max(0, total - 1)))
    setDragX(0)

    suppressClick.current = state.moved > 8
    window.setTimeout(() => {
      suppressClick.current = false
    }, 140)

    releaseDrag(event)
  }

  const cancelDrag = (event) => {
    const state = dragState.current
    if (!state.active) return

    state.active = false
    setDragging(false)
    setDragX(0)

    suppressClick.current = state.moved > 8
    window.setTimeout(() => {
      suppressClick.current = false
    }, 140)

    releaseDrag(event)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(active - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(active + 1)
    }
  }

  const handleCardClick = (index) => (event) => {
    if (suppressClick.current) return
    if (event.target.closest('button, a, input, label, select, textarea')) return
    if (index !== active) goTo(index)
  }

  const trackOffset = width > 0 ? width / 2 - cardWidth / 2 - active * step + dragX : 0

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium text-muted">
          Arrastra, desliza o usa las flechas para escuchar cada voz.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Testimonio anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-ink/30 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-[3.5rem] text-center text-xs font-bold tabular-nums text-muted">
            {total > 0 ? active + 1 : 0} / {total}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active >= total - 1}
            aria-label="Siguiente testimonio"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-ink/30 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Testimonios de la comunidad"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        onDragStart={(event) => event.preventDefault()}
        className={`relative mt-4 overflow-hidden py-6 outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 [perspective:1400px] ${
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-ivory to-transparent sm:w-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-ivory to-transparent sm:w-20"
          aria-hidden="true"
        />

        <div
          className="flex items-stretch will-change-transform"
          style={{
            gap: `${gap}px`,
            transform: `translate3d(${trackOffset}px, 0, 0)`,
            transformStyle: 'preserve-3d',
            transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {testimonials.map((testimonial, index) => {
            const distance = ((index - active) * step + dragX) / step
            const absolute = Math.abs(distance)
            const scale = Math.max(0.78, 1 - absolute * 0.07)
            const rotateY = clamp(-distance * 9, -22, 22)
            const translateY = Math.min(absolute, 3) * 7
            const opacity = Math.max(0.35, 1 - absolute * 0.16)
            const blur = absolute > 1.25 ? Math.min((absolute - 1.25) * 0.7, 0.7) : 0

            return (
              <div
                key={testimonial.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${total}`}
                onClick={handleCardClick(index)}
                className="shrink-0"
                style={{
                  width: `${cardWidth}px`,
                  transform: `translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  zIndex: Math.round(100 - absolute * 10),
                  transition: dragging
                    ? 'none'
                    : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, filter 0.45s ease',
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Ir a un testimonio">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            aria-current={index === active ? 'true' : undefined}
            aria-label={`Ir al testimonio ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-7 bg-ink' : 'w-2.5 bg-ink/20 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
