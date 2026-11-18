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
import { ChromaCard, ChromaGrid } from './ui/ChromaGrid'
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

const CATEGORY_STYLES = {
  salud: {
    accent: '#9DBEB8',
    badge: 'bg-sage/40 text-ink',
  },
  derechos: {
    accent: '#FF8382',
    badge: 'bg-coral/25 text-ink',
  },
  comunitario: {
    accent: '#FFC2B4',
    badge: 'bg-peach/60 text-ink',
  },
}

/** Mapa ilustrativo de la zona, dibujado como SVG para no depender de imágenes. */
function MapArt({ accent }) {
  return (
    <svg
      viewBox="0 0 320 160"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="320" height="160" fill="#FAF9F6" />
      <g fill={accent} opacity="0.14">
        <rect x="18" y="16" width="52" height="24" rx="5" />
        <rect x="94" y="14" width="42" height="26" rx="5" />
        <rect x="248" y="18" width="54" height="22" rx="5" />
        <rect x="18" y="94" width="44" height="42" rx="5" />
        <rect x="96" y="96" width="38" height="40" rx="5" />
        <rect x="250" y="98" width="52" height="38" rx="5" />
      </g>
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round">
        <path d="M-20 52 H340" />
        <path d="M-20 120 H340" />
        <path d="M78 -10 V170" />
        <path d="M226 -10 V170" />
      </g>
      <g stroke="#194350" strokeOpacity="0.14" strokeWidth="2.5">
        <path d="M-10 84 H330" />
        <path d="M150 -10 V170" />
        <path d="M284 -10 V170" />
      </g>
      <circle cx="226" cy="84" r="30" fill={accent} opacity="0.2" />
      <circle cx="226" cy="84" r="9" fill={accent} />
      <path d="M226 84 V64 a20 20 0 0 1 20 20 Z" fill={accent} opacity="0.85" />
    </svg>
  )
}

function PlaceCard({ place }) {
  const Icon = ICONS[place.icon] ?? MapPin
  const style = CATEGORY_STYLES[place.category] ?? CATEGORY_STYLES.comunitario
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapsQuery ?? place.name,
  )}`

  return (
    <ChromaCard accent={style.accent}>
      <div className="relative h-36 overflow-hidden" aria-hidden="true">
        <div className="chroma-base absolute inset-0">
          <MapArt accent={style.accent} />
        </div>
        <div className="chroma-color absolute inset-0">
          <MapArt accent={style.accent} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur ${style.badge}`}
        >
          {place.categoryLabel}
        </span>

        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3 text-white">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-semibold">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{place.zone ?? place.address}</span>
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <span className="sr-only">{place.categoryLabel}</span>
        <h3 className="font-display text-lg font-extrabold leading-snug text-ink">{place.name}</h3>

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
          className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:text-coral"
        >
          <Navigation className="h-4 w-4 text-coral" aria-hidden="true" />
          Ver ubicación / Cómo llegar
        </a>
      </div>
    </ChromaCard>
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
          description="Instituciones, centros de salud y espacios comunitarios donde puedes recibir orientación gratuita, atención médica o un lugar seguro para tus hijos mientras trabajas. Pasa el cursor (o toca en el móvil) para revelar el color de cada punto de apoyo."
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

        <ChromaGrid
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          key={category}
        >
          {filtered.map((place, index) => (
            <Reveal key={place.id} delay={Math.min(index, 5) * 60}>
              <PlaceCard place={place} />
            </Reveal>
          ))}
        </ChromaGrid>

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
