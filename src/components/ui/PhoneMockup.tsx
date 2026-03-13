'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'


/* ─── Apps dans la grille ─── */
const OTHER_APPS = [
    { label: 'Maps', emoji: '🗺️', color: 'from-green-500 to-emerald-400' },
    { label: 'Photos', emoji: '🖼️', color: 'from-purple-500 to-pink-400' },
    { label: 'Musique', emoji: '🎵', color: 'from-pink-500 to-rose-400' },
    { label: 'Météo', emoji: '🌤️', color: 'from-sky-500 to-blue-400' },
    { label: 'Santé', emoji: '❤️', color: 'from-red-400 to-rose-500' },
    { label: 'Caméra', emoji: '📷', color: 'from-gray-600 to-gray-800' },
    { label: 'Réglages', emoji: '⚙️', color: 'from-gray-500 to-slate-600' },
    { label: 'Notes', emoji: '📝', color: 'from-yellow-400 to-amber-500' },
]

export function PhoneMockup() {
    const [appOpen, setAppOpen] = useState(false)
    const [transitioning, setTransitioning] = useState(false)
    const [clockTime, setClockTime] = useState('')
    const [dateStr, setDateStr] = useState('')

    /* ── Horloge et date en temps réel ── */
    useEffect(() => {
        const tick = () => {
            const n = new Date()
            setClockTime(
                n.getHours().toString().padStart(2, '0') + ':' +
                n.getMinutes().toString().padStart(2, '0')
            )
            setDateStr(n.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }))
        }
        tick()
        const id = setInterval(tick, 10000)
        return () => clearInterval(id)
    }, [])


    function openApp() {
        if (transitioning) return
        setTransitioning(true)
        setTimeout(() => { setAppOpen(true); setTransitioning(false) }, 300)
    }
    function closeApp() {
        if (transitioning) return
        setTransitioning(true)
        setTimeout(() => { setAppOpen(false); setTransitioning(false) }, 300)
    }

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>

            {/* Glow halo */}
            <div style={{
                position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 80,
                background: 'rgba(68,156,161,0.25)', filter: 'blur(40px)', borderRadius: '50%',
                pointerEvents: 'none',
            }} />

            {/* ── Châssis du téléphone ── */}
            <div style={{
                position: 'relative', width: 270, height: 540,
                filter: 'drop-shadow(0 32px 64px rgba(5,38,59,0.55)) drop-shadow(0 0 40px rgba(68,156,161,0.2))',
            }}>
                {/* Boutons physiques */}
                <div style={{ position: 'absolute', right: -4, top: 120, width: 3, height: 62, background: '#1e293b', borderRadius: 2 }} />
                <div style={{ position: 'absolute', right: -4, top: 197, width: 3, height: 38, background: '#1e293b', borderRadius: 2 }} />
                <div style={{ position: 'absolute', left: -4, top: 152, width: 3, height: 52, background: '#1e293b', borderRadius: 2 }} />

                {/* Corps du châssis */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(155deg,#1e2d3d 0%,#0f1e2c 55%,#060f18 100%)',
                    borderRadius: 44,
                    border: '1.5px solid rgba(255,255,255,0.11)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                }}>

                    {/* ── Zone écran ── */}
                    <div style={{
                        position: 'absolute', inset: 11,
                        borderRadius: 35, overflow: 'hidden',
                        background: '#05263B',
                    }}>

                        {/* ════════ ÉCRAN D'ACCUEIL ════════ */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            opacity: appOpen ? 0 : 1,
                            transform: appOpen ? 'scale(1.05)' : 'scale(1)',
                            transition: 'opacity .32s ease, transform .32s ease',
                            pointerEvents: appOpen ? 'none' : 'all',
                        }}>
                            {/* Fond dégradé */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(180deg,#05263B 0%,#0a3d5c 42%,#082030 100%)',
                            }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: 'radial-gradient(ellipse at 28% 14%, rgba(68,156,161,.28) 0%, transparent 52%)',
                            }} />

                            {/* Dynamic Island */}
                            <div style={{
                                position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
                                width: 102, height: 27, background: '#000', borderRadius: 17, zIndex: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                            }}>
                                <div style={{ width: 8, height: 8, background: '#111', borderRadius: '50%' }} />
                                <div style={{ width: 11, height: 11, background: '#0d2030', borderRadius: '50%', border: '1px solid rgba(68,156,161,.35)' }} />
                            </div>

                            {/* Barre de statut */}
                            <div style={{
                                position: 'absolute', top: 43, left: 0, right: 0, height: 22,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0 18px', zIndex: 5,
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{clockTime}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    {/* Signal bars */}
                                    <svg width="13" height="10" viewBox="0 0 16 12" fill="none">
                                        <rect x="0" y="9" width="2.5" height="3" rx="0.5" fill="#fff" />
                                        <rect x="4" y="6" width="2.5" height="6" rx="0.5" fill="#fff" />
                                        <rect x="8" y="3" width="2.5" height="9" rx="0.5" fill="#fff" />
                                        <rect x="12" y="0" width="2.5" height="12" rx="0.5" fill="rgba(255,255,255,0.3)" />
                                    </svg>
                                    {/* WiFi */}
                                    <svg width="12" height="10" viewBox="0 0 24 20" fill="none">
                                        <path d="M2 5C6.5 0.5 17.5 0.5 22 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M5.5 9C8.5 6 15.5 6 18.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M9 13C10.5 11.5 13.5 11.5 15 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <circle cx="12" cy="17" r="1.5" fill="#fff" />
                                    </svg>
                                    {/* Battery */}
                                    <svg width="20" height="9" viewBox="0 0 28 13" fill="none">
                                        <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                                        <rect x="24.5" y="3.5" width="2" height="5.5" rx="1" fill="rgba(255,255,255,0.3)" />
                                        <rect x="2" y="2" width="18" height="9" rx="1.5" fill="#34C759" />
                                    </svg>
                                </div>
                            </div>

                            {/* Widget météo/date */}
                            <div style={{
                                position: 'absolute', top: 69, left: 12, right: 12,
                                background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,.1)', borderRadius: 14,
                                padding: '7px 12px', display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', zIndex: 4,
                            }}>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.7)' }}>🌤️ Dakar  28°C</span>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.5)' }}>
                                    {dateStr}
                                </span>
                            </div>

                            {/* Grille d'apps — 4 colonnes */}
                            <div style={{
                                position: 'absolute', top: 104, left: 0, right: 0, bottom: 90,
                                display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10,
                                padding: '10px 12px', overflowY: 'auto', scrollbarWidth: 'none',
                            }}>
                                {/* Icône LeMultiservice — logo réel, pulsant */}
                                <div onClick={openApp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12, overflow: 'hidden', position: 'relative',
                                        boxShadow: '0 0 0 2.5px rgba(68,156,161,.7), 0 0 16px rgba(68,156,161,.5)',
                                        animation: 'lmsPulse 2.4s ease-in-out infinite',
                                    }}>
                                        <Image src="/images/logo.jpg" alt="LeMultiservice" fill style={{ objectFit: 'cover' }} sizes="48px" />
                                        {/* Badge notification */}
                                        <div style={{
                                            position: 'absolute', top: -3, right: -3,
                                            width: 14, height: 14, background: '#e74c3c', borderRadius: '50%',
                                            border: '1.5px solid #05263B', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 700,
                                        }}>3</div>
                                    </div>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,.9)', textAlign: 'center', lineHeight: 1.3, textShadow: '0 1px 3px rgba(0,0,0,.9)' }}>
                                        LeMulti-<br />service
                                    </span>
                                </div>

                                {/* Apps */}
                                {OTHER_APPS.map(app => (
                                    <div key={app.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                        <div className={`bg-gradient-to-br ${app.color}`} style={{
                                            width: 48, height: 48, borderRadius: 12, fontSize: 22,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 3px 10px rgba(0,0,0,.4)',
                                        }}>{app.emoji}</div>
                                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.85)', textShadow: '0 1px 3px rgba(0,0,0,.9)' }}>{app.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Indice de tap */}
                            <div style={{
                                position: 'absolute', bottom: 97, left: '50%', transform: 'translateX(-50%)',
                                background: 'rgba(68,156,161,.15)', backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(68,156,161,.3)', borderRadius: 16,
                                padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5,
                                zIndex: 6, animation: 'hintBounce 2s ease-in-out infinite', whiteSpace: 'nowrap',
                            }}>
                                <span style={{ fontSize: 11 }}>👆</span>
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,.8)' }}>Appuyez sur LeMultiservice</span>
                            </div>

                            {/* Dock */}
                            <div style={{
                                position: 'absolute', bottom: 12, left: 14, right: 14,
                                background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,.14)', borderRadius: 24,
                                padding: '8px 6px', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                            }}>
                                <div onClick={openApp} style={{ cursor: 'pointer' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 11, overflow: 'hidden', position: 'relative', boxShadow: '0 0 10px rgba(68,156,161,.4)' }}>
                                        <Image src="/images/logo.jpg" alt="LMS" fill style={{ objectFit: 'cover' }} sizes="44px" />
                                    </div>
                                </div>
                                {[
                                    { e: '💬', c: 'from-blue-500 to-sky-400' },
                                    { e: '📞', c: 'from-green-500 to-emerald-400' },
                                    { e: '💳', c: 'from-orange-500 to-amber-400' },
                                ].map((d, i) => (
                                    <div key={i} className={`bg-gradient-to-br ${d.c}`} style={{
                                        width: 44, height: 44, borderRadius: 11,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 20, boxShadow: '0 3px 8px rgba(0,0,0,.35)',
                                    }}>{d.e}</div>
                                ))}
                            </div>
                        </div>

                        {/* ════════ ÉCRAN APP ════════ */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            opacity: appOpen ? 1 : 0,
                            transform: appOpen ? 'scale(1)' : 'scale(0.96)',
                            transition: 'opacity .32s ease, transform .32s ease',
                            pointerEvents: appOpen ? 'all' : 'none',
                            background: '#05263B',
                            display: 'flex', flexDirection: 'column',
                        }}>
                            {/* Dynamic Island */}
                            <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 102, height: 27, background: '#000', borderRadius: 17, zIndex: 10 }} />

                            {/* Statut */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 4px', zIndex: 11 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{clockTime}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <svg width="13" height="10" viewBox="0 0 16 12" fill="none">
                                        <rect x="0" y="9" width="2.5" height="3" rx="0.5" fill="#fff" />
                                        <rect x="4" y="6" width="2.5" height="6" rx="0.5" fill="#fff" />
                                        <rect x="8" y="3" width="2.5" height="9" rx="0.5" fill="#fff" />
                                        <rect x="12" y="0" width="2.5" height="12" rx="0.5" fill="rgba(255,255,255,0.3)" />
                                    </svg>
                                    <svg width="12" height="10" viewBox="0 0 24 20" fill="none">
                                        <path d="M2 5C6.5 0.5 17.5 0.5 22 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M5.5 9C8.5 6 15.5 6 18.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <path d="M9 13C10.5 11.5 13.5 11.5 15 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                                        <circle cx="12" cy="17" r="1.5" fill="#fff" />
                                    </svg>
                                    <svg width="20" height="9" viewBox="0 0 28 13" fill="none">
                                        <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                                        <rect x="24.5" y="3.5" width="2" height="5.5" rx="1" fill="rgba(255,255,255,0.3)" />
                                        <rect x="2" y="2" width="18" height="9" rx="1.5" fill="#34C759" />
                                    </svg>
                                </div>
                            </div>

                            {/* En-tête de l'app */}
                            <div style={{
                                position: 'absolute', top: 38, left: 0, right: 0, zIndex: 5,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '8px 14px',
                                background: 'rgba(5,38,59,.88)', backdropFilter: 'blur(12px)',
                                borderBottom: '1px solid rgba(68,156,161,.25)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <button onClick={closeApp} style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: 'rgba(68,156,161,.2)', border: '1px solid rgba(68,156,161,.35)',
                                        color: '#fff', fontSize: 13, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>←</button>
                                    <div style={{ width: 26, height: 26, borderRadius: 7, overflow: 'hidden', position: 'relative' }}>
                                        <Image src="/images/logo.jpg" alt="LMS" fill style={{ objectFit: 'cover' }} sizes="26px" />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>LeMultiservice</span>
                                </div>
                                <div style={{ display: 'flex', gap: 3 }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.35)' }} />
                                    ))}
                                </div>
                            </div>

                            {/* ── Vidéo simulation ── */}
                            <div style={{
                                position: 'absolute', top: 80, left: 0, right: 0, bottom: 0,
                                overflow: 'hidden', background: '#000',
                            }}>
                                <video
                                    key={appOpen ? 'open' : 'closed'}
                                    src="/videos/simulation.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover', objectPosition: 'top center',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </div>

                    </div>{/* /zone écran */}
                </div>{/* /corps châssis */}

                {/* Barre home */}
                <div style={{ position: 'absolute', bottom: 17, left: '50%', transform: 'translateX(-50%)', width: 80, height: 3, background: 'rgba(255,255,255,.3)', borderRadius: 2 }} />
            </div>

            {/* Légende */}
            <p style={{ fontSize: 11, color: 'rgba(68,156,161,.7)', marginTop: 18, letterSpacing: 1, textTransform: 'uppercase' }}>
                {appOpen ? 'Appuyez ← pour revenir' : 'Touchez le logo pour explorer'}
            </p>

            {/* Keyframes */}
            <style>{`
        @keyframes lmsPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(68,156,161,.65), 0 3px 10px rgba(0,0,0,.5); }
          50%      { box-shadow: 0 0 0 8px rgba(68,156,161,0), 0 3px 10px rgba(0,0,0,.5); }
        }
        @keyframes hintBounce {
          0%,100% { opacity:.6; transform:translateX(-50%) translateY(0); }
          50%      { opacity:1;  transform:translateX(-50%) translateY(-5px); }
        }
      `}</style>
        </div>
    )
}
