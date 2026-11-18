import { useMemo, useState } from 'react'
import {
  Baby,
  BookOpen,
  Check,
  Clock,
  HeartHandshake,
  HeartPulse,
  Landmark,
  MapPin,
  Navigation,
  Scale,
  Stethoscope,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { DIRECTORY_CATEGORIES, PLACES } from '../data/content'

const ICONS = {
  heart: HeartHandshake,
  landmark: Landmark,
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  baby: Baby,
  book: BookOpen,
  scale: Scale,
}

function PlaceCard({ place }) {
  const Icon = ICONS[place.icon] ?? MapPin
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapsQuery ?? place.name,
  )}`

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-sage hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage/30 text-ink">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-ivory px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
          {place.categoryLabel}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-ink">
        {place.name}
      </h3>

      <div className="mt-3 space-y-2 text-[13px] text-muted">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          {place.address}
        </p>
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          {place.hours}
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {place.services.map((service) => (
          <li key={service} className="flex items-start gap-2 text-[13px] leading-snug text-muted">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>

      {place.note && <p className="mt-4 text-xs leading-relaxed text-muted">{place.note}</p>}

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition group-hover:text-muted"
      >
        <Navigation className="h-4 w-4 text-coral" aria-hidden="true" />
        Ver ubicación / Cómo llegar
      </a>
    </article>
  )
}

export default function Directory() {
  const [category, setCategory] = useState('todos')

  const filtered = useMemo(
    () => (category === 'todos' ? PLACES : PLACES.filter((place) => place.category === category)),
    [category],
  )

  return (
    <section id="acogida" className="section-pad bg-ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Lugares de acogida y puntos de apoyo"
          title="Una red de apoyo cerca de tu puesto"
          description="Instituciones, centros de salud y espacios comunitarios donde puedes recibir orientación gratuita, atención médica o un lugar seguro para tus hijos mientras trabajas."
        />

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar lugares por categoría">
          {DIRECTORY_CATEGORIES.map((item) => {
            const isActive = category === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                  isActive
                    ? 'border-ink bg-ink text-white shadow-card'
                    : 'border-ink/15 bg-white text-muted hover:border-ink/30 hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={category}>
          {filtered.map((place, index) => (
            <Reveal key={place.id} delay={Math.min(index, 5) * 60}>
              <PlaceCard place={place} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-sage bg-sage/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            ¿Conoces otro espacio solidario en tu zona? La red crece cuando los vecinos comparten lo
            que saben. Escríbenos en la sección de testimonios y lo sumamos al directorio.
          </p>
          <a href="#difundir" className="btn-dark shrink-0">
            Sumarme a la campaña
          </a>
        </div>
      </div>
    </section>
  )
}
