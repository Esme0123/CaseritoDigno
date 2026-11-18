import { usePointerPosition } from '../../hooks/usePointerPosition'

/** Cuadrícula base para el directorio con revelado cromático. */
export function ChromaGrid({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

/**
 * Tarjeta Chroma: parte en monocromo y revela el color vibrante en un foco que
 * sigue al cursor. En táctil se muestra a todo color y sin depender del hover.
 */
export function ChromaCard({ children, className = '', accent = '#9DBEB8', ...rest }) {
  const { ref, handlePointerMove } = usePointerPosition('--chroma-x', '--chroma-y')

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ '--chroma-accent': accent }}
      className={`chroma-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift ${className}`}
      {...rest}
    >
      <span className="chroma-spotlight" aria-hidden="true" />
      {children}
    </article>
  )
}
