import { useInView } from '../../hooks/useInView'

/**
 * Envuelve contenido para que aparezca con un desplazamiento suave al entrar
 * en pantalla. Respeta las preferencias de movimiento reducido vía CSS.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, inView } = useInView({ threshold: 0.15, once: true })

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
