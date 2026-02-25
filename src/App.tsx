import React, { useEffect, useRef, useState } from 'react'
import { IoIosWarning, IoIosGitNetwork } from 'react-icons/io'
import { HiMiniBuildingOffice2 } from 'react-icons/hi2'

function useScrollReveal(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}

function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${direction} ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

type Testimonial = {
  quote: string
  author: string
}

const procesoSteps = [
  {
    number: 1,
    title: 'Exploración y alineamiento',
    description:
      'Definimos objetivos, decisiones clave y métricas que usaremos para medir éxito.',
    img: '/parte1.png',
  },
  {
    number: 2,
    title: 'Diseño del modelo y experiencia',
    description:
      'Diseñamos el modelo de datos y los tableros pensando en el día a día de los usuarios.',
    img: '/parte2.jpg',
  },
  {
    number: 3,
    title: 'Implementación y validación',
    description:
      'Conectamos fuentes, construimos dashboards y validamos con usuarios reales.',
    img: '/parte3.png',
  },
  {
    number: 4,
    title: 'Acompañamiento y mejora continua',
    description:
      'Monitoreamos adopción, ajustamos modelos y dejamos capacidades instaladas en tu equipo.',
    img: '/parte4.png',
  },
]

const empresasLogos = [
  'empresa1.png',
  'empresa2.png',
  'empresa3.jpg',
  'empresa4.png',
  'empresa5.jpg',
  'empresa6.png',
  'empresa7.png',
  'empresa8.png',
  'empresa9.png',
  'empresa10.jfif',
  'empresa11.png',
  'empresa14.jpg',
]

const testimonials: Testimonial[] = [
  {
    quote:
      '“Logramos implementar desde cero el sistema de gestión de inversiones del family office chileno. Gracias a la asesoría e implementación de Matisi Consulting utilizando Qlik, tenemos siempre disponible toda la información necesaria para analizar y tomar decisiones sobre los portafolios.”',
    author: 'Juan Pablo P.',
  },
  {
    quote:
      '“Hoy contamos con modelos de análisis de información sobre lo que sucede en Mercado Público, esto es de mucho valor para estudiar y mejorar las propuestas que realizamos, hemos logrado adjudicar con mejores condiciones.”',
    author: 'Constructora Chilena',
  },
]

function DiagonalArrow({ direction = 'down' }: { direction?: 'down' | 'up' }) {
  return (
    <div
      className={`timeline__diagonal-arrow timeline__diagonal-arrow--${direction}`}
      aria-hidden
    >
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === 'down' ? (
          <>
            <line
              x1="5"
              y1="5"
              x2="75"
              y2="55"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
            />
            <polygon points="75,55 60,50 70,40" fill="var(--color-primary)" />
          </>
        ) : (
          <>
            <line
              x1="5"
              y1="55"
              x2="75"
              y2="5"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
            />
            <polygon points="75,5 60,10 70,20" fill="var(--color-primary)" />
          </>
        )}
      </svg>
    </div>
  )
}

