import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { THEME_MODE } from '@/lib/theme-config'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'KL Exec | Executive Chauffeur & Luxury Transport in New York',
    template: '%s | KL Exec',
  },
  description:
    'KL Exec provides premium executive chauffeur services, luxury limousine hire, and high-end transport in New York City. Professional chauffeurs, immaculate fleet, 24/7 availability.',
  keywords: [
    'chauffeur service New York',
    'luxury transport NYC',
    'executive car hire New York',
    'limousine service Manhattan',
    'airport transfer JFK',
    'corporate transport New York',
    'VIP chauffeur NYC',
    'wedding car hire New York',
    'JFK airport transfer',
  ],
  authors: [{ name: 'KL Exec' }],
  creator: 'KL Exec',
  publisher: 'KL Exec',
  metadataBase: new URL('https://klexec.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KL Exec | Executive Chauffeur & Luxury Transport',
    description:
      'Premium executive chauffeur services in New York City. Luxury limousines, SUVs, and sedans with professional chauffeurs.',
    url: 'https://klexec.com',
    siteName: 'KL Exec',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KL Exec | Executive Chauffeur & Luxury Transport',
    description:
      'Executive transport redefined. Book your luxury journey in New York City today.',
    creator: '@klexec',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const themeInitScript =
  THEME_MODE === 'light'
    ? `document.documentElement.classList.remove('dark');`
    : THEME_MODE === 'dark'
      ? `document.documentElement.classList.add('dark');`
      : `(function(){try{var t=localStorage.getItem('klexec-theme');var d=t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
