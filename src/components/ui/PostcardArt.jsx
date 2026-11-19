import { getTitleFontSize, POSTCARD_FOOTER } from '../../lib/postcardCanvas'

/**
 * Réplica visual de una postal para previsualizarla en pantalla.
 * Usa unidades de container query (cqw) para mantener la misma proporción
 * tipográfica que el canvas exportado (1080 px de ancho).
 */
export default function PostcardArt({ card, format = 'story', className = '' }) {
  const isPost = format === 'post'
  const titleCqw = (getTitleFontSize(card, format) / 1080) * 100
  const isDark = card.theme === 'ink'
  const isCoral = card.theme === 'coral'
  const isSage = card.theme === 'sage'
  const isPeach = card.theme === 'peach'
  const kickerColor = isDark ? card.secondary : isCoral ? 'rgba(25, 67, 80, 0.78)' : 'rgba(25, 67, 80, 0.7)'
  const numberColor = isDark ? 'rgba(250, 249, 246, 0.18)' : isSage ? 'rgba(25, 67, 80, 0.18)' : 'rgba(25, 67, 80, 0.12)'
  const footerColor = isSage ? 'rgba(250, 249, 246, 0.82)' : card.footerColor

  return (
    <div
      className={`postcard relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: isPost ? '4 / 5' : '9 / 16',
        backgroundColor: card.bg,
        containerType: 'inline-size',
      }}
    >
      {card.theme === 'ink' && (
        <>
          <span
            className="pointer-events-none absolute -right-[8%] -top-[14%] block rounded-full"
            style={{ width: '52%', aspectRatio: '1', backgroundColor: card.accent }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-[14%] -top-[20%] block rounded-full border-2"
            style={{ width: '70%', aspectRatio: '1', borderColor: 'rgba(255, 194, 180, 0.45)' }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-[8%] right-[4%] block h-[36%] w-[40%] -rotate-[24deg] opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${card.accent} 0 10px, transparent 10px 34px)`,
            }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute left-[6%] top-[20%] font-display text-[26cqw] font-extrabold leading-none"
            style={{ color: 'rgba(255, 131, 130, 0.9)' }}
            aria-hidden="true"
          >
            “
          </span>
        </>
      )}

      {card.theme === 'peach' && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[4.6%] flex-col" aria-hidden="true">
            <span className="block bg-ink" style={{ flex: '16 1 0%' }} />
            <span className="block" style={{ flex: '10 1 0%', backgroundColor: card.accent }} />
            <span className="block" style={{ flex: '24 1 0%', backgroundColor: card.secondary }} />
            <span className="block bg-ink" style={{ flex: '9 1 0%' }} />
          </div>
          <span
            className="pointer-events-none absolute -right-[16%] top-[8%] block rounded-full border-[18px]"
            style={{ width: '74%', aspectRatio: '1', borderColor: 'rgba(25, 67, 80, 0.12)' }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-[8%] top-[6%] block rounded-full"
            style={{ width: '13%', aspectRatio: '1', backgroundColor: card.accent }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-[22%] right-[6%] grid grid-cols-5 gap-2 opacity-20"
            aria-hidden="true"
          >
            {Array.from({ length: 15 }).map((_, index) => (
              <span key={index} className="block h-2 w-2 bg-ink" />
            ))}
          </span>
        </>
      )}

      {card.theme === 'sage' && (
        <>
          <span
            className="pointer-events-none absolute right-[2%] top-[2%] block rounded-full"
            style={{ width: '55%', aspectRatio: '1', backgroundColor: 'rgba(255, 131, 130, 0.92)' }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-[-6%] top-[-4%] block rounded-full border-2"
            style={{ width: '68%', aspectRatio: '1', borderColor: 'rgba(25, 67, 80, 0.25)' }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 block h-[11%] bg-ink"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute left-[8%] top-[16%] block h-[48%] w-[4%] opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #194350 0 12px, transparent 12px 46px)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {card.theme === 'coral' && (
        <>
          <span
            className="pointer-events-none absolute right-[6%] top-[4%] block rounded-full"
            style={{
              width: '24%',
              aspectRatio: '1',
              backgroundColor: card.secondary,
              boxShadow: '0 0 0 16px rgba(25, 67, 80, 0.1), 0 0 0 34px rgba(25, 67, 80, 0.07)',
            }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 block h-[44%] bg-ink"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-[44%] block h-[11%] opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(115deg, #9DBEB8 0 3px, transparent 3px 44px)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div
        className="relative z-10 flex h-full flex-col p-[7.5%]"
        style={isSage ? { paddingBottom: '11.5%' } : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="postcard-kicker font-bold uppercase" style={{ color: kickerColor }}>
            {card.kicker}
          </p>
          <span
            className="postcard-number shrink-0 font-display font-extrabold"
            style={{
              color: isCoral ? 'rgba(25, 67, 80, 0.16)' : numberColor,
              WebkitTextStroke: isDark ? '1.5px rgba(250, 249, 246, 0.32)' : 'none',
            }}
            aria-hidden="true"
          >
            {card.number}
          </span>
        </div>

        {isCoral ? (
          <>
            <div className="mt-[9%]">
              <h3
                className="font-display font-extrabold tracking-tight"
                style={{ fontSize: `${titleCqw}cqw`, lineHeight: 1.03, color: card.fg }}
              >
                {card.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>

            <div className="mt-auto pb-[1%]">
              <p className="postcard-body max-w-[92%] font-medium" style={{ color: card.bodyColor }}>
                {card.body}
              </p>
              <p className="postcard-footer mt-[8%] font-semibold" style={{ color: footerColor }}>
                {POSTCARD_FOOTER}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="mt-[12%]">
              <h3
                className="font-display font-extrabold tracking-tight"
                style={{ fontSize: `${titleCqw}cqw`, lineHeight: 1.03 }}
              >
                {card.titleLines.map((line, index) => {
                  const isAccent = index === card.accentLineIndex
                  const highlight = isAccent && isSage
                  const accentColor = isDark ? card.secondary : card.accent

                  return (
                    <span
                      key={line}
                      className={
                        highlight
                          ? 'inline-block bg-coral px-[0.12em] text-ink'
                          : 'block'
                      }
                      style={{ color: isAccent && !highlight ? accentColor : card.fg }}
                    >
                      {line}
                    </span>
                  )
                })}
              </h3>
            </div>

            <div className="mt-auto">
              {isPeach && (
                <span
                  className="mb-[6%] block h-[0.9%] w-[30%]"
                  style={{ backgroundColor: card.accent }}
                  aria-hidden="true"
                />
              )}
              <p className="postcard-body max-w-[94%] font-medium" style={{ color: card.bodyColor }}>
                {card.body}
              </p>
              <p className="postcard-footer mt-[7%] font-semibold" style={{ color: footerColor }}>
                {POSTCARD_FOOTER}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
