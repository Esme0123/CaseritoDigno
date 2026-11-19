import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Camera, MapPin, ShieldCheck, X } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import BounceCards from './ui/BounceCards'
import GalleryPhoto from './ui/GalleryPhoto'
import { GALLERY_PHOTOS } from '../data/content'

function Lightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index]
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }

      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = Array.from(
        panelRef.current.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => node.offsetParent !== null)

      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [onClose, onNavigate])

  if (!photo) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Cerrar galería"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm animate-fade-in"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-lightbox-title"
        className="relative z-10 max-h-[94dvh] w-full overflow-y-auto rounded-t-[2rem] bg-ivory shadow-2xl animate-slide-up sm:max-w-5xl sm:rounded-4xl"
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[300px] bg-ink sm:min-h-[420px] lg:min-h-[560px]">
            <GalleryPhoto photo={photo} className="absolute inset-0" imageClassName="object-cover" />

            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
              <Camera className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              Escena {String(index + 1).padStart(2, '0')} de {String(photos.length).padStart(2, '0')}
            </span>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                aria-label="Foto anterior"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-coral"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                aria-label="Foto siguiente"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-coral"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-muted">
                  <span className="h-px w-6 bg-coral" aria-hidden="true" />
                  Miradas de la calle
                </p>
                <h3
                  id="gallery-lightbox-title"
                  className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl"
                >
                  {photo.headline}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-muted transition hover:bg-ink hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <MapPin className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
              {photo.zone}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted">{photo.story}</p>

            <div className="mt-6 flex gap-3 rounded-2xl border border-sage/40 bg-sage/20 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-ink">
                Los rostros no se muestran por privacidad. Estas escenas documentan el trabajo, los
                objetos y los espacios de la venta callejera en La Paz.
              </p>
            </div>

            <p className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              #CaseritoDigno · La Paz, Bolivia
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex((current) => {
      if (current === null) return current
      return (current + direction + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    })
  }, [])

  return (
    <section id="galeria" className="relative overflow-hidden section-pad bg-white">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-peach/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-sage/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Miradas de la calle"
          title="La ciudad también se cuenta desde la acera"
          description="Un recorrido visual por los puestos, las manos y los objetos que sostienen el comercio popular paceño. Cinco escenas documentales, contadas sin rostros y con el respeto que merece cada historia."
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-ivory px-4 py-2 text-xs font-semibold text-ink shadow-card">
            <Camera className="h-4 w-4 text-coral" aria-hidden="true" />
            5 escenas · sin rostros
          </span>
        </SectionHeading>

        <BounceCards
          photos={GALLERY_PHOTOS}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
          onOpen={setLightboxIndex}
        />

        <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-2 text-center">
          <p className="text-xs leading-relaxed text-muted">
            Pasa el cursor sobre una postal del abanico para separar las fotos, o toca dos veces en
            móvil. Haz clic para abrir el relato completo.
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-sage/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/70">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Privacidad y respeto en cada imagen
          </span>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={GALLERY_PHOTOS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  )
}
