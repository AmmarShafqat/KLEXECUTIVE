'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import type { StripeElementsOptions } from '@stripe/stripe-js'
import { ChevronLeft, Lock } from 'lucide-react'
import { calculateQuote, createOrder, type Quote } from '@/lib/graphql-operations'
import { getStripe } from '@/lib/stripe-client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type Stage = 'loading' | 'ready' | 'submitting' | 'confirming' | 'error'

function formatMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function CheckoutClient() {
  const params = useSearchParams()
  const router = useRouter()
  const stripePromise = useMemo(() => getStripe(), [])

  const pickup = params.get('pickup') ?? ''
  const destination = params.get('destination') ?? ''
  const pickupAt = params.get('pickupAt') ?? ''
  const miles = Number(params.get('miles') ?? '0')
  const minutes = Number(params.get('minutes') ?? '0')
  const vehicleClass = params.get('vehicleClass') ?? ''

  const hasRequiredParams =
    !!pickup && !!destination && !!pickupAt && miles > 0 && !!vehicleClass

  // Build a back-href that preserves the original quote params (minus
  // vehicleClass, so the user can pick again on /quote).
  const backToQuoteHref = useMemo(() => {
    const next = new URLSearchParams(params.toString())
    next.delete('vehicleClass')
    const qs = next.toString()
    return qs ? `/quote?${qs}` : '/quote'
  }, [params])

  const [stage, setStage] = useState<Stage>('loading')
  const [error, setError] = useState<string | null>(null)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  // Contact form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  // Recompute the quote on this page so the user sees the same price even if
  // they navigated here from a bookmark.
  useEffect(() => {
    if (!hasRequiredParams) {
      setStage('error')
      setError('Missing booking details. Start over from the home page.')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const q = await calculateQuote({
          pickup,
          destination,
          pickupAt,
          miles,
          minutes,
          vehicleClass,
        })
        if (cancelled) return
        setQuote(q)
        setStage('ready')
      } catch (e) {
        if (cancelled) return
        setStage('error')
        setError(
          e instanceof Error
            ? e.message
            : 'Could not load your quote. Please try again.',
        )
      }
    })()
    return () => {
      cancelled = true
    }
  }, [pickup, destination, pickupAt, miles, minutes, vehicleClass, hasRequiredParams])

  async function handleStartPayment(e: React.FormEvent) {
    e.preventDefault()
    if (stage === 'submitting' || stage === 'confirming') return

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in your name, email, and phone.')
      return
    }
    if (!quote) {
      setError('Quote not loaded yet.')
      return
    }

    setStage('submitting')
    setError(null)

    try {
      const result = await createOrder({
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        pickup,
        destination,
        pickupAt,
        miles,
        minutes,
        vehicleClass,
        notes: notes.trim() || undefined,
      })
      setClientSecret(result.clientSecret)
      setOrderId(result.order.id)
      setStage('confirming')
    } catch (e) {
      setStage('ready')
      setError(
        e instanceof Error
          ? e.message
          : 'Could not start the payment. Please try again.',
      )
    }
  }

  const elementsOptions: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#a88a4f',
            colorBackground: '#ffffff',
            colorText: '#2a2825',
            colorDanger: '#a02929',
            fontFamily: 'Manrope, system-ui, sans-serif',
            borderRadius: '6px',
          },
        },
      }
    : undefined

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: '100px',
          paddingBottom: '80px',
          background: 'var(--bg)',
          minHeight: '100vh',
        }}
      >
        <div
          className="container-luxury"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '40px',
          }}
        >
          {/* Left — form / payment */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Link
                href={backToQuoteHref}
                className="btn-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <ChevronLeft size={14} strokeWidth={2} /> Back to vehicles
              </Link>
            </div>

            <div className="eyebrow mb-4">Step 3 of 3 · Secure payment</div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: '24px',
              }}
            >
              Almost there.
            </h1>

            {error && (
              <div
                role="alert"
                style={{
                  marginBottom: 20,
                  padding: '12px 16px',
                  background: '#fdf6f6',
                  border: '1px solid #f0d0d0',
                  borderRadius: 6,
                  color: '#7a1f1f',
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}

            {/* Stage 1: collect contact details + start payment */}
            {(stage === 'ready' || stage === 'submitting') && (
              <form onSubmit={handleStartPayment}>
                <FieldGroup label="Name" htmlFor="name">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                  />
                </FieldGroup>
                <FieldGroup label="Email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </FieldGroup>
                <FieldGroup label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (212) 555-0123"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </FieldGroup>
                <FieldGroup label="Notes (optional)" htmlFor="notes">
                  <textarea
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </FieldGroup>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={stage === 'submitting' || !quote}
                  style={{
                    marginTop: 8,
                    width: '100%',
                    padding: '15px',
                    fontSize: 13,
                  }}
                >
                  {stage === 'submitting' ? 'Preparing…' : 'Continue to payment →'}
                </button>
              </form>
            )}

            {/* Stage 2: card capture via Stripe */}
            {stage === 'confirming' && clientSecret && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <PaymentForm orderId={orderId} />
              </Elements>
            )}

            {stage === 'loading' && (
              <p style={{ color: 'var(--ink-3)' }}>Loading your quote…</p>
            )}

            <p
              style={{
                marginTop: 24,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: 'var(--ink-4)',
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Lock size={11} strokeWidth={1.5} /> Card auth held —
              charged only when your driver is confirmed
            </p>
          </div>

          {/* Right — order summary */}
          <aside>
            <div
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: 24,
                position: 'sticky',
                top: 100,
              }}
            >
              <h2
                className="font-display"
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: 16,
                }}
              >
                Order summary
              </h2>
              <dl
                style={{
                  fontSize: 13,
                  color: 'var(--ink-3)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <SummaryRow label="Pickup" value={pickup || '—'} />
                <SummaryRow label="Destination" value={destination || '—'} />
                <SummaryRow
                  label="When"
                  value={pickupAt ? formatDate(pickupAt) : '—'}
                />
                <SummaryRow
                  label="Distance"
                  value={`${miles.toFixed(1)} mi · ${minutes} min`}
                />
                <SummaryRow label="Vehicle" value={quote?.className ?? vehicleClass} />
              </dl>

              {quote && (
                <>
                  <hr
                    style={{
                      margin: '16px 0',
                      border: 'none',
                      borderTop: '1px solid var(--line)',
                    }}
                  />
                  <table
                    style={{
                      width: '100%',
                      fontSize: 12.5,
                      color: 'var(--ink-3)',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <tbody>
                      {quote.lines.map((line, i) => (
                        <tr key={i}>
                          <td style={{ padding: '3px 0' }}>{line.label}</td>
                          <td style={{ textAlign: 'right', padding: '3px 0' }}>
                            {formatMoney(line.amountCents)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{ padding: '3px 0' }}>Gratuity</td>
                        <td style={{ textAlign: 'right', padding: '3px 0' }}>
                          {formatMoney(quote.gratuityCents)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: '1px solid var(--line)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--ink-3)',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        fontFamily:
                          'var(--font-jetbrains), ui-monospace, monospace',
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: 28,
                        fontWeight: 500,
                        color: 'var(--ink)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {formatMoney(quote.totalCents)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

        <style>{`
          @media (max-width: 900px) {
            main .container-luxury {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--line)',
  borderRadius: 6,
  padding: '12px 14px',
  fontSize: 14,
  color: 'var(--ink)',
  background: '#fff',
  fontFamily: 'inherit',
  outline: 'none',
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          fontSize: 9,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
          fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt
        style={{
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-4)',
          fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
          marginTop: 8,
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, color: 'var(--ink)' }}>{value}</dd>
    </>
  )
}

function PaymentForm({ orderId }: { orderId: string | null }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements || submitting) return
    setSubmitting(true)
    setError(null)

    const returnUrl = `${window.location.origin}/checkout/success?order=${orderId ?? ''}`
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    })
    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handlePay}>
      <PaymentElement />
      {error && (
        <div
          role="alert"
          style={{
            marginTop: 16,
            padding: '10px 12px',
            background: '#fdf6f6',
            border: '1px solid #f0d0d0',
            borderRadius: 6,
            color: '#7a1f1f',
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="btn btn-primary"
        style={{
          marginTop: 20,
          width: '100%',
          padding: '15px',
          fontSize: 13,
        }}
      >
        {submitting ? 'Authorizing…' : 'Authorize payment →'}
      </button>
    </form>
  )
}
