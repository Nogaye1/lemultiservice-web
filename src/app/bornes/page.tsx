import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
                <KioskMap />
            </div>
            <Footer />
        </main>
    )
}
