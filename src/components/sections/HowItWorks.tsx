'use client'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { STEPS } from '@/data'

const STEP_ICONS = ['01', '02', '03']

export function HowItWorks() {
  return (
    <section id="howit" className="section-padding bg-white relative overflow-hidden">

      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-action/4 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">


        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-action/8 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Zap size={12} />
            Simple &amp; rapide
          </span>
          <h2 className="font-syne font-semibold text-slate-800 text-3xl md:text-5xl tracking-tight mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Trois canaux, un seul système. Choisissez votre mode d'accès selon votre situation.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px border-t-2 border-dashed border-action/20" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-action to-action/70 flex items-center justify-center font-syne font-extrabold text-2xl text-white shadow-xl shadow-action/25 relative z-10">
                  {STEP_ICONS[i]}
                </div>
                <div className="absolute inset-0 rounded-full bg-action/15 scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-syne font-bold text-slate-800 text-xl mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
