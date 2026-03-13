'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { SERVICES } from '@/data'

const SERVICE_IMAGES = [
  '/images/Wallet.png',
  '/images/AssurancesIcon.png',
  '/images/Billetterie.png',
  '/images/Factures.png',
  '/images/Paiements.png',
  '/images/Business.png',
]

export function ServicesSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12, y: 40 })

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">

      {/* Subtle accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-action/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 pt-8"
        >
          <span className="inline-flex items-center gap-2 bg-action/8 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            ✦ Nos services
          </span>
          <h2 className="font-syne font-bold text-primary text-3xl md:text-5xl tracking-tight leading-tight mb-4">
            Une plateforme,{' '}
            <span className="text-gradient">tous vos services</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            LeMultiservice centralise les services financiers et du quotidien sur une interface unique,
            accessible via app, borne ou point partenaire.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default bg-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-shadow duration-300"
            >

              {/* Full-width image banner */}
              <div className="relative w-full h-32 overflow-hidden flex-shrink-0">
                <Image
                  src={SERVICE_IMAGES[i]}
                  alt={service.title}
                  fill
                  className="object-contain p-6 opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                {/* Texts */}
                <h3 className="font-syne font-bold text-primary text-base leading-snug">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
