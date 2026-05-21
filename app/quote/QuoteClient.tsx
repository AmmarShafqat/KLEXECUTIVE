'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight, Users } from 'lucide-react'
import {
  calculateQuote,
  fetchVehicleClasses,
  type Quote,
  type VehicleClass,
} from '@/lib/graphql-operations'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type Status = 'loading' | 'ready' | 'error'

type QuotedClass = {
  vehicle: VehicleClass
  quote: Quote | null
  error: string | null
}

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

export default function QuoteClient() {
  const params = useSearchParams()
  const router = useRouter()

  const pickup = params.get('pickup') ?? ''
  const destination = params.get('destination') ?? ''
  const pickupAt = params.get('pickupAt') ?? ''
  const miles = Number(params.get('miles') ?? '0')
  const minutes = Number(params.get('minutes') ?? '0')

  const hasParams =
    pickup && destination && pickupAt && miles > 0 && minutes > 0

  const [status, setStatus] = useState<Status>('loading')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [quoted, setQuoted] = useState<QuotedClass[]>([])

  useEffect(() => {
    if (!hasParams) {
      setStatus('error')
      setErrorMsg(
        'No booking details provided. Head back to the booking widget to start over.',
      )
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const vehicles = await fetchVehicleClasses()
        if (cancelled) return
        const results = await Promise.all(
          vehicles.map(async (v): Promise<QuotedClass> => {
            try {
              const q = await calculateQuote({
                pickup,
                destination,
                pickupAt,
                miles,
                minutes,
                vehicleClass: v.slug,
              })
              return { vehicle: v, quote: q, error: null }
            } catch (e) {
              return {
                vehicle: v,
                quote: null,
                error: e instanceof Error ? e.message : 'Unable to price',
              }
            }
          }),
        )
        if (cancelled) return
        setQuoted(results)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setErrorMsg(
          e instanceof Error
            ? e.message
            : 'Could not reach the pricing service.',
        )
      }
    })()
    return () => {
      cancelled = true
    }
  }, [pickup, destination, pickupAt, miles, minutes, hasParams])

  const cheapest = useMemo(() => {
    const priced = quoted
      .filter((q) => q.quote)
      .sort((a, b) => (a.quote!.totalCents - b.quote!.totalCents))
    return priced[0]?.vehicle.slug
  }, [quoted])

  function onSelect(slug: string) {
    const next = new URLSearchParams(params.toString())
    next.set('vehicleClass', slug)
    router.push(`/checkout?${next.toString()}`)
  }

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
        <div className="container-luxury">
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div className="eyebrow mb-4">Step 2 of 3 · Choose your ride</div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: '12px',
              }}
            >
              Your{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}
              >
                quote
              </em>
              .
            </h1>
            {hasParams && (
              <p style={{ color: 'var(--ink-3)', fontSize: '14px', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--ink)' }}>{pickup}</span>
                {' '}→{' '}
                <span style={{ color: 'var(--ink)' }}>{destination}</span>
                <br />
                {formatDate(pickupAt)} · {miles.toFixed(1)} mi · {minutes} min
              </p>
            )}
          </div>

          {status === 'loading' && (
            <p style={{ color: 'var(--ink-3)', textAlign: 'center', padding: '48px' }}>
              Calculating prices…
            </p>
          )}

          {status === 'error' && (
            <div
              role="alert"
              style={{
                padding: '24px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                background: '#fdf6f6',
                color: '#7a1f1f',
              }}
            >
              <strong>We hit a snag.</strong>
              <p style={{ marginTop: 4, fontSize: 14 }}>{errorMsg}</p>
              <Link
                href="/"
                className="btn-link"
                style={{ marginTop: 12, display: 'inline-flex' }}
              >
                ← Back to home
              </Link>
            </div>
          )}

          {status === 'ready' && (
            <div
              className="vehicle-grid"
              style={{ display: 'grid', gap: '14px' }}
            >
              {quoted.map(({ vehicle, quote, error }) => (
                <article
                  key={vehicle.slug}
                  className="vehicle-card"
                  style={{
                    background: '#fff',
                    border:
                      cheapest === vehicle.slug
                        ? '1px solid var(--gold)'
                        : '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '22px 24px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '24px',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {cheapest === vehicle.slug && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 22,
                        background: 'var(--gold)',
                        color: '#fff',
                        fontSize: 9.5,
                        fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 999,
                      }}
                    >
                      Best value
                    </div>
                  )}

                  {vehicle.imageUrl ? (
                    /* Plain <img> — backend returns an absolute URL pointing at
                       this same frontend's /public assets. Next.js Image would
                       require remotePatterns config for localhost:3000. */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.displayName}
                      loading="lazy"
                      style={{
                        width: '140px',
                        height: '92px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        background: 'var(--bg-2)',
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '140px',
                        height: '92px',
                        background: 'var(--bg-2)',
                        borderRadius: '6px',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <div>
                    <h2
                      className="font-display"
                      style={{
                        fontSize: '24px',
                        fontWeight: 500,
                        color: 'var(--ink)',
                        lineHeight: 1.15,
                        marginBottom: '6px',
                      }}
                    >
                      {vehicle.displayName}
                    </h2>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        flexWrap: 'wrap',
                        color: 'var(--ink-3)',
                        fontSize: 12.5,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Users size={13} strokeWidth={1.5} /> Up to {vehicle.capacity}
                      </span>
                      {vehicle.description && (
                        <span>{vehicle.description}</span>
                      )}
                    </div>

                    {quote && (
                      <details
                        style={{
                          marginTop: 12,
                          color: 'var(--ink-3)',
                          fontSize: 12,
                          fontFamily:
                            'var(--font-jetbrains), ui-monospace, monospace',
                        }}
                      >
                        <summary style={{ cursor: 'pointer' }}>
                          Price breakdown
                        </summary>
                        <table
                          style={{
                            marginTop: 8,
                            width: '100%',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <tbody>
                            {quote.lines.map((line, i) => (
                              <tr key={i}>
                                <td style={{ padding: '2px 0' }}>
                                  {line.label}
                                  {line.note && (
                                    <span
                                      style={{
                                        color: 'var(--ink-4)',
                                        marginLeft: 6,
                                      }}
                                    >
                                      ({line.note})
                                    </span>
                                  )}
                                </td>
                                <td
                                  style={{
                                    textAlign: 'right',
                                    padding: '2px 0',
                                  }}
                                >
                                  {formatMoney(line.amountCents)}
                                </td>
                              </tr>
                            ))}
                            <tr style={{ borderTop: '1px solid var(--line)' }}>
                              <td style={{ padding: '4px 0' }}>Gratuity (20%)</td>
                              <td
                                style={{
                                  textAlign: 'right',
                                  padding: '4px 0',
                                }}
                              >
                                {formatMoney(quote.gratuityCents)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </details>
                    )}

                    {error && (
                      <p
                        style={{
                          color: '#a02929',
                          fontSize: 12,
                          marginTop: 8,
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {quote ? (
                      <>
                        <div
                          style={{
                            fontFamily:
                              'var(--font-cormorant), Georgia, serif',
                            fontSize: 28,
                            fontWeight: 500,
                            color: 'var(--ink)',
                            lineHeight: 1,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {formatMoney(quote.totalCents)}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'var(--ink-3)',
                            marginTop: 2,
                          }}
                        >
                          incl. gratuity
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelect(vehicle.slug)}
                          className="btn btn-primary"
                          style={{
                            marginTop: 12,
                            fontSize: 11,
                            padding: '10px 18px',
                            gap: 6,
                          }}
                        >
                          Select <ChevronRight size={14} strokeWidth={2} />
                        </button>
                      </>
                    ) : (
                      <div
                        style={{
                          color: 'var(--ink-3)',
                          fontSize: 12,
                          fontStyle: 'italic',
                        }}
                      >
                        Price unavailable
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .vehicle-grid article.vehicle-card {
              grid-template-columns: 1fr !important;
              text-align: left;
            }
            .vehicle-grid article.vehicle-card img,
            .vehicle-grid article.vehicle-card > div[aria-hidden] {
              width: 100% !important;
              height: 160px !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
