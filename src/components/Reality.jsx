import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Coins,
  EyeOff,
  HeartPulse,
  Wallet,
} from 'lucide-react'
import Counter from './ui/Counter'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { MagicBentoCard, MagicBentoGrid } from './ui/MagicBento'
import { AnimatedBars, ProgressRing, Sparkline } from './ui/LiveArtwork'
import { useInView } from '../hooks/useInView'
import { INCOME_DATA, REALITY_STATS } from '../data/content'

const ACCENTS = {
  sage: '#9DBEB8',
  peach: '#FFC2B4',
  coral: '#FF8382',
  ivory: '#FFC2B4',
}

const SPARKS = {
  informalidad: [54, 58, 63, 61, 69, 74, 79, 83, 86],
  seguro: [31, 36, 39, 43, 41, 47, 50, 52, 53],
  jornada: [48, 57, 61, 60, 68, 74, 77, 80],
  descanso: [61, 66, 72, 79, 82, 87, 90, 93],
  decomisos: [42, 49, 53, 51, 60, 65, 69, 73],
  discriminacion: [70, 74, 79, 83, 86, 89, 93],
}

function BigStatCard({ stat, icon: Icon, className = '' }) {
  const accent = ACCENTS[stat.tone] ?? ACCENTS.coral

  return (
    <MagicBentoCard
      className={`h-full border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-6 sm:p-7 ${className}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
            Diagnóstico
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h3 className="font-display text-xl font-extrabold leading-snug text-white">
              {stat.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{stat.detail}</p>
          </div>

          <ProgressRing
            value={stat.value}
            tone={accent}
            className="mx-auto sm:mx-0"
            label={`${stat.value}${stat.suffix}: ${stat.label}`}
          >
            <div className="text-center">
              <Counter
                to={stat.value}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix}
                className="font-display text-3xl font-extrabold tracking-tight text-white"
              />
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                del total
              </span>
            </div>
          </ProgressRing>
        </div>

        <div className="mt-auto pt-5">
          <Sparkline values={SPARKS[stat.id]} tone={accent} className="h-12 w-full" />
        </div>
      </div>
    </MagicBentoCard>
  )
}

function StatCard({ stat, icon: Icon, className = '' }) {
  const accent = ACCENTS[stat.tone] ?? ACCENTS.coral

  return (
    <MagicBentoCard className={`h-full border-white/10 bg-white/[0.05] p-5 ${className}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <Counter
            to={stat.value}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix}
            className="font-display text-2xl font-extrabold tracking-tight text-white"
          />
        </div>

        <h3 className="mt-4 font-display text-sm font-extrabold leading-snug text-white">
          {stat.label}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{stat.detail}</p>

        <div className="mt-auto pt-5">
          <AnimatedBars
            value={stat.value}
            tone={accent}
            trackClassName="bg-white/10"
            label={`${stat.value}${stat.suffix}: ${stat.label}`}
          />
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
              Tendencia
            </span>
            <Sparkline
              values={SPARKS[stat.id]}
              tone={accent}
              height={30}
              className="h-7 w-24"
              fillOpacity={0.12}
            />
          </div>
        </div>
      </div>
    </MagicBentoCard>
  )
}

