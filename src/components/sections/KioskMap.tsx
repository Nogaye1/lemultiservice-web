'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import L from 'leaflet'
import {
    MapPin, Navigation, Search, Clock,
    Store, Phone, X, CheckCircle2, AlertCircle, ExternalLink,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKiosks } from '@/lib/hooks/useKiosks'
import { sortByDistance, formatDistance } from '@/lib/distance'
import { SERVICE_LABELS, type Kiosk } from '@/types/kiosk'

/* ─── Leaflet icon fix ─────────────────────────────────────────────── */
function initLeafletIcons() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
}

function makeIcon(color: string, size: number = 32) {
    const h = Math.round(size * 1.3125)
    const r = Math.round(size * 0.15625)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${h}" viewBox="0 0 32 42">
    <path fill="${color}" stroke="white" stroke-width="2" d="M16 2C9.4 2 4 7.4 4 14c0 9 12 26 12 26S28 23 28 14C28 7.4 22.6 2 16 2z"/>
    <circle fill="white" cx="16" cy="14" r="${r}"/>
  </svg>`
    return L.divIcon({ html: svg, iconSize: [size, h], iconAnchor: [size / 2, h], popupAnchor: [0, -h], className: '' })
}

/* ─── "Y aller" URL — opens native Maps app on mobile ─────────────── */
function getDirectionsUrl(kiosk: Kiosk): string {
    const hasCoords = typeof kiosk.lat === 'number' && typeof kiosk.lng === 'number' &&
        !isNaN(kiosk.lat) && !isNaN(kiosk.lng)
    if (hasCoords) {
        // On iOS → Apple Maps, on Android → Google Maps app, on desktop → Google Maps web
        return `https://maps.google.com/maps?daddr=${kiosk.lat},${kiosk.lng}&hl=fr`
    }
    return `https://www.google.com/maps/search/${encodeURIComponent(`${kiosk.address ?? ''} ${kiosk.city ?? ''}`)}`
}

/* ─── Leaflet map inner ────────────────────────────────────────────── */
interface MapProps {
    kiosks: Kiosk[]
    userLoc: { lat: number; lng: number } | null
    nearestId: string | null
    flyTo: { lat: number; lng: number; zoom: number } | null
    selectedId: string | null
    onSelect: (k: Kiosk) => void
    onFlyTo: (v: null) => void
    onMapClick: () => void
}

function LeafletMapInner({ kiosks, userLoc, nearestId, flyTo, selectedId, onSelect, onFlyTo, onMapClick }: MapProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<L.Map | null>(null)
    const markersRef = useRef<L.Marker[]>([])
    const userMarkerRef = useRef<L.CircleMarker | null>(null)
    const iconsReady = useRef(false)

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return
        initLeafletIcons()
        iconsReady.current = true
        const map = L.map(containerRef.current, { center: [14.6937, -17.4441], zoom: 12 })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map)
        // Tap on map background closes the popup
        map.on('click', onMapClick)
        mapRef.current = map
        return () => { map.remove(); mapRef.current = null }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Keep map click handler fresh
    useEffect(() => {
        const map = mapRef.current
        if (!map) return
        map.off('click', onMapClick)
        map.on('click', onMapClick)
    }, [onMapClick])

    useEffect(() => {
        const map = mapRef.current
        if (!map || !iconsReady.current) return
        markersRef.current.forEach(m => m.remove())
        markersRef.current = []
        const ACTIVE = makeIcon('#449CA1')
        const NEAREST = makeIcon('#22c55e')
        const INACTIVE = makeIcon('#94a3b8')
        const SELECTED = makeIcon('#f59e0b', 38) // larger golden for selected
        kiosks.forEach(kiosk => {
            if (!kiosk.lat || !kiosk.lng) return
            const isSelected = selectedId === kiosk.id
            const icon = isSelected ? SELECTED
                : !kiosk.active ? INACTIVE
                    : nearestId === kiosk.id ? NEAREST : ACTIVE
            const m = L.marker([kiosk.lat, kiosk.lng], { icon, zIndexOffset: isSelected ? 1000 : 0 })
                .addTo(map)
                .on('click', (e) => { L.DomEvent.stopPropagation(e); onSelect(kiosk) })
            markersRef.current.push(m)
        })
    }, [kiosks, nearestId, selectedId, onSelect])

    useEffect(() => {
        const map = mapRef.current
        if (!map) return
        userMarkerRef.current?.remove()
        if (userLoc) {
            userMarkerRef.current = L.circleMarker([userLoc.lat, userLoc.lng], {
                radius: 9, fillColor: '#3b82f6', fillOpacity: 1, color: 'white', weight: 2.5,
            }).addTo(map)
        }
    }, [userLoc])

    useEffect(() => {
        const map = mapRef.current
        if (!map || !flyTo) return
        if (typeof flyTo.lat !== 'number' || typeof flyTo.lng !== 'number') return
        map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom, { duration: 0.8 })
        onFlyTo(null)
    }, [flyTo, onFlyTo])

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

