import { useRef, useState } from 'react'
import {
  Check,
  Coins,
  Copy,
  Eye,
  Facebook,
  HeartHandshake,
  Megaphone,
  MessageCircle,
  Share2,
  Shield,
  Sparkles,
  Twitter,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import DriftWall, { DriftCard } from './ui/DriftWall'
import { useToast } from '../hooks/useToast'
import { COMMITMENTS, SHARE_CARDS } from '../data/content'
import { formatNumber } from '../lib/storage'

const COMMITMENT_ICONS = { eye: Eye, coins: Coins, shield: Shield, megaphone: Megaphone }

const COMMITMENT_TONES = {
  ivory: 'border-ink/10 bg-white text-ink',
  peach: 'border-ink/10 bg-peach text-ink',
  sage: 'border-ink/10 bg-sage text-ink',
  coral: 'border-ink/10 bg-coral text-ink',
}

const SHARE_TONES = {
  ink: 'border-white/15 bg-ink text-white',
  peach: 'border-ink/10 bg-peach text-ink',
  coral: 'border-ink/10 bg-coral text-ink',
}

const TILTS = [
  { tilt: -2.4, tiltY: 4 },
  { tilt: 1.8, tiltY: -3 },
  { tilt: -1.2, tiltY: 3 },
  { tilt: 2.6, tiltY: -4 },
  { tilt: -2, tiltY: 2 },
  { tilt: 1.4, tiltY: -2 },
  { tilt: -1.8, tiltY: 4 },
]

const OFFSETS = [
  '',
  'xl:-translate-y-3',
  'xl:translate-y-4',
  'xl:-translate-y-1',
  'xl:translate-y-3',
  'xl:-translate-y-4',
  'xl:translate-y-2',
]

const WALL_ITEMS = [
  { kind: 'commitment', data: COMMITMENTS[0] },
  { kind: 'commitment', data: COMMITMENTS[1] },
  { kind: 'share', data: SHARE_CARDS[0] },
  { kind: 'commitment', data: COMMITMENTS[2] },
  { kind: 'share', data: SHARE_CARDS[1] },
  { kind: 'commitment', data: COMMITMENTS[3] },
  { kind: 'share', data: SHARE_CARDS[2] },
]

function openShareWindow(url) {
  if (typeof window === 'undefined') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function Spread({ pledge, onPledge }) {
  const { notify } = useToast()
  const [copiedId, setCopiedId] = useState(null)
  const copyTimer = useRef(null)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareText = (card) => `${card.quote} ${card.caption}`

  const copyMessage = async (text, id, message) => {
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand('copy')
      document.body.removeChild(textarea)
      return copied
    }

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text)
        } catch {
          if (!fallbackCopy()) throw new Error('copy-failed')
        }
      } else if (!fallbackCopy()) {
        throw new Error('copy-failed')
      }

      setCopiedId(id)
      notify(message)
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopiedId(null), 2600)
    } catch {
      notify('No pudimos copiar el mensaje. Selecciona el texto y cópialo manualmente.', 'error')
    }
  }

  const copyShare = (card) =>
    copyMessage(
      `${shareText(card)}\n${pageUrl}\n#CaseritoDigno`,
      card.id,
      'Mensaje copiado. Pégalo en tu historia de Instagram o TikTok.',
    )

  const copyCommitment = (commitment) =>
    copyMessage(
      `${commitment.title}. ${commitment.text}\n${pageUrl}\n#CaseritoDigno`,
      commitment.id,
      'Compromiso copiado. Compártelo con tu familia y amistades.',
    )

  const shareOnWhatsApp = (card) =>
    openShareWindow(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText(card)} ${pageUrl}`)}`,
    )

  const shareOnFacebook = (card) =>
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl,
      )}&quote=${encodeURIComponent(shareText(card))}`,
    )

  const shareOnX = (card) =>
    openShareWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText(card),
      )}&url=${encodeURIComponent(pageUrl)}`,
    )

  const handleCardActivate = (kind, data) => (event) => {
    if (event.target.closest('button, a')) return
    if (kind === 'share') copyShare(data)
    else copyCommitment(data)
  }

  return (
    <section id="difundir" className="relative section-pad bg-ivory">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-peach/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Difundir la voz"
          title="La dignidad también se practica todos los días"
          description="La campaña no termina en esta página. Estos son los compromisos ciudadanos que pueden cambiarle el día a alguien que trabaja en la calle, y las herramientas para que más personas se sumen."
        />

        <div className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">
                <Sparkles className="h-4 w-4 text-coral" aria-hidden="true" />
                Muro de la dignidad
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                Comparte una frase, difunde un derecho
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Pasa el cursor sobre las postales y compromisos. Al hacer clic, el mensaje se copia
                listo para WhatsApp, Instagram o TikTok.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-card">
              <Share2 className="h-4 w-4 text-coral" aria-hidden="true" />
              #CaseritoDigno
            </span>
          </div>

          <DriftWall className="mt-8">
            {WALL_ITEMS.map(({ kind, data }, index) => {
              const tilt = TILTS[index] ?? { tilt: 0, tiltY: 0 }
              const isCopied = copiedId === data.id

              if (kind === 'commitment') {
                const Icon = COMMITMENT_ICONS[data.icon] ?? HeartHandshake
                const bodyTone = data.tone === 'ivory' ? 'text-muted' : 'text-ink/80'

                return (
                  <DriftCard
                    key={data.id}
                    className={`${COMMITMENT_TONES[data.tone] ?? COMMITMENT_TONES.ivory} flex flex-col p-5 sm:p-6`}
                    itemClassName={OFFSETS[index] ?? ''}
                    tilt={tilt.tilt}
                    tiltY={tilt.tiltY}
                    delay={index * 240}
                    onActivate={handleCardActivate(kind, data)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-ink">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className="font-display text-3xl font-extrabold leading-none text-ink/15"
                        aria-hidden="true"
                      >
                        {data.number}
                      </span>
                    </div>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">
                      Compromiso {data.number}
                    </p>
                    <h4 className="mt-1 font-display text-lg font-extrabold leading-snug text-ink">
                      {data.title}
                    </h4>
                    <p className={`mt-2 text-sm leading-relaxed ${bodyTone}`}>{data.text}</p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/45">
                        Toca para copiar
                      </span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          copyCommitment(data)
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-coral hover:text-ink"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {isCopied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </DriftCard>
                )
              }

              const isDark = data.tone === 'ink'
              const iconTone = isDark
                ? 'bg-white/10 text-white hover:bg-sage hover:text-ink'
                : 'bg-ink/10 text-ink hover:bg-ink hover:text-white'

              return (
                <DriftCard
                  key={data.id}
                  className={`${SHARE_TONES[data.tone] ?? SHARE_TONES.ink} flex flex-col p-5 sm:p-6`}
                  itemClassName={OFFSETS[index] ?? ''}
                  tilt={tilt.tilt}
                  tiltY={tilt.tiltY}
                  delay={index * 240}
                  onActivate={handleCardActivate(kind, data)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                        isDark ? 'text-sage' : 'text-ink/60'
                      }`}
                    >
                      Postal para compartir
                    </p>
                    <Sparkles
                      className={`h-4 w-4 ${isDark ? 'text-sage' : 'text-ink/50'}`}
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-4 font-display text-lg font-extrabold leading-snug">
                    «{data.quote}»
                  </p>
                  <p
                    className={`mt-3 text-xs font-semibold uppercase tracking-[0.1em] ${
                      isDark ? 'text-sage' : 'text-ink/70'
                    }`}
                  >
                    {data.caption}
                  </p>

                  <div
                    className={`mt-auto flex items-center gap-1.5 border-t pt-4 ${
                      isDark ? 'border-white/15' : 'border-ink/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        shareOnWhatsApp(data)
                      }}
                      aria-label={`Compartir en WhatsApp: ${data.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${iconTone}`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        shareOnFacebook(data)
                      }}
                      aria-label={`Compartir en Facebook: ${data.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${iconTone}`}
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        shareOnX(data)
                      }}
                      aria-label={`Compartir en X: ${data.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${iconTone}`}
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        copyShare(data)
                      }}
                      className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition ${
                        isDark
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-ink/10 text-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {isCopied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>

                  <p
                    className={`mt-3 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      isDark ? 'text-white/45' : 'text-ink/45'
                    }`}
                  >
                    Toca la postal para copiar
                  </p>
                </DriftCard>
              )
            })}
          </DriftWall>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          El botón «Copiar» guarda el mensaje y el enlace para que los pegues en Instagram, TikTok o
          donde prefieras. En WhatsApp, Facebook y X se abre la ventana de publicación.
        </p>

        <Reveal>
          <div className="mt-8 flex flex-col gap-6 rounded-4xl border border-ink/10 bg-peach p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow text-ink">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Contador de compromisos ciudadanos
              </p>
              <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {formatNumber(pledge.count)}
                <span className="ml-2 align-middle text-base font-bold text-ink">aliados</span>
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink">
                Personas que decidieron no ser indiferentes. Súmate y deja constancia de que La Paz
                puede tratarse con dignidad.
              </p>
            </div>

            <button
              type="button"
              onClick={onPledge}
              disabled={pledge.hasPledged}
              className={`shrink-0 ${
                pledge.hasPledged
                  ? 'inline-flex cursor-default items-center justify-center gap-2 rounded-full border border-ink/20 bg-white/60 px-6 py-3 text-sm font-bold text-ink'
                  : 'btn-dark !px-6 !py-3.5'
              }`}
            >
              {pledge.hasPledged ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Ya eres Caserito Digno
                </>
              ) : (
                <>
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  Yo me sumo como Caserito Digno
                </>
              )}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
