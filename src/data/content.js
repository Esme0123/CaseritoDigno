/**
 * Contenido editorial de Caserito Digno.
 * Todo el texto está redactado en español y contextualizado en La Paz, Bolivia.
 */

export const NAV_LINKS = [
  { id: 'realidad', label: 'La Realidad' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'derechos', label: 'Seguros y Derechos' },
  { id: 'acogida', label: 'Lugares de Acogida' },
  { id: 'difundir', label: 'Difundir la Voz' },
]

export const INITIAL_TESTIMONIALS = [
  {
    id: 'carmen',
    name: 'Doña Carmen',
    age: 54,
    anonymous: false,
    role: 'Vendedora ambulante',
    roleDetail: 'Vendedora de golosinas y pasankalla',
    zone: 'Pérez Velasco',
    experience: '18 años en la acera',
    quote:
      '«Puesto cerrado es estómago vacío. Yo no pido limosna: trabajo. Pero cuando se llevan mi mercadería, se llevan la comida de mis hijos.»',
    story:
      'Enviudé cuando mis tres hijos eran pequeños. Vendiendo pasankalla y golosinas en la Pérez Velasco los saqué adelante: mi hija mayor ya es enfermera. Cada operativo me da miedo, no por la multa, sino porque un decomiso puede borrar la semana entera. Nunca tuve seguro médico; cuando me enfermo, aguanto o pago las medicinas de mi bolsillo.',
    featured: true,
  },
  {
    id: 'luis',
    name: 'Luis',
    age: 25,
    anonymous: false,
    role: 'Vendedor ambulante',
    roleDetail: 'Vendedor itinerante de accesorios de celular',
    zone: 'Av. Buenos Aires',
    experience: '3 años de trabajo',
    quote:
      '«Dejé la carrera de Gastronomía porque necesitaba comer. Ahora ahorro para volver, pero cada día en la calle también es esquivar el prejuicio.»',
    story:
      'Vendo accesorios de celular en la Av. Buenos Aires desde hace tres años. Antes tuve empleos formales precarios donde me pagaban tarde y sin beneficios. Aquí, al menos, el esfuerzo es mío. Lo más duro no es el sol ni la lluvia: es que la gente te mire como si estuvieras haciendo algo malo. Un día quiero tener mi propio taller de cocina.',
  },
  {
    id: 'marisol',
    name: 'Marisol',
    age: 31,
    anonymous: false,
    role: 'Ciudadana aliada',
    roleDetail: 'Vecina del centro de La Paz',
    zone: 'Sopocachi',
    experience: 'Aliada de la campaña',
    quote:
      '«Mi abuela vendía en el mercado. Aprendí de ella que el trato digno no cuesta nada y puede cambiar un día entero.»',
    story:
      'Cuando paso por la Pérez Velasco saludo, pregunto el precio y pago sin regatear de más. No es caridad: es reconocer que esa persona lleva horas de pie, lejos de su familia, sosteniendo la economía de la ciudad. Ojalá más vecinos entendamos que la calle también es un lugar de trabajo.',
  },
]

export const ROLES = [
  'Vendedor/a ambulante',
  'Familiar de vendedor/a',
  'Ciudadano/a aliado/a',
  'Otro',
]

export const ZONES = [
  'Pérez Velasco',
  'Av. Buenos Aires',
  'Plaza Eguino',
  'Mercado Rodríguez',
  'El Alto',
  'Otra zona / mercado',
]

