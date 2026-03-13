'use client'
import { useState, useEffect } from 'react'
import type { Kiosk } from '@/types/kiosk'

export function useKiosks() {
    const [kiosks, setKiosks] = useState<Kiosk[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchKiosks() {
            try {
                const res = await fetch('/api/kiosks', { cache: 'no-store' })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: Kiosk[] = await res.json()
                if (!cancelled) {
                    setKiosks(data)
                    setError(null)
                }
            } catch (e) {
                if (!cancelled) {
                    console.error('[useKiosks]', e)
                    setError('Impossible de charger les bornes')
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchKiosks()
        return () => { cancelled = true }
    }, [])

    return { kiosks, loading, error }
}
