'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      '"Antes manejábamos 8 obras con WhatsApp y Excel. Un incidente de trabajo en la obra del Sena casi nos cuesta la licencia. Con Obralia llevamos 14 meses sin un solo accidente registrable y el SGSST siempre al día para cualquier visita del Ministerio."',
    name: 'Alejandro Restrepo Ávila',
    role: 'Director de Obra',
    company: 'Construcciones Planificadas S.A.S.',
    city: 'Medellín, Antioquia',
    image: '/assets/testimonial-1.jpg',
    metric: '14 meses',
    metricLabel: 'Sin accidentes registrables',
  },
  {
    quote:
      '"El módulo de SST de Obralia no es un checklist genérico — entiende la diferencia entre un programa SST de constructora civil y uno de firma eléctrica. Por fin un software que habla colombiano. Las matrices de riesgo salen automáticas por tipo de obra."',
    name: 'Sandra Milena Ospina',
    role: 'Coordinadora SST',
    company: 'TELV Ingeniería Eléctrica',
    city: 'Bogotá D.C.',
    image: '/assets/testimonial-2.jpg',
    metric: '3h → 15min',
    metricLabel: 'Tiempo de informe mensual',
  },
  {
    quote:
      '"Tenemos interventoría en 6 contratos simultáneos con 3 constructoras distintas. Obralia nos permite ver el avance real vs. programado de cada uno y generar los informes de interventoría en minutos. Nuestros clientes nos preguntan qué herramienta usamos."',
    name: 'Jorge Eliecer Gómez',
    role: 'Gerente de Proyectos',
    company: 'Interventoría Andina Ltda.',
    city: 'Cali, Valle del Cauca',
    image: '/assets/testimonial-3.jpg',
    metric: '6',
    metricLabel: 'Contratos en simultáneo',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="ob-section"
      style={{
        backgroundColor: 'var(--ob-surface-1)',
        borderTop: '1px solid var(--ob-border)',
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="ob-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Lo que dicen en obra</p>
          <h2 id="testimonials-heading" className="ob-h1">
            Resultados reales,<br />no promesas.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--ob-border)',
            border: '1px solid var(--ob-border)',
            borderRadius: 'var(--ob-r-lg)',
            overflow: 'hidden',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'var(--ob-bg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Metric highlight */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--ob-border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ob-font-display)',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    color: 'var(--ob-accent)',
                    lineHeight: 1,
                  }}
                >
                  {t.metric}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--ob-text-3)', fontWeight: 500 }}>
                  {t.metricLabel}
                </span>
              </div>

              {/* Quote */}
              <div style={{ position: 'relative' }}>
                <Quote
                  size={20}
                  style={{
                    color: 'var(--ob-accent)',
                    opacity: 0.5,
                    marginBottom: '0.75rem',
                  }}
                  aria-hidden="true"
                />
                <blockquote
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    color: 'var(--ob-text-2)',
                    fontStyle: 'italic',
                  }}
                >
                  {t.quote}
                </blockquote>
              </div>

              {/* Author */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  marginTop: 'auto',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--ob-border)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid var(--ob-border)',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={t.image}
                    alt={`Foto de ${t.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="44px"
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--ob-font-body)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: 'var(--ob-text-1)',
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ob-text-3)' }}>
                    {t.role} · {t.company}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--ob-text-3)', marginTop: '0.1rem' }}>
                    {t.city}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
