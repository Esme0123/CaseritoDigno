import { ArrowDown, HeartHandshake, PenLine, Quote } from 'lucide-react'
import HeroIllustration from './HeroIllustration'
import LiveDot from './ui/LiveDot'
import Reveal from './ui/Reveal'
import { DIAGNOSIS_ZONES } from '../data/content'
import { formatNumber } from '../lib/storage'

/**
 * Hero editorial asimétrico: mensaje central de la campaña, llamadas a la
 * acción y refuerzo del contador en vivo de visitantes.
 */
export default function Hero({ readers, visits, onOpenTestimonial }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ivory">
      {/* Manchas decorativas cálidas */}
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-peach/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sage/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <Reveal>
            <p className="eyebrow flex-wrap text-muted">
              <LiveDot />
              Campaña de concientización ciudadana · La Paz
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Detrás de cada puesto en la acera hay una familia luchando por vivir con{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">dignidad</span>
                <span
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-coral/70 sm:bottom-2 sm:h-4"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Vender en la calle es trabajo honrado, no delito. Caserito Digno nace en La Paz para
              visibilizar a los vendedores y vendedoras ambulantes, defender su dignidad laboral y
              acercarles información clara sobre salud, derechos y espacios de apoyo.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#realidad" className="btn-dark group">
                Conoce su realidad
                <ArrowDown
                  className="h-4 w-4 transition group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <button type="button" onClick={onOpenTestimonial} className="btn-primary">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Registrar testimonio
              </button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white/80 p-4 shadow-card backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral/15">
                  <HeartHandshake className="h-5 w-5 text-coral" aria-hidden="true" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    <LiveDot />
                    En vivo
                  </p>
                  <p className="mt-0.5 font-display text-lg font-extrabold text-ink">
                    {readers} personas leyendo ahora
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-ink/10 sm:h-12 sm:w-px" aria-hidden="true" />

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Visitas por la dignidad
                </p>
                <p className="mt-0.5 font-display text-lg font-extrabold text-ink">
                  {formatNumber(visits)}+
                  <span className="ml-2 align-middle text-[11px] font-semibold normal-case tracking-normal text-muted">
                    y sumando
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-5 text-xs font-medium text-muted">
              Diagnóstico comunitario en {DIAGNOSIS_ZONES.join(' · ')}
            </p>
          </Reveal>
        </div>

        <Reveal delay={180} className="relative">
          <div className="relative mx-auto max-w-xl">
            <div
              className="absolute -inset-3 rounded-[3rem] bg-peach/60"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-lift">
              <HeroIllustration className="h-[430px] w-full sm:h-[520px] lg:h-[580px]" />
            </div>

            <span className="absolute -top-3 right-5 rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-soft">
              La Paz · Bolivia
            </span>

            <figure className="absolute -bottom-6 left-3 right-3 rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-lift backdrop-blur sm:-left-6 sm:right-10 sm:p-5">
              <Quote className="h-5 w-5 text-coral" aria-hidden="true" />
              <blockquote className="mt-2 font-display text-base font-bold leading-snug text-ink sm:text-lg">
                «Puesto cerrado es estómago vacío».
              </blockquote>
              <figcaption className="mt-2 text-xs font-medium text-muted">
                Doña Carmen, 18 años en la Pérez Velasco
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