/* ─── Kiosk detail card ─────────────────────────────────────────────
 * Structure:
 *  - Sticky header  : handle bar + close button + status + name
 *  - Scrollable body: address, hours, services
 *  - Sticky footer  : CTA buttons always visible at the bottom
 * ------------------------------------------------------------------ */
function KioskCard({ kiosk, onClose }: { kiosk: Kiosk; onClose: () => void }) {
    const mapsUrl = getDirectionsUrl(kiosk)
    return (
        /* Outer shell — constrained height on mobile, flex column */
        <div className="bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl w-full lg:w-72 flex flex-col"
            style={{ maxHeight: 'min(88vh, 600px)' }}>

            {/* ── Sticky header ── */}
            <div className="flex-shrink-0 px-5 pt-3 pb-3 border-b border-slate-100">
                {/* Handle bar — mobile only */}
                <div className="flex justify-center mb-3 lg:hidden">
                    <div className="w-10 h-1 rounded-full bg-slate-200" />
                </div>

                {/* Close button */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        {/* Status */}
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${kiosk.active ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                            <span className={`text-xs font-semibold ${kiosk.active ? 'text-green-600' : 'text-slate-500'}`}>
                                {kiosk.active ? 'Borne active' : 'Indisponible'}
                            </span>
                        </div>
                        {/* Name */}
                        <h3 className="font-syne font-bold text-[#05263B] text-base leading-tight">{kiosk.name}</h3>
                        {/* Partner */}
                        <p className="text-[#449CA1] text-xs font-medium flex items-center gap-1 mt-1">
                            <Store className="w-3.5 h-3.5 flex-shrink-0" /> {kiosk.partner}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {/* Address */}
                <p className="text-[#05263B]/70 text-sm flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#449CA1]" /> {kiosk.address}
                </p>

                {/* Hours */}
                {kiosk.hours && (
                    <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-[#05263B] mb-1.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#449CA1]" /> Horaires
                        </p>
                        <p className="text-xs text-[#05263B]/70">{kiosk.hours.weekdays}</p>
                        {kiosk.hours.saturday !== kiosk.hours.weekdays &&
                            <p className="text-xs text-[#05263B]/70">{kiosk.hours.saturday}</p>}
                        {kiosk.hours.sunday !== kiosk.hours.weekdays &&
                            <p className="text-xs text-[#05263B]/70">{kiosk.hours.sunday}</p>}
                    </div>
                )}

                {/* Services */}
                {(kiosk.services?.length ?? 0) > 0 && (
                    <div>
                        <p className="text-xs font-bold text-[#05263B] mb-2">Services disponibles</p>
                        <div className="flex flex-wrap gap-1.5">
                            {kiosk.services.map(s => (
                                <span key={s} className="text-xs bg-[#449CA1]/10 text-[#449CA1] px-2.5 py-1 rounded-full font-medium">
                                    {SERVICE_LABELS[s] ?? s}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Sticky footer — always visible ── */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 flex gap-2">
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#05263B] text-white text-sm font-semibold py-3.5 rounded-xl text-center hover:bg-[#449CA1] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <ExternalLink className="w-4 h-4" /> Y aller
                </a>
                {kiosk.phone && (
                    <a
                        href={`tel:${kiosk.phone}`}
                        className="flex-1 border-2 border-[#449CA1] text-[#449CA1] text-sm font-semibold py-3.5 rounded-xl text-center hover:bg-[#449CA1] hover:text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                        <Phone className="w-4 h-4" /> Appeler
                    </a>
                )}
            </div>
        </div>
    )
}

/* ─── Main section ─────────────────────────────────────────────────── */
export default function KioskMap() {
    const { kiosks, loading } = useKiosks()

    const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null)
    const [selected, setSelected] = useState<Kiosk | null>(null)
    const [nearestId, setNearestId] = useState<string | null>(null)
    const [locating, setLocating] = useState(false)
    const [search, setSearch] = useState('')
    const [flyTo, setFlyTo] = useState<{ lat: number; lng: number; zoom: number } | null>(null)

    const handleClose = useCallback(() => setSelected(null), [])

    const handleSelect = useCallback((k: Kiosk) => {
        setSelected(k)
        setFlyTo({ lat: k.lat, lng: k.lng, zoom: 15 })
    }, [])

    const handleLocate = useCallback(() => {
        if (!navigator.geolocation) return
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude: lat, longitude: lng } = pos.coords
                setUserLoc({ lat, lng })
                setFlyTo({ lat, lng, zoom: 14 })
                const sorted = sortByDistance(kiosks, lat, lng)
                if (sorted.length) {
                    setNearestId(sorted[0].id)
                    setTimeout(() => handleSelect(sorted[0]), 700)
                }
                setLocating(false)
            },
            () => setLocating(false)
        )
    }, [kiosks, handleSelect])

    const filtered = kiosks.filter(k => {
        const q = search.toLowerCase()
        return (k.name?.toLowerCase() ?? '').includes(q) ||
            (k.city?.toLowerCase() ?? '').includes(q) ||
            (k.district?.toLowerCase() ?? '').includes(q) ||
            (k.address?.toLowerCase() ?? '').includes(q)
    })
    const display = userLoc ? sortByDistance(filtered, userLoc.lat, userLoc.lng) : filtered
    const activeCount = display.filter(k => k.active).length

    return (
        <section id="bornes" className="py-24 bg-[#F4FAFB] relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#449CA1]/5 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#05263B]/5 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6 }} className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 text-[#449CA1] text-xs font-bold uppercase tracking-widest bg-[#449CA1]/10 px-4 py-2 rounded-full">
                        <MapPin className="w-3.5 h-3.5" /> Réseau de bornes
                    </span>
                    <h2 className="font-syne text-3xl md:text-5xl font-bold text-[#05263B] mt-5 mb-4">
                        Trouvez la borne <span className="text-[#449CA1]">la plus proche</span>
                    </h2>
                    <p className="text-[#05263B]/55 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
                        Nos bornes interactives sont disponibles dans des commerces partenaires près de chez vous.
                    </p>
                </motion.div>

                {/* Controls */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col sm:flex-row gap-3 mb-5">
                    <button onClick={handleLocate} disabled={locating}
                        className="flex items-center justify-center gap-2.5 bg-[#05263B] text-white font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-[#449CA1] transition-all duration-300 disabled:opacity-60 shadow-lg shadow-[#05263B]/20 hover:-translate-y-0.5 whitespace-nowrap">
                        <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
                        {locating ? 'Localisation...' : 'Me localiser'}
                    </button>
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#05263B]/35 pointer-events-none" />
                        <input type="text" placeholder="Rechercher par ville ou quartier..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#05263B]/15 bg-white text-[#05263B] placeholder-[#05263B]/35 focus:outline-none focus:border-[#449CA1] focus:ring-2 focus:ring-[#449CA1]/20 transition-all shadow-sm" />
                    </div>
                </motion.div>

                {/* Map + List */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Map */}
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl h-[420px] sm:h-[500px] relative ring-1 ring-[#05263B]/8">
                        {loading ? (
                            <div className="w-full h-full bg-[#AACBC9]/15 flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-4 border-[#449CA1] border-t-transparent rounded-full animate-spin" />
                                <p className="text-[#05263B]/50 text-sm">Chargement des bornes...</p>
                            </div>
                        ) : (
                            <LeafletMapInner
                                kiosks={display} userLoc={userLoc} nearestId={nearestId}
                                flyTo={flyTo} selectedId={selected?.id ?? null}
                                onSelect={handleSelect} onFlyTo={setFlyTo} onMapClick={handleClose}
                            />
                        )}
                    </div>

                    {/* Sidebar list — desktop only */}
                    <div className="hidden lg:block h-[500px] overflow-y-auto space-y-3 pr-1">
                        {display.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-[#05263B]/40">
                                <MapPin className="w-12 h-12 mb-3 opacity-25" />
                                <p className="text-sm text-center">{search ? 'Aucune borne pour cette recherche' : 'Aucune borne disponible'}</p>
                            </div>
                        ) : (
                            display.map((kiosk, i) => (
                                <motion.button key={kiosk.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.04 }}
                                    onClick={() => handleSelect(kiosk)}
                                    className={`w-full text-left bg-white rounded-2xl p-4 border-2 transition-all duration-200 hover:shadow-md ${selected?.id === kiosk.id
                                        ? 'border-[#449CA1] shadow-md shadow-[#449CA1]/10'
                                        : 'border-transparent shadow-sm hover:border-[#449CA1]/40'}`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {kiosk.active
                                                    ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    : <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                                                <p className="font-syne font-bold text-[#05263B] text-sm truncate">{kiosk.name}</p>
                                            </div>
                                            <p className="text-[#05263B]/55 text-xs flex items-center gap-1 truncate">
                                                <Store className="w-3 h-3 flex-shrink-0" /> {kiosk.partner}
                                            </p>
                                            <p className="text-[#05263B]/40 text-xs mt-0.5 truncate">{kiosk.address}</p>
                                        </div>
                                        {kiosk.distance !== undefined && (
                                            <span className="text-[#449CA1] text-xs font-bold bg-[#449CA1]/10 px-2.5 py-1 rounded-full flex-shrink-0">
                                                {formatDistance(kiosk.distance)}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`mt-2 inline-flex text-[11px] px-2 py-0.5 rounded-full font-semibold ${kiosk.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {kiosk.active ? '● Disponible' : '⏸ Indisponible'}
                                    </span>
                                </motion.button>
                            ))
                        )}
                    </div>

                    {/* Mobile list — below map, scrollable horizontal cards */}
                    <div className="lg:hidden -mx-1 overflow-x-auto pb-2 flex gap-3 snap-x snap-mandatory scroll-smooth">
                        {display.slice(0, 10).map(kiosk => (
                            <button
                                key={kiosk.id}
                                onClick={() => handleSelect(kiosk)}
                                className={`snap-start flex-shrink-0 w-64 text-left bg-white rounded-2xl p-4 border-2 transition-all shadow-sm ${selected?.id === kiosk.id ? 'border-[#449CA1]' : 'border-transparent'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {kiosk.active
                                        ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        : <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                                    <p className="font-syne font-bold text-[#05263B] text-sm truncate">{kiosk.name}</p>
                                </div>
                                <p className="text-[#05263B]/55 text-xs truncate mb-0.5">
                                    <Store className="w-3 h-3 inline mr-1" />{kiosk.partner}
                                </p>
                                <p className="text-[#05263B]/40 text-xs truncate">{kiosk.address}</p>
                                {kiosk.distance !== undefined && (
                                    <span className="mt-2 inline-flex text-[11px] text-[#449CA1] font-bold bg-[#449CA1]/10 px-2 py-0.5 rounded-full">
                                        {formatDistance(kiosk.distance)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Counter */}
                {!loading && (
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-center text-[#05263B]/40 text-sm mt-6">
                        <span className="text-[#449CA1] font-bold">{activeCount}</span> borne{activeCount > 1 ? 's' : ''} disponible{activeCount > 1 ? 's' : ''}
                        {' '}sur <span className="font-semibold text-[#05263B]/60">{display.length}</span> dans le réseau
                    </motion.p>
                )}
            </div>

            {/* ── Mobile bottom sheet popup ────────────────────────────────── */}
            <AnimatePresence>
                {selected && (
                    <>
                        {/* Backdrop — tap to dismiss */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[999] bg-black/40 lg:hidden"
                            onClick={handleClose}
                        />
                        {/* Sheet slides up from bottom */}
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-[1000] lg:hidden"
                        >
                            <KioskCard kiosk={selected} onClose={handleClose} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Desktop popup (fixed bottom-right) ───────────────────────── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden lg:block fixed bottom-8 right-8 z-[1000]"
                    >
                        <KioskCard kiosk={selected} onClose={handleClose} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
