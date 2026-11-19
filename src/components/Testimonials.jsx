import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, PenLine, Quote, Sparkles } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import TiltedCard from './ui/TiltedCard'
import Reveal from './ui/Reveal'
import { formatNumber } from '../lib/storage'

/**
 * Franja geométrica inferior inspirada en la identidad visual editorial de Malala Fund,
 * reinterpretada con los tonos andinos de Caserito Digno (#194350, #FF8382, #FFC2B4, #9DBEB8).
 */
function MalalaGeometricStrip({ className = '' }) {
  return (
    <div className={`mt-7 w-full overflow-hidden rounded-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 10"
        className="h-2.5 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="malala-andean-strip" width="60" height="10" patternUnits="userSpaceOnUse">
            {/* Cuñas angulares geométricas alternadas */}
            <polygon points="0,0 18,0 10,10 0,10" fill="#FF8382" />
            <polygon points="18,0 34,0 26,10 10,10" fill="#194350" />
            <polygon points="34,0 48,0 40,10 26,10" fill="#FFC2B4" />
            <polygon points="48,0 60,0 52,10 40,10" fill="#9DBEB8" />
          </pattern>
        </defs>
        <rect width="600" height="10" fill="url(#malala-andean-strip)" />
      </svg>
    </div>
  )
}

/**
 * Etiquetas de contexto real según cada testimonio.
 */
function getContextTags(testimonial) {
  if (testimonial.id === 'carmen') {
    return [
      'Sin seguro médico',
      '3 hijos sacados adelante',
      '18 años de trabajo honrado',
      'Pérez Velasco',
    ]
  }
  if (testimonial.id === 'luis') {
    return [
      'Estudios pausados por falta de empleo',
      '3 años de esfuerzo',
      'Ahorro para gastronomía',
      'Av. Buenos Aires',
    ]
  }
  if (testimonial.id === 'marisol') {
    return [
      'Ciudadana aliada',
      'Comercio justo sin regateo',
      'Memoria de abuela puestera',
      'Sopocachi',
    ]
  }

  // Nuevos testimonios de la comunidad ciudadana
  const tags = []
  if (testimonial.isNew) {
    tags.push('Nueva voz compartida')
  }
  if (testimonial.role) tags.push(testimonial.role)
  if (testimonial.zone) tags.push(`📍 ${testimonial.zone}`)
  if (testimonial.experience) tags.push(testimonial.experience)
  tags.push('Comercio digno')
  return tags
}

/**
 * Paletas de acento de fondo para el bloque intercalado.
 */
function getBlockBackground(index) {
  const mod = index % 3
  if (mod === 0) return 'bg-[#FFC2B4]/25 border-[#FF8382]/20'
  if (mod === 1) return 'bg-[#9DBEB8]/25 border-[#194350]/15'
  return 'bg-[#FAF9F6] border-ink/10'
}

/**
 * Componente de bloque editorial individual con layout intercalado.
 */
function EditorialTestimonialBlock({ testimonial, index, isExpanded, onToggleExpand }) {
  // Intercalación: pares (0, 2, 4...) -> Tarjeta a la izquierda, Relato a la derecha
  // Impares (1, 3, 5...) -> Relato a la izquierda, Tarjeta a la derecha
  const isCardLeft = index % 2 === 0
  const contextTags = getContextTags(testimonial)
  const bgStyle = getBlockBackground(index)

  const displayName = testimonial.anonymous || !testimonial.name
    ? 'Persona anónima'
    : testimonial.name

  const quoteText = testimonial.quote || testimonial.story || ''
  const fullStory = testimonial.story || testimonial.quote || ''
  const isLongStory = fullStory.length > 210

  return (
    <article
      className={`relative overflow-hidden rounded-[2.5rem] border p-6 sm:p-9 lg:p-12 shadow-card transition-all duration-300 hover:shadow-lift ${bgStyle}`}
    >
      {/* Insignia destacada para nuevos testimonios */}
      {testimonial.isNew && (
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-ink shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Nueva voz compartida
          </span>
          <span className="text-xs font-medium text-muted">
            Guardado en tu navegador
          </span>
        </div>
      )}

      <div
        className={`grid items-center gap-8 lg:gap-14 ${
          isCardLeft
            ? 'lg:grid-cols-[0.88fr_1.12fr]'
            : 'lg:grid-cols-[1.12fr_0.88fr]'
        }`}
      >
        {/* ============================================================
            LADO A: Tarjeta Inclinada 3D
            ============================================================ */}
        <div className={isCardLeft ? 'lg:order-1' : 'lg:order-2'}>
          <TiltedCard
            testimonial={testimonial}
            isExpanded={isExpanded}
            onToggleExpand={onToggleExpand}
          />
        </div>

        {/* ============================================================
            LADO B: Relato y Narrativa Editorial Grande
            ============================================================ */}
        <div className={`flex flex-col justify-center ${isCardLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Comillas editoriales grandes en #FF8382 */}
          <div className="flex items-center gap-2">
            <span className="font-display text-5xl font-black leading-none text-coral sm:text-6xl" aria-hidden="true">
              “
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              {testimonial.zone || 'La Paz'} · {testimonial.role || 'Testimonio real'}
            </span>
          </div>

          {/* Frase principal en tipografía grande y audaz (text-2xl md:text-3xl font-bold text-[#194350]) */}
          <blockquote className="mt-2 font-display text-2xl font-bold leading-snug text-[#194350] sm:text-3xl lg:text-[2rem]">
            {quoteText}
          </blockquote>

          {/* Etiquetas de contexto real */}
          <div className="mt-5 flex flex-wrap gap-2">
            {contextTags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="inline-flex items-center rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Relato completo legible */}
          {fullStory && fullStory !== quoteText && (
            <div className="mt-5">
              <p
                className={`text-base leading-relaxed text-muted transition-all duration-300 ${
                  isExpanded ? '' : 'line-clamp-3 sm:line-clamp-4'
                }`}
              >
                {fullStory}
              </p>

              {isLongStory && (
                <button
                  type="button"
                  onClick={onToggleExpand}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-colors hover:text-coral"
                >
                  {isExpanded ? (
                    <>
                      <span>Mostrar menos</span>
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span>Leer historia completa</span>
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Pie del relato con autor y oficio */}
          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
            <div>
              <p className="font-display text-base font-extrabold text-ink">
                {displayName}
              </p>
              <p className="text-xs font-medium text-muted">
                {testimonial.roleDetail || testimonial.role}
                {testimonial.experience ? ` · ${testimonial.experience}` : ''}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-coral">
              <Quote className="h-4 w-4" aria-hidden="true" />
              <span>Caserito Digno</span>
            </div>
          </div>

          {/* Franja geométrica inferior inspirada en Malala Fund */}
          <MalalaGeometricStrip />
        </div>
      </div>
    </article>
  )
}

/**
 * Sección Testimonios con Rediseño Total Editorial Intercalado y Tarjeta Inclinada 3D.
 */
export default function Testimonials({ testimonials, onOpenTestimonial }) {
  // Mapa de historias expandidas por ID
  const [expandedMap, setExpandedMap] = useState({})

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section id="testimonios" className="section-pad bg-ivory">
      <div className="container-page">
        {/* Encabezado de la sección */}
        <SectionHeading
          eyebrow="Voces de la calle"
          title="Historias que la ciudad necesita escuchar"
          description="No son casos aislados: son vidas que sostienen el comercio popular paceño. Lee sus testimonios con respeto y, si tienes una historia, súmala con tu voz."
        >
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button
              type="button"
              onClick={onOpenTestimonial}
              className="btn-primary"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Registrar un testimonio
            </button>
            <p className="text-xs font-medium text-muted">
              {formatNumber(testimonials.length)} voces compartidas
            </p>
          </div>
        </SectionHeading>

        {/* ============================================================
            LAYOUT INTERCALADO (ZIG-ZAG EDITORIAL DE ALTO IMPACTO)
            ============================================================ */}
        <div className="mt-12 space-y-10 sm:space-y-14">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id || index} delay={index * 60}>
              <EditorialTestimonialBlock
                testimonial={testimonial}
                index={index}
                isExpanded={Boolean(expandedMap[testimonial.id])}
                onToggleExpand={() => toggleExpand(testimonial.id)}
              />
            </Reveal>
          ))}
        </div>

        {/* Llamado a la acción para compartir testimonios */}
        <div className="mt-14 flex flex-col gap-5 rounded-[2.5rem] border border-dashed border-ink/25 bg-white/80 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9 shadow-card">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/20 text-coral">
              <PenLine className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold leading-snug text-ink sm:text-2xl">
                Tu historia también importa
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Si eres vendedor o vendedora, familiar o vecino aliado, tu relato ayuda a que más
                personas entiendan lo que pasa en la acera. Puedes publicarlo de forma anónima y
                aparecerá de inmediato al inicio de esta sección.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenTestimonial}
            className="btn-dark shrink-0"
          >
            Contar mi historia
          </button>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Los testimonios se guardan en este navegador como demostración del prototipo. Cada persona
          decide si firma con su nombre o permanece en el anonimato.
        </p>
      </div>
    </section>
  )
}
