import { useId } from 'react'

/**
 * Escenas visuales documentales originales de Caserito Digno.
 *
 * Cada ilustración recrea el entorno de trabajo real de las historias
 * sin mostrar rostros ni rasgos identificables, respetando estrictamente la
 * privacidad y la dignidad del comercio popular paceño.
 *
 * Paleta:
 * Ink: #194350, Coral: #FF8382, Peach: #FFC2B4, Sage: #9DBEB8, Ivory: #FAF9F6
 */

/**
 * Escena de Doña Carmen: Puesto de pasankalla y golosinas en la Pérez Velasco.
 */
export function CarmenScene({ className = '' }) {
  const uid = useId()

  return (
    <svg
      viewBox="0 0 440 540"
      className={`h-full w-full object-cover ${className}`}
      role="img"
      aria-label="Puesto tradicional de pasankalla y golosinas en la Pérez Velasco"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC2B4" />
          <stop offset="50%" stopColor="#FFE8DF" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
        <linearGradient id={`${uid}-table`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#194350" />
          <stop offset="100%" stopColor="#255866" />
        </linearGradient>
        <pattern id={`${uid}-aguayo-pattern`} width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="4" fill="#FF8382" />
          <rect y="4" width="20" height="3" fill="#FFC2B4" />
          <rect y="7" width="20" height="6" fill="#194350" />
          <rect y="13" width="20" height="4" fill="#9DBEB8" />
          <rect y="17" width="20" height="3" fill="#FAF9F6" />
        </pattern>
      </defs>

      {/* Cielo al atardecer sobre La Paz */}
      <rect width="440" height="540" fill={`url(#${uid}-sky)`} />

      {/* Silueta distante del Illimani */}
      <path
        d="M60 210 L130 148 L170 185 L225 120 L275 180 L320 152 L390 220 L440 210 L440 260 L0 260 L0 220 Z"
        fill="#9DBEB8"
        opacity="0.45"
      />
      {/* Nieve cumbre Illimani */}
      <path d="M225 120 L248 152 L236 148 L225 158 L214 148 L202 152 Z" fill="#FAF9F6" opacity="0.9" />

      {/* Laderas de la ciudad de La Paz en la Pérez Velasco */}
      <g fill="#194350" opacity="0.18">
        <rect x="20" y="190" width="35" height="70" rx="2" />
        <rect x="58" y="175" width="42" height="85" rx="2" />
        <rect x="103" y="195" width="38" height="65" rx="2" />
        <rect x="310" y="180" width="46" height="80" rx="2" />
        <rect x="360" y="190" width="50" height="70" rx="2" />
      </g>

      {/* Farola colonial histórica de la Pérez Velasco */}
      <line x1="68" y1="120" x2="68" y2="340" stroke="#194350" strokeWidth="4" />
      <path d="M56 120 C56 100 80 100 80 120 Z" fill="#194350" />
      <polygon points="60,120 76,120 72,138 64,138" fill="#FFC2B4" opacity="0.85" />
      <circle cx="68" cy="128" r="18" fill="#FFC2B4" opacity="0.3" />

      {/* Adoquines y acera de la Pérez Velasco */}
      <rect x="0" y="320" width="440" height="220" fill="#194350" opacity="0.12" />
      <line x1="0" y1="320" x2="440" y2="320" stroke="#194350" strokeWidth="3" opacity="0.3" />
      {/* Trama de adoquines */}
      <g stroke="#194350" strokeWidth="1" opacity="0.25">
        <line x1="30" y1="320" x2="10" y2="540" />
        <line x1="90" y1="320" x2="70" y2="540" />
        <line x1="160" y1="320" x2="140" y2="540" />
        <line x1="240" y1="320" x2="220" y2="540" />
        <line x1="320" y1="320" x2="300" y2="540" />
        <line x1="400" y1="320" x2="380" y2="540" />
      </g>

      {/* Puesto de venta: Mesa de madera con soporte */}
      <rect x="40" y="350" width="360" height="150" rx="8" fill={`url(#${uid}-table)`} />
      {/* Mantel de aguayo tradicional paceño doblado en la mesa */}
      <rect x="40" y="350" width="360" height="30" rx="4" fill={`url(#${uid}-aguayo-pattern)`} />

      {/* BOLSAS DE PASANKALLA (grandes, infladas, translúcidas con maíz blanco) */}
      {/* Bolsa 1 (Izquierda) */}
      <g>
        <rect x="70" y="220" width="85" height="135" rx="14" fill="#FAF9F6" opacity="0.9" stroke="#FFC2B4" strokeWidth="2" />
        {/* Lazo superior en coral */}
        <polygon points="105,220 115,205 125,220" fill="#FF8382" />
        <ellipse cx="112" cy="220" rx="9" ry="4" fill="#FF8382" />
        {/* Maíz inflado blanco y dorado adentro */}
        <g fill="#FFC2B4" opacity="0.6">
          <circle cx="88" cy="245" r="7" />
          <circle cx="106" cy="242" r="8" />
          <circle cx="125" cy="250" r="7" />
          <circle cx="95" cy="270" r="8" />
          <circle cx="115" cy="268" r="8" />
          <circle cx="132" cy="275" r="7" />
          <circle cx="86" cy="295" r="8" />
          <circle cx="108" cy="298" r="8" />
          <circle cx="128" cy="302" r="8" />
          <circle cx="98" cy="325" r="7" />
          <circle cx="118" cy="328" r="8" />
        </g>
        <g fill="#FAF9F6">
          <circle cx="96" cy="252" r="6" />
          <circle cx="118" cy="255" r="6" />
          <circle cx="102" cy="285" r="6.5" />
          <circle cx="122" cy="288" r="6" />
          <circle cx="108" cy="315" r="6" />
        </g>
        {/* Etiqueta / cinta "Pasankalla" */}
        <rect x="80" y="275" width="65" height="14" rx="3" fill="#FF8382" opacity="0.85" />
        <rect x="85" y="280" width="55" height="4" rx="2" fill="#FAF9F6" />
      </g>

      {/* Bolsa 2 (Centro) */}
      <g>
        <rect x="175" y="200" width="95" height="155" rx="16" fill="#FAF9F6" opacity="0.95" stroke="#9DBEB8" strokeWidth="2" />
        <polygon points="215,200 225,182 235,200" fill="#9DBEB8" />
        <ellipse cx="222" cy="200" rx="10" ry="4" fill="#9DBEB8" />
        {/* Maíz inflado */}
        <g fill="#FFC2B4" opacity="0.55">
          <circle cx="196" cy="230" r="9" />
          <circle cx="220" cy="226" r="9.5" />
          <circle cx="244" cy="232" r="9" />
          <circle cx="205" cy="258" r="9" />
          <circle cx="230" cy="255" r="9.5" />
          <circle cx="252" cy="260" r="8.5" />
          <circle cx="198" cy="288" r="9" />
          <circle cx="224" cy="285" r="9.5" />
          <circle cx="248" cy="290" r="9" />
          <circle cx="210" cy="318" r="9" />
          <circle cx="236" cy="316" r="9" />
        </g>
        <g fill="#FAF9F6">
          <circle cx="212" cy="242" r="7" />
          <circle cx="238" cy="244" r="7" />
          <circle cx="218" cy="272" r="7.5" />
          <circle cx="240" cy="275" r="7" />
          <circle cx="222" cy="302" r="7.5" />
        </g>
        <rect x="188" y="260" width="70" height="16" rx="3" fill="#194350" opacity="0.8" />
        <rect x="195" y="266" width="56" height="4" rx="2" fill="#FAF9F6" />
      </g>

      {/* Canasta de mimbre andina tejida con dulces y mentas */}
      <g>
        <ellipse cx="325" cy="335" rx="48" ry="18" fill="#194350" opacity="0.3" />
        <path d="M285 305 Q325 295 365 305 L355 345 Q325 352 295 345 Z" fill="#FFC2B4" stroke="#194350" strokeWidth="2" />
        {/* Trama tejida canasta */}
        <path d="M295 310 L305 344 M315 308 L325 348 M335 308 L345 346" stroke="#FF8382" strokeWidth="2" strokeLinecap="round" />
        {/* Dulces y pastillas de colores */}
        <circle cx="305" cy="300" r="7" fill="#FF8382" />
        <circle cx="320" cy="296" r="6" fill="#9DBEB8" />
        <circle cx="335" cy="298" r="7" fill="#FAF9F6" stroke="#194350" strokeWidth="1" />
        <circle cx="348" cy="302" r="6" fill="#FF8382" />
        <circle cx="312" cy="306" r="5" fill="#FAF9F6" />
        <circle cx="328" cy="305" r="6" fill="#FFC2B4" />
      </g>

      {/* Cajas organizadoras de golosinas */}
      <g>
        <rect x="70" y="370" width="70" height="45" rx="5" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
        <rect x="76" y="376" width="16" height="12" rx="2" fill="#FF8382" />
        <rect x="96" y="376" width="16" height="12" rx="2" fill="#9DBEB8" />
        <rect x="116" y="376" width="16" height="12" rx="2" fill="#FFC2B4" />
        <rect x="76" y="394" width="16" height="12" rx="2" fill="#9DBEB8" />
        <rect x="96" y="394" width="16" height="12" rx="2" fill="#FF8382" />
        <rect x="116" y="394" width="16" height="12" rx="2" fill="#194350" />

        <rect x="155" y="370" width="75" height="45" rx="5" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
        <rect x="162" y="378" width="60" height="8" rx="2" fill="#FF8382" opacity="0.8" />
        <rect x="162" y="392" width="60" height="8" rx="2" fill="#9DBEB8" opacity="0.8" />

        {/* Frasco de vidrio con monedas y cambio */}
        <rect x="250" y="365" width="40" height="50" rx="6" fill="#9DBEB8" opacity="0.45" stroke="#194350" strokeWidth="1.5" />
        <ellipse cx="270" cy="365" rx="15" ry="4" fill="#9DBEB8" />
        <circle cx="265" cy="390" r="5" fill="#FFC2B4" />
        <circle cx="275" cy="388" r="5" fill="#FF8382" />
        <circle cx="270" cy="400" r="5" fill="#FAF9F6" />
      </g>
    </svg>
  )
}

/**
 * Escena de Luis: Mochila y accesorios en la Av. Buenos Aires.
 */
export function LuisScene({ className = '' }) {
  const uid = useId()

  return (
    <svg
      viewBox="0 0 440 540"
      className={`h-full w-full object-cover ${className}`}
      role="img"
      aria-label="Mochila urbana y accesorios de celular en la Av. Buenos Aires"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9DBEB8" />
          <stop offset="60%" stopColor="#C4DDD8" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
      </defs>

      {/* Cielo y fondo urbano de la Av. Buenos Aires */}
      <rect width="440" height="540" fill={`url(#${uid}-bg)`} />

      {/* Edificios coloridos de ladera y arquitectura paceña */}
      <g opacity="0.4">
        <rect x="25" y="120" width="65" height="180" rx="3" fill="#194350" />
        <rect x="95" y="100" width="75" height="200" rx="3" fill="#FF8382" />
        <rect x="175" y="130" width="70" height="170" rx="3" fill="#FFC2B4" />
        <rect x="250" y="90" width="85" height="210" rx="3" fill="#194350" />
        <rect x="340" y="115" width="80" height="185" rx="3" fill="#9DBEB8" />
      </g>

      {/* Ventanales de los edificios */}
      <g fill="#FAF9F6" opacity="0.6">
        <rect x="108" y="120" width="12" height="16" rx="2" />
        <rect x="135" y="120" width="12" height="16" rx="2" />
        <rect x="108" y="150" width="12" height="16" rx="2" />
        <rect x="135" y="150" width="12" height="16" rx="2" />
        <rect x="265" y="115" width="14" height="18" rx="2" />
        <rect x="295" y="115" width="14" height="18" rx="2" />
        <rect x="265" y="148" width="14" height="18" rx="2" />
        <rect x="295" y="148" width="14" height="18" rx="2" />
      </g>

      {/* Micro paceño icónico ("Dodge" azul y rojo) pasando por la calzada */}
      <g opacity="0.55">
        <rect x="280" y="240" width="140" height="65" rx="10" fill="#194350" />
        <rect x="280" y="255" width="140" height="22" fill="#FF8382" />
        {/* Ventanas micro */}
        <rect x="290" y="245" width="22" height="16" rx="3" fill="#FAF9F6" />
        <rect x="320" y="245" width="25" height="16" rx="3" fill="#FAF9F6" />
        <rect x="355" y="245" width="25" height="16" rx="3" fill="#FAF9F6" />
        <rect x="390" y="245" width="22" height="16" rx="3" fill="#FAF9F6" />
        {/* Ruedas micro */}
        <circle cx="310" cy="305" r="14" fill="#194350" />
        <circle cx="310" cy="305" r="6" fill="#FAF9F6" />
        <circle cx="385" cy="305" r="14" fill="#194350" />
        <circle cx="385" cy="305" r="6" fill="#FAF9F6" />
      </g>

      {/* Calzada y asfalto de la Buenos Aires */}
      <rect x="0" y="295" width="440" height="245" fill="#194350" opacity="0.2" />
      <line x1="0" y1="295" x2="440" y2="295" stroke="#194350" strokeWidth="3" opacity="0.4" />

      {/* MOCHILA URBANA DE VENDEDOR AMBULANTE (Abierta en el centro) */}
      <g>
        {/* Sombra de la mochila */}
        <ellipse cx="220" cy="480" rx="140" ry="24" fill="#194350" opacity="0.35" />

        {/* Cuerpo principal de la mochila resistente */}
        <rect x="110" y="240" width="220" height="230" rx="28" fill="#194350" stroke="#0e2a33" strokeWidth="3" />
        <path d="M125 240 C125 200 315 200 315 240" fill="#194350" stroke="#0e2a33" strokeWidth="3" />
        {/* Asa superior de la mochila */}
        <path d="M185 205 C185 185 255 185 255 205" fill="none" stroke="#FF8382" strokeWidth="6" strokeLinecap="round" />

        {/* Bolsillo frontal abierto con organizadores */}
        <rect x="125" y="280" width="190" height="175" rx="16" fill="#205363" stroke="#FAF9F6" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* BANDEJA DESPLEGABLE CON ACCESORIOS DE CELULAR */}
        {/* Bandeja de soporte */}
        <rect x="80" y="340" width="280" height="135" rx="14" fill="#FAF9F6" stroke="#194350" strokeWidth="2" />
        <rect x="85" y="345" width="270" height="125" rx="10" fill="#FFC2B4" opacity="0.35" />

        {/* Cables USB enrollados prolijamente con precintos */}
        <g>
          {/* Cable Coral */}
          <rect x="100" y="360" width="38" height="52" rx="8" fill="#FF8382" />
          <circle cx="119" cy="386" r="10" fill="#FAF9F6" />
          <rect x="115" y="378" width="8" height="16" rx="2" fill="#194350" />
          <line x1="110" y1="418" x2="128" y2="418" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />

          {/* Cable Sage */}
          <rect x="148" y="360" width="38" height="52" rx="8" fill="#9DBEB8" />
          <circle cx="167" cy="386" r="10" fill="#FAF9F6" />
          <rect x="163" y="378" width="8" height="16" rx="2" fill="#194350" />
          <line x1="158" y1="418" x2="176" y2="418" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />

          {/* Cable Ink */}
          <rect x="196" y="360" width="38" height="52" rx="8" fill="#194350" />
          <circle cx="215" cy="386" r="10" fill="#FAF9F6" />
          <rect x="211" y="378" width="8" height="16" rx="2" fill="#FF8382" />
          <line x1="206" y1="418" x2="224" y2="418" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />

          {/* Audífonos intrauditivos en empaque circular */}
          <circle cx="265" cy="386" r="24" fill="#FAF9F6" stroke="#194350" strokeWidth="2" />
          <path d="M255 386 C255 376 275 376 275 386" fill="none" stroke="#FF8382" strokeWidth="3" />
          <circle cx="255" cy="388" r="4" fill="#194350" />
          <circle cx="275" cy="388" r="4" fill="#194350" />
          <line x1="265" y1="386" x2="265" y2="404" stroke="#9DBEB8" strokeWidth="2" />

          {/* Fundas y carcasas de celular en exhibición */}
          <rect x="302" y="358" width="45" height="56" rx="6" fill="#FF8382" stroke="#194350" strokeWidth="1.5" />
          <rect x="309" y="365" width="14" height="14" rx="3" fill="#194350" />
          <circle cx="316" cy="372" r="3" fill="#FAF9F6" />
        </g>

        {/* Fila inferior de accesorios (cargadores y adaptadores) */}
        <g>
          <rect x="105" y="425" width="32" height="35" rx="5" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
          <rect x="114" y="432" width="14" height="10" rx="2" fill="#194350" />

          <rect x="145" y="425" width="40" height="35" rx="5" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
          <rect x="153" y="435" width="24" height="6" rx="2" fill="#9DBEB8" />

          <rect x="195" y="425" width="60" height="35" rx="6" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
          <rect x="202" y="432" width="46" height="8" rx="2" fill="#FF8382" />
          <rect x="202" y="445" width="30" height="4" rx="2" fill="#9DBEB8" />

          <rect x="265" y="425" width="75" height="35" rx="6" fill="#FAF9F6" stroke="#194350" strokeWidth="1.5" />
          <circle cx="280" cy="442" r="7" fill="#FFC2B4" />
          <circle cx="300" cy="442" r="7" fill="#9DBEB8" />
          <circle cx="320" cy="442" r="7" fill="#FF8382" />
        </g>
      </g>
    </svg>
  )
}

