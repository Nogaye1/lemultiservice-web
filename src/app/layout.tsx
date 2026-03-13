import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeMultiservice — Plateforme de services de proximité',
  description:
    'Paiements, wallet, assurances, billetterie et bornes interactives. La plateforme phygitale de référence en Afrique de l\'Ouest.',
  keywords: 'fintech, assurance, paiement, wallet, Sénégal, Afrique, phygital',
  openGraph: {
    title: 'LeMultiservice by Digital Assur',
    description: 'Tous vos services essentiels, un seul point d\'accès.',
    url: 'https://lemultiservice.com',
    siteName: 'LeMultiservice',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LeMultiservice — Votre quotidien, simplifié.',
      },
    ],
  },
}

import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-dm antialiased">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
