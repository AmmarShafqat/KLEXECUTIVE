import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuoteClient from './QuoteClient'

export const metadata: Metadata = {
  title: 'Your Quote | KL Exec',
  description:
    'Live pricing for your KL Exec chauffeur ride. Choose your vehicle class and continue to secure booking.',
  robots: { index: false, follow: false },
}

export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteClient />
    </Suspense>
  )
}
