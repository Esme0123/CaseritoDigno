import { useId } from 'react'

/**
 * Ilustraciones documentales de respaldo para la galería.
 * Se muestran mientras las fotos reales no estén en /public/galeria y,
 * por privacidad, nunca incluyen rostros ni rasgos identificables.
 */
function NightScene({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b2730" />
          <stop offset="100%" stopColor="#194350" />
        </linearGradient>
        <radialGradient id={`${uid}-lamp`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC2B4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFC2B4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <circle cx="312" cy="82" r="30" fill="#FAF9F6" opacity="0.72" />
      <circle cx="322" cy="74" r="30" fill="#0b2730" opacity="0.55" />

      <g opacity="0.6" fill="#102f3a">
        <rect x="0" y="190" width="74" height="196" />
        <rect x="58" y="150" width="88" height="236" />
        <rect x="140" y="212" width="66" height="174" />
        <rect x="196" y="170" width="92" height="216" />
        <rect x="282" y="205" width="58" height="181" />
        <rect x="334" y="158" width="66" height="228" />
      </g>

      <g fill="#FFC2B4" opacity="0.5">
        <rect x="24" y="216" width="10" height="14" />
        <rect x="48" y="246" width="10" height="14" />
        <rect x="84" y="180" width="10" height="14" />
        <rect x="108" y="222" width="10" height="14" />
        <rect x="218" y="198" width="10" height="14" />
        <rect x="244" y="240" width="10" height="14" />
        <rect x="358" y="188" width="10" height="14" />
        <rect x="378" y="236" width="10" height="14" />
      </g>

      <rect x="0" y="362" width="400" height="138" fill="#0c262f" />
      <path d="M44 500 L170 362 L188 362 L108 500 Z" fill="#0a2028" opacity="0.8" />
      <path d="M300 500 L258 362 L274 362 L346 500 Z" fill="#0a2028" opacity="0.8" />

      <ellipse cx="210" cy="348" rx="128" ry="72" fill={`url(#${uid}-lamp)`} />
      <ellipse cx="210" cy="428" rx="86" ry="15" fill="#FFC2B4" opacity="0.16" />

      <g>
        <path d="M96 252 L258 236 L276 292 L112 308 Z" fill="#FF8382" />
        <path d="M124 256 L146 253 L160 297 L136 300 Z" fill="#FAF9F6" opacity="0.45" />
        <path d="M186 250 L208 247 L222 291 L198 294 Z" fill="#FAF9F6" opacity="0.45" />
        <path d="M112 300 L116 354 M270 284 L276 350" stroke="#194350" strokeWidth="7" />
        <rect x="120" y="320" width="136" height="12" fill="#194350" />
        <rect x="130" y="332" width="84" height="52" fill="#123847" />
        <rect x="142" y="296" width="34" height="24" rx="4" fill="#9DBEB8" />
        <rect x="184" y="300" width="28" height="20" rx="4" fill="#FFC2B4" />
        <circle cx="238" cy="310" r="9" fill="#FAF9F6" opacity="0.8" />
        <circle cx="254" cy="314" r="7" fill="#FF8382" opacity="0.9" />
      </g>

      <g stroke="#FAF9F6" strokeWidth="1.4" opacity="0.25">
        <path d="M64 22 L40 108" />
        <path d="M124 12 L96 120" />
        <path d="M188 28 L164 118" />
        <path d="M248 8 L226 96" />
        <path d="M308 20 L286 112" />
      </g>

      <g fill="#FAF9F6" opacity="0.6">
        <circle cx="170" cy="342" r="2.5" />
        <circle cx="202" cy="352" r="2.5" />
        <circle cx="238" cy="368" r="2.5" />
      </g>
    </>
  )
}

function AguayoScene({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC2B4" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
        <pattern id={`${uid}-aguayo`} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="#194350" />
          <rect y="0" width="32" height="5" fill="#FF8382" />
          <rect y="10" width="32" height="4" fill="#9DBEB8" />
          <rect y="26" width="32" height="6" fill="#FFC2B4" />
          <path d="M16 15 L23 22 L16 29 L9 22 Z" fill="#FFC2B4" opacity="0.9" />
        </pattern>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <circle cx="318" cy="78" r="46" fill="#FF8382" opacity="0.9" />
      <circle cx="318" cy="78" r="60" fill="none" stroke="#194350" strokeWidth="1.5" opacity="0.25" />

      <g opacity="0.75">
        <rect x="0" y="150" width="88" height="230" fill="#194350" opacity="0.18" />
        <rect x="72" y="118" width="112" height="262" fill="#194350" opacity="0.12" />
        <rect x="296" y="142" width="104" height="238" fill="#194350" opacity="0.16" />
        <rect x="16" y="178" width="18" height="22" fill="#194350" opacity="0.28" />
        <rect x="42" y="216" width="18" height="22" fill="#194350" opacity="0.28" />
        <rect x="106" y="150" width="20" height="26" fill="#194350" opacity="0.28" />
        <rect x="142" y="192" width="20" height="26" fill="#194350" opacity="0.28" />
        <rect x="326" y="184" width="20" height="24" fill="#194350" opacity="0.28" />
        <rect x="358" y="226" width="20" height="24" fill="#194350" opacity="0.28" />
      </g>

      <rect x="0" y="352" width="400" height="148" fill="#9DBEB8" />
      <rect x="0" y="352" width="400" height="12" fill="#194350" opacity="0.35" />

      <g>
        <path d="M58 210 L204 200 L218 330 L70 340 Z" fill={`url(#${uid}-aguayo)`} />
        <path d="M204 200 L258 214 L262 318 L218 330 Z" fill={`url(#${uid}-aguayo)`} opacity="0.9" />
        <path d="M58 210 L204 200 L214 226 L66 236 Z" fill="#FFC2B4" opacity="0.55" />
      </g>

      <g>
        <rect x="66" y="336" width="282" height="18" fill="#194350" />
        <rect x="82" y="354" width="10" height="52" fill="#123543" />
        <rect x="320" y="354" width="10" height="52" fill="#123543" />
        <ellipse cx="132" cy="330" rx="20" ry="8" fill="#FAF9F6" />
        <ellipse cx="174" cy="326" rx="15" ry="7" fill="#FF8382" />
        <ellipse cx="212" cy="330" rx="18" ry="8" fill="#9DBEB8" />
        <rect x="250" y="306" width="48" height="30" rx="5" fill="#194350" />
        <rect x="256" y="296" width="36" height="12" rx="4" fill="#FFC2B4" />
      </g>

      <g>
        <path d="M122 284 C122 240 148 218 172 218 C196 218 216 240 216 284 Z" fill="#194350" opacity="0.92" />
        <circle cx="170" cy="208" r="17" fill="#194350" opacity="0.92" />
        <ellipse cx="170" cy="190" rx="34" ry="8" fill="#194350" opacity="0.92" />
        <ellipse cx="170" cy="182" rx="20" ry="12" fill="#194350" opacity="0.92" />
        <path d="M146 266 C158 250 184 250 196 266" stroke="#FFC2B4" strokeWidth="2" fill="none" opacity="0.4" />
      </g>

      <g stroke="#194350" strokeWidth="1.5" opacity="0.2">
        <path d="M24 136 L376 136" />
        <path d="M24 128 L376 128" />
      </g>
    </>
  )
}

function WeatherScene({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC2B4" />
          <stop offset="55%" stopColor="#9DBEB8" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
        <pattern id={`${uid}-rain`} width="18" height="30" patternUnits="userSpaceOnUse">
          <path d="M4 0 L0 18" stroke="#194350" strokeWidth="1.2" opacity="0.3" />
        </pattern>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <circle cx="84" cy="92" r="38" fill="#FF8382" opacity="0.9" />
      <g stroke="#FF8382" strokeWidth="3" opacity="0.6">
        <path d="M84 34 L84 18" />
        <path d="M84 150 L84 166" />
        <path d="M26 92 L10 92" />
        <path d="M142 92 L158 92" />
        <path d="M43 51 L32 40" />
        <path d="M125 51 L136 40" />
        <path d="M43 133 L32 144" />
        <path d="M125 133 L136 144" />
      </g>

      <g fill="#194350" opacity="0.82">
        <path d="M190 104 C190 82 214 70 230 82 C238 58 276 56 286 82 C310 76 326 92 322 108 L188 108 Z" />
        <path d="M256 140 C256 124 274 116 286 124 C292 108 318 108 326 126 C344 122 354 134 350 146 L254 146 Z" opacity="0.7" />
      </g>

      <path d="M0 298 L62 232 L108 272 L164 214 L232 298 L294 238 L344 288 L400 244 L400 500 L0 500 Z" fill="#9DBEB8" />
      <path d="M152 240 L164 214 L180 232 L170 246 Z" fill="#FAF9F6" opacity="0.9" />
      <path d="M280 252 L294 238 L310 252 L296 264 Z" fill="#FAF9F6" opacity="0.85" />

      <rect x="0" y="300" width="400" height="200" fill="#194350" opacity="0.1" />
      <g opacity="0.7" fill="#194350">
        <rect x="0" y="270" width="72" height="120" opacity="0.2" />
        <rect x="300" y="258" width="100" height="132" opacity="0.18" />
      </g>

      <g>
        <path d="M118 276 C118 238 150 210 188 210 C226 210 258 238 258 276 Z" fill="#FF8382" />
        <path d="M128 276 C130 244 156 222 188 222 C220 222 246 244 248 276 Z" fill="#FAF9F6" opacity="0.25" />
        <path d="M188 276 L188 382" stroke="#194350" strokeWidth="8" />
        <path d="M188 382 C176 396 176 412 190 420" stroke="#194350" strokeWidth="6" fill="none" />
      </g>

      <g>
        <rect x="206" y="360" width="128" height="10" fill="#194350" />
        <rect x="214" y="370" width="8" height="52" fill="#123543" />
        <rect x="316" y="370" width="8" height="52" fill="#123543" />
        <rect x="226" y="338" width="40" height="22" rx="4" fill="#194350" />
        <circle cx="286" cy="346" r="14" fill="#FFC2B4" />
        <circle cx="310" cy="350" r="9" fill="#9DBEB8" />
      </g>

      <rect width="400" height="270" fill={`url(#${uid}-rain)`} opacity="0.16" />
      <ellipse cx="272" cy="446" rx="58" ry="8" fill="#9DBEB8" opacity="0.6" />
      <ellipse cx="96" cy="466" rx="42" ry="6" fill="#9DBEB8" opacity="0.5" />
      <g stroke="#FFC2B4" strokeWidth="2" opacity="0.45">
        <path d="M238 448 L254 448" />
        <path d="M282 452 L300 452" />
        <path d="M76 470 L94 470" />
      </g>
    </>
  )
}

function WalkScene({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF9F6" />
          <stop offset="60%" stopColor="#FFC2B4" />
          <stop offset="100%" stopColor="#FF8382" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <circle cx="306" cy="118" r="58" fill="#FF8382" opacity="0.85" />
      <circle cx="306" cy="118" r="76" fill="none" stroke="#194350" strokeWidth="1.5" opacity="0.2" />

      <path d="M0 300 L52 232 L92 268 L146 204 L214 282 L270 226 L330 276 L400 218 L400 360 L0 360 Z" fill="#9DBEB8" />
      <path d="M134 216 L146 204 L160 220 L148 234 Z" fill="#FAF9F6" opacity="0.9" />

      <g fill="#194350" opacity="0.82">
        <rect x="0" y="288" width="62" height="112" />
        <rect x="56" y="262" width="74" height="138" />
        <rect x="292" y="272" width="70" height="128" />
        <rect x="354" y="250" width="46" height="150" />
      </g>
      <g fill="#FFC2B4" opacity="0.55">
        <rect x="16" y="308" width="12" height="18" />
        <rect x="38" y="340" width="12" height="18" />
        <rect x="72" y="286" width="12" height="18" />
        <rect x="94" y="320" width="12" height="18" />
        <rect x="308" y="294" width="12" height="18" />
        <rect x="330" y="330" width="12" height="18" />
        <rect x="368" y="276" width="12" height="18" />
      </g>

      <path d="M0 500 L120 360 L280 360 L400 500 Z" fill="#194350" opacity="0.18" />
      <path d="M0 500 L112 362 L130 362 L40 500 Z" fill="#194350" opacity="0.28" />
      <path d="M400 500 L288 362 L270 362 L360 500 Z" fill="#194350" opacity="0.28" />
      <g stroke="#FAF9F6" strokeWidth="5" opacity="0.45">
        <path d="M200 390 L200 424" />
        <path d="M200 446 L200 478" />
      </g>

      <g>
        <ellipse cx="214" cy="446" rx="42" ry="10" fill="#194350" opacity="0.35" />
        <path d="M196 342 C196 316 210 300 222 300 C238 300 250 320 248 342 L242 382 L206 382 Z" fill="#194350" />
        <circle cx="222" cy="290" r="14" fill="#194350" />
        <path d="M206 288 C206 278 238 278 238 288 L238 292 L206 292 Z" fill="#194350" />
        <path d="M206 320 L190 346 L196 352 L214 330" fill="#194350" />
        <path d="M240 320 L260 348 L254 354 L236 332" fill="#194350" />
        <path d="M210 382 L204 432 L214 432 L220 384 Z" fill="#194350" />
        <path d="M234 382 L244 432 L234 432 L226 384 Z" fill="#194350" />
        <rect x="188" y="336" width="64" height="10" rx="5" fill="#FF8382" />
        <rect x="214" y="310" width="26" height="38" rx="8" fill="#FFC2B4" opacity="0.8" />
        <circle cx="186" cy="342" r="6" fill="#9DBEB8" />
        <circle cx="248" cy="342" r="6" fill="#9DBEB8" />
        <circle cx="256" cy="350" r="5" fill="#FF8382" />
      </g>

      <g stroke="#194350" strokeWidth="2" opacity="0.35">
        <path d="M120 424 L156 424" />
        <path d="M104 438 L148 438" />
        <path d="M136 452 L172 452" />
      </g>
    </>
  )
}

function SolidarityScene({ uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#194350" />
          <stop offset="100%" stopColor="#9DBEB8" />
        </linearGradient>
        <radialGradient id={`${uid}-warm`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC2B4" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFC2B4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}-sky)`} />
      <ellipse cx="200" cy="330" rx="190" ry="150" fill={`url(#${uid}-warm)`} />

      <g fill="#123543" opacity="0.85">
        <rect x="0" y="196" width="92" height="220" />
        <rect x="308" y="208" width="92" height="208" />
      </g>
      <g fill="#FFC2B4" opacity="0.5">
        <rect x="18" y="222" width="12" height="18" />
        <rect x="48" y="258" width="12" height="18" />
        <rect x="330" y="238" width="12" height="18" />
        <rect x="360" y="276" width="12" height="18" />
      </g>

      <rect x="0" y="418" width="400" height="82" fill="#194350" opacity="0.35" />

      <g>
        <path d="M26 300 L148 292 L164 332 L14 340 Z" fill="#FF8382" />
        <path d="M46 302 L66 300 L78 330 L56 332 Z" fill="#FAF9F6" opacity="0.4" />
        <path d="M104 298 L126 296 L138 328 L114 330 Z" fill="#FAF9F6" opacity="0.4" />
        <rect x="30" y="340" width="128" height="52" fill="#9DBEB8" />
        <rect x="40" y="356" width="20" height="24" fill="#FFC2B4" />
        <rect x="72" y="352" width="18" height="28" fill="#FAF9F6" opacity="0.7" />
        <rect x="104" y="358" width="22" height="22" fill="#FF8382" />
      </g>

      <g>
        <path d="M248 338 C248 210 336 200 366 214 L372 338 Z" fill="#194350" opacity="0.55" />
        <rect x="260" y="338" width="116" height="54" fill="#9DBEB8" />
        <rect x="272" y="354" width="18" height="24" fill="#FFC2B4" />
        <rect x="300" y="350" width="20" height="28" fill="#FAF9F6" opacity="0.7" />
        <rect x="332" y="356" width="22" height="22" fill="#FF8382" />
      </g>

      <g>
        <path d="M128 402 C128 348 154 318 182 318 C210 318 232 348 232 402 Z" fill="#194350" />
        <circle cx="180" cy="306" r="18" fill="#194350" />
        <ellipse cx="180" cy="286" rx="38" ry="9" fill="#194350" />
        <ellipse cx="180" cy="278" rx="22" ry="13" fill="#194350" />

        <path d="M274 402 C274 354 296 326 320 326 C344 326 360 354 360 402 Z" fill="#194350" />
        <circle cx="318" cy="314" r="16" fill="#194350" />
        <ellipse cx="318" cy="296" rx="34" ry="8" fill="#194350" />
        <ellipse cx="318" cy="288" rx="20" ry="12" fill="#194350" />

        <path d="M226 360 C244 348 258 348 274 360 L270 382 C254 372 246 372 232 382 Z" fill="#FFC2B4" />
        <rect x="238" y="354" width="26" height="34" rx="8" fill="#FF8382" />
        <path d="M232 340 C232 330 270 330 270 340" stroke="#FAF9F6" strokeWidth="3" fill="none" opacity="0.65" />
      </g>

      <g opacity="0.5" stroke="#FAF9F6" strokeWidth="1.5">
        <path d="M166 330 C176 322 192 322 202 330" fill="none" />
        <path d="M298 336 C308 328 324 328 334 336" fill="none" />
      </g>
    </>
  )
}

const SCENES = {
  night: NightScene,
  aguayo: AguayoScene,
  weather: WeatherScene,
  walk: WalkScene,
  solidarity: SolidarityScene,
}

export default function GalleryScene({ scene = 'night', label = '' }) {
  const reactId = useId()
  const uid = reactId.replace(/[^a-zA-Z0-9_-]/g, '')
  const Scene = SCENES[scene] ?? NightScene

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="h-full w-full"
    >
      <Scene uid={uid} />
    </svg>
  )
}
