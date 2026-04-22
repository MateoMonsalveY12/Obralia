import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import ThemeScript from '@/components/providers/ThemeScript'

export const metadata: Metadata = {
  title: 'Obralia — Gestión Integral de Obras en Colombia',
  description:
    'Plataforma SaaS B2B para constructoras, interventorías y firmas eléctricas colombianas. Gestión de obras, SST integrado (Decreto 1072, Res. 0312), proyectos eléctricos (RETIE), control de personal y más.',
  keywords: [
    'software gestión de obras Colombia',
    'SST construcción',
    'plataforma constructoras',
    'SGSST Colombia',
    'gestión proyectos eléctricos',
    'interventoría software',
  ],
  openGraph: {
    title: 'Obralia — Gestión Integral de Obras en Colombia',
    description:
      'Centraliza tus obras, SST, personal y presupuestos en una sola plataforma diseñada para la normativa colombiana.',
    type: 'website',
    locale: 'es_CO',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head />
      <body>
        <ThemeScript />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
