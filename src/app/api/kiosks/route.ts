import { NextResponse } from 'next/server'
import { getDb, ensureTable } from '@/lib/db'
import type { Kiosk } from '@/types/kiosk'

export const runtime = 'edge'

export async function GET() {
  try {
    const sql = getDb()
    await ensureTable()

    const rows = await sql`
      SELECT
        id, name, address, city, district, partner, phone,
        lat, lng,
        hours_weekdays, hours_saturday, hours_sunday,
        services, active
      FROM kiosks
      ORDER BY name ASC
    ` as Array<Record<string, unknown>>

    const kiosks: Kiosk[] = rows.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      address: r.address as string,
      city: r.city as string,
      district: r.district as string | undefined,
      partner: r.partner as string,
      phone: r.phone as string | undefined,
      lat: Number(r.lat),
      lng: Number(r.lng),
      hours: {
        weekdays: r.hours_weekdays as string,
        saturday: r.hours_saturday as string,
        sunday: r.hours_sunday as string,
      },
      services: r.services as string[],
      active: Boolean(r.active),
    }))

    return NextResponse.json(kiosks)
  } catch (err) {
    console.error('[/api/kiosks GET]', err)
    return NextResponse.json(
      { error: 'Impossible de charger les bornes.' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const sql = getDb()
    await ensureTable()
    const body = await req.json() as Omit<Kiosk, 'distance'>

    await sql`
      INSERT INTO kiosks (
        id, name, address, city, district, partner, phone,
        lat, lng,
        hours_weekdays, hours_saturday, hours_sunday,
        services, active
      ) VALUES (
        ${body.id}, ${body.name}, ${body.address}, ${body.city},
        ${body.district ?? null}, ${body.partner}, ${body.phone ?? null},
        ${body.lat}, ${body.lng},
        ${body.hours.weekdays}, ${body.hours.saturday}, ${body.hours.sunday},
        ${body.services}, ${body.active}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, address = EXCLUDED.address,
        city = EXCLUDED.city, district = EXCLUDED.district,
        partner = EXCLUDED.partner, phone = EXCLUDED.phone,
        lat = EXCLUDED.lat, lng = EXCLUDED.lng,
        hours_weekdays = EXCLUDED.hours_weekdays,
        hours_saturday = EXCLUDED.hours_saturday,
        hours_sunday = EXCLUDED.hours_sunday,
        services = EXCLUDED.services, active = EXCLUDED.active
    `

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/kiosks POST]', err)
    return NextResponse.json({ error: 'Erreur insertion' }, { status: 500 })
  }
}
