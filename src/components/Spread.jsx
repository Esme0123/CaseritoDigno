import { useCallback, useRef, useState } from 'react'
import {
  Check,
  Coins,
  Download,
  Eye,
  Facebook,
  HeartHandshake,
  Instagram,
  Loader2,
  Megaphone,
  Music2,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Square,
  Twitter,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import PostcardArt from './ui/PostcardArt'
import { useToast } from '../hooks/useToast'
import { COMMITMENTS, POSTCARDS, POSTCARD_FORMATS } from '../data/content'
import { formatNumber } from '../lib/storage'
import {
  drawPostcard,
  POSTCARD_SITE_URL,
  waitForPostcardFonts,
} from '../lib/postcardCanvas'

const COMMITMENT_ICONS = { eye: Eye, coins: Coins, shield: Shield, megaphone: Megaphone }

const COMMITMENT_TONES = {
  ivory: 'border-ink/10 bg-white text-ink',
  peach: 'border-ink/10 bg-peach text-ink',
  sage: 'border-ink/10 bg-sage text-ink',
  coral: 'border-ink/10 bg-coral text-ink',
}

const TIKTOK_HASHTAGS = '#CaseritoDigno #LaPaz #TrabajoDigno #Bolivia'

const DESKTOP_MESSAGES = {
  instagram: 'Imagen descargada lista para subir a tu Historia o Post de Instagram',
  facebook: 'Imagen descargada. Adjúntala en tu publicación de Facebook.',
}

const MOBILE_MESSAGES = {
  instagram: 'Elige Instagram en el menú para publicar tu postal.',
  facebook: 'Elige Facebook en el menú para publicar tu postal.',
}

function isCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
}

function canShareFile(file) {
  try {
    return Boolean(
      typeof navigator !== 'undefined' &&
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] }),
    )
  } catch {
    return false
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

async function copyToClipboard(text) {
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
      await navigator.clipboard.writeText(text)
      return true
    }
    return fallbackCopy()
  } catch {
    return fallbackCopy()
  }
}

