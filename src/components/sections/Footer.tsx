'use client'

import ObraLogo from '@/components/ui/ObraLogo'
import { Shield } from 'lucide-react'

const links = {
  Producto: [
    { label: 'Gestión de Obras', href: '#funcionalidades' },
    { label: 'SST Integrado', href: '#sst' },
    { label: 'Proyectos Eléctricos', href: '#funcionalidades' },
    { label: 'App de Campo', href: '#funcionalidades' },
  ],
  Empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#demo' },
  ],
  Legal: [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Términos de Uso', href: '#' },
    { label: 'Política de Cookies', href: '#' },
    { label: 'Habeas Data', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--ob-border)',
        backgroundColor: 'var(--ob-surface-1)',
        paddingBlock: '4rem 2.5rem',
      }}
      role="contentinfo"
    >
      <div className="ob-container">
        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <ObraLogo size={30} showWordmark style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--ob-text-2)', lineHeight: 1.65, maxWidth: '32ch', marginBottom: '1.5rem' }}>
              Plataforma SaaS para la gestión integral de proyectos de construcción civil y
              eléctrica en Colombia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['ISO 27001', 'AWS sa-east-1', 'SSL/TLS'].map((b) => (
                <span key={b} className="ob-tag ob-tag-accent" style={{ fontSize: '0.6rem' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p
                style={{
                  fontFamily: 'var(--ob-font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-text-3)',
                  marginBottom: '1rem',
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--ob-text-2)',
                        textDecoration: 'none',
                        transition: 'color 150ms ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ob-text-1)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ob-text-2)' }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ backgroundColor: 'var(--ob-border)', height: '1px', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--ob-text-3)' }}>
            © {new Date().getFullYear()} Obralia SAS. Bogotá, Colombia.
          </p>

          {/* Habeas Data badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--ob-text-3)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--ob-r-sm)',
              border: '1px solid var(--ob-border)',
            }}
          >
            <Shield size={11} aria-hidden="true" />
            Ley 1581/2012 · Habeas Data Colombia
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
