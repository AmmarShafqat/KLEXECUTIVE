'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Vehicle {
  id: number
  name: string
  model: string
  year: number
  category: string
  description: string
  passengers: number
  luggage: number
  interior: string
  tier: string
  price: string
  image: string
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: 'The Diplomat',
    model: 'Mercedes-Benz S-Class',
    year: 2025,
    category: 'sedan',
    description:
      'The definitive executive sedan. Whisper-quiet cabin, massaging seats with MBUX Hyperscreen, and a presence that commands any arrival.',
    passengers: 3,
    luggage: 3,
    interior: 'Nappa Leather',
    tier: '★★★★',
    price: 'From $95/hr',
    image: '/images/fleet-images/mercedes-s-class.webp',
  },
  {
    id: 2,
    name: 'The Senator',
    model: 'Cadillac XTS / Lincoln MKZ',
    year: 2024,
    category: 'sedan',
    description:
      'Refined American luxury with a composed ride and generous executive rear cabin. The understated choice for the discerning traveller.',
    passengers: 3,
    luggage: 3,
    interior: 'Premium Leather',
    tier: '★★★',
    price: 'From $65/hr',
    image: '/images/fleet-images/cadillac-xts.webp',
  },
  {
    id: 3,
    name: 'The Commander',
    model: 'Cadillac Escalade ESV',
    year: 2024,
    category: 'suv',
    description:
      'Full-size luxury with commanding presence. Rear-seat entertainment, panoramic moonroof, and six individual seats in a cabin built for VIPs.',
    passengers: 6,
    luggage: 6,
    interior: 'Jet Black Leather',
    tier: '★★★★',
    price: 'From $125/hr',
    image: '/images/fleet-images/cadillac-escalade.webp',
  },
  {
    id: 4,
    name: 'The Vanguard',
    model: 'Chevrolet Suburban',
    year: 2024,
    category: 'suv',
    description:
      'Space and capability in equal measure. A perennial choice for families, groups, and executives moving with luggage across the Tri-State area.',
    passengers: 6,
    luggage: 6,
    interior: 'Leather Appointed',
    tier: '★★★',
    price: 'From $95/hr',
    image: '/images/fleet-images/chevy-suburban.webp',
  },
  {
    id: 5,
    name: 'The Convoy',
    model: 'Mercedes Sprinter',
    year: 2024,
    category: 'sprinter',
    description:
      'Executive group travel reconfigured. Twelve individual seats, ambient lighting, and ample luggage capacity for roadshows or corporate transfers.',
    passengers: 12,
    luggage: 8,
    interior: 'Executive Fabric',
    tier: '★★★',
    price: 'From $175/hr',
    image: '/images/fleet-images/mercedes-sprinter.webp',
  },
  {
    id: 6,
    name: 'The Pinnacle',
    model: 'Lincoln Stretch Limousine',
    year: 2024,
    category: 'first',
    description:
      'Eight passengers in red-carpet luxury. Premium sound, ambient lighting, and bespoke presentation for weddings, galas, and occasions that demand a statement.',
    passengers: 8,
    luggage: 4,
    interior: 'Bespoke',
    tier: '★★★★★',
    price: 'From $195/hr',
    image: '/images/fleet-images/lincoln-stretch-limo.webp',
  },
]


