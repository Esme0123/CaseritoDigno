import { useEffect, useState } from 'react'

/**
 * Simula la presencia de personas leyendo la campaña en tiempo real.
 * Mantiene una cifra creíble que oscila suavemente cada pocos segundos.
 * Cuando exista un backend, este hook se reemplaza por una suscripción real.
 */
export function useLiveReaders() {
  const [readers, setReaders] = useState(() => 19 + Math.floor(Math.random() * 14))

  useEffect(() => {
    let timeoutId

    const tick = () => {
      setReaders((current) => {
        const drift = Math.floor(Math.random() * 5) - 2
        let next = current + drift

        // Ocasionalmente hay un pequeño pico de audiencia (difusión en redes).
        if (Math.random() < 0.14) {
          next += (Math.random() < 0.5 ? -1 : 1) * (2 + Math.floor(Math.random() * 5))
        }

        return Math.min(52, Math.max(11, next))
      })

      timeoutId = window.setTimeout(tick, 2800 + Math.random() * 3200)
    }

    timeoutId = window.setTimeout(tick, 2200)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return readers
}
