'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const companyTypes = [
  { value: 'constructora', label: 'Constructora' },
  { value: 'interventoria', label: 'Interventoría' },
  { value: 'firma_electrica', label: 'Firma Eléctrica' },
  { value: 'otra', label: 'Otra' },
]

export default function CTAForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const fd = new FormData(e.currentTarget)
    const body = {
      full_name:             fd.get('full_name') as string,
      email:                 fd.get('email') as string,
      phone:                 fd.get('phone') as string,
      company_name:          fd.get('company_name') as string,
      company_type:          fd.get('company_type') as string,
      active_projects_count: fd.get('active_projects_count') as string,
      message:               fd.get('message') as string,
    }

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al enviar')
      }
      setStatus('success')
      formRef.current?.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Error inesperado. Intenta de nuevo.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--ob-font-body)',
    fontSize: '0.9rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--ob-r-md)',
    border: '1px solid var(--ob-border)',
    backgroundColor: 'var(--ob-surface-2)',
    color: 'var(--ob-text-1)',
    outline: 'none',
    transition: 'border-color 150ms ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--ob-font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--ob-text-2)',
    marginBottom: '0.4rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  }

  return (
    <section
      id="demo"
      className="ob-section"
      style={{
        backgroundColor: 'var(--ob-surface-1)',
        borderTop: '1px solid var(--ob-border)',
      }}
      aria-labelledby="cta-heading"
    >
      <div className="ob-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 8vw, 7rem)',
            alignItems: 'start',
          }}
          className="cta-grid"
        >
          {/* Left — value prop */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="ob-eyebrow" style={{ marginBottom: '0.875rem' }}>Sin compromisos</p>
            <h2 id="cta-heading" className="ob-h1" style={{ marginBottom: '1.5rem' }}>
              30 minutos.<br />
              <span style={{ color: 'var(--ob-accent)' }}>Tu obra, en vivo.</span>
            </h2>
            <p className="ob-body-lg" style={{ marginBottom: '2.5rem' }}>
              Agendamos una demo personalizada con tus obras reales.
              Sin vendedores que te lean un script — directamente con
              quien sabe de construcción colombiana.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', listStyle: 'none' }}>
              {[
                'Demo en vivo de los módulos que necesitas',
                'Configuración de prueba con tus datos reales',
                'Respuesta en menos de 2 horas hábiles',
                'Sin tarjeta de crédito requerida',
              ].map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--ob-text-2)' }}
                >
                  <CheckCircle2 size={15} style={{ color: 'var(--ob-success)', flexShrink: 0 }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div
                className="ob-card"
                style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--ob-success-bg)',
                  borderColor: 'color-mix(in oklch, var(--ob-success) 40%, transparent)',
                }}
                role="alert"
                aria-live="polite"
              >
                <CheckCircle2
                  size={40}
                  style={{ color: 'var(--ob-success)', margin: '0 auto 1rem' }}
                  aria-hidden="true"
                />
                <h3
                  style={{
                    fontFamily: 'var(--ob-font-display)',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    color: 'var(--ob-text-1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  ¡Solicitud recibida!
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ob-text-2)' }}>
                  Te contactamos en menos de 2 horas hábiles para agendar tu demo.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="ob-card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                noValidate
              >
                <h3
                  style={{
                    fontFamily: 'var(--ob-font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    color: 'var(--ob-text-1)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Solicitar demo gratuita
                </h3>

                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label htmlFor="full_name" style={labelStyle}>Nombre completo *</label>
                    <input id="full_name" name="full_name" type="text" required autoComplete="name" style={inputStyle} placeholder="Alejandro Restrepo" />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Correo corporativo *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" style={inputStyle} placeholder="alejandro@constructora.co" />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label htmlFor="company_name" style={labelStyle}>Empresa *</label>
                    <input id="company_name" name="company_name" type="text" required style={inputStyle} placeholder="Construcciones SAS" />
                  </div>
                  <div>
                    <label htmlFor="phone" style={labelStyle}>Celular</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" style={inputStyle} placeholder="+57 300 000 0000" />
                  </div>
                </div>

                {/* Row 3 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label htmlFor="company_type" style={labelStyle}>Tipo de empresa</label>
                    <select id="company_type" name="company_type" style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Seleccionar...</option>
                      {companyTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="active_projects_count" style={labelStyle}>Obras activas aprox.</label>
                    <select id="active_projects_count" name="active_projects_count" style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Seleccionar...</option>
                      <option value="1-5">1 a 5</option>
                      <option value="6-20">6 a 20</option>
                      <option value="21-50">21 a 50</option>
                      <option value="50+">Más de 50</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>¿Qué necesitas resolver? (opcional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    placeholder="Ej: Necesito mejorar el control de SST en mis obras de la Costa Caribe..."
                  />
                </div>

                {error && (
                  <p role="alert" aria-live="assertive" style={{ fontSize: '0.85rem', color: 'var(--ob-danger)', padding: '0.75rem 1rem', backgroundColor: 'var(--ob-danger-bg)', borderRadius: 'var(--ob-r-sm)', border: '1px solid color-mix(in oklch, var(--ob-danger) 40%, transparent)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="ob-btn ob-btn-primary ob-btn-lg"
                  style={{ justifyContent: 'center', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Agendar demo gratuita
                      <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--ob-text-3)', textAlign: 'center' }}>
                  Al enviar, aceptas nuestra{' '}
                  <a href="#" style={{ color: 'var(--ob-accent)', textDecoration: 'underline' }}>
                    Política de Privacidad
                  </a>{' '}
                  conforme a la Ley 1581 de 2012 (Habeas Data Colombia).
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
