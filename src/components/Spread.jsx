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
import { useToast } from '../hooks/useToast'
import { COMMITMENTS, SHARE_CARDS } from '../data/content'
import { formatNumber } from '../lib/storage'

const COMMITMENT_ICONS = { eye: Eye, coins: Coins, shield: Shield, megaphone: Megaphone }

const COMMITMENT_TONES = {
  ivory: 'bg-white border-ink/10',
  peach: 'bg-peach border-ink/10',
  sage: 'bg-sage border-ink/10',
  coral: 'bg-coral border-ink/10',
}

const SHARE_TONES = {
  ink: 'bg-ink text-white border-white/15',
  peach: 'bg-peach text-ink border-ink/10',
  coral: 'bg-coral text-ink border-ink/10',
}

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

  const copyForSocial = async (card) => {
    const text = `${shareText(card)}\n${pageUrl}\n#CaseritoDigno`

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

      setCopiedId(card.id)
      notify('Mensaje copiado. Pégalo en tu historia de Instagram o TikTok.')
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopiedId(null), 2600)
    } catch {
      notify('No pudimos copiar el mensaje. Selecciona el texto y cópialo manualmente.', 'error')
    }
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {COMMITMENTS.map((commitment, index) => {
            const Icon = COMMITMENT_ICONS[commitment.icon] ?? HeartHandshake
            return (
              <Reveal key={commitment.id} delay={index * 70}>
                <article
                  className={`group flex h-full flex-col rounded-3xl border p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    COMMITMENT_TONES[commitment.tone] ?? COMMITMENT_TONES.ivory
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-extrabold text-ink/15" aria-hidden="true">
                      {commitment.number}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-ink">
                    {commitment.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      commitment.tone === 'ivory' ? 'text-muted' : 'text-ink'
                    }`}
                  >
                    {commitment.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-14 overflow-hidden rounded-4xl bg-ink p-6 text-white shadow-lift sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-sage">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Kit digital
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                Comparte una frase, difunde un derecho
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                Elige una tarjeta y compártela en tus redes. Un mensaje puede hacer que alguien deje
                de mirar hacia otro lado.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-sage">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              #CaseritoDigno
            </span>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {SHARE_CARDS.map((card) => {
              const isCopied = copiedId === card.id
              const isDark = card.tone === 'ink'

              return (
                <article
                  key={card.id}
                  className={`flex flex-col justify-between rounded-3xl border p-5 ${
                    SHARE_TONES[card.tone] ?? SHARE_TONES.ink
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-extrabold leading-snug">
                      «{card.quote}»
                    </p>
                    <p
                      className={`mt-3 text-xs font-semibold uppercase tracking-[0.1em] ${
                        isDark ? 'text-sage' : 'text-ink'
                      }`}
                    >
                      {card.caption}
                    </p>
                  </div>

                  <div
                    className={`mt-5 flex items-center gap-1.5 border-t pt-4 ${
                      isDark ? 'border-white/15' : 'border-ink/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => shareOnWhatsApp(card)}
                      aria-label={`Compartir en WhatsApp: ${card.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${
                        isDark
                          ? 'bg-white/10 text-white hover:bg-sage hover:text-ink'
                          : 'bg-ink/10 text-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => shareOnFacebook(card)}
                      aria-label={`Compartir en Facebook: ${card.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${
                        isDark
                          ? 'bg-white/10 text-white hover:bg-sage hover:text-ink'
                          : 'bg-ink/10 text-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => shareOnX(card)}
                      aria-label={`Compartir en X: ${card.quote}`}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${
                        isDark
                          ? 'bg-white/10 text-white hover:bg-sage hover:text-ink'
                          : 'bg-ink/10 text-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => copyForSocial(card)}
                      className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
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
                </article>
              )
            })}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/65">
            El botón «Copiar» guarda el mensaje y el enlace para que los pegues en Instagram, TikTok
            o donde prefieras. En WhatsApp, Facebook y X se abre la ventana de publicación.
          </p>
        </div>

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
