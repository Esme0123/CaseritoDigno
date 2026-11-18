import { Activity, AlertTriangle, ArrowUpRight, Clock, Coins, HeartPulse, Wallet } from 'lucide-react'
import Counter from './ui/Counter'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { useInView } from '../hooks/useInView'
import { INCOME_DATA, REALITY_STATS } from '../data/content'

const TONES = {
  sage: {
    card: 'bg-sage text-ink',
    soft: 'bg-ink/10',
    track: 'bg-ink/15',
    body: 'text-ink',
  },
  peach: {
    card: 'bg-peach text-ink',
    soft: 'bg-white/40',
    track: 'bg-ink/15',
    body: 'text-ink',
  },
  coral: {
    card: 'bg-coral text-ink',
    soft: 'bg-white/40',
    track: 'bg-ink/15',
    body: 'text-ink',
  },
  ivory: {
    card: 'bg-white text-ink',
    soft: 'bg-ivory',
    track: 'bg-ink/10',
    body: 'text-muted',
  },
}

/** Tarjeta con anillo de progreso para los porcentajes principales. */
function RingStat({ stat, icon: Icon }) {
  const { ref, inView } = useInView({ threshold: 0.4, once: true })
  const tone = TONES[stat.tone]
  const circumference = 2 * Math.PI * 42
  const percentage = Math.min(100, stat.value)

  return (
    <article className={`relative overflow-hidden rounded-3xl p-6 shadow-card ${tone.card}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/50">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-ink/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
          Diagnóstico
        </span>
      </div>

      <div ref={ref} className="relative mx-auto my-5 h-36 w-36" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="9"
            className={tone.track}
            stroke="currentColor"
            opacity="0.35"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? circumference * (1 - percentage / 100) : circumference}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <Counter
            to={stat.value}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix}
            className="font-display text-3xl font-extrabold tracking-tight"
          />
        </div>
      </div>

      <h3 className="font-display text-base font-extrabold leading-snug">{stat.label}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${tone.body}`}>{stat.detail}</p>
    </article>
  )
}

/** Tarjeta con barra de progreso horizontal. */
function BarStat({ stat, icon: Icon }) {
  const { ref, inView } = useInView({ threshold: 0.4, once: true })
  const tone = TONES[stat.tone]

  return (
    <article className={`relative overflow-hidden rounded-3xl p-6 shadow-card ${tone.card}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/50">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <Counter
          to={stat.value}
          decimals={stat.decimals ?? 0}
          suffix={stat.suffix}
          className="font-display text-2xl font-extrabold tracking-tight"
        />
      </div>

      <h3 className="mt-5 font-display text-sm font-extrabold leading-snug">{stat.label}</h3>
      <p className={`mt-2 text-[13px] leading-relaxed ${tone.body}`}>{stat.detail}</p>

      <div
        ref={ref}
        className={`mt-4 h-2 w-full overflow-hidden rounded-full ${tone.track}`}
        role="img"
        aria-label={`${stat.value}${stat.suffix}: ${stat.label}`}
      >
        <div
          className="h-full rounded-full bg-ink"
          style={{
            width: inView ? `${stat.value}%` : '0%',
            transition: 'width 1.3s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </article>
  )
}

/** Comparativa de ingresos diarios frente al salario mínimo nacional. */
function IncomePanel() {
  const { ref, inView } = useInView({ threshold: 0.3, once: true })
  const dailyMinimum = Math.round(INCOME_DATA.minimumWage / 30)
  const maxIncome = INCOME_DATA.dailyMax

  return (
    <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-white ring-1 ring-white/15">
      <div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-peach">
          <Wallet className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-lg font-extrabold leading-snug">
          Ingresos diarios de Bs {INCOME_DATA.dailyMin} a Bs {INCOME_DATA.dailyMax}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Mientras el salario mínimo nacional es de Bs {INCOME_DATA.minimumWage.toLocaleString('es-BO')} al
          mes, miles de caseritos trabajan por debajo de esa referencia, sin aguinaldo ni aportes.
        </p>
      </div>

      <div ref={ref} className="mt-6 space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
            <span>Ingreso en la calle</span>
            <span>Bs {INCOME_DATA.dailyMax}/día</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-coral"
              style={{
                width: inView ? `${(maxIncome / dailyMinimum) * 100}%` : '0%',
                transition: 'width 1.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
            <span>Salario mínimo</span>
            <span>Bs {dailyMinimum}/día</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-full rounded-full bg-sage" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Reality() {
  const byId = Object.fromEntries(REALITY_STATS.map((stat) => [stat.id, stat]))
  const bars = ['jornada', 'descanso', 'decomisos', 'discriminacion'].map((id) => byId[id])
  const barIcons = { jornada: Clock, descanso: Activity, decomisos: AlertTriangle, discriminacion: Coins }

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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <RingStat stat={byId.informalidad} icon={Coins} />
          </Reveal>
          <Reveal delay={80}>
            <RingStat stat={byId.seguro} icon={HeartPulse} />
          </Reveal>
          <Reveal delay={160} className="md:col-span-2 lg:col-span-1">
            <IncomePanel />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {bars.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 70}>
              <BarStat stat={stat} icon={barIcons[stat.id]} />
            </Reveal>
          ))}
        </div>

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
