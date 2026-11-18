import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal accesible: cierra con Escape o clic en el fondo, atrapa el foco,
 * bloquea el scroll del documento y devuelve el foco al cerrarse.
 */
export default function Modal({ open, onClose, title, description, children }) {
  const panelRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const preferred = panel.querySelector('input:not([disabled]), select, textarea')
      const target = preferred ?? panel.querySelector(FOCUSABLE)
      target?.focus()
    }, 80)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      )
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
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Cerrar formulario"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm animate-fade-in"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-modal-title"
        aria-describedby={description ? 'testimonial-modal-description' : undefined}
        className="relative z-10 max-h-[94dvh] w-full overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl animate-slide-up sm:max-w-2xl sm:rounded-4xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/10 bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <p className="eyebrow text-muted">
              <span className="h-px w-6 bg-coral" aria-hidden="true" />
              Tu voz importa
            </p>
            <h2
              id="testimonial-modal-title"
              className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-[1.7rem]"
            >
              {title}
            </h2>
            {description && (
              <p id="testimonial-modal-description" className="mt-1 text-sm text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-ivory text-muted transition hover:bg-ink hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
