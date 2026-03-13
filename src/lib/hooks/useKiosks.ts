'use client'
import { useState, useEffect } from 'react'
import type { Kiosk } from '@/types/kiosk'

const MOCK_KIOSKS: Kiosk[] = [
    {
        id: 'kiosk_1',
        name: 'Borne LeMultiservice Plateau',
        address: '15 Avenue Pasteur, Dakar Plateau',
        city: 'Dakar',
        district: 'Plateau',
        partner: 'TotalEnergies Plateau',
        phone: '+221 77 123 45 67',
        lat: 14.666,
        lng: -17.433,
        hours: {
            weekdays: '08:00 - 20:00',
            saturday: '09:00 - 18:00',
            sunday: 'Fermé',
        },
        services: ['wallet', 'assurance', 'depot', 'retrait'],
        active: true,
    },
    {
        id: 'kiosk_2',
        name: 'Borne Almadies',
        address: 'Route des Almadies, en face King Fahd',
        city: 'Dakar',
        district: 'Almadies',
        partner: 'Supérette Auchan Almadies',
        phone: '+221 78 987 65 43',
        lat: 14.743,
        lng: -17.518,
        hours: {
            weekdays: '24/7',
            saturday: '24/7',
            sunday: '24/7',
        },
        services: ['wallet', 'assurance', 'transfert', 'factures'],
        active: true,
    },
    {
        id: 'kiosk_3',
        name: 'Borne Keur Massar',
        address: 'Rond-point Keur Massar',
        city: 'Keur Massar',
        district: 'Centre',
        partner: 'Boutique Moustapha',
        lat: 14.783,
        lng: -17.316,
        hours: {
            weekdays: '07:00 - 22:00',
            saturday: '07:00 - 22:00',
            sunday: '08:00 - 20:00',
        },
        services: ['depot', 'retrait', 'transfert'],
        active: true,
    }
]

export function useKiosks() {
    const [kiosks, setKiosks] = useState<Kiosk[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Simulation d'un chargement rapide pour la fluidité de l'UI
        const timer = setTimeout(() => {
            setKiosks(MOCK_KIOSKS)
            setLoading(false)
        }, 500)
        
        return () => clearTimeout(timer)
    }, [])

    return { kiosks, loading, error }
}
