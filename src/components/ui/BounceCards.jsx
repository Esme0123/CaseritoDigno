import { useInView } from '../../hooks/useInView'
import GalleryPhoto from './GalleryPhoto'

const ROTATIONS = [-10, -5, 0, 6, 11]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Abanico de tarjetas con entrada rebotada y separación al activar una foto.
 * En escritorio se activa con hover/foco; en móvil, el primer toque abre el
 * abanico y el segundo abre el lightbox.
 */
export default function BounceCards({ photos, activeIndex, onActiveChange, onOpen }) {
  const { ref, inView } = useInView({ threshold: 0.2, once: true })
  const hasActive = activeIndex !== null

  return (
    <div
      ref={ref}
      className={`bounce-stage ${inView ? 'is-in' : ''} ${hasActive ? 'has-active' : ''}`}
    >
      <div
        className="bounce-fan"
        onMouseLeave={() => onActiveChange(null)}
      >
        {photos.map((photo, index) => {
          const isActive = activeIndex === index
          const shift =
            activeIndex === null || isActive
              ? 0
              : clamp((index - activeIndex) * 56, -134, 134)

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                if (isActive) onOpen(index)
                else onActiveChange(index)
              }}
              onMouseEnter={() => onActiveChange(index)}
              onFocus={(event) => {
                if (event.currentTarget.matches(':focus-visible')) onActiveChange(index)
              }}
              aria-label={`Abrir foto: ${photo.headline}. ${photo.zone}`}
              className={`bounce-card relative cursor-pointer overflow-hidden rounded-2xl border-[6px] border-white bg-white text-left shadow-[0_28px_60px_-28px_rgba(25,67,80,0.65)] ${
                isActive ? 'is-active shadow-[0_38px_80px_-30px_rgba(25,67,80,0.75)]' : ''
              }`}
              style={{
                '--rot': `${ROTATIONS[index % ROTATIONS.length]}deg`,
                '--shift': `${shift}px`,
                '--delay': `${index * 90}ms`,
                zIndex: isActive ? 30 : 10 + index,
              }}
            >
              <GalleryPhoto photo={photo} className="rounded-xl" />

              <span
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-ink/60 via-ink/0 to-transparent"
                aria-hidden="true"
              />

              <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-ink shadow-sm">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="bounce-caption pointer-events-none absolute inset-x-2 bottom-2 rounded-xl bg-ink/[0.88] px-3 py-2.5 text-white shadow-lg backdrop-blur">
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-sage">
                  {photo.zone}
                </span>
                <span className="mt-1 block font-display text-sm font-extrabold leading-tight">
                  {photo.headline}
                </span>
                <span className="mt-1 block text-[10px] leading-snug text-white/75">
                  {photo.summary}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
