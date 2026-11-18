import { useCallback, useRef } from 'react'

/**
 * Rastrea la posición del puntero dentro de un elemento y la expone como
 * variables CSS (por defecto `--mouse-x` / `--mouse-y`). En pantallas táctiles
 * no se actualiza: las tarjetas muestran su estado a todo color por CSS.
 */
export function usePointerPosition(xVar = '--mouse-x', yVar = '--mouse-y') {
  const ref = useRef(null)

  const handlePointerMove = useCallback(
    (event) => {
      if (event.pointerType === 'touch') return

      const node = ref.current
      if (!node) return

      const rect = node.getBoundingClientRect()
      node.style.setProperty(xVar, `${event.clientX - rect.left}px`)
      node.style.setProperty(yVar, `${event.clientY - rect.top}px`)
    },
    [xVar, yVar],
  )

  return { ref, handlePointerMove }
}
