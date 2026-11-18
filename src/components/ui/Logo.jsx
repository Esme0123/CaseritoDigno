import { Scale } from 'lucide-react'

/**
 * Marca de Caserito Digno: una balanza (derecho y equilibrio) sobre un
 * contenedor tejido que evoca el aguayo paceño.
 */
export default function Logo({ variant = 'dark', onClick }) {
  const isLight = variant === 'light'

  return (
    <a href="#inicio" onClick={onClick} className="group inline-flex shrink-0 items-center gap-3">
      <span
        className={`relative grid h-11 w-11 place-items-center rounded-2xl shadow-card transition duration-300 group-hover:-rotate-3 ${
          isLight ? 'bg-peach' : 'bg-ink'
        }`}
      >
        <Scale
          className={`h-6 w-6 ${isLight ? 'text-ink' : 'text-peach'}`}
          strokeWidth={2.2}
          aria-hidden="true"
        />
        <span
          className={`absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-coral ring-2 ${
            isLight ? 'ring-ink' : 'ring-ivory'
          }`}
        />
      </span>

      <span className="leading-none">
        <span
          className={`block whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          Caserito Digno<span className="text-coral">.</span>
        </span>
        <span
          className={`mt-1 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.24em] ${
            isLight ? 'text-sage' : 'text-muted'
          }`}
        >
          La Paz · Bolivia
        </span>
      </span>
    </a>
  )
}
