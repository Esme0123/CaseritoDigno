import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Landmark,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { RIGHTS } from '../data/content'

const ICONS = {
  stethoscope: Stethoscope,
  wallet: Wallet,
  landmark: Landmark,
  shield: ShieldCheck,
}

function RightsContent({ right }) {
  const Icon = ICONS[right.icon] ?? ShieldCheck

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/35 text-ink">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow text-muted">Derecho {right.number}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.7rem]">
              {right.title}
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-muted">{right.tagline}</p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{right.intro}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-ivory p-5">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            <FileText className="h-4 w-4" aria-hidden="true" />
            {right.steps ? 'Qué hacer, paso a paso' : 'Lo que necesitas'}
          </h4>

          {right.steps ? (
            <ol className="mt-3 space-y-2.5">
              {right.steps.map((step, index) => (
                <li key={step} className="flex gap-2.5 text-sm leading-snug text-muted">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {right.needs.map((need) => (
                <li key={need} className="flex gap-2.5 text-sm leading-snug text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  {need}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-sage/25 p-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {right.steps ? 'Ten presente' : 'Qué cubre / te permite'}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted">{right.services}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-ink/10 bg-peach/60 p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink">
            {right.tipTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{right.tip}</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">{right.note}</p>
    </div>
  )
}

export default function Rights() {
  const [activeId, setActiveId] = useState(RIGHTS[0].id)
  const active = RIGHTS.find((right) => right.id === activeId) ?? RIGHTS[0]

  return (
    <section id="derechos" className="relative section-pad bg-sage/25">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sage/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Charla «Conoce tus derechos»"
          title="Seguros médicos y derechos, en lenguaje claro"
          description="La información también protege. Aquí tienes, sin tecnicismos, cómo acceder a la salud, aportar para tu vejez y defenderte ante un decomiso."
        >
          <a href="#acogida" className="btn-light">
            Buscar un punto de apoyo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div
              role="tablist"
              aria-label="Temas de seguros y derechos"
              className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1"
            >
              {RIGHTS.map((right) => {
                const Icon = ICONS[right.icon] ?? ShieldCheck
                const isActive = right.id === activeId

                return (
                  <button
                    key={right.id}
                    type="button"
                    role="tab"
                    id={`tab-${right.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${right.id}`}
                    onClick={() => setActiveId(right.id)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 ${
                      isActive
                        ? 'border-ink bg-ink text-white shadow-card'
                        : 'border-ink/10 bg-white/80 text-ink hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card'
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        isActive ? 'bg-white/10 text-peach' : 'bg-sage/30 text-ink'
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[10px] font-bold uppercase tracking-[0.14em] ${
                          isActive ? 'text-peach/80' : 'text-muted'
                        }`}
                      >
                        {right.number}
                      </span>
                      <span className="mt-0.5 block text-sm font-bold leading-snug">
                        {right.shortLabel}
                      </span>
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive ? 'translate-x-0.5 text-peach' : 'text-ink/30'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-4">
              <p className="text-xs leading-relaxed text-muted">
                Esta información es orientativa y no reemplaza la atención de una institución. Si
                tienes dudas, acércate a la Defensoría del Pueblo o a tu gremio.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              key={active.id}
              className="animate-fade-in"
            >
              <RightsContent right={active} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
