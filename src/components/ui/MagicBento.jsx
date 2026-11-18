import { useCallback, useRef, useState } from 'react'
import { usePointerPosition } from '../../hooks/usePointerPosition'

/** Cuadrícula base para layouts tipo Bento (asimétricos con spans de Tailwind). */
export function MagicBentoGrid({ children, className = '' }) {
  return <div className={`grid gap-4 sm:gap-5 ${className}`}>{children}</div>
}

/**
 * Tarjeta Magic Bento: borde luminoso que sigue al cursor, brillo de superficie
 * y onda expansiva al presionar. Funciona con puntero y con toque.
 */
export function MagicBentoCard({ children, className = '', as: Tag = 'article', ...rest }) {
  const { ref, handlePointerMove } = usePointerPosition()
  const [ripples, setRipples] = useState([])
  const rippleCounter = useRef(0)

  const handlePointerDown = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return

      const rect = node.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      node.style.setProperty('--mouse-x', `${x}px`)
      node.style.setProperty('--mouse-y', `${y}px`)

      const id = rippleCounter.current + 1
      rippleCounter.current = id

      setRipples((current) => [...current.slice(-3), { id, x, y }])
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id))
      }, 900)
    },
    [ref],
  )

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className={`magic-card relative overflow-hidden rounded-3xl border ${className}`}
      {...rest}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="bento-ripple"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          aria-hidden="true"
        />
      ))}
      <div className="relative z-[1] h-full">{children}</div>
    </Tag>
  )
}
