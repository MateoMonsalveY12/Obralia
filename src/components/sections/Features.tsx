'use client'

import { motion } from 'framer-motion'
import {
  Building2, ShieldCheck, Zap, Users, FileBarChart2, Smartphone,
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Gestión de Obras',
    subtitle: 'Civil & Eléctrica',
    description:
      'Crea y administra múltiples obras simultáneas. Cronogramas, APUs, avance por actividad y bitácora digital — todo en tiempo real desde cualquier dispositivo.',
    span: 'wide',
    accent: true,
  },
  {
    icon: ShieldCheck,
    title: 'SST Integrado',
    subtitle: 'Decreto 1072 · Res. 0312',
    description:
      'SGSST completo: matriz de riesgos, plan de emergencias, permisos de trabajo, investigación de accidentes y seguimiento de afiliaciones ARL/EPS/Pensión.',
    span: 'normal',
    accent: false,
  },
  {
    icon: Zap,
    title: 'Proyectos Eléctricos',
    subtitle: 'RETIE · RETILAP',
    description:
      'Módulo especializado para obras eléctricas: planos, memorias de cálculo, inspecciones RETIE y gestión de materiales y subcontratistas especializados.',
    span: 'normal',
    accent: false,
  },
  {
    icon: Users,
    title: 'Control de Personal',
    subtitle: 'Nómina & Contratos',
    description:
      'Registro de trabajadores con cédula, cargo, ARL, EPS y AFP. Control de ingreso/salida por obra, exámenes médicos y vencimientos de documentos.',
    span: 'normal',
    accent: false,
  },
  {
    icon: FileBarChart2,
    title: 'Reportes Interventoría',
    subtitle: 'Informes automáticos',
    description:
      'Genera informes de interventoría (mensual, quincenal, semanal) con avance físico y financiero. Exporta en PDF para entregar al contratante.',
    span: 'normal',
    accent: false,
  },
  {
    icon: Smartphone,
    title: 'App Móvil de Campo',
    subtitle: 'Android & iOS',
    description:
      'El residente registra novedades, hace inspecciones de SST y reporta incidentes directamente desde la obra — funciona con conectividad limitada.',
    span: 'tall',
    accent: false,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const EASE = [0.16, 1, 0.3, 1] as const

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function Features() {
  return (
    <section id="funcionalidades" className="ob-section" aria-labelledby="features-heading">
      <div className="ob-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Plataforma completa</p>
          <h2 id="features-heading" className="ob-h1" style={{ maxWidth: '20ch', marginBottom: '1.25rem' }}>
            Todo lo que mueve una obra
          </h2>
          <p className="ob-body-lg" style={{ maxWidth: '52ch' }}>
            Seis módulos diseñados para la realidad de la construcción colombiana.
            Sin adaptar plantillas genéricas — construido sobre la normativa real.
          </p>
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--ob-border)',
            border: '1px solid var(--ob-border)',
            borderRadius: 'var(--ob-r-lg)',
            overflow: 'hidden',
          }}
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.article
                key={f.title}
                variants={item}
                style={{
                  backgroundColor: 'var(--ob-surface-1)',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  gridColumn: `span ${f.span === 'wide' ? 8 : 4}`,
                  cursor: 'default',
                  transition: 'background-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ob-surface-2)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ob-surface-1)'
                }}
                className={`feature-cell feature-${f.span}`}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--ob-r-md)',
                      backgroundColor: f.accent ? 'var(--ob-accent)' : 'var(--ob-accent-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: f.accent ? 'oklch(0.095 0.008 52)' : 'var(--ob-accent)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="ob-tag ob-tag-accent" style={{ fontSize: '0.6rem' }}>
                    {f.subtitle}
                  </span>
                </div>

                <div>
                  <h3
                    className="ob-h2"
                    style={{
                      fontSize: f.span === 'wide' ? 'clamp(1.5rem, 3vw, 2.25rem)' : 'clamp(1.125rem, 2vw, 1.5rem)',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      color: 'var(--ob-text-2)',
                      maxWidth: f.span === 'wide' ? '55ch' : '35ch',
                    }}
                  >
                    {f.description}
                  </p>
                </div>

                {f.span === 'wide' && (
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    {['Hitos', 'APU', 'Subcontratistas', 'Bitácora'].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.625rem',
                          borderRadius: '3px',
                          backgroundColor: 'var(--ob-surface-3)',
                          color: 'var(--ob-text-2)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            )
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feature-wide   { grid-column: span 12 !important; }
          .feature-normal { grid-column: span 6 !important; }
          .feature-tall   { grid-column: span 12 !important; }
        }
        @media (max-width: 520px) {
          .feature-normal { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  )
}
