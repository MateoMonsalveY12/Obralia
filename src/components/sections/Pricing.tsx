'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Básico',
    description: 'Para empresas con hasta 5 obras activas.',
    monthlyPrice: 450000,
    yearlyPrice: 360000,
    cta: 'Empezar gratis',
    ctaHref: '#demo',
    features: [
      'Hasta 5 obras activas',
      'Hasta 50 trabajadores',
      'Módulo SST básico (Res. 0312)',
      'Control de personal',
      'Informes básicos',
      'App móvil de campo',
      'Soporte por email',
    ],
    highlight: false,
  },
  {
    name: 'Profesional',
    description: 'Para constructoras con múltiples obras simultáneas.',
    monthlyPrice: 890000,
    yearlyPrice: 712000,
    cta: 'Solicitar demo',
    ctaHref: '#demo',
    features: [
      'Obras ilimitadas',
      'Hasta 300 trabajadores',
      'SST completo + SGSST',
      'Módulo eléctrico (RETIE)',
      'Cronogramas y APUs',
      'Interventoría y reportes PDF',
      'Subcontratistas',
      'Multi-sede',
      'Soporte prioritario',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'Para grupos constructores con 20+ obras o interventorías.',
    monthlyPrice: null,
    yearlyPrice: null,
    cta: 'Hablar con ventas',
    ctaHref: '#demo',
    features: [
      'Todo lo de Profesional',
      'Usuarios ilimitados',
      'API para integración ERP',
      'SSO / Active Directory',
      'SLA 99.9% uptime',
      'Gestor de cuenta dedicado',
      'Capacitación in-situ',
      'Datos en servidor colombiano',
    ],
    highlight: false,
  },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section
      id="precios"
      className="ob-section"
      style={{ borderTop: '1px solid var(--ob-border)' }}
      aria-labelledby="pricing-heading"
    >
      <div className="ob-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Precios en COP</p>
          <h2 id="pricing-heading" className="ob-h1" style={{ marginBottom: '2rem' }}>
            Sin letras pequeñas.
          </h2>

          {/* Billing toggle */}
          <div
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', cursor: 'pointer' }}
            onClick={() => setAnnual(!annual)}
            role="switch"
            aria-checked={annual}
            aria-label="Cambiar entre facturación mensual y anual"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAnnual(!annual) }}
          >
            <span style={{ fontSize: '0.875rem', color: !annual ? 'var(--ob-text-1)' : 'var(--ob-text-3)', fontWeight: !annual ? 600 : 400 }}>
              Mensual
            </span>
            <div
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: annual ? 'var(--ob-accent)' : 'var(--ob-surface-3)',
                position: 'relative',
                transition: 'background-color 200ms ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: annual ? '23px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  transition: 'left 200ms ease',
                }}
              />
            </div>
            <span style={{ fontSize: '0.875rem', color: annual ? 'var(--ob-text-1)' : 'var(--ob-text-3)', fontWeight: annual ? 600 : 400 }}>
              Anual
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '0.375rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  borderRadius: '3px',
                  backgroundColor: 'var(--ob-accent-bg)',
                  color: 'var(--ob-accent)',
                }}
              >
                −20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
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
          className="pricing-grid"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: plan.highlight ? 'var(--ob-accent-bg)' : 'var(--ob-surface-1)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--ob-accent)',
                  }}
                  aria-hidden="true"
                />
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--ob-font-display)',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      textTransform: 'uppercase',
                      color: 'var(--ob-text-1)',
                    }}
                  >
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="ob-tag ob-tag-accent">Recomendado</span>
                  )}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--ob-text-2)' }}>{plan.description}</p>
              </div>

              {/* Price */}
              <div>
                {plan.monthlyPrice ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--ob-font-display)',
                          fontWeight: 800,
                          fontSize: '2.5rem',
                          color: 'var(--ob-text-1)',
                          lineHeight: 1,
                        }}
                      >
                        {fmt(annual ? plan.yearlyPrice : plan.monthlyPrice)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ob-text-3)', marginTop: '0.25rem' }}>
                      COP / mes {annual ? '· facturado anualmente' : ''}
                    </p>
                  </>
                ) : (
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--ob-font-display)',
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: 'var(--ob-text-1)',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      A la medida
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ob-text-3)', marginTop: '0.25rem' }}>
                      Volumen · SLA · Integración ERP
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={`ob-btn ${plan.highlight ? 'ob-btn-primary' : 'ob-btn-ghost'}`}
                style={{ justifyContent: 'center' }}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </a>

              {/* Features */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', listStyle: 'none' }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--ob-text-2)' }}
                  >
                    <Check size={13} style={{ color: 'var(--ob-success)', flexShrink: 0 }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--ob-text-3)',
          }}
        >
          Todos los planes incluyen soporte en español, datos en servidores de São Paulo (AWS sa-east-1) y cumplimiento Ley 1581 (Habeas Data).
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
