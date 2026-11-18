import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext } from '../../hooks/useToast'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

/**
 * Notificaciones ligeras con aria-live. Se usan para confirmar testimonios,
 * copias de mensajes y compromisos ciudadanos.
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const dismiss = useCallback(() => setToast(null), [])

  const notify = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setToast(null), 4600)
  }, [])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const value = useMemo(() => ({ notify }), [notify])
  const Icon = toast ? (ICONS[toast.type] ?? Info) : Info

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4"
      >
        {toast && (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl bg-ink px-4 py-3.5 text-white shadow-2xl ring-1 ring-white/15 animate-slide-up"
          >
            <span
              className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                toast.type === 'error' ? 'bg-coral text-ink' : 'bg-sage text-ink'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="flex-1 pt-1 text-sm leading-snug text-white/90">{toast.message}</p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar notificación"
              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
