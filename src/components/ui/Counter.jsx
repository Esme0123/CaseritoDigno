import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

/**
 * Cifra animada que cuenta desde 0 al entrar en pantalla.
 * `to` admite decimales (por ejemplo 86.2).
 */
export default function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
}) {
  const { ref, inView } = useInView({ threshold: 0.4, once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return undefined

    let frameId
    const start = performance.now()

    const animate = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setValue(to * eased)
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [inView, to, duration])

  const formatted = value.toLocaleString('es-BO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
