import { ArrowUp, HeartHandshake, MapPin } from 'lucide-react'
import Logo from './ui/Logo'
import { DIAGNOSIS_ZONES, NAV_LINKS } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.9fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
              Caserito Digno es una iniciativa de concientización ciudadana nacida en La Paz,
              Bolivia. Visibiliza la realidad de los vendedores y vendedoras ambulantes, defiende su
              dignidad laboral y acerca información sobre salud, derechos y espacios de apoyo.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-sage">
              <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Vender en la calle es trabajo honrado, no delito.
            </p>
          </div>

          <nav aria-label="Enlaces rápidos del footer">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-sage">
              Secciones
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#inicio"
                  className="text-sm text-white/65 transition hover:text-peach"
                >
                  Inicio
                </a>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-white/65 transition hover:text-peach"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-sage">
              Diagnóstico social comunitario
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              La campaña recoge las voces del comercio popular paceño en:
            </p>
            <ul className="mt-3 space-y-2">
              {DIAGNOSIS_ZONES.map((zone) => (
                <li key={zone} className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-display text-base font-bold leading-snug text-peach sm:text-lg">
            «El valor del trabajo nace de la dignidad de quien lo realiza».
          </p>
          <a
            href="#inicio"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-peach hover:text-peach"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Caserito Digno · La Paz, Bolivia</p>
          <p>Prototipo ciudadano sin fines de lucro · Hecho con respeto por el comercio popular.</p>
        </div>
      </div>
    </footer>
  )
}