export const RIGHTS = [
  {
    id: 'sus',
    number: '01',
    icon: 'stethoscope',
    shortLabel: 'Sistema Único de Salud',
    title: 'Sistema Único de Salud (SUS)',
    tagline: 'Atención gratuita si no tienes seguro laboral.',
    intro:
      'El SUS existe para que ninguna persona se quede sin atención por no tener un seguro. Si trabajas por cuenta propia en la calle, tienes derecho a adscribirte al centro de salud más cercano y recibir atención sin pagar consultas.',
    needs: [
      'Carnet de Identidad vigente.',
      'Factura de luz o agua reciente para verificar tu domicilio.',
      'Acudir al centro de salud más cercano a tu zona.',
    ],
    services:
      'Consulta médica general, emergencias, controles, vacunas y medicamentos del cuadro básico.',
    tipTitle: 'Consejo de la campaña',
    tip: 'Llega temprano por tu ficha: muchos centros entregan fichas desde las 7:00. Pregunta también por brigadas móviles y ferias de salud en tu barrio.',
    note: 'La adscripción es gratuita y no requiere intermediarios ni pagos adicionales.',
  },
  {
    id: 'gestora',
    number: '02',
    icon: 'wallet',
    shortLabel: 'Gestora Pública',
    title: 'Aportes independientes en la Gestora Pública',
    tagline: 'Un respaldo para tu vejez, aunque trabajes por cuenta propia.',
    intro:
      'Si trabajas por cuenta propia, puedes aportar de forma voluntaria a la Gestora Pública para construir un respaldo de jubilación o invalidez. El aporte es flexible: se ajusta a lo que ganas cada mes.',
    needs: [
      'Carnet de Identidad vigente.',
      'Número de celular y correo personal.',
      'Elegir un monto de aporte mensual que puedas sostener.',
    ],
    services:
      'Aportes voluntarios flexibles, historial de aportes y respaldo para la vejez o la invalidez.',
    tipTitle: 'Consejo de la campaña',
    tip: 'Guarda cada comprobante de aporte. Si un mes no puedes pagar, no pierdes lo aportado: puedes retomar cuando tu economía lo permita.',
    note: 'Los aportes independientes no exigen un monto mínimo fijo; la clave es la constancia.',
  },
  {
    id: 'constitucion',
    number: '03',
    icon: 'landmark',
    shortLabel: 'Constitución · Art. 47',
    title: 'Tu trabajo es un derecho constitucional',
    tagline: 'Artículo 47 de la Constitución Política del Estado.',
    intro:
      'La Constitución reconoce el derecho a un trabajo digno para todas las personas. Su Artículo 47 establece que los trabajadores por cuenta propia y los gremialistas gozan de un régimen de protección especial del Estado.',
    needs: [
      'Trabajo sin violencia ni discriminación.',
      'Derecho a organizarte con tu gremio o asociación.',
      'Protección especial frente a abusos de autoridad.',
    ],
    services:
      'La Constitución ampara tu trabajo, tu dignidad y tu derecho a organizarte. No es un favor: es un derecho.',
    tipTitle: 'Para recordar',
    tip: 'Nadie puede agredirte ni quitarte tu mercadería sin un procedimiento. Si ocurre, busca a tu gremio y a la Defensoría del Pueblo.',
    note: 'La dignidad no se negocia: se exige y se defiende con información.',
  },
  {
    id: 'decomisos',
    number: '04',
    icon: 'shield',
    shortLabel: 'Protocolo ante decomisos',
    title: 'Qué hacer ante un decomiso',
    tagline: 'Tus derechos también se defienden en medio de un operativo.',
    intro:
      'Si ocurre un operativo o decomiso, no estás indefenso. Mantén la calma, pide identificación y deja constancia por escrito. Tu mercadería tiene valor y tu palabra también.',
    steps: [
      'No resistas con violencia: protege tu integridad primero.',
      'Pide el nombre y el cargo del funcionario que actúa.',
      'Exige un acta o inventario detallado de lo retenido.',
      'Fotografía o graba el operativo y anota testigos.',
      'Acude a la Defensoría del Pueblo o a tu gremio.',
    ],
    tipTitle: 'Consejo de la campaña',
    tip: 'Firmar un acta no significa aceptar el decomiso: significa dejar constancia. Lee antes de firmar y solicita siempre una copia.',
    note: 'Si hay agresión física o verbal, denuncia. La atención en la Defensoría es gratuita.',
  },
]

export const DIRECTORY_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'salud', label: 'Salud y Atención' },
  { id: 'derechos', label: 'Asesoría y Derechos' },
  { id: 'comunitario', label: 'Apoyo Comunitario y Guarderías' },
]

