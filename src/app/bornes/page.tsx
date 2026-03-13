import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nos Bornes | LeMultiservice',
    description: 'Trouvez la borne LeMultiservice la plus proche de vous au Sénégal.',
}

// Carte Leaflet — rendu côté client uniquement (WebGL)
const KioskMap = dynamic(
    () => import('@/components/sections/KioskMap'),
    {
        ssr: false,
        loading: () => (
            <div className="h-[680px] bg-[#F4FAFB] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#449CA1] border-t-transparent rounded-full animate-spin" />
            </div>
        ),
    }
)

export default function BornesPage() {
    return (
        <main>
            <Navbar />
            <div className="pt-24">
                {/* ── Bouton retour ── */}
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#05263B] hover:text-[#449CA1] transition-colors duration-200 group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform duration-200"
                        />
                        Retour au site
                    </Link>
                </div>
                <KioskMap />
            </div>
            <Footer />
        </main>
    )
}
