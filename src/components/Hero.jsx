import ScrollExpandHero from './ui/ScrollExpandHero'

/**
 * Hero component para Caserito Digno.
 * Utiliza ScrollExpandHero (Desplácese para expandir / Scroll Expand Media de React Bits).
 */
export { default as ScrollExpandHero } from './ui/ScrollExpandHero'

export default function Hero({ readers, visits, onOpenTestimonial }) {
  return (
    <ScrollExpandHero
      readers={readers}
      visits={visits}
      onOpenTestimonial={onOpenTestimonial}
    />
  )
}
