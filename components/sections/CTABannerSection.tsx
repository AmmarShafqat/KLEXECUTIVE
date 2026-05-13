'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export default function CTABannerSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--ink)',
        padding: '110px 0',
      }}
      aria-label="Reserve your ride"
    >
      {/* Radial gradient blob top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(168,138,79,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-luxury relative z-10">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '60px',
            alignItems: 'end',
          }}
          className="cta-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Gold eyebrow */}
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '36px',
                  height: '1px',
                  background: 'var(--gold)',
                }}
              />
              Reserve
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 500,
                letterSpacing: '-0.026em',
                lineHeight: 1.0,
                color: '#fff',
              }}
            >
              Reserve your
              <br />
              ride{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold-soft)',
                }}
              >
                today
              </em>
              .
            </h2>
          </motion.div>

          {/* Right aside */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="cta-aside flex flex-col gap-6 items-start"
          >
            <a
              href="tel:+12125550123"
              className="font-display"
              style={{
                fontSize: '30px',
                fontWeight: 400,
                color: '#fff',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--gold-soft)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff'
              }}
            >
              +1 (212) 555-0123
            </a>

            <Link
              href="#contact"
              className="btn"
              style={{
                background: '#fff',
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'var(--gold-soft)'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#fff'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--ink)'
              }}
            >
              Book now →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .cta-grid {
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: end;
        }
        @media (max-width: 640px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .cta-aside { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  )
}
