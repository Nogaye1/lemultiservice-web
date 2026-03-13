import { COMPANY } from '@/data'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react'

const COL_SERVICES = [
  { label: 'Paiements & Transferts', href: '#demo' },
  { label: 'Wallet', href: '#services' },
  { label: 'Assurances', href: '#services' },
  { label: 'Billetterie aérienne', href: '#services' },
  { label: 'Factures & Services', href: '#services' },
  { label: 'Business & Fintech', href: '#dashboard' },
]

const CONTACT_INFO = [
  { Icon: MapPin, label: COMPANY.address, href: 'https://www.google.com/maps?q=14.75481,-17.46913' },
  { Icon: Phone, label: COMPANY.phones.join(' • '), href: `tel:${COMPANY.phones[0].replace(/\s/g, '')}` },
  { Icon: Mail, label: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { Icon: Clock, label: COMPANY.hours, href: null },
  { Icon: Building2, label: `${COMPANY.devBy} — dirigé par ${COMPANY.ceo}`, href: null },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/lemultiservice?originalSubdomain=sn',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@digitalassur0?_r=1&_t=ZS-94XpNqp6MOW',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/le_multiservice?igsh=MTVydmRsYnUzb3hjeg==',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/61563898483472/',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]


export function Footer() {
  return (
    /* Wrapper en fond de page blanc/slate pour laisser apparaître les coins arrondis */
    <div className="bg-slate-50 px-4 pb-4">
      <footer
        className="rounded-3xl overflow-hidden"
        style={{ background: '#05263B' }}
      >
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #449CA1, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-16 gap-y-8 items-start">

            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                  <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <span className="font-syne font-extrabold text-white text-base">LeMultiservice</span>
              </div>
              <p className="text-white/45 text-xs leading-relaxed mb-4">
                La plateforme phygitale de services de proximité. Paiements, assurances, billetterie — accessibles partout, pour tous.
              </p>
              <div className="flex gap-2 flex-wrap">
                {SOCIALS.map(s => (
                  <a key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    title={s.label}
                    className="w-8 h-8 rounded-lg bg-white/8 hover:bg-action flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-syne font-bold text-action text-[10px] uppercase tracking-widest mb-3">Services</h5>
              <ul className="flex flex-col gap-2">
                {COL_SERVICES.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/45 hover:text-white text-xs transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées */}
            <div>
              <h5 className="font-syne font-bold text-action text-[10px] uppercase tracking-widest mb-3">Coordonnées</h5>
              <ul className="flex flex-col gap-2.5">
                {CONTACT_INFO.map(({ Icon, label, href }) => (
                  <li key={label} className="flex items-start gap-2">
                    <Icon size={11} className="text-action mt-0.5 flex-shrink-0" />
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-white/45 hover:text-white text-xs leading-relaxed transition-colors">
                        {label}
                      </a>
                    ) : (
                      <span className="text-white/45 text-xs leading-relaxed">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-8 pt-5 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/25 text-[11px]">© 2026 {COMPANY.name} · Tous droits réservés.</p>
            <p className="text-white/25 text-[11px]">{COMPANY.email} · {COMPANY.address}</p>
          </div>

        </div>
      </footer>
    </div>
  )
}