/**
 * Escena de Marisol: Mercado paceño al amanecer y compra consciente en Sopocachi.
 */
export function MarisolScene({ className = '' }) {
  const uid = useId()

  return (
    <svg
      viewBox="0 0 440 540"
      className={`h-full w-full object-cover ${className}`}
      role="img"
      aria-label="Mercado paceño al amanecer con frutas frescas y canasta ecológica en Sopocachi"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-sunrise`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1E9" />
          <stop offset="45%" stopColor="#FFC2B4" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
      </defs>

      {/* Luz dorada del amanecer paceño */}
      <rect width="440" height="540" fill={`url(#${uid}-sunrise)`} />
      <circle cx="340" cy="110" r="70" fill="#FF8382" opacity="0.35" />
      <circle cx="340" cy="110" r="45" fill="#FAF9F6" opacity="0.65" />

      {/* Sombrilla tradicional de mercado a rayas (Coral y Marfil) */}
      <g>
        <path d="M40 180 Q220 100 400 180 Z" fill="#FF8382" stroke="#194350" strokeWidth="2.5" />
        {/* Rayas de la sombrilla */}
        <path d="M100 162 Q220 100 145 180" fill="#FAF9F6" opacity="0.85" />
        <path d="M190 142 Q220 100 230 180" fill="#FAF9F6" opacity="0.85" />
        <path d="M280 145 Q220 100 315 180" fill="#FAF9F6" opacity="0.85" />
        {/* Poste de la sombrilla */}
        <line x1="220" y1="140" x2="220" y2="340" stroke="#194350" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Mesón de madera del mercado */}
      <rect x="0" y="330" width="440" height="210" fill="#194350" opacity="0.15" />
      <rect x="30" y="320" width="380" height="180" rx="8" fill="#FAF9F6" stroke="#194350" strokeWidth="2" />

      {/* Cajas de madera con frutas frescas andinas y de los Yungas */}
      {/* Caja 1: Plátanos / Bananas */}
      <g>
        <rect x="50" y="270" width="95" height="60" rx="4" fill="#FFC2B4" stroke="#194350" strokeWidth="2" />
        <path d="M60 260 Q75 240 100 255" fill="none" stroke="#FF8382" strokeWidth="8" strokeLinecap="round" />
        <path d="M75 262 Q90 242 115 257" fill="none" stroke="#FFC2B4" strokeWidth="8" strokeLinecap="round" />
        <path d="M90 265 Q105 245 130 260" fill="none" stroke="#FF8382" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* Caja 2: Naranjas y cítricos */}
      <g>
        <rect x="155" y="260" width="110" height="70" rx="4" fill="#9DBEB8" stroke="#194350" strokeWidth="2" />
        <circle cx="178" cy="245" r="14" fill="#FF8382" />
        <circle cx="205" cy="242" r="15" fill="#FFC2B4" />
        <circle cx="232" cy="246" r="14" fill="#FF8382" />
        <circle cx="190" cy="225" r="13" fill="#FFC2B4" />
        <circle cx="218" cy="226" r="14" fill="#FF8382" />
        {/* Hojitas verdes */}
        <ellipse cx="190" cy="210" rx="4" ry="2" fill="#194350" />
      </g>

      {/* Canasta de tela ecológica ciudadana (compra consciente sin regateo) */}
      <g>
        <ellipse cx="325" cy="460" rx="45" ry="12" fill="#194350" opacity="0.3" />
        <path d="M280 340 L370 340 L355 450 L295 450 Z" fill="#9DBEB8" stroke="#194350" strokeWidth="2" />
        {/* Asas de la bolsa */}
        <path d="M305 340 C305 290 345 290 345 340" fill="none" stroke="#194350" strokeWidth="4" />
        {/* Flor o motivo andino en la bolsa */}
        <circle cx="325" cy="395" r="12" fill="#FF8382" />
        <circle cx="325" cy="395" r="6" fill="#FAF9F6" />
        <rect x="295" y="370" width="60" height="4" rx="2" fill="#FAF9F6" opacity="0.8" />
        <rect x="295" y="420" width="60" height="4" rx="2" fill="#FAF9F6" opacity="0.8" />
      </g>

      {/* Puesto de flores y hierbas aromáticas */}
      <g>
        <rect x="60" y="360" width="180" height="90" rx="8" fill="#194350" opacity="0.1" />
        <circle cx="85" cy="380" r="15" fill="#FF8382" opacity="0.85" />
        <circle cx="120" cy="380" r="16" fill="#FFC2B4" opacity="0.9" />
        <circle cx="155" cy="380" r="15" fill="#9DBEB8" opacity="0.95" />
        <circle cx="190" cy="380" r="16" fill="#FF8382" opacity="0.85" />
        <circle cx="102" cy="410" r="14" fill="#9DBEB8" opacity="0.85" />
        <circle cx="138" cy="410" r="15" fill="#FF8382" opacity="0.9" />
        <circle cx="172" cy="410" r="14" fill="#FFC2B4" opacity="0.9" />
      </g>
    </svg>
  )
}

