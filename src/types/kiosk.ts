export interface Kiosk {
    id: string
    name: string
    address: string
    city: string
    district?: string
    partner: string
    phone?: string
    lat: number
    lng: number
    hours: {
        weekdays: string
        saturday: string
        sunday: string
    }
    services: string[]
    active: boolean
    distance?: number // km, calculé côté client
}

export const SERVICE_LABELS: Record<string, string> = {
    wallet: '💳 Wallet',
    depot: '💰 Dépôt',
    retrait: '💵 Retrait',
    transfert: '🔁 Transferts',
    assurance: '🛡️ Assurances',
    factures: '📄 Factures',
}
