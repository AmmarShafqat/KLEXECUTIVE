import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Secure Checkout | KL Exec',
  description: 'Confirm your trip details and pay securely with Stripe.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutClient />
    </Suspense>
  )
}
