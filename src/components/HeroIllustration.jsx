/**
 * Ilustración editorial original de Caserito Digno.
 * Representa con respeto a una vendedora de pollera con su aguayo y a un joven
 * vendedor ambulante, con el Illimani, el teleférico y La Paz de fondo.
 */
export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 640 780"
      role="img"
      aria-labelledby="ilustracion-hero-titulo"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <title id="ilustracion-hero-titulo">
        Una vendedora de pollera con su aguayo y un joven vendedor ambulante frente al Illimani y la
        ciudad de La Paz
      </title>

      <defs>
        <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1E9" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>
        <linearGradient id="cerro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9DBEB8" />
          <stop offset="100%" stopColor="#7FA7A0" />
        </linearGradient>
        <clipPath id="aguayo-hero">
          <path d="M208 468 Q250 450 292 468 L304 516 Q252 532 196 516 Z" />
        </clipPath>
        <pattern id="puntos-hero" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#194350" opacity="0.18" />
        </pattern>
        <pattern id="ventanas-hero" width="14" height="16" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="5" height="6" rx="1" fill="#FAF9F6" opacity="0.55" />
        </pattern>
      </defs>

      {/* Cielo y sol */}
      <rect width="640" height="780" fill="url(#cielo)" />
      <circle cx="516" cy="128" r="66" fill="#FFC2B4" />
      <circle cx="516" cy="128" r="42" fill="#FF8382" opacity="0.5" />

      {/* Nubes */}
      <g fill="#FFFFFF" opacity="0.85">
        <ellipse cx="118" cy="112" rx="62" ry="20" />
        <ellipse cx="158" cy="98" rx="38" ry="18" />
        <ellipse cx="384" cy="78" rx="50" ry="16" />
        <ellipse cx="416" cy="68" rx="30" ry="14" />
      </g>

      {/* Trama decorativa */}
      <rect x="34" y="170" width="88" height="88" rx="20" fill="url(#puntos-hero)" />

      {/* Cordillera y nevados */}
      <path
        d="M0 432 L70 362 L130 394 L214 268 L294 358 L356 312 L430 392 L512 300 L580 366 L640 336 L640 530 L0 530 Z"
        fill="url(#cerro)"
        opacity="0.55"
      />
      <g fill="#FAF9F6" opacity="0.92">
        <path d="M214 268 L244 322 L228 314 L214 332 L200 312 L186 320 Z" />
        <path d="M512 300 L540 348 L524 340 L512 358 L498 338 L486 344 Z" />
        <path d="M70 362 L90 392 L80 388 L70 400 L60 384 L52 388 Z" />
      </g>

      {/* Teleférico */}
      <path
        d="M0 344 Q200 318 400 308 T640 286"
        fill="none"
        stroke="#194350"
        strokeWidth="2"
        opacity="0.28"
      />
      <line x1="420" y1="307" x2="420" y2="322" stroke="#194350" strokeWidth="2" opacity="0.45" />
      <g>
        <rect
          x="400"
          y="322"
          width="40"
          height="26"
          rx="9"
          fill="#FF8382"
          stroke="#194350"
          strokeWidth="2"
        />
        <rect x="407" y="329" width="10" height="8" rx="2" fill="#FAF9F6" />
        <rect x="422" y="329" width="10" height="8" rx="2" fill="#FAF9F6" />
      </g>

      {/* Ciudad de La Paz */}
      <g>
        <rect x="0" y="454" width="62" height="100" fill="#194350" opacity="0.22" />
        <rect x="58" y="432" width="48" height="122" fill="#9DBEB8" opacity="0.7" />
        <rect x="100" y="460" width="70" height="94" fill="#FFC2B4" opacity="0.85" />
        <rect x="164" y="440" width="52" height="114" fill="#194350" opacity="0.3" />
        <rect x="214" y="464" width="76" height="90" fill="#9DBEB8" opacity="0.6" />
        <rect x="286" y="446" width="46" height="108" fill="#FFC2B4" opacity="0.8" />
        <rect x="328" y="430" width="68" height="124" fill="#194350" opacity="0.26" />
        <rect x="392" y="460" width="54" height="94" fill="#9DBEB8" opacity="0.65" />
        <rect x="442" y="436" width="72" height="118" fill="#FFC2B4" opacity="0.85" />
        <rect x="510" y="454" width="58" height="100" fill="#194350" opacity="0.24" />
        <rect x="564" y="428" width="76" height="126" fill="#9DBEB8" opacity="0.7" />

        <g opacity="0.75">
          <rect x="66" y="448" width="32" height="90" fill="url(#ventanas-hero)" />
          <rect x="170" y="456" width="40" height="82" fill="url(#ventanas-hero)" />
          <rect x="336" y="446" width="52" height="94" fill="url(#ventanas-hero)" />
          <rect x="450" y="452" width="56" height="88" fill="url(#ventanas-hero)" />
          <rect x="572" y="444" width="58" height="96" fill="url(#ventanas-hero)" />
        </g>
      </g>

      {/* Calle y vereda */}
      <path d="M0 552 Q320 520 640 552 L640 780 L0 780 Z" fill="#FFC2B4" opacity="0.32" />
      <path
        d="M0 586 Q320 556 640 586"
        fill="none"
        stroke="#194350"
        strokeWidth="3"
        opacity="0.08"
      />
      <g fill="#194350" opacity="0.08">
        <circle cx="86" cy="640" r="4" />
        <circle cx="118" cy="676" r="2.5" />
        <circle cx="540" cy="646" r="3.5" />
        <circle cx="580" cy="688" r="2.5" />
        <circle cx="64" cy="720" r="3" />
        <circle cx="606" cy="734" r="4" />
      </g>

      {/* Sombra de la vendedora */}
      <ellipse cx="252" cy="716" rx="118" ry="17" fill="#194350" opacity="0.14" />

      {/* ================= VENDEDORA DE POLLERA ================= */}
      <g>
        {/* pies */}
        <ellipse cx="214" cy="708" rx="22" ry="9" fill="#194350" />
        <ellipse cx="292" cy="708" rx="22" ry="9" fill="#194350" />

        {/* pollera */}
        <path d="M204 536 Q250 522 296 536 L332 694 Q250 720 168 694 Z" fill="#194350" />
        <g stroke="#2E6375" strokeWidth="2" opacity="0.5" fill="none">
          <path d="M222 548 Q208 620 200 692" />
          <path d="M238 544 Q230 624 226 700" />
          <path d="M254 542 Q252 626 252 704" />
          <path d="M270 544 Q276 624 278 700" />
          <path d="M286 548 Q296 620 304 692" />
        </g>
        <path d="M170 678 Q250 704 330 678 L332 694 Q250 720 168 694 Z" fill="#FF8382" />
        <path
          d="M174 700 Q250 722 326 700"
          fill="none"
          stroke="#FAF9F6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="1 10"
        />

        {/* blusa */}
        <path d="M212 458 Q250 444 288 458 L302 540 Q250 556 198 540 Z" fill="#9DBEB8" />
        <path d="M288 466 Q314 492 308 532 L286 528 Q294 498 280 478 Z" fill="#89ADA6" />
        <path d="M212 466 Q186 492 192 532 L214 528 Q206 498 220 478 Z" fill="#89ADA6" />
        <path d="M240 458 Q250 472 260 458 L256 452 Q250 460 244 452 Z" fill="#FAF9F6" />

        {/* aguayo */}
        <g clipPath="url(#aguayo-hero)">
          <rect x="186" y="440" width="132" height="100" fill="#FF8382" />
          <rect x="186" y="474" width="132" height="6" fill="#FFC2B4" />
          <rect x="186" y="488" width="132" height="5" fill="#FAF9F6" />
          <rect x="186" y="500" width="132" height="6" fill="#194350" />
          <rect x="186" y="514" width="132" height="5" fill="#FFC2B4" />
          <rect x="186" y="526" width="132" height="4" fill="#FAF9F6" />
        </g>
        <path
          d="M208 468 Q250 450 292 468 L304 516 Q252 532 196 516 Z"
          fill="none"
          stroke="#FAF9F6"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <circle cx="250" cy="522" r="6" fill="#FAF9F6" />
        <circle cx="250" cy="522" r="2.5" fill="#FF8382" />

        {/* cuello y cabeza */}
        <rect x="238" y="450" width="24" height="20" rx="9" fill="#D99A74" />
        <path
          d="M226 440 Q204 476 208 522"
          fill="none"
          stroke="#194350"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M274 440 Q296 476 292 522"
          fill="none"
          stroke="#194350"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <circle cx="208" cy="524" r="5" fill="#FF8382" />
        <circle cx="292" cy="524" r="5" fill="#FF8382" />
        <circle cx="250" cy="436" r="29" fill="#E0A882" />
        <circle cx="221" cy="440" r="3" fill="#FFC2B4" />
        <circle cx="279" cy="440" r="3" fill="#FFC2B4" />

        {/* rostro */}
        <circle cx="240" cy="434" r="2.4" fill="#194350" />
        <circle cx="260" cy="434" r="2.4" fill="#194350" />
        <path
          d="M242 446 Q250 453 258 446"
          fill="none"
          stroke="#194350"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="233" cy="443" r="4" fill="#FFC2B4" opacity="0.55" />
        <circle cx="267" cy="443" r="4" fill="#FFC2B4" opacity="0.55" />

        {/* sombrero de cholita */}
        <ellipse cx="250" cy="406" rx="51" ry="12" fill="#194350" />
        <path d="M219 407 Q220 372 250 368 Q280 372 281 407 Z" fill="#194350" />
        <path
          d="M220 400 Q250 391 280 400 L281 407 Q250 398 219 407 Z"
          fill="#FFC2B4"
        />

        {/* brazos y canasta de pasankalla */}
        <path
          d="M209 492 Q196 528 205 562"
          fill="none"
          stroke="#E0A882"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="206" cy="566" r="7" fill="#E0A882" />
        <path
          d="M290 488 Q318 520 314 552"
          fill="none"
          stroke="#E0A882"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="314" cy="556" r="7" fill="#E0A882" />

        <g>
          <g fill="#FAF9F6">
            <circle cx="300" cy="548" r="6" />
            <circle cx="316" cy="542" r="6" />
            <circle cx="332" cy="548" r="6" />
            <circle cx="345" cy="544" r="5" />
          </g>
          <rect x="292" y="554" width="60" height="46" rx="13" fill="#194350" />
          <g stroke="#FFC2B4" strokeWidth="2" opacity="0.55" fill="none">
            <path d="M296 568 H348" />
            <path d="M294 581 H350" />
            <path d="M296 594 H348" />
            <path d="M308 557 L304 597" />
            <path d="M322 557 L322 598" />
            <path d="M336 557 L340 597" />
          </g>
          <path
            d="M292 560 Q322 548 352 560"
            fill="none"
            stroke="#FFC2B4"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ================= JOVEN VENDEDOR ================= */}
      <ellipse cx="462" cy="716" rx="94" ry="16" fill="#194350" opacity="0.14" />

      <g>
        {/* pies */}
        <rect x="428" y="698" width="36" height="13" rx="6" fill="#FAF9F6" stroke="#194350" strokeOpacity="0.2" />
        <rect x="466" y="698" width="36" height="13" rx="6" fill="#FAF9F6" stroke="#194350" strokeOpacity="0.2" />

        {/* jeans */}
        <path d="M428 602 L456 602 L452 702 L430 702 Z" fill="#194350" />
        <path d="M468 602 L496 602 L494 702 L472 702 Z" fill="#194350" />
        <path d="M434 640 H452" stroke="#2E6375" strokeWidth="2" opacity="0.6" />
        <path d="M474 640 H490" stroke="#2E6375" strokeWidth="2" opacity="0.6" />

        {/* mochila */}
        <rect x="499" y="492" width="36" height="94" rx="15" fill="#194350" />
        <rect x="507" y="508" width="18" height="24" rx="4" fill="#FF8382" />
        <rect x="507" y="536" width="18" height="24" rx="4" fill="#FAF9F6" />
        <rect x="507" y="564" width="18" height="18" rx="4" fill="#FFC2B4" />
        <path d="M508 606 H524" stroke="#FFC2B4" strokeWidth="2" opacity="0.5" />

        {/* capucha y torso */}
        <ellipse cx="462" cy="470" rx="38" ry="16" fill="#7FA7A0" />
        <path d="M420 472 Q462 454 504 472 L514 608 Q462 624 410 608 Z" fill="#9DBEB8" />
        <path
          d="M438 566 Q462 576 488 566 L486 596 Q462 604 438 596 Z"
          fill="#89ADA6"
          opacity="0.85"
        />
        <path d="M440 481 L446 512" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M484 481 L478 512" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="446" cy="514" r="3" fill="#FAF9F6" opacity="0.9" />
        <circle cx="478" cy="514" r="3" fill="#FAF9F6" opacity="0.9" />

        {/* correas de la mochila */}
        <path
          d="M432 486 Q442 522 452 548"
          fill="none"
          stroke="#194350"
          strokeWidth="5"
          opacity="0.4"
        />
        <path
          d="M492 486 Q482 522 472 548"
          fill="none"
          stroke="#194350"
          strokeWidth="5"
          opacity="0.4"
        />

        {/* cuello y cabeza */}
        <rect x="450" y="454" width="24" height="18" rx="8" fill="#C98B6B" />
        <circle cx="435" cy="445" r="5" fill="#D99A74" />
        <circle cx="489" cy="445" r="5" fill="#D99A74" />
        <circle cx="462" cy="442" r="27" fill="#D99A74" />

        {/* rostro */}
        <circle cx="451" cy="443" r="2.4" fill="#194350" />
        <circle cx="473" cy="443" r="2.4" fill="#194350" />
        <path
          d="M453 454 Q462 461 471 454"
          fill="none"
          stroke="#194350"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="445" cy="452" r="4" fill="#FFC2B4" opacity="0.5" />
        <circle cx="479" cy="452" r="4" fill="#FFC2B4" opacity="0.5" />

        {/* gorra */}
        <path d="M434 438 Q436 408 462 405 Q488 408 490 438 Z" fill="#FF8382" />
        <path d="M490 444 L490 438 Q466 448 433 440 Q412 438 411 448 Q438 454 462 449 Z" fill="#FF8382" />
        <path
          d="M436 428 Q462 420 488 428"
          fill="none"
          stroke="#194350"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <circle cx="462" cy="406" r="3" fill="#194350" opacity="0.7" />
        <path d="M434 434 Q430 444 432 449" stroke="#194350" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M490 434 Q494 444 492 449" stroke="#194350" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

        {/* brazos */}
        <path
          d="M426 492 Q406 528 428 552"
          fill="none"
          stroke="#D99A74"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M498 492 Q518 528 496 552"
          fill="none"
          stroke="#D99A74"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="430" cy="554" r="6" fill="#D99A74" />
        <circle cx="494" cy="554" r="6" fill="#D99A74" />

        {/* bandeja de accesorios */}
        <g>
          <rect x="412" y="532" width="18" height="26" rx="3" fill="#FF8382" />
          <rect x="434" y="530" width="18" height="28" rx="3" fill="#9DBEB8" />
          <rect x="456" y="533" width="18" height="25" rx="3" fill="#FFC2B4" />
          <rect x="478" y="530" width="18" height="28" rx="3" fill="#194350" />
          <rect x="500" y="533" width="18" height="25" rx="3" fill="#FF8382" />
          <g stroke="#FAF9F6" strokeWidth="1.5" opacity="0.6">
            <path d="M417 540 H425" />
            <path d="M439 540 H447" />
            <path d="M461 541 H469" />
            <path d="M483 540 H491" />
            <path d="M505 541 H513" />
          </g>
          <rect
            x="402"
            y="554"
            width="128"
            height="15"
            rx="7"
            fill="#FAF9F6"
            stroke="#194350"
            strokeOpacity="0.15"
          />
        </g>
      </g>

      {/* Planta y detalles del piso */}
      <g>
        <path d="M96 704 Q94 678 104 660" fill="none" stroke="#194350" strokeWidth="2" opacity="0.4" />
        <ellipse cx="100" cy="666" rx="11" ry="5" fill="#9DBEB8" transform="rotate(-32 100 666)" />
        <ellipse cx="93" cy="684" rx="10" ry="4.5" fill="#9DBEB8" transform="rotate(24 93 684)" />
        <ellipse cx="108" cy="686" rx="9" ry="4" fill="#9DBEB8" transform="rotate(-18 108 686)" />
        <ellipse cx="99" cy="706" rx="16" ry="6" fill="#194350" opacity="0.12" />
      </g>
    </svg>
  )
}