function IncomeCard({ className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.3, once: true })
  const [selected, setSelected] = useState('calle')
  const dailyMinimum = Math.round(INCOME_DATA.minimumWage / 30)

  const metrics = [
    {
      id: 'calle',
      label: 'Ingreso en la calle',
      amount: `Bs ${INCOME_DATA.dailyMin} - Bs ${INCOME_DATA.dailyMax}/día`,
      width: (INCOME_DATA.dailyMax / dailyMinimum) * 100,
      tone: '#FF8382',
    },
    {
      id: 'minimo',
      label: 'Salario mínimo nacional',
      amount: `Bs ${INCOME_DATA.minimumWage.toLocaleString('es-BO')}/mes ≈ Bs ${dailyMinimum}/día`,
      width: 100,
      tone: '#9DBEB8',
    },
  ]

  const current = metrics.find((metric) => metric.id === selected) ?? metrics[0]

  return (
    <MagicBentoCard className={`h-full border-white/10 bg-white/[0.05] p-5 ${className}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-peach/15 text-peach">
            <Wallet className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
            Comparativa
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-white">
          Ingresos diarios de Bs {INCOME_DATA.dailyMin} a Bs {INCOME_DATA.dailyMax}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          Frente al salario mínimo nacional de Bs{' '}
          {INCOME_DATA.minimumWage.toLocaleString('es-BO')} al mes, miles de caseritos trabajan
          por debajo de esa referencia, sin aguinaldo ni aportes.
        </p>

        <div ref={ref} className="mt-5 space-y-3">
          {metrics.map((metric) => {
            const isActive = metric.id === selected
            return (
              <button
                key={metric.id}
                type="button"
                onClick={() => setSelected(metric.id)}
                aria-pressed={isActive}
                className={`block w-full rounded-2xl border p-3 text-left transition ${
                  isActive
                    ? 'border-coral/70 bg-coral/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/55">
                    {metric.label}
                  </span>
                  <span className="text-xs font-semibold text-white">{metric.amount}</span>
                </span>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: inView ? `${metric.width}%` : '0%',
                      backgroundColor: metric.tone,
                      transition: 'width 1.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-auto pt-4 text-[11px] leading-relaxed text-white/45">
          Toca una barra para comparar. {current.id === 'calle' ? 'El ingreso de la calle varía día a día.' : 'La referencia mensual se divide entre 30 días.'}
        </p>
      </div>
    </MagicBentoCard>
  )
}

export default function Reality() {
  const byId = Object.fromEntries(REALITY_STATS.map((stat) => [stat.id, stat]))
  const icons = {
    jornada: Clock,
    descanso: Activity,
    decomisos: AlertTriangle,
    discriminacion: EyeOff,
  }

  return (
    <section id="realidad" className="section-pad bg-ink text-white">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Ver y Juzgar"
          title="La realidad en cifras"
          description="Los datos del comercio popular paceño no son fríos: detrás de cada porcentaje hay jornadas largas, familias sostenidas a pulso y derechos que todavía no llegan."
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/70">
            <HeartPulse className="h-5 w-5 text-sage" aria-hidden="true" />
            <p className="max-w-[16rem] text-[13px] leading-snug">
              Diagnóstico social comunitario en Pérez Velasco, Av. Buenos Aires y Plaza Eguino.
            </p>
          </div>
        </SectionHeading>

        <MagicBentoGrid className="mt-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
          <Reveal className="md:col-span-2 xl:col-span-3 xl:row-span-2">
            <BigStatCard stat={byId.informalidad} icon={Coins} />
          </Reveal>
          <Reveal delay={80} className="md:col-span-2 xl:col-span-3 xl:row-span-2">
            <BigStatCard stat={byId.seguro} icon={HeartPulse} />
          </Reveal>

          <Reveal delay={120} className="xl:col-span-2">
            <StatCard stat={byId.jornada} icon={icons.jornada} />
          </Reveal>
          <Reveal delay={160} className="xl:col-span-2">
            <StatCard stat={byId.descanso} icon={icons.descanso} />
          </Reveal>
          <Reveal delay={200} className="md:col-span-2 xl:col-span-2">
            <IncomeCard />
          </Reveal>

          <Reveal delay={240} className="xl:col-span-3">
            <StatCard stat={byId.decomisos} icon={icons.decomisos} />
          </Reveal>
          <Reveal delay={280} className="xl:col-span-3">
            <StatCard stat={byId.discriminacion} icon={icons.discriminacion} />
          </Reveal>
        </MagicBentoGrid>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-sm leading-relaxed text-white/70">
              Un reordenamiento sin espacios, baños ni resguardo no es orden: es expulsión. La
              campaña propone dialogar con los gremios, reconocer las zonas de trabajo y garantizar
              condiciones básicas de higiene y seguridad.
            </p>
            <a
              href="#derechos"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-peach transition hover:text-white"
            >
              Conoce tus derechos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
