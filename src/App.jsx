import { useCallback, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Reality from './components/Reality'
import Testimonials from './components/Testimonials'
import Rights from './components/Rights'
import Directory from './components/Directory'
import Spread from './components/Spread'
import Footer from './components/Footer'
import TestimonialForm from './components/TestimonialForm'
import Modal from './components/ui/Modal'
import { useToast } from './hooks/useToast'
import { useLiveReaders } from './hooks/useLiveReaders'
import { INITIAL_TESTIMONIALS } from './data/content'
import {
  createId,
  loadPledgeState,
  loadUserTestimonials,
  registerVisit,
  savePledgeState,
  saveUserTestimonials,
} from './lib/storage'

/**
 * Composición principal de Caserito Digno.
 * El estado global vive aquí: visitas, testimonios de la comunidad y
 * compromisos ciudadanos. Todo persiste en localStorage.
 */
export default function App() {
  const readers = useLiveReaders()
  const [visits] = useState(() => registerVisit())
  const [userTestimonials, setUserTestimonials] = useState(() => loadUserTestimonials())
  const [pledge, setPledge] = useState(() => loadPledgeState())
  const [modalOpen, setModalOpen] = useState(false)
  const justSubmitted = useRef(false)
  const { notify } = useToast()

  const testimonials = useMemo(
    () => [...userTestimonials, ...INITIAL_TESTIMONIALS],
    [userTestimonials],
  )

  const openTestimonialModal = useCallback(() => setModalOpen(true), [])

  const closeTestimonialModal = useCallback(() => {
    setModalOpen(false)
    if (justSubmitted.current) {
      justSubmitted.current = false
      window.setTimeout(() => {
        document.getElementById('testimonios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }
  }, [])

  const handleTestimonialSubmit = useCallback(
    (data) => {
      const testimonial = {
        ...data,
        id: createId(),
        isNew: true,
        createdAt: Date.now(),
      }
      const next = [testimonial, ...userTestimonials].slice(0, 40)
      setUserTestimonials(next)
      saveUserTestimonials(next)
      justSubmitted.current = true
      notify('Gracias por compartir tu historia. Tu testimonio ya está publicado.')
    },
    [userTestimonials, notify],
  )

  const handlePledge = useCallback(() => {
    if (pledge.hasPledged) {
      notify('Ya eres parte de Caserito Digno. Gracias por sostener la campaña.', 'info')
      return
    }
    const next = { count: pledge.count + 1, hasPledged: true }
    setPledge(next)
    savePledgeState(next)
    notify('¡Bienvenido/a! Tu compromiso ciudadano ya suma a la campaña.')
  }, [pledge, notify])

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#inicio"
        className="sr-only z-[120] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido principal
      </a>

      <Navbar
        readers={readers}
        visits={visits}
        onOpenTestimonial={openTestimonialModal}
      />

      <main>
        <Hero
          readers={readers}
          visits={visits}
          onOpenTestimonial={openTestimonialModal}
        />
        <Reality />
        <Testimonials
          testimonials={testimonials}
          onOpenTestimonial={openTestimonialModal}
        />
        <Rights />
        <Directory />
        <Spread pledge={pledge} onPledge={handlePledge} />
      </main>

      <Footer />

      <Modal
        open={modalOpen}
        onClose={closeTestimonialModal}
        title="Registrar un testimonio"
        description="Tu historia se leerá con respeto. Puedes firmarla o publicarla de forma anónima."
      >
        <TestimonialForm
          onSubmit={handleTestimonialSubmit}
          onClose={closeTestimonialModal}
        />
      </Modal>
    </div>
  )
}