export const PLACES = [
  {
    id: 'caritas',
    name: 'Cáritas Arquidiócesis de La Paz y Parroquias Solidarias',
    category: 'comunitario',
    categoryLabel: 'Apoyo comunitario',
    icon: 'heart',
    zone: 'Calle Potosí · Zona Central',
    address: 'Calle Potosí esq. Loayza, zona Central, La Paz',
    hours: 'Lunes a viernes · 08:00 a 16:30',
    services: [
      'Acompañamiento social y orientación comunitaria',
      'Comedores y ollas solidarias',
      'Redes de solidaridad vecinal',
    ],
    mapsQuery: 'Cáritas Arquidiócesis de La Paz, Bolivia',
    note: 'Acércate también a las parroquias de tu zona: muchas tienen comedores y roperos solidarios.',
  },
  {
    id: 'defensoria',
    name: 'Defensoría del Pueblo — Delegación La Paz',
    category: 'derechos',
    categoryLabel: 'Asesoría y derechos',
    icon: 'landmark',
    zone: 'Calle Colombia · Zona Central',
    address: 'Calle Colombia esq. Potosí, zona Central, La Paz',
    hours: 'Lunes a viernes · 08:30 a 16:30',
    services: [
      'Recepción gratuita de denuncias por vulneración de derechos',
      'Orientación ante decomisos irregulares o abusos',
      'Acompañamiento a víctimas de discriminación',
    ],
    mapsQuery: 'Defensoría del Pueblo La Paz Bolivia',
  },
  {
    id: 'san-sebastian',
    name: 'Centro de Salud San Sebastián — Pérez Velasco',
    category: 'salud',
    categoryLabel: 'Salud y atención',
    icon: 'stethoscope',
    zone: 'Pérez Velasco',
    address: 'Calle San Sebastián, junto a la Pérez Velasco, La Paz',
    hours: 'Lunes a sábado · desde las 07:00',
    services: [
      'Adscripción al SUS',
      'Consulta médica general y emergencias',
      'Vacunas y control de enfermedades crónicas',
    ],
    mapsQuery: 'Centro de Salud San Sebastián La Paz Bolivia',
    note: 'Pregunta por la entrega de fichas y por las brigadas móviles de tu zona.',
  },
  {
    id: 'plaza-eguino',
    name: 'Centro de Salud Plaza Eguino',
    category: 'salud',
    categoryLabel: 'Salud y atención',
    icon: 'heart-pulse',
    zone: 'Plaza Eguino · Villa Dolores',
    address: 'Av. Buenos Aires, Plaza Eguino, zona Villa Dolores, La Paz',
    hours: 'Lunes a viernes · 07:30 a 15:30',
    services: [
      'Atención de primer nivel',
      'Control de salud para adultos y niños',
      'Orientación nutricional y seguimiento',
    ],
    mapsQuery: 'Centro de Salud Plaza Eguino La Paz Bolivia',
  },
  {
    id: 'infantil',
    name: 'Centro Infantil Municipal cercano a mercados',
    category: 'comunitario',
    categoryLabel: 'Apoyo comunitario',
    icon: 'baby',
    zone: 'Mercado Rodríguez',
    address: 'Zona Central, a pocas cuadras del Mercado Rodríguez, La Paz',
    hours: 'Lunes a viernes · 07:30 a 17:30',
    services: [
      'Cuidado infantil por jornada',
      'Apoyo escolar y merienda',
      'Espacio seguro mientras trabajas',
    ],
    mapsQuery: 'Centro Infantil Municipal La Paz Bolivia',
    note: 'Consulta por cupos y requisitos en la subalcaldía de tu zona.',
  },
  {
    id: 'apoyo-escolar',
    name: 'Red de Apoyo Escolar Comunitario San Pedro',
    category: 'comunitario',
    categoryLabel: 'Apoyo comunitario',
    icon: 'book',
    zone: 'San Pedro',
    address: 'Zona San Pedro, cerca del mercado, La Paz',
    hours: 'Lunes a sábado · 15:00 a 19:00',
    services: [
      'Apoyo escolar gratuito',
      'Talleres de lectura y arte',
      'Orientación para familias trabajadoras',
    ],
    mapsQuery: 'Zona San Pedro La Paz Bolivia',
  },
  {
    id: 'juridico',
    name: 'Consultorio Jurídico Gratuito Universitario',
    category: 'derechos',
    categoryLabel: 'Asesoría y derechos',
    icon: 'scale',
    zone: 'Campus universitario',
    address: 'Campus universitario, zona central de La Paz',
    hours: 'Lunes a viernes · 09:00 a 17:00',
    services: [
      'Orientación legal gratuita',
      'Apoyo para redactar denuncias',
      'Acompañamiento en casos de abuso',
    ],
    mapsQuery: 'Consultorio Jurídico UMSA La Paz Bolivia',
    note: 'Atendido por estudiantes y docentes de Derecho.',
  },
]