export default function FleetSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const [activeIndex, setActiveIndex] = useState(0)

  const featured = vehicles[activeIndex]

  const prev = () =>
    setActiveIndex((i) => (i - 1 + vehicles.length) % vehicles.length)
  const next = () => setActiveIndex((i) => (i + 1) % vehicles.length)

  return (
    <section
      ref={ref}
      id="fleet"
      className="section-padding"
      style={{ background: 'var(--bg)' }}
      aria-label="Our fleet"
    >
      <div className="container-luxury">
        {/* Header 2-col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="eyebrow mb-4">Fleet · 03</div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 4vw, 60px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--ink)',
              }}
            >
              A fleet kept{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}
              >
                impeccable
              </em>
              .
            </h2>
          </div>
        </motion.div>

        {/* Featured card */}
        <motion.div
          key={featured.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr',
            gap: '0',
            border: '1px solid var(--line)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* Left — image */}
          <div
            className="feature-image"
            style={{ position: 'relative', minHeight: '400px', background: '#ffffff' }}
          >
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-contain"
              style={{ padding: '24px' }}
              sizes="(max-width: 768px) 100vw, 65vw"
              loading="lazy"
            />

            {/* Frame tag top-left */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(26,24,21,0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '4px',
                padding: '8px 14px',
              }}
            >
              <span
                style={{
                  fontFamily:
                    'var(--font-jetbrains), ui-monospace, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {featured.model} · {featured.year}
              </span>
            </div>

            {/* Index counter bottom-left */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(26,24,21,0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              <span
                style={{
                  fontFamily:
                    'var(--font-jetbrains), ui-monospace, monospace',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.1em',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(vehicles.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev/next bottom-right */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '8px',
              }}
            >
              {[
                { onClick: prev, icon: ArrowLeft, label: 'Previous vehicle' },
                { onClick: next, icon: ArrowRight, label: 'Next vehicle' },
              ].map(({ onClick, icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={onClick}
                  aria-label={label}
                  className="transition-all duration-200"
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.9)'
                    el.style.color = 'var(--ink)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.1)'
                    el.style.color = '#fff'
                  }}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

          {/* Right — body */}
          <div
            className="feature-body"
            style={{
              padding: '48px 40px',
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              className="eyebrow mb-4"
              style={{ fontSize: '9.5px', letterSpacing: '0.2em' }}
            >
              {featured.category === 'first'
                ? 'First Class'
                : featured.category === 'sedan'
                ? 'Executive Sedan'
                : featured.category === 'suv'
                ? 'Premium SUV'
                : featured.category === 'sprinter'
                ? 'Business Sprinter'
                : 'Fleet'}
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 500,
                color: 'var(--ink)',
                lineHeight: 1.05,
                marginBottom: '6px',
              }}
            >
              {featured.name}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--ink-4)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {featured.model} · {featured.year}
            </p>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--ink-3)',
                lineHeight: 1.75,
                marginBottom: '32px',
              }}
            >
              {featured.description}
            </p>

            {/* Specs grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              {[
                { label: 'Passengers', value: `${featured.passengers}` },
                { label: 'Luggage', value: `${featured.luggage} bags` },
                { label: 'Interior', value: featured.interior },
                { label: 'Tier', value: featured.tier },
              ].map((spec) => (
                <div
                  key={spec.label}
                  style={{
                    background: 'var(--bg-2)',
                    borderRadius: '4px',
                    padding: '12px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '8.5px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-4)',
                      marginBottom: '5px',
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-jetbrains), ui-monospace, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-4)',
                    marginBottom: '3px',
                  }}
                >
                  Starting from
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  {featured.price}
                </div>
              </div>
              <Link href="#contact" className="btn btn-primary">
                Reserve this vehicle
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        <div
          style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: `repeat(${Math.min(vehicles.length, 6)}, 1fr)`,
          }}
          className="thumb-grid"
        >
          {vehicles.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${v.name}`}
              aria-pressed={i === activeIndex}
              className="transition-all duration-200 group text-left"
              style={{
                border:
                  i === activeIndex
                    ? '2px solid var(--ink)'
                    : '1px solid var(--line)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow:
                  i === activeIndex
                    ? '0 4px 12px rgba(40,30,10,0.12)'
                    : 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ aspectRatio: '4/3', position: 'relative', background: '#ffffff' }}>
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-contain"
                  style={{ padding: '8px' }}
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>
              <div
                style={{
                  padding: '10px 12px',
                  background: i === activeIndex ? 'var(--ink)' : 'var(--bg)',
                  transition: 'background 0.2s',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: i === activeIndex ? '#fff' : 'var(--ink)',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-jetbrains), ui-monospace, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:
                      i === activeIndex
                        ? 'rgba(255,255,255,0.55)'
                        : 'var(--ink-4)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {v.model}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .feature-image { min-height: 380px; }
        @media (max-width: 768px) {
          .container-luxury > div[style*="grid-template-columns: 1.35fr"] {
            grid-template-columns: 1fr !important;
          }
          .feature-image { min-height: 280px; }
          .feature-body { padding: 28px 24px !important; }
          .thumb-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .thumb-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
