import type { Metadata } from 'next'
import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const metadata: Metadata = {
  title: 'Booking received | KL Exec',
  description: 'Your booking request is in. We will confirm your driver shortly.',
  robots: { index: false, follow: false },
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessClient />
    </Suspense>
  )
}
