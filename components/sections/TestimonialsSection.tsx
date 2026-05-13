'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const featuredTestimonial = {
  quote:
    'Klexec handled our entire roadshow — fourteen cities, six vehicles, zero incidents. Every brief absorbed, every preference remembered. I haven\'t used another car service since.',
  name: 'Datuk Ahmad Razif',
  role: 'Group CEO, Meridian Holdings',
  initials: 'AR',
}

const gridTestimonials = [
  {
    quote:
      'The wedding day transfer was perfect. Our chauffeur arrived early, the vehicle was immaculate with ribbons exactly as requested, and the entire experience felt genuinely special.',
    name: 'Sarah Lim',
    role: 'New York',
    initials: 'SL',
    rating: 5,
  },
  {
    quote:
      'Every airport transfer, every time — consistent, punctual, and always the same impeccable standard. The only chauffeur service I trust in New York.',
    name: 'James Whitfield',
    role: 'Managing Director, Singapore',
    initials: 'JW',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-padding"
      style={{ background: 'var(--bg)' }}
      aria-label="Client testimonials"
    >
      <div className="container-luxury">
        {/* Feature testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            padding: '64px 0',
            marginBottom: '48px',
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="feature-quote-grid"
        >
          {/* Left: giant quote mark */}
          <div
            className="font-display"
            style={{
              fontStyle: 'italic',
              fontSize: '160px',
              lineHeight: 0.6,
              color: 'var(--gold)',
              opacity: 0.7,
              userSelect: 'none',
              textAlign: 'center',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Right: quote */}
          <div>
            <blockquote>
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--ink)',
                  lineHeight: 1.45,
                  marginBottom: '28px',
                }}
              >
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </p>

              <footer
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--ink-3)',
                    }}
                  >
                    {featuredTestimonial.initials}
                  </span>
                </div>
                <div>
                  <cite
                    style={{
                      fontStyle: 'normal',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      display: 'block',
                    }}
                  >
                    {featuredTestimonial.name}
                  </cite>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '10.5px',
                      letterSpacing: '0.08em',
                      color: 'var(--ink-4)',
                    }}
                  >
                    {featuredTestimonial.role}
                  </span>
                </div>
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Grid of 2 testimonial cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
          className="testi-grid"
        >
          {gridTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testi"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                padding: '32px',
                borderRadius: '2px',
              }}
            >
              {/* Stars */}
              <div
                className="flex items-center gap-1 mb-5"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, si) => (
                  <svg
                    key={si}
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="var(--gold)"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-display"
                style={{
                  fontSize: '20px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                  marginBottom: '24px',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <footer
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="font-display"
                    style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-3)' }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <cite
                    style={{
                      fontStyle: 'normal',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      display: 'block',
                    }}
                  >
                    {t.name}
                  </cite>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '9.5px',
                      letterSpacing: '0.08em',
                      color: 'var(--ink-4)',
                    }}
                  >
                    {t.role}
                  </span>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .feature-quote-grid {
          grid-template-columns: 0.85fr 1.15fr;
          gap: 60px;
        }
        @media (max-width: 768px) {
          .feature-quote-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .feature-quote-grid > div:first-child { display: none; }
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
