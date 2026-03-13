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
            {/* Soft bg accents */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-action/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 bg-action/8 text-action text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                        <Star size={12} />
                        Ils nous font confiance
                    </span>
                    <h2 className="font-syne font-semibold text-slate-800 text-3xl md:text-5xl tracking-tight mb-4">
                        Ce que disent nos utilisateurs
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Des milliers d&apos;utilisateurs et de partenaires font confiance à LeMultiservice pour leurs services du quotidien.
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
                            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 hover:border-action/40 hover:shadow-lg hover:shadow-action/8 transition-all duration-300 group"
                        >
                            {/* Quote icon */}
                            <Quote size={28} className="text-action/30 group-hover:text-action/50 transition-colors" />

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
                            <p className="text-slate-600 leading-relaxed flex-1 italic text-sm">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-syne font-bold text-white text-xs flex-shrink-0">
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