/**
 * Escena para nuevas voces registradas de la comunidad ciudadana.
 */
export function CommunityScene({ zone = 'La Paz', className = '' }) {
  const uid = useId()

  return (
    <svg
      viewBox="0 0 440 540"
      className={`h-full w-full object-cover ${className}`}
      role="img"
      aria-label={`Comercio popular paceño y nueva voz ciudadana en ${zone}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#194350" />
          <stop offset="60%" stopColor="#255866" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
        <pattern id={`${uid}-woven`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="#FF8382" opacity="0.25" />
        </pattern>
      </defs>

      {/* Fondo editorial profundo */}
      <rect width="440" height="540" fill={`url(#${uid}-grad)`} />
      <rect width="440" height="540" fill={`url(#${uid}-woven)`} />

      {/* Silueta de montaña paceña */}
      <path
        d="M0 320 L90 230 L160 270 L240 180 L310 260 L380 210 L440 280 L440 400 L0 400 Z"
        fill="#9DBEB8"
        opacity="0.35"
      />
      <path d="M240 180 L265 215 L240 225 L215 215 Z" fill="#FAF9F6" opacity="0.8" />

      {/* Círculo cálido de solidaridad */}
      <circle cx="220" cy="280" r="110" fill="#FFC2B4" opacity="0.2" />
      <circle cx="220" cy="280" r="75" fill="#FF8382" opacity="0.3" />

      {/* Isotipo / Puesto central de testimonio */}
      <g>
        <rect x="130" y="320" width="180" height="110" rx="16" fill="#FAF9F6" stroke="#194350" strokeWidth="3" />
        {/* Franja de aguayo */}
        <rect x="130" y="320" width="180" height="18" rx="4" fill="#FF8382" />
        <rect x="130" y="338" width="180" height="6" fill="#FFC2B4" />

        {/* Canasta / Corazón solidario central */}
        <circle cx="220" cy="385" r="28" fill="#194350" />
        <path
          d="M220 398 C208 386 198 376 204 366 C208 358 216 360 220 366 C224 360 232 358 236 366 C242 376 232 386 220 398 Z"
          fill="#FF8382"
        />
      </g>

      {/* Letrero testimonial */}
      <rect x="100" y="450" width="240" height="40" rx="20" fill="#194350" stroke="#FAF9F6" strokeWidth="1.5" />
      <text
        x="220"
        y="475"
        textAnchor="middle"
        fill="#FAF9F6"
        fontSize="12"
        fontFamily="sans-serif"
        fontWeight="bold"
        letterSpacing="0.1em"
      >
        VOZ CIUDADANA · {zone.toUpperCase()}
      </text>
    </svg>
  )
}

