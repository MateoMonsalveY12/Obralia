'use client'

const companies = [
  'Conconcreto',
  'Construcciones Planificadas',
  'Electrored Colombia',
  'Ingeniería & Obras S.A.S.',
  'Interventoría Andina',
  'Construm Ltda.',
  'Electro Proyectos SAS',
  'Grupo Constructor Caribe',
  'Obras & Soluciones',
  'TELV Ingeniería',
]

export default function SocialProof() {
  return (
    <section
      aria-label="Empresas colombianas que confían en Obralia"
      style={{
        borderTop: '1px solid var(--ob-border)',
        borderBottom: '1px solid var(--ob-border)',
        paddingBlock: '2.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--ob-surface-1)',
      }}
    >
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--ob-font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ob-text-3)' }}>
          Empresas colombianas que ya digitalizaron su operación
        </p>
      </div>

      {/* Infinite ticker */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        role="marquee"
        aria-label="Lista de empresas clientes"
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, var(--ob-surface-1) 0%, transparent 12%, transparent 88%, var(--ob-surface-1) 100%)',
          }}
        />

        <div
          className="ob-animate-ticker"
          style={{ display: 'flex', gap: '3rem', width: 'max-content' }}
        >
          {[...companies, ...companies].map((name, i) => (
            <div
              key={`${name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                whiteSpace: 'nowrap',
              }}
            >
              {/* Icon placeholder — would be real logo in production */}
              <div
                aria-hidden="true"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--ob-surface-3)',
                  border: '1px solid var(--ob-border)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--ob-font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--ob-text-2)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
