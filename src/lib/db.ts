import { neon } from '@neondatabase/serverless'

/**
 * Retourne une instance sql connectée à Vercel Postgres.
 * Appelé uniquement à runtime (jamais au build), donc pas d'erreur si
 * DATABASE_URL est absent localement.
 */
export function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL manquant. ' +
      'Créez une Vercel Postgres DB, connectez-la au projet, puis copiez les variables dans .env.local'
    )
  }
  return neon(url)
}

/** Crée la table kiosks si elle n'existe pas encore */
export async function ensureTable() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS kiosks (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      address     TEXT NOT NULL,
      city        TEXT NOT NULL,
      district    TEXT,
      partner     TEXT NOT NULL,
      phone       TEXT,
      lat         DOUBLE PRECISION NOT NULL,
      lng         DOUBLE PRECISION NOT NULL,
      hours_weekdays  TEXT NOT NULL DEFAULT '08:00 - 20:00',
      hours_saturday  TEXT NOT NULL DEFAULT '09:00 - 18:00',
      hours_sunday    TEXT NOT NULL DEFAULT 'Fermé',
      services    TEXT[] NOT NULL DEFAULT '{}',
      active      BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}
