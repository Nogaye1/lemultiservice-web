import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { HashScroller } from '@/components/layout/HashScroller'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { QuickPaymentDemo } from '@/components/sections/QuickPaymentDemo'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { Footer } from '@/components/layout/Footer'

// Carte Mapbox — rendu côté client uniquement (WebGL)
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

export default function Home() {
  return (
    <main>
      <HashScroller />
      <Navbar />
      <HeroSection />         {/* 1. Accroche */}
      <StatsSection />        {/* 2. Logos partenaires */}
      <ServicesSection />     {/* 3. 6 services */}
      <QuickPaymentDemo />    {/* 4. Démo borne */}
      <HowItWorks />          {/* 5. Comment ça marche + Réseau PDV */}
      <KioskMap />            {/* 6. Carte des bornes */}
      <SocialProofSection />  {/* 7. Témoignages */}
      <Footer />
    </main>
  )
}
