import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Use service role for server-side inserts (bypasses RLS on demo_requests)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient<Database>(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { full_name, email, company_name, phone, company_type, active_projects_count, message } = body

    // Basic validation
    if (!full_name?.trim() || !email?.trim() || !company_name?.trim()) {
      return NextResponse.json({ error: 'Nombre, correo y empresa son obligatorios.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 })
    }

    // Extract UTM params from referer/headers
    const referer = req.headers.get('referer') ?? ''
    let utm_source: string | undefined
    let utm_medium: string | undefined
    let utm_campaign: string | undefined
    try {
      const url = new URL(referer)
      utm_source   = url.searchParams.get('utm_source') ?? undefined
      utm_medium   = url.searchParams.get('utm_medium') ?? undefined
      utm_campaign = url.searchParams.get('utm_campaign') ?? undefined
    } catch {
      // referer parsing failed — fine
    }

    const supabase = getServiceClient()

    const { error } = await supabase.from('demo_requests').insert({
      full_name:             full_name.trim(),
      email:                 email.trim().toLowerCase(),
      phone:                 phone?.trim() || null,
      company_name:          company_name.trim(),
      company_type:          company_type || null,
      active_projects_count: active_projects_count || null,
      message:               message?.trim() || null,
      utm_source,
      utm_medium,
      utm_campaign,
    })

    if (error) {
      console.error('[demo-request] Supabase error:', error)
      return NextResponse.json({ error: 'Error al guardar la solicitud. Intenta de nuevo.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[demo-request] Unexpected error:', err)
    return NextResponse.json({ error: 'Error inesperado.' }, { status: 500 })
  }
}
