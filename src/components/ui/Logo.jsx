/**
 * Nuevo Isotipo y Logotipo oficial de Caserito Digno.
 *
 * Simboliza la dignidad del comercio popular paceño a través de la unión de:
 * 1. El perfil geométrico del Illimani (los tres picos nevados).
 * 2. El aguayo andino (tramas textiles escalonadas en la base).
 * 3. El sol y corazón solidario en la cumbre (calidez, empatía y trabajo honrado).
 *
 * Paleta estricta: #194350 (ink), #FF8382 (coral), #FFC2B4 (peach), #9DBEB8 (sage), #FAF9F6 (ivory).
 */
export default function Logo({ variant = 'dark', onClick }) {
  const isLight = variant === 'light'

  return (
    <a
      href="#inicio"
      onClick={onClick}
      className="group inline-flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 focus-visible:ring-offset-2 rounded-xl"
      aria-label="Caserito Digno - Inicio"
    >
      {/* Isotipo SVG de 38x38px con esquinas rounded-xl en #194350 */}
      <span
        className={`relative flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#194350] shadow-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-lift ${
          isLight ? 'ring-1 ring-white/20' : 'ring-1 ring-ink/10'
        }`}
      >
        <svg
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[38px] w-[38px]"
          aria-hidden="true"
        >
          {/* Fondo #194350 */}
          <rect width="38" height="38" rx="12" fill="#194350" />

          {/* 1. Sol / Corazón Solidario en la cumbre */}
          {/* Resplandor suave del sol */}
          <circle cx="19" cy="10.5" r="5.5" fill="#FFC2B4" opacity="0.4" />
          {/* Sol central cálido */}
          <circle cx="19" cy="10.5" r="3.6" fill="#FF8382" />
          {/* Núcleo de corazón solidario integrado */}
          <path
            d="M19 13.2 C17.6 11.8 16.2 10.4 17 9 C17.6 8 18.6 8.2 19 8.9 C19.4 8.2 20.4 8 21 9 C21.8 10.4 20.4 11.8 19 13.2 Z"
            fill="#FAF9F6"
            opacity="0.95"
          />

          {/* Rayos geométricos mínimos del sol */}
          <line x1="19" y1="3.5" x2="19" y2="4.8" stroke="#FFC2B4" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12.8" y1="6.2" x2="13.8" y2="7.2" stroke="#FFC2B4" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="25.2" y1="6.2" x2="24.2" y2="7.2" stroke="#FFC2B4" strokeWidth="1.2" strokeLinecap="round" />

          {/* 2. Perfil Geométrico del Illimani (3 picos nevados emblemáticos) */}
          {/* Pico Oeste / Izquierdo */}
          <path d="M5 24 L13 16.5 L19 22.5 L11 24 Z" fill="#9DBEB8" opacity="0.9" />
          <path d="M13 16.5 L15.2 20 L13 21.5 L10.8 19.8 Z" fill="#FAF9F6" opacity="0.9" />

          {/* Pico Central / Cumbre Mayor del Illimani */}
          <path d="M11 24 L19 13.2 L27 24 Z" fill="#9DBEB8" />
          {/* Faceta iluminada en peach y nieve */}
          <path d="M19 13.2 L27 24 L19 24 Z" fill="#FFC2B4" opacity="0.65" />
          {/* Manto de nieve cumbre central */}
          <path
            d="M19 13.2 L22.4 18 L19.8 17.2 L19 19.2 L18.2 17.2 L15.6 18 Z"
            fill="#FAF9F6"
          />

          {/* Pico Este / Derecho */}
          <path d="M21 24 L27 17.5 L33 24 Z" fill="#FFC2B4" opacity="0.85" />
          <path d="M27 17.5 L29.2 20.5 L27.2 20 L27 21.2 L25.2 20 Z" fill="#FAF9F6" opacity="0.9" />

          {/* 3. Base de Aguayo Andino (franjas y geometría textil andina) */}
          {/* Franja superior de aguayo - coral */}
          <rect x="4.5" y="24" width="29" height="2" fill="#FF8382" rx="0.5" />

          {/* Patrón escalonado tiwanaku / aguayo en peach */}
          <path
            d="M5 28 H33 M8 28 L10.5 30 L13 28 M14.5 28 L17 30 L19.5 28 M21 28 L23.5 30 L26 28 M27.5 28 L30 30 L32.5 28"
            stroke="#FFC2B4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Franja inferior de aguayo - sage */}
          <rect x="4.5" y="31.5" width="29" height="2" fill="#9DBEB8" rx="0.5" />

          {/* Puntos de urdimbre y telar */}
          <circle cx="7.5" cy="25" r="0.65" fill="#FAF9F6" />
          <circle cx="13.5" cy="25" r="0.65" fill="#FAF9F6" />
          <circle cx="19" cy="25" r="0.65" fill="#FAF9F6" />
          <circle cx="24.5" cy="25" r="0.65" fill="#FAF9F6" />
          <circle cx="30.5" cy="25" r="0.65" fill="#FAF9F6" />
        </svg>
      </span>

      {/* Tipografía editorial de la marca */}
      <span className="leading-tight">
        <span
          className={`block whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          Caserito Digno<span className="text-coral">.</span>
        </span>
        <span
          className={`mt-0.5 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.24em] ${
            isLight ? 'text-sage' : 'text-muted'
          }`}
        >
          LA PAZ · BOLIVIA
        </span>
      </span>
    </a>
  )
}
