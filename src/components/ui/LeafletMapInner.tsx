'use client'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { Kiosk } from '@/types/kiosk'

// Fix default icon paths broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/* Custom coloured markers */
function makeIcon(color: string) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <path fill="${color}" stroke="white" stroke-width="2"
        d="M16 2C9.4 2 4 7.4 4 14c0 9 12 26 12 26S28 23 28 14C28 7.4 22.6 2 16 2z"/>
      <circle fill="white" cx="16" cy="14" r="5"/>
    </svg>`
    return L.divIcon({
        html: svg,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
        className: '',
    })
}

const ICON_ACTIVE = makeIcon('#449CA1')
const ICON_NEAREST = makeIcon('#22c55e')
const ICON_INACTIVE = makeIcon('#94a3b8')

export interface LeafletMapProps {
    kiosks: Kiosk[]
    userLoc: { lat: number; lng: number } | null
    nearestId: string | null
    selected: Kiosk | null
    flyTo: { lat: number; lng: number; zoom: number } | null
    onSelect: (k: Kiosk) => void
    onFlyTo: (v: null) => void
}

export default function LeafletMapInner({ kiosks, userLoc, nearestId, selected, flyTo, onSelect, onFlyTo }: LeafletMapProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<L.Map | null>(null)
    const markersRef = useRef<L.Marker[]>([])
    const userMarkerRef = useRef<L.CircleMarker | null>(null)

    /* Init map once */
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return

        const map = L.map(containerRef.current, {
            center: [14.6937, -17.4441],
            zoom: 12,
            zoomControl: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map)

        mapRef.current = map
        return () => { map.remove(); mapRef.current = null }
    }, [])

    /* Sync kiosk markers */
    useEffect(() => {
        const map = mapRef.current
        if (!map) return

        markersRef.current.forEach(m => m.remove())
        markersRef.current = []

        kiosks.forEach(kiosk => {
            const icon = !kiosk.active ? ICON_INACTIVE : nearestId === kiosk.id ? ICON_NEAREST : ICON_ACTIVE
            const marker = L.marker([kiosk.lat, kiosk.lng], { icon })
                .addTo(map)
                .on('click', () => onSelect(kiosk))

            markersRef.current.push(marker)
        })
    }, [kiosks, nearestId, onSelect])

    /* Sync user location marker */
    useEffect(() => {
        const map = mapRef.current
        if (!map) return
        userMarkerRef.current?.remove()
        if (userLoc) {
            userMarkerRef.current = L.circleMarker([userLoc.lat, userLoc.lng], {
                radius: 8,
                fillColor: '#3b82f6',
                fillOpacity: 1,
                color: 'white',
                weight: 2,
            }).addTo(map)
        }
    }, [userLoc])

    /* Fly to target */
    useEffect(() => {
        const map = mapRef.current
        if (!map || !flyTo) return
        map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom, { duration: 0.8 })
        onFlyTo(null)
    }, [flyTo, onFlyTo])

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
