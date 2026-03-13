/**
 * Script de seed — insère vos vraies bornes dans Vercel Postgres.
 * Exécuter APRÈS avoir configuré DATABASE_URL dans .env.local :
 *
 *   npx tsx scripts/seed-kiosks.ts
 *
 * Modifiez le tableau KIOSKS ci-dessous avec vos vraies données.
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '')

const KIOSKS = [
  // ──────────────────────────────────────────────────────────────────
  // Remplacez ces bornes fictives par vos vraies bornes !
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'kiosk_plateau_001',
    name: 'Borne LeMultiservice — Plateau',
    address: '15 Avenue Pasteur, Dakar Plateau',
    city: 'Dakar',
    district: 'Plateau',
    partner: 'TotalEnergies Plateau',
    phone: '+221 77 000 00 01',
    lat: 14.666,
    lng: -17.433,
    hours_weekdays: '08:00 - 20:00',
    hours_saturday: '09:00 - 18:00',
    hours_sunday: 'Fermé',
    services: ['wallet', 'assurance', 'depot', 'retrait'],
    active: true,
  },
  {
    id: 'kiosk_almadies_002',
    name: 'Borne LeMultiservice — Almadies',
    address: 'Route des Almadies, en face King Fahd',
    city: 'Dakar',
    district: 'Almadies',
    partner: 'Supérette Auchan Almadies',
    phone: '+221 77 000 00 02',
    lat: 14.743,
    lng: -17.518,
    hours_weekdays: '24/7',
    hours_saturday: '24/7',
    hours_sunday: '24/7',
    services: ['wallet', 'assurance', 'transfert', 'factures'],
    active: true,
  },
  {
    id: 'kiosk_keurmassar_003',
    name: 'Borne LeMultiservice — Keur Massar',
    address: 'Rond-point Keur Massar',
    city: 'Keur Massar',
    district: 'Centre',
    partner: 'Boutique Moustapha',
    phone: null,
    lat: 14.783,
    lng: -17.316,
    hours_weekdays: '07:00 - 22:00',
    hours_saturday: '07:00 - 22:00',
    hours_sunday: '08:00 - 20:00',
    services: ['depot', 'retrait', 'transfert'],
    active: true,
  },
]

async function seed() {
  // Créer la table
  await sql`
    CREATE TABLE IF NOT EXISTS kiosks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      district TEXT,
      partner TEXT NOT NULL,
      phone TEXT,
      lat DOUBLE PRECISION NOT NULL,
      lng DOUBLE PRECISION NOT NULL,
      hours_weekdays TEXT NOT NULL DEFAULT '08:00 - 20:00',
      hours_saturday TEXT NOT NULL DEFAULT '09:00 - 18:00',
      hours_sunday TEXT NOT NULL DEFAULT 'Fermé',
      services TEXT[] NOT NULL DEFAULT '{}',
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('✅ Table kiosks créée (ou déjà existante)')

  for (const k of KIOSKS) {
    await sql`
      INSERT INTO kiosks (
        id, name, address, city, district, partner, phone,
        lat, lng, hours_weekdays, hours_saturday, hours_sunday,
        services, active
      ) VALUES (
        ${k.id}, ${k.name}, ${k.address}, ${k.city}, ${k.district},
        ${k.partner}, ${k.phone}, ${k.lat}, ${k.lng},
        ${k.hours_weekdays}, ${k.hours_saturday}, ${k.hours_sunday},
        ${k.services}, ${k.active}
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
    console.log(`✅ Borne insérée : ${k.name}`)
  }

  console.log('\n🎉 Seed terminé ! Les bornes sont dans Vercel Postgres.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Erreur seed :', err)
  process.exit(1)
})
