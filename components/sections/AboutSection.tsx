'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding"
      style={{ background: 'var(--bg-2)' }}
      aria-label="About KL Exec"
    >
      <div className="container-luxury">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                aspectRatio: '4/5',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--bg-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.28em',
                    fontWeight: 800,
                    color: 'var(--ink-4)',
                    marginBottom: '6px',
                  }}
                >
                  KLEXEC
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--line-2)',
                  }}
                >
                  Photo coming soon
                </div>
              </div>
            </div>

            {/* "KL EXEC · EST. 2014" tag */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(26,24,21,0.82)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
                padding: '8px 14px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                KL EXEC · EST. 2014
              </span>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="eyebrow mb-6">About KL Exec · 05</div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(34px, 4vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.06,
                color: 'var(--ink)',
                marginBottom: '28px',
              }}
            >
              Built around the people{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}
              >
                we drive
              </em>
              .
            </h2>

            <p
              className="font-display"
              style={{
                fontSize: '22px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--ink)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              KL Exec was founded in 2014 with a single black sedan and a
              conviction the rest of the industry had quietly abandoned —
              that getting somewhere can itself feel like arrival.
            </p>

            <p
              style={{
                fontSize: '14.5px',
                color: 'var(--ink-3)',
                lineHeight: 1.8,
                marginBottom: '32px',
              }}
            >
              Today we operate across New York City and throughout the United States,
              still privately owned, still answering the phone before it rings
              twice. We don&apos;t dispatch through apps. We don&apos;t sublet
              to rideshare. Every chauffeur is ours.
            </p>

            {/* Signature row */}
            <div
              className="flex items-center gap-5"
              style={{ paddingTop: '24px', borderTop: '1px solid var(--line)' }}
            >
              <span
                className="font-display"
                style={{
                  fontStyle: 'italic',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                Azri &amp; Farah
              </span>
              <div
                style={{
                  width: '1px',
                  height: '32px',
                  background: 'var(--line-2)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-4)',
                }}
              >
                Founders / KL Exec
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .about-grid {
          grid-template-columns: 0.85fr 1.15fr;
          gap: 80px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
