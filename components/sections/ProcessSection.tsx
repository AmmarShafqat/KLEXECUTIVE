'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Request',
    description:
      'Tell us your route, date, and vehicle preference. Our concierge responds within 15 minutes, around the clock.',
    time: '< 15 min response',
  },
  {
    number: '02',
    title: 'Confirm',
    description:
      'Receive your all-in quote. No surprises. Approve and your named chauffeur is assigned immediately.',
    time: 'Instant confirmation',
  },
  {
    number: '03',
    title: 'Arrive',
    description:
      'Your chauffeur meets you at the door. Luggage handled, route optimised, journey begins.',
    time: 'On time, guaranteed',
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--bg)' }}
      aria-label="How it works"
    >
      <div className="container-luxury">
        {/* Centered header */}
        <div className="text-center mb-16" style={{ maxWidth: '640px', margin: '0 auto 64px' }}>
          <div className="eyebrow-center mb-6">How it works</div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: 'var(--ink)',
              marginBottom: '20px',
            }}
          >
            From request to{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>
              arrival
            </em>
            , in three steps.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: 1.7 }}>
            Every journey begins with a conversation and ends exactly on time.
            Here is what to expect when you book with KL Exec.
          </p>
        </div>

        {/* Steps grid with connecting line */}
        <div
          style={{ position: 'relative' }}
        >
          {/* Gold connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="process-line"
            style={{
              position: 'absolute',
              top: '70px',
              left: '12%',
              right: '12%',
              height: '1px',
              background:
                'linear-gradient(to right, transparent, var(--gold) 20%, var(--gold) 80%, transparent)',
              opacity: 0.4,
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
            }}
            className="process-grid"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="pstep"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: i * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {/* Large number */}
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '120px',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      color: 'var(--gold)',
                      lineHeight: 1,
                      opacity: 0.18,
                      display: 'block',
                      background: 'var(--bg)',
                      padding: '0 8px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  {/* Small gold dot */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      right: '4px',
                      width: '6px',
                      height: '6px',
                      background: 'var(--gold)',
                      borderRadius: '50%',
                      zIndex: 2,
                    }}
                  />
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: '26px',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {step.description}
                </p>

                {/* Time pill */}
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: '999px',
                    padding: '6px 14px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      background: 'var(--gold)',
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-3)',
                    }}
                  >
                    {step.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .process-line { display: none; }
        }
      `}</style>
    </section>
  )
}
