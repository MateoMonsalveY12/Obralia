'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TrendingUp, Users, AlertTriangle, CheckCircle2 } from 'lucide-react'

const metrics = [
  { label: 'Obras activas', value: '12', icon: TrendingUp, change: '+3 este mes' },
  { label: 'Personal en campo', value: '84', icon: Users, change: '6 obras' },
  { label: 'Incidentes SST', value: '0', icon: AlertTriangle, change: 'Último mes' },
  { label: 'Documentos al día', value: '98%', icon: CheckCircle2, change: 'Cumplimiento' },
]

export default function DemoBento() {
  return (
    <section
      style={{ backgroundColor: 'var(--ob-surface-1)', borderTop: '1px solid var(--ob-border)' }}
      className="ob-section"
      aria-labelledby="demo-heading"
    >
      <div className="ob-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)', maxWidth: '600px' }}
        >
          <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Vista del producto</p>
          <h2 id="demo-heading" className="ob-h1" style={{ marginBottom: '1.25rem' }}>
            Tu operación, de un vistazo
          </h2>
          <p className="ob-body-lg">
            Un dashboard que el Director de Obra entiende en 10 segundos.
            Nada irrelevante. Todo lo que necesita para tomar decisiones.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
          }}
        >
          {/* Main dashboard screenshot — large */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="ob-card bento-main"
            style={{
              gridColumn: 'span 8',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '380px',
            }}
          >
            <Image
              src="/assets/dashboard-preview.jpg"
              alt="Dashboard Obralia — vista de proyectos activos, cronograma y métricas SST"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top left' }}
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--ob-surface-1) 0%, transparent 40%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
              <span className="ob-tag ob-tag-success">En vivo</span>
              <p
                style={{
                  fontFamily: 'var(--ob-font-display)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: 'var(--ob-text-1)',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                Dashboard principal
              </p>
            </div>
          </motion.div>

          {/* Metrics column */}
          <div
            className="bento-metrics"
            style={{
              gridColumn: 'span 4',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="ob-card"
                  style={{ padding: '1.25rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ob-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {m.label}
                    </p>
                    <Icon size={14} style={{ color: 'var(--ob-accent)' }} />
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--ob-font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: 'var(--ob-text-1)',
                      lineHeight: 1,
                      marginBottom: '0.375rem',
                    }}
                  >
                    {m.value}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ob-text-3)' }}>{m.change}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile app preview */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="ob-card bento-mobile"
            style={{
              gridColumn: 'span 4',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
            }}
          >
            <Image
              src="/assets/mobile-app.jpg"
              alt="App móvil de campo Obralia — inspección SST en sitio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--ob-surface-1) 0%, transparent 50%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
              <p
                style={{
                  fontFamily: 'var(--ob-font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--ob-text-1)',
                  textTransform: 'uppercase',
                }}
              >
                App de campo
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ob-text-2)', marginTop: '0.25rem' }}>
                Inspecciones SST desde la obra
              </p>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="ob-card bento-cta"
            style={{
              gridColumn: 'span 8',
              padding: '2rem',
              backgroundColor: 'var(--ob-accent-bg)',
              borderColor: 'color-mix(in oklch, var(--ob-accent) 30%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--ob-font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  color: 'var(--ob-text-1)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                ¿Quieres ver el tuyo?
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ob-text-2)' }}>
                Demo personalizada con tus obras reales. Sin tarjeta de crédito.
              </p>
            </div>
            <a href="#demo" className="ob-btn ob-btn-primary">
              Agenda tu demo
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-main    { grid-column: span 12 !important; }
          .bento-metrics { grid-column: span 12 !important; flex-direction: row !important; flex-wrap: wrap !important; }
          .bento-metrics > * { flex: 1 1 calc(50% - 0.5rem); min-width: 140px; }
          .bento-mobile  { grid-column: span 12 !important; }
          .bento-cta     { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  )
}
