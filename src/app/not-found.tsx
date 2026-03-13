import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{ background: 'linear-gradient(135deg, #05263B 0%, #073552 100%)' }}>

            {/* Glowing orb */}
            <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(68,156,161,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* 404 */}
                <h1 className="font-syne font-extrabold text-[120px] leading-none"
                    style={{ color: '#449CA1', textShadow: '0 0 80px rgba(68,156,161,0.4)' }}>
                    404
                </h1>

                <h2 className="font-syne font-bold text-white text-3xl">
                    Cette page n&apos;existe pas
                </h2>
                <p className="text-white/50 text-lg max-w-md leading-relaxed">
                    La page que vous cherchez a peut-être été déplacée ou supprimée.
                </p>

                <Link href="/"
                    className="mt-4 px-8 py-4 font-syne font-bold text-sm uppercase tracking-widest text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: '#449CA1', boxShadow: '0 8px 32px rgba(68,156,161,0.35)' }}>
                    ← Retour à l&apos;accueil
                </Link>
            </div>
        </div>
    )
}