function ActionButton({ icon: Icon, label, onClick, busy, disabled, tone = 'light' }) {
  const tones = {
    light: 'border-ink/10 bg-ivory text-ink hover:border-ink/25 hover:bg-white',
    coral: 'border-coral/40 bg-coral/15 text-ink hover:bg-coral hover:text-ink',
    dark: 'border-ink bg-ink text-white hover:bg-[#123543]',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-xs font-bold transition disabled:cursor-wait disabled:opacity-60 ${tones[tone]}`}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{label}</span>
    </button>
  )
}

export default function Spread({ pledge, onPledge }) {
  const { notify } = useToast()
  const canvasRef = useRef(null)
  const [format, setFormat] = useState('story')
  const [busyKey, setBusyKey] = useState(null)

  const activeFormat = POSTCARD_FORMATS[format] ?? POSTCARD_FORMATS.story

  const renderPostcardBlob = useCallback(async (card, formatId) => {
    const canvas = canvasRef.current
    if (!canvas) throw new Error('canvas-unavailable')

    await waitForPostcardFonts()
    drawPostcard(canvas, card, formatId)

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('png-export-failed'))
      }, 'image/png')
    })
  }, [])

  const buildFilename = (card, formatId) => {
    const kind = formatId === 'post' ? 'post-4x5' : 'historia-9x16'
    return `caserito-digno-postal-${card.number}-${kind}.png`
  }

  const downloadPostcard = useCallback(
    async (card, formatId = format) => {
      const key = `${card.id}:download:${formatId}`
      setBusyKey(key)
      try {
        const blob = await renderPostcardBlob(card, formatId)
        downloadBlob(blob, buildFilename(card, formatId))
        notify(
          `Postal descargada en ${formatId === 'post' ? '4:5' : '9:16'} lista para compartir.`,
        )
      } catch {
        notify('No pudimos generar la imagen. Intenta nuevamente.', 'error')
      } finally {
        setBusyKey(null)
      }
    },
    [format, notify, renderPostcardBlob],
  )

  const sharePostcard = useCallback(
    async (card, platform) => {
      const key = `${card.id}:${platform}`
      setBusyKey(key)

      try {
        if (platform === 'x') {
          const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${card.xPhrase} #CaseritoDigno`,
          )}&url=${encodeURIComponent(POSTCARD_SITE_URL)}`
          window.open(intent, '_blank', 'noopener,noreferrer')
          return
        }

        const formatId = platform === 'tiktok' ? 'story' : format
        const blob = await renderPostcardBlob(card, formatId)
        const filename = buildFilename(card, formatId)
        const file = new File([blob], filename, { type: 'image/png' })
        const title = 'Caserito Digno · La Paz'
        const text = `${card.titleLines.join(' ')} · #CaseritoDigno`

        if (platform === 'tiktok') {
          downloadBlob(blob, filename)
          const copied = await copyToClipboard(TIKTOK_HASHTAGS)
          notify(
            copied
              ? 'Postal 9:16 descargada y hashtags copiados. Súbela a TikTok.'
              : 'Postal 9:16 descargada. Usa #CaseritoDigno #LaPaz #TrabajoDigno #Bolivia.',
            copied ? 'success' : 'info',
          )
          return
        }

        if (isCoarsePointer() && canShareFile(file)) {
          try {
            await navigator.share({ files: [file], title, text })
            notify(MOBILE_MESSAGES[platform] ?? 'Postal compartida.')
            return
          } catch (error) {
            if (error?.name === 'AbortError') return
          }
        }

        downloadBlob(blob, filename)
        notify(DESKTOP_MESSAGES[platform] ?? 'Imagen descargada lista para compartir.', 'info')
      } catch {
        notify('No pudimos preparar la imagen. Intenta nuevamente.', 'error')
      } finally {
        setBusyKey(null)
      }
    },
    [format, notify, renderPostcardBlob],
  )

  return (
    <section id="difundir" className="relative section-pad bg-ivory">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-peach/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Difundir la voz"
          title="Postales gráficas para que la dignidad circule"
          description="Elige una postal, descarga la imagen en alta resolución y publícala en tus redes. Son afiches listos para Historia, TikTok, Estado, feed de Instagram o Facebook. Sin textos largos que copiar: la imagen habla por sí sola."
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-card">
            <Share2 className="h-4 w-4 text-coral" aria-hidden="true" />
            #CaseritoDigno
          </span>
        </SectionHeading>

        <div className="mt-9 flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-4 shadow-card lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-peach text-ink">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Formato de exportación
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Elige el tamaño ideal para tu red social
              </p>
            </div>
          </div>

          <div
            className="grid gap-2 sm:grid-cols-2"
            role="group"
            aria-label="Formato de exportación de las postales"
          >
            {Object.values(POSTCARD_FORMATS).map((item) => {
              const isActive = item.id === format
              const Icon = item.id === 'post' ? Square : Smartphone

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormat(item.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-ink bg-ink text-white shadow-card'
                      : 'border-ink/10 bg-ivory text-muted hover:border-ink/25 hover:text-ink'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span
                      className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        isActive ? 'text-sage' : 'text-muted/80'
                      }`}
                    >
                      {item.ratio} · {item.width} × {item.height} px
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {POSTCARDS.map((card) => {
            const isBusy = Boolean(busyKey)

            return (
              <article
                key={card.id}
                className="flex flex-col rounded-4xl border border-ink/10 bg-white p-3 shadow-card sm:p-4"
              >
                <div className="overflow-hidden rounded-3xl">
                  <PostcardArt card={card} format={format} />
                </div>

                <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Postal {card.number} · {activeFormat.ratio}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <ActionButton
                      icon={Instagram}
                      label="Instagram"
                      tone="coral"
                      busy={busyKey === `${card.id}:instagram`}
                      disabled={isBusy}
                      onClick={() => sharePostcard(card, 'instagram')}
                    />
                    <ActionButton
                      icon={Facebook}
                      label="Facebook"
                      busy={busyKey === `${card.id}:facebook`}
                      disabled={isBusy}
                      onClick={() => sharePostcard(card, 'facebook')}
                    />
                    <ActionButton
                      icon={Music2}
                      label="TikTok"
                      busy={busyKey === `${card.id}:tiktok`}
                      disabled={isBusy}
                      onClick={() => sharePostcard(card, 'tiktok')}
                    />
                    <ActionButton
                      icon={Twitter}
                      label="X (Twitter)"
                      tone="dark"
                      busy={busyKey === `${card.id}:x`}
                      disabled={isBusy}
                      onClick={() => sharePostcard(card, 'x')}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => downloadPostcard(card)}
                    disabled={isBusy}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-ink/25 bg-ivory px-4 py-2.5 text-xs font-bold text-ink transition hover:border-ink/40 hover:bg-white disabled:cursor-wait disabled:opacity-60"
                  >
                    {busyKey === `${card.id}:download:${format}` ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Download className="h-4 w-4" aria-hidden="true" />
                    )}
                    Descargar Imagen PNG
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          En celulares, Instagram y Facebook se abren desde el menú nativo para compartir la imagen
          directamente. En escritorio, el PNG se descarga y puedes adjuntarlo a tu publicación.
          TikTok descarga siempre la versión vertical 9:16 y copia los hashtags. Las postales no
          incluyen rostros ni datos personales.
        </p>

        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">
                <HeartHandshake className="h-4 w-4 text-coral" aria-hidden="true" />
                Compromisos de la campaña
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                Más allá de la postal, cambiemos el trato
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Cuatro gestos concretos para practicar la dignidad en la acera, todos los días.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map((commitment) => {
              const Icon = COMMITMENT_ICONS[commitment.icon] ?? HeartHandshake
              const bodyTone = commitment.tone === 'ivory' ? 'text-muted' : 'text-ink/80'

              return (
                <article
                  key={commitment.id}
                  className={`flex h-full flex-col rounded-3xl border p-5 ${
                    COMMITMENT_TONES[commitment.tone] ?? COMMITMENT_TONES.ivory
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      className="font-display text-3xl font-extrabold leading-none text-ink/15"
                      aria-hidden="true"
                    >
                      {commitment.number}
                    </span>
                  </div>
                  <h4 className="mt-4 font-display text-lg font-extrabold leading-snug text-ink">
                    {commitment.title}
                  </h4>
                  <p className={`mt-2 text-sm leading-relaxed ${bodyTone}`}>{commitment.text}</p>
                </article>
              )
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col gap-6 rounded-4xl border border-ink/10 bg-peach p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
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

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </section>
  )
}
