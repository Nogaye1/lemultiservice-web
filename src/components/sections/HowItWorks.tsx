'use client'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { STEPS } from '@/data'

const STEP_ICONS = ['🏦', '📱', '✅']

export function HowItWorks() {
  return (
    <section id="howit" className="section-padding relative overflow-hidden" style={{ background: '#F7F9FB' }}>

      {/* Subtle accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(68,156,161,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-action/10 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-action/15">
            <Zap size={12} />
            Simple & rapide
          </span>
          <h2 className="font-syne font-bold text-primary text-3xl md:text-5xl tracking-tight mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Trois canaux, un seul système. Choisissez votre mode d'accès selon votre situation.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px border-t-2 border-dashed border-action/25" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-slate-200 hover:border-action/30 hover:shadow-md transition-all duration-300"
            >
              {/* Step circle */}
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-syne font-extrabold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #05263B 0%, #449CA1 100%)',
                    boxShadow: '0 8px 24px rgba(68,156,161,0.25)',
                  }}
                >
                  <span>{STEP_ICONS[i]}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center font-syne shadow-sm">
                  {step.num}
                </div>
              </div>
              <h3 className="font-syne font-bold text-primary text-xl mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
