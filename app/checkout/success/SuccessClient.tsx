'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const STATUS_COPY: Record<string, { title: string; body: string }> = {
  succeeded: {
    title: 'Your card is authorized.',
    body: 'We have placed a hold on your card. You will be charged only after our team confirms your driver.',
  },
  processing: {
    title: 'Your payment is processing.',
    body: 'This usually takes only a few seconds. We will email you the confirmation once it is authorized.',
  },
  requires_payment_method: {
    title: 'Payment did not go through.',
    body: 'Your card was declined. Please go back and try a different card.',
  },
}

export default function SuccessClient() {
  const params = useSearchParams()
  const orderId = params.get('order') ?? ''
  const piStatus = params.get('redirect_status') ?? 'succeeded'

  const copy = STATUS_COPY[piStatus] ?? STATUS_COPY.succeeded

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: '120px',
          paddingBottom: '120px',
          background: 'var(--bg)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <div
          className="container-luxury"
          style={{ maxWidth: 620, textAlign: 'center' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 999,
              background: 'rgba(168,138,79,0.12)',
              marginBottom: 24,
            }}
          >
            <Check size={32} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
          </div>

          <div className="eyebrow-center mb-4">Booking received</div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--ink)',
              marginBottom: 16,
            }}
          >
            {copy.title}
          </h1>

          <p
            style={{
              color: 'var(--ink-3)',
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            {copy.body}
          </p>

          {orderId && (
            <div
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: 6,
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: 12,
                color: 'var(--ink-3)',
                letterSpacing: '0.06em',
                marginBottom: 32,
              }}
            >
              ORDER ID · <span style={{ color: 'var(--ink)' }}>{orderId.slice(0, 8)}</span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" className="btn btn-ghost" style={{ fontSize: 11 }}>
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