export const COMMITMENTS = [
  {
    id: 'saludo',
    number: '01',
    icon: 'eye',
    title: 'Saluda y mira a los ojos',
    text: 'Rompe la invisibilización: un saludo reconoce a una persona, no un obstáculo en la acera.',
    tone: 'ivory',
  },
  {
    id: 'regateo',
    number: '02',
    icon: 'coins',
    title: 'Compra sin regatear de más',
    text: 'Unos centavos que a ti no te cambian el día, para esa familia son el almuerzo y el pasaje.',
    tone: 'peach',
  },
  {
    id: 'discriminacion',
    number: '03',
    icon: 'shield',
    title: 'Rechaza la discriminación',
    text: 'No repitas prejuicios ni estigmas. El trabajo en la calle no es delito ni vergüenza.',
    tone: 'sage',
  },
  {
    id: 'politicas',
    number: '04',
    icon: 'megaphone',
    title: 'Exige políticas dignas',
    text: 'Apoya un reordenamiento concertado, con espacios reales, baños y resguardo para trabajar.',
    tone: 'coral',
  },
]

export const SHARE_CARDS = [
  {
    id: 'respeto',
    quote: 'Yo respeto al trabajador de la calle. Su esfuerzo sostiene a La Paz.',
    caption: 'La dignidad no se regatea · #CaseritoDigno',
    tone: 'ink',
  },
  {
    id: 'almuerzo',
    quote: 'Regatear de más no te hace más vivo: le quita el almuerzo a una familia.',
    caption: 'Compra con dignidad · #CaseritoDigno',
    tone: 'peach',
  },
  {
    id: 'ciudad',
    quote:
      'La calle no es delincuencia: es trabajo honrado. Una ciudad digna no mira hacia otro lado.',
    caption: 'La Paz camina con su gente · #CaseritoDigno',
    tone: 'coral',
  },
]

export const DIAGNOSIS_ZONES = ['Pérez Velasco', 'Av. Buenos Aires', 'Plaza Eguino', 'El Alto']

/** Indicadores del diagnóstico social comunitario en La Paz y Bolivia. */
export const REALITY_STATS = [
  {
    id: 'informalidad',
    value: 86.2,
    decimals: 1,
    suffix: '%',
    label: 'de empleo informal en Bolivia',
    detail: '8 de cada 10 trabajadores no tienen contrato ni beneficios sociales.',
    tone: 'sage',
    kind: 'ring',
  },
  {
    id: 'jornada',
    value: 80,
    suffix: '%',
    label: 'trabaja más de 8 a 12 horas diarias',
    detail: 'Bajo sol intenso, lluvia y humo vehicular, sin pausas reales.',
    tone: 'peach',
    kind: 'bar',
  },
  {
    id: 'descanso',
    value: 93,
    suffix: '%',
    label: 'casi no tiene días de descanso',
    detail: 'La jornada no termina cuando cae la noche: sigue el recuento y la compra.',
    tone: 'coral',
    kind: 'bar',
  },
  {
    id: 'seguro',
    value: 53.3,
    decimals: 1,
    suffix: '%',
    label: 'no cuenta con ningún seguro de salud',
    detail: 'Solo el 7% tiene seguro formal; el resto paga medicinas de su bolsillo.',
    tone: 'ivory',
    kind: 'ring',
  },
  {
    id: 'decomisos',
    value: 73,
    suffix: '%',
    label: 'sufrió decomisos, multas o desalojos',
    detail: 'Multas que muchas veces cuestan más que su propia mercadería.',
    tone: 'peach',
    kind: 'bar',
  },
  {
    id: 'discriminacion',
    value: 93,
    suffix: '%',
    label: 'percibe indiferencia o discriminación',
    detail: 'En la calle, el trato digno sigue siendo una deuda pendiente.',
    tone: 'coral',
    kind: 'bar',
  },
]

/** Ingresos diarios frente al salario mínimo nacional. */
export const INCOME_DATA = {
  dailyMin: 20,
  dailyMax: 80,
  minimumWage: 3300,
}
