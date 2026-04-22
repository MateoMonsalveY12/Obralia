'use client'

import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, HardHat } from 'lucide-react'

const FRAME_COUNT = 120
const PRELOAD_MIN = 30

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null))
  const currentFrameRef = useRef(-1)
  const rafRef = useRef<number>(0)

  const [canvasReady, setCanvasReady] = useState(false)
  const [framesFailed, setFramesFailed] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  // framer-motion scroll tracking — uses motion values, no React setState
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -50])

  // Preload frames — first 30 gate the canvas; any failure falls back to image
  useEffect(() => {
    let loaded = 0
    let anyFailed = false
    let readyFired = false

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`
      framesRef.current[i] = img

      img.onload = () => {
        if (anyFailed) return
        loaded++
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100))
        if (!readyFired && loaded >= PRELOAD_MIN) {
          readyFired = true
          setCanvasReady(true)
        }
      }
      img.onerror = () => {
        if (!anyFailed) {
          anyFailed = true
          setFramesFailed(true)
        }
      }
    }
  }, [])

  // Canvas DPR sizing — direct DOM, capped at 2x for mobile perf
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // RAF loop — never setState; direct canvas DOM manipulation only
  useEffect(() => {
    if (!canvasReady) return
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function drawFrame(idx: number) {
      const img = framesRef.current[idx]
      if (!img || !img.complete || img.naturalWidth === 0 || !canvas || !ctx) return
      const cw = canvas.width
      const ch = canvas.height
      const ratio = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * ratio
      const dh = img.naturalHeight * ratio
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    drawFrame(0)
    currentFrameRef.current = 0

    function tick() {
      const rect = section!.getBoundingClientRect()
      const scrollable = section!.offsetHeight - window.innerHeight
      if (scrollable > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
        const frameIdx = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT))
        if (frameIdx !== currentFrameRef.current) {
          currentFrameRef.current = frameIdx
          drawFrame(frameIdx)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [canvasReady])

  const sectionHeight = framesFailed ? '100vh' : '450vh'

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight, position: 'relative' }}
      aria-label="Sección principal"
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          opacity: heroOpacity,
        }}
      >
        {/* Static hero image — priority for LCP; always mounted, crossfades to canvas */}
        <NextImage
          src="/assets/hero-bg.jpg"
          alt="Vista aérea de obra de construcción colombiana al atardecer"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 5,
            opacity: canvasReady ? 0 : 1,
            transition: 'opacity 800ms ease',
          }}
        />

        {/* Canvas — frame-scrubbed on scroll via RAF loop */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            zIndex: 10,
            opacity: canvasReady ? 1 : 0,
            transition: 'opacity 800ms ease',
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay — always dark regardless of theme, hero is cinema */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, oklch(0.08 0.008 52 / 0.45) 0%, oklch(0.08 0.008 52 / 0.68) 50%, oklch(0.08 0.008 52 / 0.92) 100%)',
            zIndex: 15,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Frame preload progress bar */}
        {!canvasReady && !framesFailed && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              width: `${loadProgress}%`,
              backgroundColor: 'var(--ob-accent)',
              zIndex: 60,
              transition: 'width 300ms ease',
            }}
            aria-hidden="true"
          />
        )}

        {/* Hero content — z-index above canvas, below nav */}
        <motion.div
          style={{ y: textY, position: 'relative', zIndex: 30, height: '100%' }}
          className="ob-container"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              paddingTop: '68px',
              maxWidth: '860px',
            }}
          >
            {/* Compliance badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}
            >
              {['Decreto 1072', 'Res. 0312', 'RETIE'].map((badge) => (
                <span key={badge} className="ob-tag ob-tag-accent">
                  <Shield size={10} />
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Headline — hardcoded light color: always over dark cinematic overlay */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="ob-display"
              style={{ marginBottom: '1.5rem', color: 'oklch(0.95 0.005 52)' }}
            >
              Toda tu obra,
              <br />
              <span style={{ color: 'var(--ob-accent)' }}>un solo lugar.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: 1.72,
                color: 'oklch(0.75 0.010 52)',
              }}
            >
              Plataforma SaaS para constructoras, interventorías y firmas eléctricas
              colombianas. Del contrato al acta de liquidación — cronogramas, presupuestos,
              SST integrado y control de personal en tiempo real.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}
            >
              <a href="#demo" className="ob-btn ob-btn-primary ob-btn-lg">
                Solicitar Demo Gratis
                <ArrowRight size={16} />
              </a>
              {/* Ghost button hardcoded for dark background */}
              <a
                href="#funcionalidades"
                className="ob-btn ob-btn-lg"
                style={{
                  background: 'transparent',
                  color: 'oklch(0.93 0.006 52)',
                  border: '1px solid oklch(0.93 0.006 52 / 0.32)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'oklch(0.93 0.006 52 / 0.1)'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'oklch(0.93 0.006 52 / 0.55)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'oklch(0.93 0.006 52 / 0.32)'
                }}
              >
                Ver funcionalidades
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid oklch(0.93 0.006 52 / 0.14)',
              }}
            >
              {[
                { icon: <HardHat size={14} />, text: '+340 obras activas' },
                { icon: <Shield size={14} />, text: 'RLS multi-tenant' },
                { icon: <Zap size={14} />, text: 'Cumplimiento normativo' },
              ].map((item) => (
                <span
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8125rem',
                    color: 'oklch(0.70 0.010 52)',
                  }}
                >
                  <span style={{ color: 'var(--ob-accent)' }}>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
