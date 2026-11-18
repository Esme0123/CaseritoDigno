/** Encabezado editorial reutilizable para las secciones de la campaña. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  children,
}) {
  const isDark = tone === 'dark'

  return (
    <div
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${
        align === 'center' ? 'items-center text-center' : ''
      }`}
    >
      <div className={`max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
        {eyebrow && (
          <p className={`eyebrow ${isDark ? 'text-sage' : 'text-ink/55'}`}>
            <span className="h-px w-7 bg-coral" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2
          className={`mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.7rem] ${
            isDark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 text-base leading-relaxed ${
              isDark ? 'text-white/70' : 'text-ink/65'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {children && <div className="shrink-0">{children}</div>}
    </div>
  )
}
