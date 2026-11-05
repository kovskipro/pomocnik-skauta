import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans";
import { ErrorBoundary } from "@/components/error-boundary"
import { LenisProvider } from "@/components/lenis-provider"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pomocnik Skauta - Funkcje i Umiejętności",
  description: "Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach",
  generator: 'v0.dev',
  metadataBase: new URL(SITE_URL),
  keywords: ['pomocnik skauta', 'pomocnik skauta funkcje', 'harcerstwo', 'skauci', 'funkcje harcerskie', 'umiejętności', 'zastęp', 'przewodnik skauta'],
  alternates: {
    canonical: SITE_URL,
  },
  authors: [{ name: 'Skauci Europy' }],
  icons: {
    icon: '/croix-agse.png',
  },
  openGraph: {
    title: 'Pomocnik Skauta - Funkcje i Umiejętności',
    description: 'Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach',
    url: SITE_URL,
    siteName: 'Pomocnik Skauta',
    images: [
      {
        url: '/croix-agse.png',
        width: 64,
        height: 64,
        alt: 'Logo Skautów Europy',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pomocnik Skauta - Funkcje i Umiejętności',
    description: 'Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach',
    images: ['/croix-agse.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pomocnik Skauta",
    "description": "Przewodnik po funkcjach w zastępie harcerskim i wymaganych umiejętnościach",
    "url": SITE_URL,
    "inLanguage": "pl",
    "about": {
      "@type": "Organization",
      "name": "Harcerstwo",
      "description": "Skauting i edukacja harcerska"
    }
  }

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${GeistSans.className} bg-black min-h-screen`}>
        <ErrorBoundary>
          <LenisProvider>{children}</LenisProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