function ProcesoStepCard({
  step,
  index,
}: {
  step: (typeof procesoSteps)[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="timeline__card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <div className="timeline__content">
        <img
          src={step.img}
          alt={step.title}
          className="timeline__image"
        />
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 9000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="page">
      <header className="navbar">
        <a href="#inicio" className="navbar__logo" aria-label="Matisi Consulting - Inicio">
          <img src="/logomatisi.png" alt="Matisi Consulting" className="navbar__logo-img" />
        </a>
        <nav className="navbar__links">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#experiencias">Experiencias</a>
          <a href="#equipo">Equipo</a>
          <a href="#contacto">Contacto</a>
          <button className="btn btn--primary">Agendar reunión</button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero__media">
            <div className="hero__video-wrap">
              <video
                className="hero__video"
                src="/videomatisi.mp4"
                playsInline
                muted
                loop
                autoPlay
                aria-label="Video presentación Matisi"
              />
            </div>
          </div>
          <div className="hero__content">
            <p className="eyebrow">Consultoría en datos para empresas que quieren ir un paso adelante</p>
            <h1>Decisiones estratégicas respaldadas por datos que todos confían.</h1>
            <p className="hero__subtitle">
              En Matisi diseñamos, implementamos y operamos soluciones analíticas que conectan tus datos con la
              estrategia del negocio.
            </p>
          </div>
        </section>
        <section className="section section--datos-ia" aria-label="Nuestra propuesta y resultados">
          <ScrollReveal>
            <div className="datos-ia-header">
              <div className="datos-ia-header__icon" aria-hidden>
                <img src="/organizaciones.png" alt="" />
              </div>
              <div className="datos-ia-header__text">
                <h2 className="datos-ia-title">
                  <span className="datos-ia-title__prefix">Para organizaciones que</span>
                  <span className="datos-ia-title__accent">ya generan datos y quieren usarlos como ventaja</span>
                </h2>
                <span className="datos-ia-line" aria-hidden />
                <p className="datos-ia-desc">
                  Resolvemos decisiones lentas, reportes manuales y equipos que no confían en la misma versión del dato,
                  con un enfoque ágil y de acompañamiento continuo.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
          <div className="datos-ia-cards">
            <article className="datos-ia-card">
              <div className="datos-ia-card__icon datos-ia-card__icon--svg" aria-hidden>
                <HiMiniBuildingOffice2 style={{ width: '100%', height: '100%', color: '#00c5e8', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <h3>Para qué tipo de empresa</h3>
              <p>
                Organizaciones que ya generan datos, pero aún no los usan como ventaja competitiva.
              </p>
            </article>
            <article className="datos-ia-card">
              <div className="datos-ia-card__icon datos-ia-card__icon--svg" aria-hidden>
                <IoIosWarning style={{ width: '100%', height: '100%', color: '#00c5e8', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <h3>Qué problema resolvemos</h3>
              <p>
                Decisiones lentas, reportes manuales, equipos que no confían en la misma versión del dato.
              </p>
            </article>
            <article className="datos-ia-card">
              <div className="datos-ia-card__icon datos-ia-card__icon--svg" aria-hidden>
                <IoIosGitNetwork style={{ width: '100%', height: '100%', color: '#00c5e8', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <h3>Cómo lo hacemos</h3>
              <p>
                Proyectos cortos, con resultados visibles temprano y acompañamiento posterior.
              </p>
            </article>
          </div>
          </ScrollReveal>
        </section>

        <section className="section section--light" id="porque-matisi">
          <ScrollReveal>
            <div className="section__header">
              <p className="eyebrow">Conoce nuestra forma de trabajar</p>
              <h2>De dolores difusos a indicadores concretos.</h2>
            </div>
          </ScrollReveal>
          <div className="pains-grid">
            <ScrollReveal direction="left" delay={0.08}>
              <div className="pains-grid__col">
              <h3>Lo que escuchamos de nuestros clientes</h3>
              <ul className="pill-list">
                <li>“Tenemos datos por todos lados y nadie confía en ellos.”</li>
                <li>“Dependemos de una persona clave para cada Excel importante.”</li>
                <li>“No sabemos si la inversión en datos está realmente dando resultado.”</li>
              </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.08}>
              <div className="pains-grid__col pains-grid__col--solution">
                <h3>Cómo respondemos desde Matisi</h3>
              <ul className="pill-list pill-list--accent">
                <li>Definimos juntos las decisiones críticas que quieres mejorar.</li>
                <li>Diseñamos un modelo de datos que conversa con tu lenguaje de negocio.</li>
                <li>Dejamos capacidades instaladas en tu equipo, no solo un proyecto entregado.</li>
              </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section" id="servicios">
          <ScrollReveal>
            <div className="section__header section__header--center">
              <div className="section-heading-line" aria-hidden />
              <p className="eyebrow">Qué podemos hacer juntos</p>
              <h2>Servicios pensados para diferentes etapas de madurez analítica</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
          <div className="grid grid--2 grid--servicios">
            <article className="service-card service-card--highlight">
              <div className="service-card__image">
                <img src="/sevicios/servicios3.jpg" alt="" />
              </div>
              <div className="service-card__body">
                <span className="service-card__tag">Ideal si estás partiendo</span>
                <h3>Assessment de Estrategia de Datos</h3>
                <p>
                  Un diagnóstico claro de tu situación actual y una hoja de ruta priorizada para que tus datos empiecen a
                  trabajar por el negocio.
                </p>
                <ul>
                  <li>Evaluación de madurez y arquitectura actual.</li>
                  <li>Mapa de iniciativas y quick wins.</li>
                  <li>Recomendaciones de gobierno y roles.</li>
                </ul>
              </div>
            </article>
            <article className="service-card">
              <div className="service-card__image">
                <img src="/sevicios/sevicios1.jpg" alt="" />
              </div>
              <div className="service-card__body">
                <span className="service-card__tag">Proyectos</span>
                <h3>Consultoría Business Intelligence</h3>
                <p>Implementamos soluciones analíticas end-to-end sobre tus plataformas actuales.</p>
                <ul>
                  <li>Discovery de negocio y diseño de modelo.</li>
                  <li>Desarrollo de dashboards y reportes.</li>
                  <li>Capacitación de usuarios clave.</li>
                </ul>
              </div>
            </article>
            <article className="service-card">
              <div className="service-card__image">
                <img src="/sevicios/sevicios2.png" alt="" />
              </div>
              <div className="service-card__body">
                <span className="service-card__tag">Operación continua</span>
                <h3>Continuidad operativa de tu plataforma</h3>
                <p>Mantenemos tus aplicaciones analíticas disponibles, seguras y actualizadas.</p>
                <ul>
                  <li>Gestión de versiones, licencias y releases.</li>
                  <li>Soporte y resolución de incidentes.</li>
                  <li>Monitoreo y recomendaciones de mejora.</li>
                </ul>
              </div>
            </article>
            <article className="service-card">
              <div className="service-card__image">
                <img src="/sevicios/servicios4.png" alt="" />
              </div>
              <div className="service-card__body">
                <span className="service-card__tag">Equipo extendido</span>
                <h3>Talento como servicio</h3>
                <p>Sumamos especialistas en datos a tu organización sin aumentar tu estructura fija.</p>
                <ul>
                  <li>Ingenieros, arquitectos y analistas de datos.</li>
                  <li>Project managers con foco analítico.</li>
                  <li>Seguimiento constante de desempeño.</li>
                </ul>
              </div>
            </article>
          </div>
          </ScrollReveal>
        </section>

        <div className="section-divider" aria-hidden>
          <img src="/separador-bordes/separador1.png" alt="" className="section-divider__img" />
        </div>

        <section className="section section--timeline" id="proceso">
          <ScrollReveal>
            <div className="section__header">
              <p className="eyebrow">Proceso</p>
              <div className="eyebrow-lines" aria-hidden><span /><span /><span /></div>
              <h2>Cómo se ve un proyecto típico con Matisi</h2>
            </div>
          </ScrollReveal>
          <div className="timeline">
            {procesoSteps.map((step, i) => (
              <React.Fragment key={step.number}>
                <div
                  className={`timeline__card-group ${i === 1 || i === 3 ? 'timeline__card-group--down' : ''}`}
                >
                  <span className="timeline__step" aria-hidden>
                    {step.number}
                  </span>
                  <ProcesoStepCard step={step} index={i} />
                </div>
                {i < procesoSteps.length - 1 && (
                  <DiagonalArrow direction={i % 2 === 0 ? 'down' : 'up'} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="section section--light section--partners" id="partners">
          <ScrollReveal>
            <div className="section__header">
              <p className="eyebrow">Ecosistema</p>
              <h2>Partners tecnológicos con los que trabajamos</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <div className="partners-row">
            <div className="partner-logo">
              <img src="/partner1.png" alt="Partner 1" />
            </div>
            <div className="partner-logo">
              <img src="/partner2.png" alt="Partner 2" />
            </div>
            <div className="partner-logo">
              <img src="/partner3.png" alt="Partner 3" />
            </div>
            <div className="partner-logo">
              <img src="/partner4.png" alt="Partner 4" />
            </div>
            <div className="partner-logo">
              <img src="/partner5.png" alt="Partner 5" />
            </div>
          </div>
          </ScrollReveal>
        </section>

        <section className="section section--testimonials" id="experiencias">
          <ScrollReveal>
          <div className="testimonials-layout">
            <div className="testimonials-copy">
              <p className="eyebrow">Testimonios</p>
              <div className="eyebrow-lines" aria-hidden><span /><span /><span /></div>
              <h2>¿Qué están diciendo nuestros clientes sobre nuestro trabajo?</h2>
              <p>
                Casos reales de organizaciones que hoy toman decisiones con más contexto, velocidad y confianza gracias a
                sus datos.
              </p>
            </div>
            <div className="testimonials-slider">
              <div
                className="testimonials-slider__track"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((item, index) => (
                  <article
                    key={item.author}
                    className={`testimonial-card testimonials-slider__slide${
                      index === activeTestimonial ? ' testimonials-slider__slide--active' : ''
                    }`}
                  >
                    <p className="testimonial-card__quote">{item.quote}</p>
                    <p className="testimonial-card__author">{item.author}</p>
                  </article>
                ))}
              </div>
              <div className="testimonials-slider__arrows">
                <button
                  type="button"
                  className="slider-arrow"
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                  }
                  aria-label="Testimonio anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="slider-arrow"
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  aria-label="Siguiente testimonio"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <section className="section section--empresas" id="empresas" aria-label="Empresas que confían en nosotros">
          <ScrollReveal>
            <div className="section__header">
              <p className="eyebrow">Empresas</p>
              <div className="eyebrow-lines" aria-hidden><span /><span /><span /></div>
              <h2>Organizaciones que confían en Matisi</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <div className="empresas-marquee">
            <div className="empresas-track">
              {empresasLogos.map((file) => (
                <div key={file} className="empresa-logo">
                  <img src={`/empresas/${file}`} alt="" />
                </div>
              ))}
              {empresasLogos.map((file) => (
                <div key={`dup-${file}`} className="empresa-logo" aria-hidden>
                  <img src={`/empresas/${file}`} alt="" />
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </section>

        <section className="section section--cta" id="contacto">
          <ScrollReveal>
          <div className="cta-grid">
            <div className="cta-copy">
              <p className="eyebrow cta-eyebrow">Conectemos</p>
              <div className="cta-eyebrow-lines" aria-hidden>
                <span /><span /><span />
              </div>
              <h2>Experimente la evolución de su empresa</h2>
              <p>
                Los datos son el nuevo petróleo del siglo XXI; es importante que los consideremos como un activo. No
                esperes más para diseñar tu estrategia y comenzar a ejecutarla. Trabajando juntos, podemos llevar a tu
                empresa al siguiente nivel y convertirla en una organización orientada a los datos.
              </p>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Tu Nombre" />
              <input type="email" placeholder="Tu Correo Electrónico" />
              <input type="text" placeholder="Asunto" />
              <textarea placeholder="Escribe acá tu mensaje..." rows={4} />
              <button className="btn contact-form__submit" type="submit">
                Enviar
              </button>
            </form>
          </div>
          </ScrollReveal>
        </section>
      </main>

      <div className="footer-border" aria-hidden />

      <footer className="footer">
        <div className="footer__top">
          <div>
            <div className="footer__logo">Matisi Consulting</div>
            <p className="footer__tagline">Tus asesores en analítica y datos.</p>
          </div>
          <div className="footer__cols">
            <div>
              <h4>Enlaces</h4>
              <ul>
                <li>
                  <a href="#inicio">Inicio</a>
                </li>
                <li>
                  <a href="#servicios">Servicios</a>
                </li>
                <li>
                  <a href="#experiencias">Experiencias</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li>
                  <a href="mailto:contacto@matisiconsulting.com">contacto@matisiconsulting.com</a>
                </li>
                <li>
                  <a href="tel:+56993488582">+56 9 9348 8582</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2023 Matisi Consulting. Todos los derechos reservados.</span>
          <a href="#privacidad">Privacidad</a>
        </div>
      </footer>
    </div>
  )
}

export default App

