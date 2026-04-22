'use client'

import { useState, useEffect } from 'react'
import ObraLogo from '@/components/ui/ObraLogo'
import { Menu, X, Sun, Moon } from 'lucide-react'

const links = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'SST', href: '#sst' },
  { label: 'Precios', href: '#precios' },
  { label: 'Testimonios', href: '#testimonios' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (localStorage.getItem('obralia-theme') as 'dark' | 'light') ?? 'dark'
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('obralia-theme', next)
  }

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--ob-z-nav)' as unknown as number,
        transition: 'background-color 220ms ease, border-color 220ms ease, backdrop-filter 220ms ease',
        backgroundColor: scrolled ? 'color-mix(in oklch, var(--ob-bg) 88%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid var(--ob-border)' : '1px solid transparent',
      }}
    >
      <div className="ob-container" style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '2rem' }}>
        {/* Logo */}
        <a href="#" aria-label="Ir al inicio de Obralia" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <ObraLogo size={28} showWordmark />
        </a>

        {/* Desktop links */}
        <div
          role="list"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
            marginLeft: 'auto',
            listStyle: 'none',
          }}
          className="hidden-mobile"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--ob-font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--ob-text-2)',
                textDecoration: 'none',
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--ob-r-md)',
                transition: 'color 150ms ease, background-color 150ms ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ob-text-1)'
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--ob-surface-2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ob-text-2)'
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: menuOpen ? 'auto' : undefined }}>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--ob-r-md)',
              border: '1px solid var(--ob-border)',
              backgroundColor: 'transparent',
              color: 'var(--ob-text-2)',
              cursor: 'pointer',
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--ob-surface-2)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ob-text-1)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ob-text-2)'
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#demo"
            className="ob-btn ob-btn-primary hidden-mobile"
            style={{ fontSize: '0.8125rem', padding: '0.6rem 1.25rem' }}
          >
            Solicitar Demo
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="show-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--ob-r-md)',
              border: '1px solid var(--ob-border)',
              backgroundColor: 'transparent',
              color: 'var(--ob-text-1)',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'var(--ob-surface-1)',
            borderTop: '1px solid var(--ob-border)',
            padding: '1rem',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--ob-font-body)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--ob-text-1)',
                textDecoration: 'none',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--ob-r-md)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setMenuOpen(false)}
            className="ob-btn ob-btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            Solicitar Demo
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
