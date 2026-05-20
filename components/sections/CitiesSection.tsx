'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

type Route = {
  id: string
  destination: string
  miles: string
  duration: string
  image?: string
  accent: string
}

const routes: Route[] = [
  {
    id: 'atlantic-city',
    destination: 'Atlantic City',
    miles: '125 miles',
    duration: '2h 00m',
    image: '/images/atlantic-city.webp',
    accent: 'linear-gradient(135deg, #1a1815 0%, #3a3733 100%)',
  },
  {
    id: 'hamptons',
    destination: 'Hamptons',
    miles: '95 miles',
    duration: '2h 00m',
    image: '/images/hamptons.webp',
    accent: 'linear-gradient(135deg, #1a1d15 0%, #3d4533 100%)',
  },
  {
    id: 'philadelphia',
    destination: 'Philadelphia',
    miles: '95 miles',
    duration: '1h 45m',
    image: '/images/philadelphia.webp',
    accent: 'linear-gradient(135deg, #221c14 0%, #54422a 100%)',
  },
  {
    id: 'boston',
    destination: 'Boston',
    miles: '200 miles',
    duration: '3h 30m',
    image: '/images/boston.webp',
    accent: 'linear-gradient(135deg, #14181e 0%, #303948 100%)',
  },
  {
    id: 'albany',
    destination: 'Albany',
    miles: '155 miles',
    duration: '2h 45m',
    image: '/images/albany.webp',
    accent: 'linear-gradient(135deg, #20171a 0%, #443138 100%)',
  },
  {
    id: 'hartford',
    destination: 'Hartford',
    miles: '120 miles',
    duration: '2h 15m',
    image: '/images/hartford.webp',
    accent: 'linear-gradient(135deg, #16161c 0%, #34354a 100%)',
  },
]

export default function CitiesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      ref={ref}
      id="intercity"
      className="section-padding"
      style={{ background: 'var(--bg-2)' }}
      aria-label="Intercity rides"
    >
      <div className="container-luxury">
        {/* Header — matches Services pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="eyebrow mb-4">Intercity · 05</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 3.8vw, 56px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--ink)',
              }}
            >
              Intercity{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}
              >
                rides
              </em>
              .
            </h2>
            <Link
              href="#contact"
              className="btn-link"
              style={{ flexShrink: 0 }}
            >
              Plan a journey →
            </Link>
          </div>
          <p
            style={{
              marginTop: '14px',
              color: 'var(--ink-3)',
              fontSize: '14px',
              lineHeight: 1.6,
              maxWidth: '520px',
            }}
          >
            Skip the airport lines, drop the station crowds. Ride your
            personal intercity car.
          </p>
        </motion.div>

        {/* 3-column grid of cards — same structure as Services */}
        <div
          className="intercity-card-grid"
          style={{ display: 'grid', gap: '12px' }}
        >
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <Link
                href="#contact"
                aria-label={`Book a ride from New York City to ${route.destination}`}
                className="intercity-card block transition-all duration-200"
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  height: '120px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--ink)'
                  el.style.boxShadow = '0 4px 20px rgba(40,30,10,0.09)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--line)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Text */}
                <div
                  style={{
                    flex: 1,
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '6px',
                    minWidth: 0,
                  }}
                >
                  {/* From → To row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-jetbrains), ui-monospace, monospace',
                        fontSize: '10.5px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-3)',
                        flexShrink: 0,
                      }}
                    >
                      NYC
                    </span>
                    <ChevronRight
                      size={12}
                      strokeWidth={1.75}
                      style={{ color: 'var(--gold)', flexShrink: 0 }}
                    />
                    <h3
                      style={{
                        fontFamily:
                          'var(--font-manrope), system-ui, sans-serif',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        lineHeight: 1.2,
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {route.destination}
                    </h3>
                  </div>

                  {/* Meta */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '11.5px',
                      letterSpacing: '0.02em',
                      color: 'var(--ink-3)',
                    }}
                  >
                    <span>{route.miles}</span>
                    <span aria-hidden="true">·</span>
                    <span>{route.duration}</span>
                  </div>

                  {/* Hover-reveal CTA */}
                  <div
                    className="intercity-cta"
                    aria-hidden="true"
                    style={{
                      marginTop: '2px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      width: 'fit-content',
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      borderBottom: '1px solid var(--gold)',
                      paddingBottom: '2px',
                      opacity: 0,
                      maxHeight: 0,
                      transform: 'translateY(4px)',
                      transition:
                        'opacity 0.3s cubic-bezier(0.25,0.4,0.25,1), transform 0.3s cubic-bezier(0.25,0.4,0.25,1), max-height 0.3s cubic-bezier(0.25,0.4,0.25,1)',
                      overflow: 'hidden',
                    }}
                  >
                    Book your ride
                    <ChevronRight size={11} strokeWidth={2} />
                  </div>
                </div>

                {/* Image */}
                <div
                  style={{
                    width: '140px',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    background: route.accent,
                  }}
                >
                  {route.image && (
                    <Image
                      src={route.image}
                      alt={`${route.destination} skyline`}
                      fill
                      className="object-cover intercity-img"
                      sizes="(max-width: 560px) 140px, (max-width: 900px) 140px, 140px"
                      loading="lazy"
                      quality={75}
                    />
                  )}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to right, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.15) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .intercity-card-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .intercity-card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .intercity-card-grid { grid-template-columns: 1fr; }
        }

        .intercity-card:hover .intercity-cta,
        .intercity-card:focus-visible .intercity-cta {
          opacity: 1 !important;
          max-height: 24px !important;
          transform: translateY(0) !important;
        }
        .intercity-card .intercity-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.4, 0.25, 1);
        }
        .intercity-card:hover .intercity-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
