import { useEffect, useRef, useState } from 'react'
import { ArrowDown, HeartHandshake, PenLine, Quote } from 'lucide-react'
import HeroIllustration from '../HeroIllustration'
import LiveDot from './LiveDot'
import Reveal from './Reveal'
import { DIAGNOSIS_ZONES } from '../../data/content'
import { formatNumber } from '../../lib/storage'

/**
 * ScrollExpandHero: Hero editorial inmersivo inspirado en "Desplácese para expandir"
 * (Scroll Expand Media) de React Bits.
 *
 * Estructura:
 * 1. Encabezado editorial limpio sobre #FAF9F6 (ivory):
 *    - Eyebrow de campaña con LiveDot.
 *    - Titular de alto impacto con acento en "dignidad".
 *    - Subtítulo editorial y botones de acción ("Conoce su realidad", "Registrar testimonio").
 *    - Barra compacta del contador en tiempo real (personas leyendo + visitas).
 * 2. Marco multimedia interactivo que se expande al hacer scroll:
 *    - Inicia centrado al 72% de ancho (max-w-5xl) con rounded-3xl y shadow-2xl.
 *    - Al hacer scroll, se expande fluidamente al 100% de ancho y rounded-none.
 *    - En el centro muestra "Trabajo honrado, no delito" con "Desplázate para expandir su historia ↓",
 *      dando paso suavemente a la cita de Doña Carmen.
 */
