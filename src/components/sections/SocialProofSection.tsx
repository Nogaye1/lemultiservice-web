'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Amadou D.',
    role: 'Gérant de boutique, Dakar',
    text: "Depuis que j'ai rejoint le réseau LeMultiservice, j'attire de nouveaux clients chaque semaine. Les commissions sont régulières et le support est vraiment réactif.",
    rating: 5,
    initials: 'AD',
  },
  {
    name: 'Fatou S.',
    role: 'Utilisatrice, Thiès',
    text: "Je peux payer mes factures et envoyer de l'argent à ma famille sans me déplacer loin. L'application est simple et la borne dans ma rue est très pratique.",
    rating: 5,
    initials: 'FS',
  },
  {
    name: 'Moussa K.',
    role: 'Auto-entrepreneur, Saint-Louis',
    text: "J'ai souscrit mon assurance véhicule en moins de 5 minutes sur la borne. Les documents ont été générés immédiatement. Impressionnant.",
    rating: 5,
    initials: 'MK',
  },
]

export function SocialProofSection() {
  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-bl-full opacity-30"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(68,156,161,0.07), transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-action/10 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-action/15">
            <Star size={12} />
            Témoignages
          </span>
          <h2 className="font-syne font-bold text-primary text-3xl md:text-5xl tracking-tight mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Des milliers d&apos;utilisateurs et de partenaires font confiance à LeMultiservice au quotidien.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 hover:border-action/40 hover:shadow-lg transition-all duration-300 group"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              {/* Quote */}
              <Quote size={28} className="text-action/25 group-hover:text-action/45 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < t.rating ? 'text-action fill-action' : 'text-slate-200'}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-600 leading-relaxed flex-1 text-sm">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-white text-xs flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #05263B, #449CA1)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-syne font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-action text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
