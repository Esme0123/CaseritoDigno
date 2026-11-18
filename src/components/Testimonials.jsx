import { useState } from 'react'
import { BadgeCheck, MapPin, PenLine, Quote, UserRound } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { formatNumber } from '../lib/storage'

/** Iniciales para el avatar cuando la persona decide identificarse. */
function initials(name) {
  return name
    .split(' ')
    .filter((part) => part.length > 1)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
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

  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7 ${
        testimonial.featured
          ? 'border-ink/10 bg-peach'
          : 'border-ink/10 bg-white hover:border-ink/20'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold ${
              testimonial.featured ? 'bg-ink text-peach' : 'bg-sage/30 text-ink'
            }`}
            aria-hidden="true"
          >
            {anonymous ? <UserRound className="h-5 w-5" /> : initials(displayName)}
          </span>
          <div>
            <p className="font-display text-sm font-extrabold text-ink">{displayName}</p>
            <p
              className={`mt-0.5 flex items-center gap-1.5 text-[11px] font-medium ${
                testimonial.featured ? 'text-ink' : 'text-muted'
              }`}
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {testimonial.zone ?? 'La Paz'}
            </p>
          </div>
        </div>

        {testimonial.isNew ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Nuevo testimonio
          </span>
        ) : (
          <Quote className="h-6 w-6 shrink-0 text-ink/20" aria-hidden="true" />
        )}
      </div>

      <p
        className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] ${
          testimonial.featured ? 'text-ink' : 'text-muted'
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
              testimonial.featured ? 'text-ink' : 'text-muted'
            } ${!expanded && isLongStory ? 'line-clamp-4' : ''}`}
          >
            {story}
          </p>
          {isLongStory && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-ink underline decoration-coral decoration-2 underline-offset-4 transition hover:text-coral"
            >
              {expanded ? 'Mostrar menos' : 'Leer su historia'}
            </button>
          )}
        </div>
      )}

      {testimonial.roleDetail && (
        <p
          className={`mt-auto pt-5 text-xs font-medium ${
            testimonial.featured ? 'text-ink' : 'text-muted'
          }`}
        >
          {testimonial.roleDetail}
        </p>
      )}
    </article>
  )
}

export default function Testimonials({ testimonials, onOpenTestimonial }) {
  return (
    <section id="testimonios" className="section-pad bg-ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Voces de la calle"
          title="Historias que la ciudad necesita escuchar"
          description="No son casos aislados: son vidas que sostienen el comercio popular paceño. Lee sus testimonios con respeto y, si tienes una historia, súmala con tu voz."
        >
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button type="button" onClick={onOpenTestimonial} className="btn-primary">
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Registrar un testimonio
            </button>
            <p className="text-xs font-medium text-muted">
              {formatNumber(testimonials.length)} voces compartidas
            </p>
          </div>
        </SectionHeading>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={Math.min(index, 5) * 60}
              className={testimonial.featured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}

          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-dashed border-ink/25 bg-ivory p-6 sm:p-7">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-coral/20 text-coral">
                  <PenLine className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold leading-snug text-ink">
                  Tu historia también importa
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Si eres vendedor o vendedora, familiar o vecino aliado, tu relato ayuda a que más
                  personas entiendan lo que pasa en la acera. Puedes publicarlo de forma anónima.
                </p>
              </div>
              <button type="button" onClick={onOpenTestimonial} className="btn-dark mt-6 w-full">
                Contar mi historia
              </button>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Los testimonios se guardan en este navegador como demostración del prototipo. Cada persona
          decide si firma con su nombre o permanece en el anonimato.
        </p>
      </div>
    </section>
  )
}
