import { PenLine } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import VoicesCarousel from './ui/VoicesCarousel'
import { formatNumber } from '../lib/storage'

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

        <VoicesCarousel testimonials={testimonials} />

        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-dashed border-ink/25 bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/20 text-coral">
              <PenLine className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold leading-snug text-ink">
                Tu historia también importa
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Si eres vendedor o vendedora, familiar o vecino aliado, tu relato ayuda a que más
                personas entiendan lo que pasa en la acera. Puedes publicarlo de forma anónima y
                aparecerá al inicio del carrusel.
              </p>
            </div>
          </div>
          <button type="button" onClick={onOpenTestimonial} className="btn-dark shrink-0">
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
