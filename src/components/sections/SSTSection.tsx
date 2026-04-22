'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FileText, AlertTriangle, Users, ClipboardList, Wrench } from 'lucide-react'

const sstItems = [
  {
    icon: ClipboardList,
    title: 'Programa SST',
    desc: 'Elabora y mantén actualizado el Programa de SST conforme al Decreto 1072 de 2015, Libro 2, Parte 2, Título 4, Capítulo 6.',
  },
  {
    icon: AlertTriangle,
    title: 'Investigación de Accidentes',
    desc: 'Registro, investigación y reporte de accidentes e incidentes laborales con causas raíces y acciones correctivas.',
  },
  {
    icon: FileText,
    title: 'Estándares Mínimos',
    desc: 'Cumplimiento de los 21 estándares mínimos de la Resolución 0312 de 2019 con semáforo de cumplimiento por obra.',
  },
  {
    icon: Users,
    title: 'Afiliaciones & ARL',
    desc: 'Control de afiliaciones a ARL, EPS y fondo de pensiones. Alertas automáticas por vencimientos y novedades de personal.',
  },
  {
    icon: Wrench,
    title: 'Permisos de Trabajo',
    desc: 'Permisos de trabajo en alturas, espacios confinados, trabajos en caliente y actividades de alto riesgo según normativa.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspecciones EPP',
    desc: 'Registro digital de entrega de EPP por trabajador, estado de los equipos e inspecciones de seguridad en campo.',
  },
]

export default function SSTSection() {
  return (
    <section
      id="sst"
      className="ob-section"
      style={{ borderTop: '1px solid var(--ob-border)' }}
      aria-labelledby="sst-heading"
    >
      <div className="ob-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 8vw, 7rem)',
            alignItems: 'start',
          }}
          className="sst-grid"
        >
          {/* Left — sticky text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'sticky', top: '120px' }}
            className="sst-sticky"
          >
            <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Diferenciador clave</p>
            <h2 id="sst-heading" className="ob-h1" style={{ marginBottom: '1.5rem' }}>
              SST que cumple la ley,
              <br />
              <span style={{ color: 'var(--ob-accent)' }}>sin abogados.</span>
            </h2>
            <p className="ob-body-lg" style={{ marginBottom: '2rem' }}>
              El SGSST no es opcional en Colombia — es una obligación legal con multas de hasta
              500 salarios mínimos (Art. 13, Ley 1562 de 2012). Obralia te ayuda a cumplir
              sin convertirlo en un proyecto paralelo de tiempo completo.
            </p>

            {/* Normativa badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {[
                'Decreto 1072/2015',
                'Resolución 0312/2019',
                'Ley 1562/2012',
                'NTC 4595',
                'GTC 45',
              ].map((n) => (
                <span key={n} className="ob-tag ob-tag-accent">{n}</span>
              ))}
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                backgroundColor: 'var(--ob-border)',
                border: '1px solid var(--ob-border)',
                borderRadius: 'var(--ob-r-md)',
                overflow: 'hidden',
              }}
            >
              {[
                { value: '500', unit: 'SMMLV', label: 'Multa máxima por incumplimiento SST' },
                { value: '21', unit: 'Estándares', label: 'Mínimos obligatorios Res. 0312' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    backgroundColor: 'var(--ob-surface-1)',
                    padding: '1.25rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--ob-font-display)',
                      fontWeight: 800,
                      fontSize: '2.25rem',
                      color: 'var(--ob-accent)',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ob-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                    {s.unit}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ob-text-2)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — feature list */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--ob-border)', border: '1px solid var(--ob-border)', borderRadius: 'var(--ob-r-lg)', overflow: 'hidden' }}
          >
            {sstItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{
                    backgroundColor: 'var(--ob-surface-1)',
                    padding: '1.5rem',
                    display: 'flex',
                    gap: '1rem',
                    transition: 'background-color 180ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ob-surface-2)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ob-surface-1)' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--ob-r-sm)',
                      backgroundColor: 'var(--ob-accent-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ob-accent)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--ob-font-display)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        textTransform: 'uppercase',
                        color: 'var(--ob-text-1)',
                        marginBottom: '0.375rem',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ob-text-2)' }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sst-grid   { grid-template-columns: 1fr !important; }
          .sst-sticky { position: static !important; }
        }
      `}</style>
    </section>
  )
}
