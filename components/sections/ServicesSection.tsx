'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 'airport',
    title: 'Airport Transfer',
    description: 'Flight-tracked pickups at JFK, EWR & LGA. Meet-and-greet included.',
    image: '/images/airportcarservice.webp',
  },
  {
    id: 'blackcar',
    title: 'Black Car Service',
    description: 'Impeccable presentation and vetted chauffeurs for every business mile.',
    image: '/images/luxuryblackcarservice.webp',
  },
  {
    id: 'van',
    title: 'Private Van Service',
    description: 'First-class group travel with ample space, on schedule every time.',
    image: '/images/privatevanservice.webp',
  },
  {
    id: 'limo',
    title: 'Limousine Service',
    description: 'Stretch limousines that turn every occasion into a lasting memory.',
    image: '/images/limousinecarservice.webp',
  },
  {
    id: 'wedding',
    title: 'Wedding Transport',
    description: 'Elegant, decorated vehicles for your most important journey.',
    image: '/images/weddinglimoservice.webp',
  },
  {
    id: 'executive',
    title: 'Executive Service',
    description: 'Discretion and privacy for the modern executive. Corporate billing available.',
    image: '/images/executivelimoservice.webp',
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      ref={ref}
      id="services"
      className="section-padding"
      style={{ background: 'var(--bg-2)' }}
      aria-label="Our services"
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="eyebrow mb-4">Services · 02</div>
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
              Explore what we{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>
                offer
              </em>
              .
            </h2>
            <Link href="#contact" className="btn-link" style={{ flexShrink: 0 }}>
              Plan a journey →
            </Link>
          </div>
        </motion.div>

        {/* 3-column grid of cards */}
        <div
          className="services-card-grid"
          style={{ display: 'grid', gap: '12px' }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Link
                href="#contact"
                aria-label={service.title}
                className="block transition-all duration-200"
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
                    padding: '22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--ink-3)',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div
                  style={{
                    width: '140px',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="140px"
                    loading="lazy"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .services-card-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .services-card-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .services-card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
