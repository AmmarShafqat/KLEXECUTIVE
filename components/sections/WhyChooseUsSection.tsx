'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Shield,
  Clock,
  Car,
  Phone,
  Lock,
  DollarSign,
  type LucideIcon,
} from 'lucide-react'

interface WhyPoint {
  number: string
  title: string
  description: string
  Icon: LucideIcon
}

const points: WhyPoint[] = [
  {
    number: '01',
    title: 'Chauffeurs, not drivers.',
    description:
      'Licensed, background-checked professionals. The same face you met last visit is the face you&rsquo;ll meet next.',
    Icon: Shield,
  },
  {
    number: '02',
    title: 'On time, or it&rsquo;s on us.',
    description:
      "If we arrive more than five minutes late, that leg is complimentary. We've issued the refund fewer than 30 times in eight years.",
    Icon: Clock,
  },
  {
    number: '03',
    title: 'Fleet under 36 months.',
    description:
      'Vehicles are retired before they age. Every interior is detailed daily; every powertrain inspected before each assignment.',
    Icon: Car,
  },
  {
    number: '04',
    title: 'One concierge, one number.',
    description:
      'From first reservation to final receipt, a named account manager handles your file. No call centers.',
    Icon: Phone,
  },
  {
    number: '05',
    title: 'Discretion as default.',
    description:
      'Chauffeurs hold NDAs as a condition of employment. Trip data kept off shared platforms.',
    Icon: Lock,
  },
  {
    number: '06',
    title: 'Transparent, all-in pricing.',
    description:
      'Quoted rate includes gratuity, fuel surcharge, parking, and tolls. No hidden fees.',
    Icon: DollarSign,
  },
]

const stats = [
  { value: '87%', label: 'Repeat clientele' },
  { value: '500+', label: 'VIP Clients' },
  { value: '24/7', label: 'Concierge' },
]

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      ref={ref}
      id="why-us"
      className="section-padding"
      style={{ background: 'var(--bg-2)' }}
      aria-label="Why choose KL Exec"
    >
      <div className="container-luxury">
        {/* Section header — 2-col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="eyebrow mb-4">Why KL Exec · 04</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              maxWidth: '20ch',
            }}
          >
            Six standards we will{' '}
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--gold)',
              }}
            >
              not
            </em>{' '}
            compromise.
          </h2>
        </motion.div>

        {/* 2-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="why-grid"
        >
          {/* Left: numbered list */}
          <div>
            {points.map((point, i) => (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto',
                  alignItems: 'start',
                  gap: '24px',
                  padding: '30px 0',
                  borderTop: '1px solid var(--line)',
                }}
              >
                {/* Number */}
                <span
                  className="font-display"
                  style={{
                    fontSize: '28px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    paddingTop: '2px',
                  }}
                >
                  {point.number}
                </span>

                {/* Content */}
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      marginBottom: '8px',
                      lineHeight: 1.2,
                    }}
                    dangerouslySetInnerHTML={{ __html: point.title }}
                  />
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--ink-3)',
                      lineHeight: 1.7,
                    }}
                    dangerouslySetInnerHTML={{ __html: point.description }}
                  />
                </div>

                {/* Icon */}
                <point.Icon
                  size={24}
                  strokeWidth={1.3}
                  style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '4px' }}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>

          {/* Right: dark aside card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="why-aside"
            style={{
              background: 'var(--ink)',
              padding: '48px 40px',
              borderRadius: '4px',
              position: 'sticky',
              top: '100px',
            }}
          >
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '1px',
                  background: 'var(--gold)',
                }}
              />
              KL Exec Account
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 500,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Open a corporate{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>
                account
              </em>
              .
            </h3>

            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.75,
                marginBottom: '32px',
              }}
            >
              Monthly invoicing, dedicated account manager, and priority booking
              for your entire organisation. Trusted by America&apos;s leading
              companies.
            </p>

            <Link
              href="#contact"
              className="btn"
              style={{
                background: 'var(--gold)',
                color: '#fff',
                display: 'inline-flex',
                marginBottom: '36px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'var(--gold-soft)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'var(--gold)'
              }}
            >
              Speak with corporate →
            </Link>

            {/* Stats row */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
                paddingTop: '28px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div
                    className="font-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 500,
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)',
                      marginTop: '5px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .why-grid {
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
        }
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .why-aside { position: static !important; }
        }
      `}</style>
    </section>
  )
}
