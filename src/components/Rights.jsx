import { useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Landmark,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { MagicBentoCard, MagicBentoGrid } from './ui/MagicBento'
import { AnimatedBars } from './ui/LiveArtwork'
import { RIGHTS } from '../data/content'

const ICONS = {
  stethoscope: Stethoscope,
  wallet: Wallet,
  landmark: Landmark,
  shield: ShieldCheck,
}

function CardHeader({ right, Icon }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage/35 text-ink">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="font-display text-3xl font-extrabold leading-none text-ink/15" aria-hidden="true">
        {right.number}
      </span>
    </div>
  )
}

function TipBox({ title, children }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-ink/10 bg-peach/60 p-4">
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{children}</p>
      </div>
    </div>
  )
}

function Checklist({ title, icon: Icon, items, tone = '#9DBEB8', className = '' }) {
  const [checked, setChecked] = useState(() => new Set())
  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0

  const toggle = (index) => {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          <Icon className="h-4 w-4" aria-hidden="true" />
          {title}
        </h4>
        <span className="text-[11px] font-bold tabular-nums text-ink/50">
          {checked.size}/{items.length}
        </span>
      </div>

      <ul className="mt-3 space-y-1">
        {items.map((item, index) => {
          const isChecked = checked.has(index)
          return (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-white/70">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                  className="peer sr-only"
                />
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-ink/40 ${
                    isChecked
                      ? 'border-ink bg-ink text-white'
                      : 'border-ink/25 bg-white text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span
                  className={`text-sm leading-snug transition ${
                    isChecked ? 'text-ink/45 line-through' : 'text-muted'
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          )
        })}
      </ul>

      <div className="mt-3">
        <AnimatedBars
          value={progress}
          tone={tone}
          trackClassName="bg-ink/10"
          height="h-1.5"
          label={`${checked.size} de ${items.length} pasos completados`}
        />
      </div>
    </div>
  )
}

function SusCard({ right, className = '' }) {
  return (
    <MagicBentoCard className={`h-full border-ink/10 bg-white p-6 sm:p-7 ${className}`}>
      <div className="flex h-full flex-col">
        <CardHeader right={right} Icon={ICONS[right.icon]} />

        <p className="eyebrow mt-4 text-muted">Derecho {right.number}</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">
          {right.title}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-muted">{right.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{right.intro}</p>

        <div className="mt-5 rounded-2xl bg-ivory p-4">
          <Checklist
            title="Marca lo que ya tienes"
            icon={FileText}
            items={right.needs}
            tone="#9DBEB8"
          />
        </div>

        <div className="mt-4 rounded-2xl bg-sage/25 p-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Qué cubre el SUS
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{right.services}</p>
        </div>

        <div className="mt-4">
          <TipBox title={right.tipTitle}>{right.tip}</TipBox>
        </div>

        <p className="mt-auto pt-4 text-xs leading-relaxed text-muted">{right.note}</p>
      </div>
    </MagicBentoCard>
  )
}

function GestoraCard({ right, className = '' }) {
  const [amount, setAmount] = useState(100)
  const months = 12
  const yearly = amount * months

  return (
    <MagicBentoCard className={`h-full border-ink/10 bg-peach/35 p-6 sm:p-7 ${className}`}>
      <div className="flex h-full flex-col">
        <CardHeader right={right} Icon={ICONS[right.icon]} />

        <p className="eyebrow mt-4 text-muted">Derecho {right.number}</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">
          {right.title}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-muted">{right.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{right.intro}</p>

        <div className="mt-5 rounded-2xl border border-ink/10 bg-white/80 p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Aporte mensual de ejemplo
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">
                Bs {amount.toLocaleString('es-BO')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                En {months} meses
              </p>
              <p className="mt-1 font-display text-xl font-extrabold text-ink">
                Bs {yearly.toLocaleString('es-BO')}
              </p>
            </div>
          </div>

          <label htmlFor="aporte-gestora" className="sr-only">
            Monto mensual de ejemplo para la Gestora Pública
          </label>
          <input
            id="aporte-gestora"
            type="range"
            min="50"
            max="500"
            step="10"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="mt-4 w-full cursor-pointer accent-ink"
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-muted">
            <span>Bs 50</span>
            <span>Bs 500</span>
          </div>

          <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
            {Array.from({ length: months }).map((_, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-sage transition-all duration-300"
                style={{ height: `${35 + (amount / 500) * 65}%`, opacity: 0.45 + index * 0.045 }}
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
            Constancia visual de {months} meses
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-sage/25 p-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Lo que necesitas
          </h4>
          <ul className="mt-2 space-y-2">
            {right.needs.map((need) => (
              <li key={need} className="flex gap-2.5 text-sm leading-snug text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                {need}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <TipBox title={right.tipTitle}>{right.tip}</TipBox>
        </div>

        <p className="mt-auto pt-4 text-xs leading-relaxed text-muted">
          {right.note} Este simulador es ilustrativo: el monto final y las condiciones se confirman
          en la Gestora Pública.
        </p>
      </div>
    </MagicBentoCard>
  )
}

const RIGHTS_LABELS = ['Trabajo protegido', 'Derecho a organizarte', 'Protección especial']

function ConstitutionCard({ right, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <MagicBentoCard className={`h-full border-ink/10 bg-white p-6 sm:p-7 ${className}`}>
      <div className="flex h-full flex-col">
        <CardHeader right={right} Icon={ICONS[right.icon]} />

        <p className="eyebrow mt-4 text-muted">Derecho {right.number}</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">
          {right.title}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-muted">{right.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{right.intro}</p>

        <div className="mt-5 space-y-2">
          {right.needs.map((need, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={need}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen ? 'border-ink/20 bg-ivory' : 'border-ink/10 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-bold text-ink">{RIGHTS_LABELS[index] ?? need}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink/50 transition ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-ink/10 px-4 py-3 text-sm leading-relaxed text-muted">
                    {need}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 rounded-2xl bg-sage/25 p-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Qué significa
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{right.services}</p>
        </div>

        <div className="mt-4">
          <TipBox title={right.tipTitle}>{right.tip}</TipBox>
        </div>

        <p className="mt-auto pt-4 text-xs leading-relaxed text-muted">{right.note}</p>
      </div>
    </MagicBentoCard>
  )
}

function DecomisosCard({ right, className = '' }) {
  return (
    <MagicBentoCard className={`h-full border-ink/10 bg-white p-6 sm:p-7 ${className}`}>
      <CardHeader right={right} Icon={ICONS[right.icon]} />

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow text-muted">Derecho {right.number}</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">
            {right.title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-muted">{right.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{right.intro}</p>

          <div className="mt-5 rounded-2xl bg-ivory p-4">
            <Checklist
              title="Qué hacer, paso a paso"
              icon={FileText}
              items={right.steps}
              tone="#FF8382"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-sage/25 p-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Ten presente
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{right.services}</p>
          </div>
          <TipBox title={right.tipTitle}>{right.tip}</TipBox>
          <p className="text-xs leading-relaxed text-muted">{right.note}</p>
        </div>
      </div>
    </MagicBentoCard>
  )
}

export default function Rights() {
  const byId = Object.fromEntries(RIGHTS.map((right) => [right.id, right]))

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
          description="La información también protege. Aquí tienes, sin tecnicismos, cómo acceder a la salud, aportar para tu vejez y defenderte ante un decomiso. Marca tus pasos y explora cada tarjeta."
        >
          <a href="#acogida" className="btn-light">
            Buscar un punto de apoyo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </SectionHeading>

        <MagicBentoGrid className="mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          <Reveal className="lg:col-span-3">
            <SusCard right={byId.sus} />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-3">
            <GestoraCard right={byId.gestora} />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            <ConstitutionCard right={byId.constitucion} />
          </Reveal>
          <Reveal delay={160} className="lg:col-span-4">
            <DecomisosCard right={byId.decomisos} />
          </Reveal>
        </MagicBentoGrid>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/70 p-4">
          <p className="text-xs leading-relaxed text-muted">
            Esta información es orientativa y no reemplaza la atención de una institución. Si tienes
            dudas, acércate a la Defensoría del Pueblo o a tu gremio.
          </p>
        </div>
      </div>
    </section>
  )
}
