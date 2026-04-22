'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, HardHat } from 'lucide-react'

const FRAME_COUNT = 120
const FRAMES_PATH = '/frames/frame_'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const tickingRef = useRef(false)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [useImageFallback, setUseImageFallback] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0.7, 1.0], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60])

  // Try to load frames; fall back to static image if unavailable
  useEffect(() => {
    let loaded = 0
    let failed = 0
    const frames: HTMLImageElement[] = []

    const checkFallback = () => {
      if (failed > FRAME_COUNT * 0.5) {
        setUseImageFallback(true)
        setFramesLoaded(true)
      }
    }

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      const padded = String(i).padStart(4, '0')
      img.src = `${FRAMES_PATH}${padded}.jpg`
      img.onload = () => {
        frames[i - 1] = img
        loaded++
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100))
        if (loaded === FRAME_COUNT) setFramesLoaded(true)
      }
      img.onerror = () => {
        failed++
        loaded++
        checkFallback()
      }
    }
    framesRef.current = frames
  }, [])

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Scroll-driven frame playback
  useEffect(() => {
    if (useImageFallback || !framesLoaded) return
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function drawFrame(frameIdx: number) {
      const img = framesRef.current[frameIdx]
      if (!img || !canvas || !ctx) return
      const isMobile = window.innerWidth < 768
      const scale = isMobile ? 1.3 : 1
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth * scale
      const ih = img.naturalHeight * scale
      const ratio = Math.max(cw / iw, ch / ih)
      const dw = iw * ratio
      const dh = ih * ratio
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    function onScroll() {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        const rect = section!.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -rect.top / (section!.offsetHeight - window.innerHeight)))
        const frameIdx = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT))
        if (frameIdx !== currentFrameRef.current) {
          currentFrameRef.current = frameIdx
          drawFrame(frameIdx)
        }
        tickingRef.current = false
      })
    }

    drawFrame(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [framesLoaded, useImageFallback])

  return (
    <section
      ref={sectionRef}
      style={{ height: useImageFallback ? '100vh' : '450vh', position: 'relative' }}
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
        {/* Background */}
        {useImageFallback ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/hero-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'block',
              zIndex: 'var(--ob-z-canvas)' as unknown as number,
            }}
            aria-hidden="true"
          />
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, oklch(0.095 0.008 52 / 0.55) 0%, oklch(0.095 0.008 52 / 0.72) 60%, oklch(0.095 0.008 52 / 0.95) 100%)',
            zIndex: 15,
          }}
          aria-hidden="true"
        />

        {/* Load bar */}
        {!framesLoaded && !useImageFallback && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: `${loadProgress}%`,
              backgroundColor: 'var(--ob-accent)',
              zIndex: 60,
              transition: 'width 200ms ease',
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
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
              maxWidth: '900px',
            }}
          >
            {/* Compliance badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
            >
              {['Decreto 1072', 'Res. 0312', 'RETIE'].map((badge) => (
                <span key={badge} className="ob-tag ob-tag-accent">
                  <Shield size={10} />
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="ob-display"
              style={{ marginBottom: '1.5rem' }}
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
              className="ob-body-lg"
              style={{ marginBottom: '2.5rem', maxWidth: '52ch' }}
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
              <a href="#funcionalidades" className="ob-btn ob-btn-ghost ob-btn-lg">
                Ver funcionalidades
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid oklch(0.93 0.007 52 / 0.12)',
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
                    color: 'var(--ob-text-2)',
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
