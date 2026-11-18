/**
 * Capa de persistencia local de Caserito Digno.
 *
 * Toda la plataforma funciona en el cliente. Estas funciones concentran el
 * acceso a localStorage y sessionStorage para que, cuando exista una API o
 * Firebase/Supabase, solo haya que reemplazar esta capa.
 */

const KEYS = {
  visits: 'caserito:visits',
  visitSession: 'caserito:visit-session',
  testimonials: 'caserito:testimonials',
  pledges: 'caserito:pledges',
  pledged: 'caserito:pledged',
}

const VISITS_BASELINE = 1428
const PLEDGES_BASELINE = 1284

function safeGet(storage, key) {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value)
  } catch {
    // El navegador puede bloquear el almacenamiento (modo privado, cuotas).
    // La app sigue funcionando en memoria durante la sesión.
  }
}

function safeParseInt(value) {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) ? parsed : null
}

let cachedVisits = null

/**
 * Registra una visita a la campaña. Cuenta una sola vez por sesión de
 * navegador y conserva el acumulado en localStorage.
 */
export function registerVisit() {
  if (cachedVisits !== null) return cachedVisits
  if (typeof window === 'undefined') return VISITS_BASELINE

  let visits = safeParseInt(safeGet(window.localStorage, KEYS.visits)) ?? VISITS_BASELINE
  if (visits < VISITS_BASELINE) visits = VISITS_BASELINE

  const alreadyCounted = safeGet(window.sessionStorage, KEYS.visitSession) === '1'
  if (!alreadyCounted) {
    visits += 1
    safeSet(window.localStorage, KEYS.visits, String(visits))
    safeSet(window.sessionStorage, KEYS.visitSession, '1')
  }

  cachedVisits = visits
  return visits
}

export function loadPledgeState() {
  if (typeof window === 'undefined') {
    return { count: PLEDGES_BASELINE, hasPledged: false }
  }

  const stored = safeParseInt(safeGet(window.localStorage, KEYS.pledges))
  return {
    count: stored && stored > PLEDGES_BASELINE ? stored : PLEDGES_BASELINE,
    hasPledged: safeGet(window.localStorage, KEYS.pledged) === '1',
  }
}

export function savePledgeState({ count, hasPledged }) {
  if (typeof window === 'undefined') return
  safeSet(window.localStorage, KEYS.pledges, String(count))
  safeSet(window.localStorage, KEYS.pledged, hasPledged ? '1' : '0')
}

/** Carga únicamente los testimonios enviados por la comunidad. */
export function loadUserTestimonials() {
  if (typeof window === 'undefined') return []
  try {
    const raw = safeGet(window.localStorage, KEYS.testimonials)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && item.id && typeof item.story === 'string')
  } catch {
    return []
  }
}

export function saveUserTestimonials(testimonials) {
  if (typeof window === 'undefined') return
  try {
    safeSet(window.localStorage, KEYS.testimonials, JSON.stringify(testimonials))
  } catch {
    // Silencioso: la historia ya se mostró en pantalla.
  }
}

export function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `historia-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('es-BO').format(value)
}

export { PLEDGES_BASELINE, VISITS_BASELINE }
