import { test, expect } from '@playwright/test'

const BASE = 'https://obraliaops.site'

test.describe('Obralia Landing — Core', () => {
  test('landing carga correctamente y LCP < 2.5s', async ({ page }) => {
    // Listen for LCP via PerformanceObserver
    await page.addInitScript(() => {
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          ;(window as Record<string, unknown>).__lcpValue = entry.startTime
        }
      })
      obs.observe({ type: 'largest-contentful-paint', buffered: true })
    })

    const resp = await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })
    expect(resp?.status()).toBe(200)

    // Check page title
    await expect(page).toHaveTitle(/Obralia/i)

    // Check HTML lang
    const lang = await page.getAttribute('html', 'lang')
    expect(lang).toBe('es-CO')

    // Evaluate LCP
    const lcp = await page.evaluate(() => (window as Record<string, unknown>).__lcpValue as number | undefined)
    if (lcp !== undefined) {
      console.log(`LCP: ${lcp.toFixed(0)}ms`)
      expect(lcp).toBeLessThan(2500)
    }
  })

  test('hero section renderiza y tiene elementos clave', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    // Main heading visible
    const heading = page.locator('h1')
    await expect(heading.first()).toBeVisible()
    const h1Text = await heading.first().textContent()
    expect(h1Text).toBeTruthy()

    // CTA buttons exist
    const ctaLinks = page.locator('a:has-text("Demo"), a:has-text("demo")')
    await expect(ctaLinks.first()).toBeVisible()

    // Compliance badges
    const badge = page.locator('text=Decreto 1072')
    await expect(badge.first()).toBeVisible()
  })

  test('nav es sticky y aplica blur al hacer scroll', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const nav = page.locator('nav[role="navigation"]')
    await expect(nav).toBeVisible()

    // Position fixed
    const position = await nav.evaluate((el) => window.getComputedStyle(el).position)
    expect(position).toBe('fixed')

    // Scroll down and check backdrop-filter is applied
    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(400)

    const backdropFilter = await nav.evaluate(
      (el) => window.getComputedStyle(el).backdropFilter
    )
    // After scroll, backdrop-filter should not be 'none'
    expect(backdropFilter).not.toBe('none')
  })

  test('todos los links del nav tienen href válido', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const navLinks = page.locator('nav a[href]')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('')
      // href should be a valid anchor or URL
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        expect(href).toMatch(/^\//)
      }
    }
  })

  test('toggle dark/light mode funciona', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    // Get initial theme
    const initialTheme = await page.getAttribute('html', 'data-theme')

    // Find theme toggle button
    const themeBtn = page.locator('button[aria-label*="modo"]')
    await expect(themeBtn).toBeVisible()
    await themeBtn.click()
    await page.waitForTimeout(300)

    const newTheme = await page.getAttribute('html', 'data-theme')
    expect(newTheme).not.toBe(initialTheme)

    // Toggle back
    await themeBtn.click()
    await page.waitForTimeout(300)
    const finalTheme = await page.getAttribute('html', 'data-theme')
    expect(finalTheme).toBe(initialTheme)
  })
})

test.describe('Obralia Landing — Secciones', () => {
  test('sección SST está presente con normativa colombiana', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const sstSection = page.locator('#sst')
    await sstSection.scrollIntoViewIfNeeded()
    await expect(sstSection).toBeVisible()

    // Key regulatory references
    await expect(page.locator('text=Decreto 1072').first()).toBeVisible()
    await expect(page.locator('text=0312').first()).toBeVisible()
  })

  test('sección de precios tiene los 3 planes en COP', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const pricingSection = page.locator('#precios')
    await pricingSection.scrollIntoViewIfNeeded()

    // Three plan names
    await expect(page.locator('text=Básico').first()).toBeVisible()
    await expect(page.locator('text=Profesional').first()).toBeVisible()
    await expect(page.locator('text=Enterprise').first()).toBeVisible()

    // COP currency symbol or text
    await expect(page.locator('text=COP').first()).toBeVisible()
  })

  test('toggle mensual/anual cambia valores de precios', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const pricingSection = page.locator('#precios')
    await pricingSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Click annual toggle
    const toggle = page.locator('[role="switch"]')
    await expect(toggle).toBeVisible()
    await toggle.click()
    await page.waitForTimeout(400)

    // Annual price should be different (360k vs 450k)
    const annualToggleChecked = await toggle.getAttribute('aria-checked')
    expect(annualToggleChecked).toBe('true')

    // Price should have changed — 360.000 instead of 450.000
    await expect(page.locator('text=360').first()).toBeVisible()
  })

  test('testimonios muestran 3 perfiles colombianos', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const testimonialsSection = page.locator('#testimonios')
    await testimonialsSection.scrollIntoViewIfNeeded()

    // Three testimonials with Colombian city references
    const quotes = page.locator('blockquote')
    expect(await quotes.count()).toBeGreaterThanOrEqual(3)
  })
})

test.describe('Obralia Landing — Formulario Demo', () => {
  test('valida campos requeridos antes de enviar', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const formSection = page.locator('#demo')
    await formSection.scrollIntoViewIfNeeded()

    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()

    // Try submitting empty form — HTML5 validation should prevent submission
    await submitBtn.click()
    await page.waitForTimeout(300)

    // Form should still be visible (not in success state)
    await expect(submitBtn).toBeVisible()

    // Check that name field is required
    const nameInput = page.locator('#full_name')
    const required = await nameInput.getAttribute('required')
    expect(required).not.toBeNull()

    // Check email is required
    const emailInput = page.locator('#email')
    const emailRequired = await emailInput.getAttribute('required')
    expect(emailRequired).not.toBeNull()
  })

  test('formulario hace POST exitoso y muestra éxito', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })

    const formSection = page.locator('#demo')
    await formSection.scrollIntoViewIfNeeded()

    // Fill form
    await page.fill('#full_name', 'Test E2E Playwright')
    await page.fill('#email', `e2e-test-${Date.now()}@obralia.test`)
    await page.fill('#company_name', 'Constructora E2E SAS')
    await page.selectOption('#company_type', 'constructora')

    // Submit
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()

    // Wait for success state (max 10s)
    await expect(
      page.locator('[role="alert"]:has-text("recibida"), [role="alert"]:has-text("Solicitud")')
    ).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Obralia Landing — Responsive', () => {
  const viewports = [
    { name: '375px mobile', width: 375, height: 812 },
    { name: '768px tablet', width: 768, height: 1024 },
    { name: '1280px desktop', width: 1280, height: 800 },
  ]

  for (const vp of viewports) {
    test(`layout correcto a ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(BASE, { waitUntil: 'domcontentloaded' })

      // No horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2) // 2px tolerance

      // Nav is visible
      await expect(page.locator('nav[role="navigation"]')).toBeVisible()

      // Hero heading is visible
      await expect(page.locator('h1').first()).toBeVisible()
    })
  }
})

test.describe('Obralia Landing — Sin errores de consola', () => {
  test('no hay errores críticos de consola en carga inicial', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text()
        // Ignore known non-critical errors
        if (
          !text.includes('favicon') &&
          !text.includes('404') &&
          !text.includes('fonts.googleapis') &&
          !text.includes('net::ERR')
        ) {
          errors.push(text)
        }
      }
    })

    page.on('pageerror', (err) => {
      errors.push(`Page Error: ${err.message}`)
    })

    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(1000)

    if (errors.length > 0) {
      console.log('Console errors found:', errors)
    }
    expect(errors).toHaveLength(0)
  })
})
