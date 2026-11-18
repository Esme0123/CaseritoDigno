import { useEffect, useState } from 'react'
import { Menu, PenLine, X } from 'lucide-react'
import Logo from './ui/Logo'
import LiveDot from './ui/LiveDot'
import { NAV_LINKS } from '../data/content'
import { formatNumber } from '../lib/storage'

/**
 * Barra de navegación sticky con scrollspy, progreso de lectura, contador en
 * vivo y menú móvil.
 */
export default function Navbar({ readers, visits, onOpenTestimonial }) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Progreso de lectura + sombra al hacer scroll.
  useEffect(() => {
    let frameId = null

    const handleScroll = () => {
      if (frameId) return
      frameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(scrollY > 8)
        setProgress(total > 0 ? Math.min(1, scrollY / total) : 0)
        frameId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  // Scrollspy: resalta la sección visible en la navegación.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)
    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Cierra el menú móvil al agrandar la ventana o presionar Escape.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-coral transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className={`border-b transition duration-300 ${
          scrolled
            ? 'border-ink/10 bg-ivory/90 shadow-[0_12px_36px_-28px_rgba(25,67,80,0.6)] backdrop-blur-md'
            : 'border-transparent bg-ivory/85 backdrop-blur'
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Logo onClick={() => setMenuOpen(false)} />

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => handleNavClick(link.id)}
                aria-current={activeSection === link.id ? 'true' : undefined}
                className={`rounded-full px-3 py-2 text-[13px] font-semibold transition ${
                  activeSection === link.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-ink/65 hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 xl:flex">
              <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5">
                <LiveDot />
                <span className="text-[11px] font-semibold text-ink">
                  {readers} leyendo ahora
                </span>
              </div>
              <div className="text-right leading-tight">
                <p className="text-[10px] uppercase tracking-[0.12em] text-ink/45">
                  Visitas por la dignidad
                </p>
                <p className="font-display text-sm font-extrabold text-ink">
                  {formatNumber(visits)}+
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTestimonial}
              className="btn-primary hidden !px-4 !py-2.5 text-[13px] sm:inline-flex"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Contar mi historia
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:bg-ink hover:text-white lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="menu-movil"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-ink/10 bg-ivory/95 backdrop-blur-md animate-fade-in lg:hidden"
        >
          <div className="container-page space-y-4 py-5">
            <nav aria-label="Navegación móvil" className="grid gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeSection === link.id
                      ? 'bg-ink text-white'
                      : 'text-ink/75 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeSection === link.id ? 'bg-coral' : 'bg-ink/20'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink/10 bg-white p-4">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/45">
                  <LiveDot />
                  En vivo
                </p>
                <p className="mt-2 font-display text-xl font-extrabold text-ink">{readers}</p>
                <p className="text-xs text-ink/60">personas leyendo ahora</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/45">
                  Visitas por la dignidad
                </p>
                <p className="mt-2 font-display text-xl font-extrabold text-ink">
                  {formatNumber(visits)}+
                </p>
                <p className="text-xs text-ink/60">desde toda Bolivia</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onOpenTestimonial()
              }}
              className="btn-primary w-full"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Contar mi historia
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
