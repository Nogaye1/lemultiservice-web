import Image from 'next/image'

const PARTNERS = [
  { src: '/images/partenaires/intech%20group.png', name: 'Intech Group' },
  { src: '/images/partenaires/bictorys.png', name: 'Bictorys' },
  { src: '/images/partenaires/wave.png', name: 'Wave' },
  { src: '/images/partenaires/orange-money.png', name: 'Orange Money' },
  { src: '/images/partenaires/yoff.png', name: 'Yoff' },
  { src: '/images/partenaires/vip.png', name: 'VIP Assurance' },
  { src: '/images/partenaires/La%20providence.png', name: 'Providence' },
  { src: '/images/partenaires/askia.png', name: 'Askia Assurance' },
  { src: '/images/partenaires/legs.png', name: 'LEGS' },
  { src: '/images/partenaires/sn%20num.png', name: 'SN Numérique' },
]

const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export function StatsSection() {
  return (
    <section id="stats" className="bg-white border-y border-slate-100 py-12 overflow-hidden">

      {/* Title */}
      <div className="text-center mb-8 px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-action mb-1">Ils nous font confiance</p>
        <h2 className="font-syne font-bold text-primary text-2xl md:text-3xl">Nos partenaires</h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />

        <div
          className="flex items-center"
          style={{ animation: 'marqueeLeft 40s linear infinite', width: 'max-content', willChange: 'transform' }}
        >
          {TRACK.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 w-28 h-20 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center justify-center hover:shadow-md hover:border-action/30 transition-all duration-200 px-2"
            >
              <div className="relative w-20 h-12">
                <Image src={p.src} alt={p.name} fill className="object-contain" sizes="80px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
