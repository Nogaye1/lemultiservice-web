'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Car, ShieldCheck, SmartphoneNfc } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
    {
        num: '01',
        icon: <Car size={24} className="text-action" />,
        title: 'Saisie de l\'immatriculation',
        desc: 'Entrez la plaque du véhicule. Si déjà enregistré, les données s\'affichent automatiquement. Sinon, renseignez les informations.',
    },
    {
        num: '02',
        icon: <ShieldCheck size={24} className="text-action" />,
        title: 'Choix de la durée d\'assurance',
        desc: 'Sélectionnez 1, 2, 3 ou 6 mois — et plus. Le tarif est calculé instantanément selon votre profil véhicule.',
    },
    {
        num: '03',
        icon: <SmartphoneNfc size={24} className="text-action" />,
        title: 'Paiement sécurisé',
        desc: 'Réglez en toute sécurité via Wave ou Orange Money depuis la borne. Attestation délivrée immédiatement.',
    },
]


export function QuickPaymentDemo() {
    const stepsRef = useRef<HTMLDivElement>(null)

    // GSAP ScrollTrigger: steps slide in from right + draw the vertical line
    useEffect(() => {
        if (!stepsRef.current) return
        const ctx = gsap.context(async () => {
            const { default: gsapMod } = await import('gsap')
            const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
            gsapMod.registerPlugin(ST)

            const stepEls = stepsRef.current!.querySelectorAll('.demo-step')
            const line = stepsRef.current!.querySelector('.demo-line') as HTMLElement | null

            if (line) {
                gsapMod.fromTo(
                    line,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        transformOrigin: 'top center',
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: line, start: 'top 80%', once: true },
                    }
                )
            }

            gsapMod.fromTo(
                stepEls,
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: stepsRef.current, start: 'top 75%', once: true },
                }
            )
        }, stepsRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="demo" className="py-20 px-6 relative overflow-hidden">
            {/* Background: borne image lightly blurred + dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/borne.jpg')", backgroundPosition: 'center 30%', filter: 'blur(3px)', transform: 'scale(1.08)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,38,59,0.78) 0%, rgba(5,38,59,0.60) 50%, rgba(5,38,59,0.80) 100%)' }} />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-action/20 border border-action/30 text-secondary text-xs font-bold uppercase tracking-widest">
                        Démo interactive
                    </span>
                    <h2 className="font-syne font-semibold text-white/85 text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                        La borne{' '}
                        <span className="text-action">LeMultiservice</span>
                        {' '}en action
                    </h2>
                    <p className="text-white/50 text-lg max-w-lg mx-auto font-light">
                        Découvrez comment notre borne interactive simplifie la souscription d&apos;assurance en quelques étapes guidées
                    </p>
                </motion.div>

                {/* 2-col layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Steps column */}
                    <div ref={stepsRef} className="relative">
                        {/* Vertical line */}
                        <div
                            className="demo-line absolute left-6 top-8 bottom-8 w-px origin-top"
                            style={{ background: 'linear-gradient(to bottom, #449CA1, rgba(68,156,161,0.1))' }}
                        />

                        <div className="flex flex-col gap-10">
                            {STEPS.map((step, i) => (
                                <div key={step.num} className="demo-step flex gap-6 items-start relative">
                                    {/* Icon bubble */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-action/20 border border-action/40 flex items-center justify-center text-xl z-10">
                                        {step.icon}
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-action text-xs font-bold tracking-widest font-dm mb-1">
                                            ÉTAPE {step.num}
                                        </p>
                                        <h3 className="font-syne font-bold text-white text-lg mb-2">{step.title}</h3>
                                        <p className="text-white/50 text-sm font-dm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video column */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[20px] overflow-hidden shadow-2xl border border-white/10 bg-black max-w-[440px] mx-auto">
                            <video
                                src="/videos/videoborne.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto object-contain block"
                                aria-label="Démonstration de la borne LeMultiservice"
                            />
                            {/* Overlay badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                                <span className="w-2 h-2 rounded-full bg-action animate-pulse" />
                                <span className="text-white text-xs font-dm font-semibold">Borne LeMultiservice</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
