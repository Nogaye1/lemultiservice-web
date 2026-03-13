'use client'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { SERVICES } from '@/data'

const SERVICE_ICONS = ['💳', '🛡️', '✈️', '📄', '💸', '📊']
const SERVICE_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-teal-50 text-teal-600',
  'bg-sky-50 text-sky-600',
  'bg-amber-50 text-amber-600',
  'bg-green-50 text-green-600',
  'bg-violet-50 text-violet-600',
]

export function ServicesSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1, y: 30 })

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle accent top-right */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[300px] rounded-bl-full opacity-40"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(68,156,161,0.08), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-action/10 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-action/15">
            ✦ Nos services
          </span>
          <h2 className="font-syne font-bold text-primary text-3xl md:text-5xl tracking-tight leading-tight mb-4">
            Ce que propose{' '}
            <span className="text-action">LeMultiservice</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            Une plateforme unifiée pour tous vos services financiers et du quotidien —
            accessible depuis l'app, une borne ou un point partenaire.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(5,38,59,0.10)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 cursor-default hover:border-action/40 transition-colors duration-300"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              {/* Icon circle */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${SERVICE_COLORS[i]}`}>
                {SERVICE_ICONS[i]}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-syne font-bold text-primary text-base leading-snug">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.desc}</p>
              </div>

              {/* Steps pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {service.steps.map((step) => (
                  <span key={step} className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-medium">
                    {step}
                  </span>
                ))}
              </div>

              {/* Hover teal accent bar */}
              <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-action rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
