import Image from 'next/image'

const PARTNERS = [
  { src: '/images/partenaires/wave.png', name: 'Wave' },
  { src: '/images/partenaires/orange-money.png', name: 'Orange Money' },
  { src: '/images/partenaires/BCEAO.png', name: 'BCEAO' },
  { src: '/images/partenaires/CCA%20ASSURANCE.png', name: 'CCA Assurance' },
  { src: '/images/partenaires/La%20providence.png', name: 'La Providence' },
  { src: '/images/partenaires/api%20amadeus%20.png', name: 'Amadeus API' },
  { src: '/images/partenaires/aws.png', name: 'AWS' },
  { src: '/images/partenaires/bictorys.png', name: 'Bictorys' },
  { src: '/images/partenaires/cap%20assurance%20.png', name: 'Cap Assurance' },
  { src: '/images/partenaires/intech%20group.png', name: 'Intech Group' },
  { src: '/images/partenaires/intouch.png', name: 'InTouch' },
  { src: '/images/partenaires/legs.png', name: 'LEGS' },
  { src: '/images/partenaires/sn%20num.png', name: 'SN Num' },
  { src: '/images/partenaires/vip.png', name: 'VIP' },
  { src: '/images/partenaires/yoff.png', name: 'Yoff' },
]

const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export function StatsSection() {
  return (
    <section id="stats" className="bg-slate-50 border-y border-slate-100 py-8 overflow-hidden">

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #f8fafc, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #f8fafc, transparent)' }} />

        <div
          className="flex items-center"
          style={{ animation: 'marqueeLeft 40s linear infinite', width: 'max-content', willChange: 'transform' }}
        >
          {TRACK.map((p, i) => (
            <div key={i} className="flex-shrink-0 mx-3 w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center hover:shadow-md hover:scale-105 transition-all duration-200">
              <div className="relative w-16 h-16">
                <Image src={p.src} alt={p.name} fill className="object-contain" sizes="64px" />
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