export default function ScrollExpandHero({ readers, visits, onOpenTestimonial }) {
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = null

    const handleScroll = () => {
      if (frameId) return
      frameId = requestAnimationFrame(() => {
        if (!trackRef.current) {
          frameId = null
          return
        }

        const rect = trackRef.current.getBoundingClientRect()
        const totalHeight = trackRef.current.offsetHeight - window.innerHeight

        if (totalHeight > 0) {
          // Calculamos el avance del scroll mientras la sección interactiva está activa
          const current = -rect.top + 70 // Compensación por navbar
          const p = Math.min(1, Math.max(0, current / totalHeight))
          setProgress(p)
        }
        frameId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  // Parámetros de expansión reactiva al scroll
  // Ancho: de 72% (o 92% en móviles pequeños) a 100%
  const startWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 72
  const currentWidthPercent = startWidth + (100 - startWidth) * progress
  // Redondez: de 32px (rounded-3xl) a 0px (rounded-none)
  const currentRadius = (1 - progress) * 32

  // Transiciones de texto
  // Texto 1 ("Trabajo honrado, no delito"): visible de 0 a 0.45
  const opacity1 = Math.max(0, 1 - progress * 2.4)
  const translateY1 = -progress * 36

  // Texto 2 (Cita Doña Carmen): visible a partir de 0.35 hasta 1
  const opacity2 = Math.min(1, Math.max(0, (progress - 0.35) * 2.3))
  const translateY2 = (1 - progress) * 28

  const scrollToExpanded = () => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const targetScroll = window.scrollY + rect.top + (trackRef.current.offsetHeight - window.innerHeight) * 0.85
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="relative bg-ivory">
      {/* Manchas decorativas sutiles en la parte superior */}
      <div
        className="pointer-events-none absolute -left-20 top-12 h-80 w-80 rounded-full bg-peach/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-28 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
        aria-hidden="true"
      />

      {/* ============================================================
          PARTE SUPERIOR: Encabezado editorial limpio sobre #FAF9F6
          ============================================================ */}
      <div className="container-page relative pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow mx-auto justify-center text-muted">
              <LiveDot />
              Campaña de concientización ciudadana · La Paz
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              Detrás de cada puesto en la acera hay una familia luchando por vivir con{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">dignidad</span>
                <span
                  className="absolute inset-x-0 bottom-1 -z-0 h-3.5 rounded-full bg-coral/70 sm:bottom-2 sm:h-4"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Vender en la calle es trabajo honrado, no delito. Caserito Digno nace en La Paz para
              visibilizar a los vendedores y vendedoras ambulantes, defender su dignidad laboral y
              acercarles información clara sobre salud, derechos y espacios de apoyo.
            </p>
          </Reveal>

          {/* Botones de acción */}
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
              <a href="#realidad" className="btn-dark group">
                Conoce su realidad
                <ArrowDown
                  className="h-4 w-4 transition duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <button
                type="button"
                onClick={onOpenTestimonial}
                className="btn-primary"
              >
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Registrar testimonio
              </button>
            </div>
          </Reveal>

          {/* Barra compacta de contador en tiempo real */}
          <Reveal delay={290}>
            <div className="mx-auto mt-9 flex max-w-xl flex-col items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white/85 p-3.5 shadow-card backdrop-blur sm:flex-row sm:px-6 sm:py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/15 text-coral">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    <LiveDot />
                    En vivo
                  </p>
                  <p className="font-display text-sm font-extrabold text-ink sm:text-base">
                    {readers} personas leyendo ahora
                  </p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-ink/10 sm:block" aria-hidden="true" />

              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Visitas por la dignidad
                </p>
                <p className="font-display text-sm font-extrabold text-ink sm:text-base">
                  {formatNumber(visits)}+
                  <span className="ml-1.5 text-[10px] font-semibold text-muted">
                    y sumando
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-4 text-[11px] font-medium text-muted">
              Diagnóstico comunitario en {DIAGNOSIS_ZONES.join(' · ')}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============================================================
          MARCO MULTIMEDIA INTERACTIVO: "Desplácese para expandir"
          ============================================================ */}
      <div
        ref={trackRef}
        className="relative h-[165vh] w-full"
        style={{ scrollMarginTop: '80px' }}
      >
        <div className="sticky top-[72px] flex h-[68vh] min-h-[460px] max-h-[640px] w-full items-center justify-center overflow-hidden">
          {/* Contenedor que se expande suavemente */}
          <div
            className="relative mx-auto h-full overflow-hidden border border-ink/10 shadow-2xl transition-all duration-75 ease-out"
            style={{
              width: `${currentWidthPercent}%`,
              maxWidth: progress > 0.95 ? '100%' : '1280px',
              borderRadius: `${currentRadius}px`,
            }}
          >
            {/* Escena visual principal: Ilustración de comercio popular paceño */}
            <div className="absolute inset-0 h-full w-full">
              <HeroIllustration className="h-full w-full object-cover" />
            </div>

            {/* Sutil degradado oscuro multicapa para garantizar contraste y legibilidad óptima */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#194350]/95 via-[#194350]/55 to-[#194350]/30"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[#194350]/20"
              aria-hidden="true"
            />

            {/* Insignia superior derecha */}
            <div className="absolute right-5 top-5 z-20 sm:right-7 sm:top-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/75 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-soft backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                La Paz · Bolivia
              </span>
            </div>

            {/* Franja de aguayo andino sutil superior */}
            <div
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-coral via-peach to-sage opacity-85"
              aria-hidden="true"
            />

            {/* ------------------------------------------------------------
                TEXTO 1 (Inicial): "Trabajo honrado, no delito"
                ------------------------------------------------------------ */}
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity: opacity1,
                transform: `translate3d(0, ${translateY1}px, 0)`,
                pointerEvents: progress > 0.4 ? 'none' : 'auto',
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-peach backdrop-blur-md">
                Voz de la Acera
              </span>
              <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                Trabajo honrado, no delito
              </h2>
              <button
                type="button"
                onClick={scrollToExpanded}
                className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold text-peach backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
              >
                <span>Desplázate para expandir su historia</span>
                <span className="text-base transition-transform group-hover:translate-y-1">↓</span>
              </button>
            </div>

            {/* ------------------------------------------------------------
                TEXTO 2 (Expandido): Cita destacada de Doña Carmen
                ------------------------------------------------------------ */}
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity: opacity2,
                transform: `translate3d(0, ${translateY2}px, 0)`,
                pointerEvents: progress < 0.35 ? 'none' : 'auto',
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <div className="mx-auto flex max-w-3xl flex-col items-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/25 text-coral shadow-soft backdrop-blur-md">
                  <Quote className="h-6 w-6" aria-hidden="true" />
                </span>

                <blockquote className="mt-4 font-display text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-4xl md:text-[2.75rem]">
                  «Puesto cerrado es estómago vacío»
                </blockquote>

                <p className="mt-3.5 text-base font-semibold text-peach drop-shadow sm:text-xl">
                  — Doña Carmen, 18 años en la Pérez Velasco
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                    📍 Pérez Velasco
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                    🍬 Venta de golosinas y pasankalla
                  </span>
                  <span className="rounded-full border border-white/20 bg-coral/25 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                    Sin seguro médico
                  </span>
                </div>
              </div>
            </div>

            {/* Indicador de progreso de scroll en el borde inferior */}
            <div
              className="absolute inset-x-0 bottom-0 h-1 bg-white/20"
              aria-hidden="true"
            >
              <div
                className="h-full bg-coral transition-[width] duration-75"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

