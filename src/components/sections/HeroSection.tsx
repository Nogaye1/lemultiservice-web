'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { COMPANY, STATS } from '@/data'
import { PhoneMockup } from '@/components/ui/PhoneMockup'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const HIGHLIGHTS = [
  'Paiements & Transferts',
  'Assurances instantanées',
  'Billetterie aérienne',
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-6"
      style={{ background: 'linear-gradient(160deg, #f0f7f8 0%, #ffffff 50%, #e8f4f5 100%)' }}
    >
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(68,156,161,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(5,38,59,0.06) 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#05263B 1px, transparent 1px), linear-gradient(90deg, #05263B 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-action/10 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-action/20">
              ✦ {COMPANY.award}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-syne font-extrabold text-primary leading-[1.08] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Tous vos services{' '}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: '#449CA1' }}>essentiels</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full opacity-30"
                style={{ background: '#449CA1' }}
              />
            </span>
            ,<br />
            <span className="text-primary">un seul accès.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Paiements, wallet, assurances et bornes interactives — accessibles depuis votre mobile,
            un point partenaire ou une borne, partout au Sénégal.
          </motion.p>

          {/* Highlights */}
          <motion.ul variants={stagger} className="flex flex-col gap-3 mb-10">
            {HIGHLIGHTS.map((h) => (
              <motion.li key={h} variants={fadeUp} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle size={18} className="text-action flex-shrink-0" />
                {h}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.getElementById('services')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-btn font-semibold text-sm text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
              style={{ background: '#05263B' }}
            >
              Découvrir nos services
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.getElementById('bornes')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-btn font-semibold text-sm border-2 text-primary hover:bg-primary/5 transition-all duration-200"
              style={{ borderColor: '#05263B' }}
            >
              Trouver une borne
            </motion.button>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-syne font-extrabold text-2xl text-primary">
                  {s.value}{s.suffix}
                </div>
                <div className="text-slate-500 text-xs mt-0.5 max-w-[120px] leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN : phone ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center min-h-[480px]"
        >
          {/* Glow behind phone */}
          <div
            className="absolute w-[380px] h-[380px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(68,156,161,0.20) 0%, transparent 70%)',
              filter: 'blur(40px)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Card badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-10 -left-4 lg:left-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100 z-20"
          >
            <div className="w-9 h-9 rounded-full bg-action/10 flex items-center justify-center text-lg">💳</div>
            <div>
              <p className="text-xs font-bold text-slate-800">Paiement réussi</p>
              <p className="text-xs text-action font-medium">+2 500 FCFA</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-12 -right-4 lg:right-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100 z-20"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">🛡️</div>
            <div>
              <p className="text-xs font-bold text-slate-800">Attestation générée</p>
              <p className="text-xs text-action font-medium">Instantanément</p>
            </div>
          </motion.div>

          <div className="relative z-10" style={{ animation: 'floatPhone 5s ease-in-out infinite' }}>
            <PhoneMockup />
          </div>
          <style>{`@keyframes floatPhone { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
        </motion.div>
      </div>
    </section>
  )
}
