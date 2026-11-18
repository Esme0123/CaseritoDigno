import { useState } from 'react'
import { CheckCircle2, Lock, Send } from 'lucide-react'
import { ROLES, ZONES } from '../data/content'

const EMPTY_FORM = {
  name: '',
  anonymous: false,
  role: ROLES[0],
  zone: ZONES[0],
  experience: '',
  story: '',
}

/**
 * Formulario empático de registro de testimonios. Valida en el cliente y
 * entrega los datos al App, que los persiste en localStorage.
 */
export default function TestimonialForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === 'anonymous' ? { name: undefined } : {}),
    }))
  }

  const validate = () => {
    const next = {}
    if (!form.anonymous && form.name.trim().length < 2) {
      next.name = 'Escribe tu nombre o un seudónimo, o marca la opción de anonimato.'
    }
    if (form.experience.trim().length < 3) {
      next.experience = 'Cuéntanos brevemente tu rubro o experiencia.'
    }
    if (form.story.trim().length < 20) {
      next.story = 'Tu relato necesita al menos 20 caracteres para poder publicarse.'
    }
    setErrors(next)
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      const firstField = nextErrors.name
        ? 'testimonio-nombre'
        : nextErrors.experience
          ? 'testimonio-experiencia'
          : 'testimonio-relato'
      document.getElementById(firstField)?.focus()
      return
    }

    const story = form.story.trim()
    const anonymous = form.anonymous

    onSubmit({
      name: anonymous ? 'Persona anónima' : form.name.trim(),
      anonymous,
      role: form.role,
      zone: form.zone,
      experience: form.experience.trim(),
      story,
      quote: story.length > 160 ? `${story.slice(0, 157).trimEnd()}…` : story,
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="px-6 py-12 text-center sm:px-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/30">
          <CheckCircle2 className="h-8 w-8 text-ink" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
          Gracias por compartir tu historia
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Tu voz ya forma parte de Caserito Digno. Cada testimonio ayuda a que la ciudad mire con
          respeto el trabajo de la calle.
        </p>
        <button type="button" onClick={onClose} className="btn-dark mt-6">
          Ver mi testimonio publicado
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="px-6 py-6 sm:px-8 sm:py-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="testimonio-nombre" className="label">
            Nombre o seudónimo
          </label>
          <input
            id="testimonio-nombre"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={60}
            value={form.anonymous ? '' : form.name}
            onChange={update('name')}
            disabled={form.anonymous}
            placeholder={form.anonymous ? 'Se publicará como Persona anónima' : 'Ej. Doña Rosa, Luis…'}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-nombre' : undefined}
            className={`field ${errors.name ? 'border-coral' : ''} ${
              form.anonymous ? 'cursor-not-allowed opacity-60' : ''
            }`}
          />
          {errors.name && (
            <p id="error-nombre" className="mt-1.5 text-xs font-medium text-ink">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <span className="label">Tu rol</span>
          <label htmlFor="testimonio-rol" className="sr-only">
            Tu rol
          </label>
          <select
            id="testimonio-rol"
            name="role"
            value={form.role}
            onChange={update('role')}
            className="field"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-sage/15 px-4 py-3">
            <input
              type="checkbox"
              name="anonymous"
              checked={form.anonymous}
              onChange={update('anonymous')}
              className="mt-0.5 h-4 w-4 accent-ink"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Publicar de forma anónima
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                Tu nombre no aparecerá en la tarjeta. Tu historia sí, para que otras personas la
                lean.
              </span>
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="testimonio-zona" className="label">
            Zona o mercado
          </label>
          <select
            id="testimonio-zona"
            name="zone"
            value={form.zone}
            onChange={update('zone')}
            className="field"
          >
            {ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="testimonio-experiencia" className="label">
            Rubro o experiencia
          </label>
          <input
            id="testimonio-experiencia"
            name="experience"
            type="text"
            maxLength={80}
            value={form.experience}
            onChange={update('experience')}
            placeholder="Ej. 12 años vendiendo fruta"
            aria-invalid={Boolean(errors.experience)}
            aria-describedby={errors.experience ? 'error-experiencia' : undefined}
            className={`field ${errors.experience ? 'border-coral' : ''}`}
          />
          {errors.experience && (
            <p id="error-experiencia" className="mt-1.5 text-xs font-medium text-ink">
              {errors.experience}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="testimonio-relato" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Relato o mensaje
            </label>
            <span className="text-[11px] font-medium text-muted">
              {form.story.length}/1200
            </span>
          </div>
          <textarea
            id="testimonio-relato"
            name="story"
            rows={5}
            maxLength={1200}
            value={form.story}
            onChange={update('story')}
            placeholder="Cuéntanos tu experiencia con respeto y sin presión. Puedes hablar de tu trabajo, tu familia, tus miedos y tus esperanzas."
            aria-invalid={Boolean(errors.story)}
            aria-describedby={errors.story ? 'error-relato' : undefined}
            className={`field resize-y ${errors.story ? 'border-coral' : ''}`}
          />
          {errors.story && (
            <p id="error-relato" className="mt-1.5 text-xs font-medium text-ink">
              {errors.story}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted sm:max-w-xs">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Este formulario es una demostración: los datos se guardan solo en este navegador, nunca
          se envían a un servidor.
        </p>
        <button type="submit" className="btn-primary shrink-0">
          <Send className="h-4 w-4" aria-hidden="true" />
          Publicar mi testimonio
        </button>
      </div>
    </form>
  )
}
