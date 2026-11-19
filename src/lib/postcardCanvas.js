import { POSTCARD_FORMATS } from '../data/content'

export const POSTCARD_SITE_URL = 'https://caserito-digno.vercel.app'
export const POSTCARD_FOOTER = '#CaseritoDigno • La Paz, Bolivia • caserito-digno.vercel.app'

const DISPLAY = '"Plus Jakarta Sans", Inter, ui-sans-serif, sans-serif'
const SANS = 'Inter, ui-sans-serif, sans-serif'

/** Convierte #RRGGBB a rgba con la opacidad indicada. */
function alpha(hex, value) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${value})`
}

/** Tamaño de título proporcional a la línea más larga de la postal. */
export function getTitleFontSize(card, formatId = 'story') {
  const longest = Math.max(...card.titleLines.map((line) => line.length))
  const base = Math.min(128, Math.max(76, 880 / (longest * 0.52)))
  return formatId === 'post' ? base * 0.88 : base
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  })

  if (current) lines.push(current)
  return lines
}

function drawKicker(ctx, card, x, y, color) {
  ctx.font = `700 27px ${SANS}`
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(card.kicker.toUpperCase(), x, y)
}

function drawTitle(ctx, card, x, y, size, lineHeight) {
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.font = `800 ${size}px ${DISPLAY}`

  card.titleLines.forEach((line, index) => {
    const lineY = y + index * lineHeight
    const isAccent = index === card.accentLineIndex
    const isSageHighlight = isAccent && card.theme === 'sage'

    if (isSageHighlight) {
      const width = ctx.measureText(line).width
      ctx.fillStyle = card.accent
      ctx.fillRect(x - 18, lineY - 6, width + 36, size * 0.94)
      ctx.fillStyle = card.fg
    } else if (isAccent) {
      ctx.fillStyle = card.theme === 'ink' ? card.secondary : card.accent
    } else {
      ctx.fillStyle = card.fg
    }

    ctx.fillText(line, x, lineY)
  })
}

function drawBody(ctx, text, x, y, maxWidth, lineHeight, color) {
  ctx.font = `500 44px ${SANS}`
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const lines = wrapText(ctx, text, maxWidth)
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight)
  })

  return y + lines.length * lineHeight
}

function drawFooter(ctx, x, y, width, color) {
  ctx.font = `600 25px ${SANS}`
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  let text = POSTCARD_FOOTER
  while (ctx.measureText(text).width > width && ctx.font !== `600 18px ${SANS}`) {
    const current = parseInt(ctx.font.match(/(\d+)px/)[1], 10)
    ctx.font = `600 ${current - 1}px ${SANS}`
  }

  ctx.fillText(text, x, y)
}

function drawInkTemplate(ctx, card, W, H, formatId) {
  const M = 88

  ctx.fillStyle = card.bg
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = card.accent
  ctx.beginPath()
  ctx.arc(W * 0.9, H * 0.1, W * 0.34, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = alpha(card.secondary, 0.45)
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(W * 0.88, H * 0.1, W * 0.43, 0, Math.PI * 2)
  ctx.stroke()

  ctx.save()
  ctx.translate(W * 0.62, H * 0.8)
  ctx.rotate(-0.42)
  ctx.fillStyle = alpha(card.accent, 0.18)
  for (let i = 0; i < 7; i += 1) {
    ctx.fillRect(i * 46, 0, 16, 620)
  }
  ctx.restore()

  ctx.font = `800 220px ${DISPLAY}`
  ctx.strokeStyle = alpha(card.fg, 0.16)
  ctx.lineWidth = 2
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.strokeText(card.number, W - M, 92)

  drawKicker(ctx, card, M, 104, card.secondary)

  ctx.font = `800 190px ${DISPLAY}`
  ctx.fillStyle = alpha(card.accent, 0.9)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText('“', M - 8, H * 0.19)

  const size = getTitleFontSize(card, formatId)
  const lineHeight = size * 1.03
  const titleY = H * 0.29
  drawTitle(ctx, card, M, titleY, size, lineHeight)

  drawBody(
    ctx,
    card.body,
    M,
    titleY + card.titleLines.length * lineHeight + 42,
    W - M * 2,
    60,
    card.bodyColor,
  )

  ctx.fillStyle = alpha(card.accent, 0.9)
  ctx.beginPath()
  ctx.arc(W - 160, H - 168, 9, 0, Math.PI * 2)
  ctx.arc(W - 132, H - 168, 9, 0, Math.PI * 2)
  ctx.arc(W - 104, H - 168, 9, 0, Math.PI * 2)
  ctx.fill()

  drawFooter(ctx, M, H - 88, W - M * 2, card.footerColor)
}

function drawPeachTemplate(ctx, card, W, H, formatId) {
  const M = 88
  const ink = card.fg

  ctx.fillStyle = card.bg
  ctx.fillRect(0, 0, W, H)

  const stripeColors = [ink, card.accent, card.secondary, ink]
  const stripeHeights = [16, 10, 24, 9]
  let stripeY = 0
  stripeHeights.forEach((height, index) => {
    ctx.fillStyle = stripeColors[index]
    ctx.fillRect(0, stripeY, W, height)
    stripeY += height
  })

  ctx.strokeStyle = alpha(ink, 0.14)
  ctx.lineWidth = 24
  ctx.beginPath()
  ctx.arc(W * 0.92, H * 0.25, W * 0.37, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = alpha(card.accent, 0.9)
  ctx.beginPath()
  ctx.arc(W * 0.84, H * 0.14, 64, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = `800 260px ${DISPLAY}`
  ctx.fillStyle = alpha(ink, 0.08)
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillText(card.number, W - M, H * 0.06)

  drawKicker(ctx, card, M, 98, alpha(ink, 0.7))

  const size = getTitleFontSize(card, formatId)
  const lineHeight = size * 1.03
  const titleY = H * 0.31
  drawTitle(ctx, card, M, titleY, size, lineHeight)

  ctx.fillStyle = card.accent
  ctx.fillRect(M, titleY + card.titleLines.length * lineHeight + 4, W * 0.24, 14)

  drawBody(
    ctx,
    card.body,
    M,
    titleY + card.titleLines.length * lineHeight + 52,
    W - M * 2,
    60,
    card.bodyColor,
  )

  ctx.fillStyle = alpha(ink, 0.16)
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      ctx.fillRect(W - 250 + col * 34, H - 260 + row * 34, 12, 12)
    }
  }

  drawFooter(ctx, M, H - 88, W - M * 2, card.footerColor)
}

function drawSageTemplate(ctx, card, W, H, formatId) {
  const M = 88
  const ink = card.fg
  const bandTop = H - 210

  ctx.fillStyle = card.bg
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = alpha(card.accent, 0.92)
  ctx.beginPath()
  ctx.arc(W * 0.84, H * 0.13, W * 0.27, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = alpha(ink, 0.25)
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(W * 0.84, H * 0.13, W * 0.33, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = ink
  ctx.fillRect(0, bandTop, W, H - bandTop)

  ctx.fillStyle = alpha(ink, 0.12)
  for (let i = 0; i < 5; i += 1) {
    ctx.fillRect(M + i * 52, H * 0.17, 14, H * 0.48)
  }

  ctx.font = `800 210px ${DISPLAY}`
  ctx.fillStyle = alpha(ink, 0.16)
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillText(card.number, W - M, 86)

  drawKicker(ctx, card, M, 104, alpha(ink, 0.72))

  const size = getTitleFontSize(card, formatId)
  const lineHeight = size * 1.03
  const titleY = H * 0.29
  drawTitle(ctx, card, M, titleY, size, lineHeight)

  drawBody(
    ctx,
    card.body,
    M,
    titleY + card.titleLines.length * lineHeight + 44,
    W - M * 2,
    60,
    card.bodyColor,
  )

  ctx.fillStyle = alpha(card.accent, 0.9)
  ctx.beginPath()
  ctx.arc(W - 120, bandTop - 54, 10, 0, Math.PI * 2)
  ctx.fill()

  drawFooter(ctx, M, H - 88, W - M * 2, 'rgba(250, 249, 246, 0.82)')
}

function drawCoralTemplate(ctx, card, W, H, formatId) {
  const M = 88
  const ink = card.fg
  const panelTop = H * (H > 1500 ? 0.56 : 0.54)

  ctx.fillStyle = card.bg
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = alpha(ink, 0.85)
  ctx.lineWidth = 4
  const sunX = W * 0.81
  const sunY = H * 0.12
  const sunR = 118
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12
    ctx.beginPath()
    ctx.moveTo(sunX + Math.cos(angle) * (sunR + 20), sunY + Math.sin(angle) * (sunR + 20))
    ctx.lineTo(sunX + Math.cos(angle) * (sunR + 54), sunY + Math.sin(angle) * (sunR + 54))
    ctx.stroke()
  }

  ctx.fillStyle = card.secondary
  ctx.beginPath()
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = ink
  ctx.fillRect(0, panelTop, W, H - panelTop)

  ctx.strokeStyle = alpha(card.secondary, 0.22)
  ctx.lineWidth = 3
  for (let i = 0; i < 14; i += 1) {
    const x = M + i * 70
    ctx.beginPath()
    ctx.moveTo(x, panelTop + 54)
    ctx.lineTo(x - 46, panelTop + 148)
    ctx.stroke()
  }

  ctx.font = `800 240px ${DISPLAY}`
  ctx.fillStyle = alpha(ink, 0.16)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(card.number, M - 6, 80)

  drawKicker(ctx, card, M, 104, alpha(ink, 0.78))

  const size = getTitleFontSize(card, formatId)
  const lineHeight = size * 1.03
  const titleY = H * 0.24
  drawTitle(ctx, card, M, titleY, size, lineHeight)

  drawBody(
    ctx,
    card.body,
    M,
    panelTop + 76,
    W - M * 2,
    62,
    card.bodyColor,
  )

  drawFooter(ctx, M, H - 88, W - M * 2, card.footerColor)
}

const TEMPLATES = {
  ink: drawInkTemplate,
  peach: drawPeachTemplate,
  sage: drawSageTemplate,
  coral: drawCoralTemplate,
}

/** Dibuja la postal en un canvas de alta resolución. */
export function drawPostcard(canvas, card, formatId = 'story') {
  const format = POSTCARD_FORMATS[formatId] ?? POSTCARD_FORMATS.story
  const ctx = canvas.getContext('2d')

  canvas.width = format.width
  canvas.height = format.height
  ctx.clearRect(0, 0, format.width, format.height)

  const template = TEMPLATES[card.theme] ?? drawInkTemplate
  template(ctx, card, format.width, format.height, format.id)
}

/** Espera a que las fuentes web estén listas antes de renderizar. */
export async function waitForPostcardFonts() {
  if (typeof document === 'undefined' || !document.fonts?.ready) return
  try {
    await document.fonts.ready
  } catch {
    // Si la API de fuentes falla, el canvas usa las fuentes de respaldo.
  }
}
