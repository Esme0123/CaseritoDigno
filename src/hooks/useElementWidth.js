import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Mide el ancho disponible de un elemento con ResizeObserver. Se usa para
 * calcular la geometría del carrusel de testimonios sin librerías externas.
 */
export function useElementWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useIsomorphicLayoutEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const update = () => setWidth(node.clientWidth)
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, width]
}
