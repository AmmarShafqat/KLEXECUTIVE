'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const contactRows = [
  {
    label: 'Call Us',
    value: '+1 (212) 555-0123',
    sub: 'Available 24 hours, 7 days a week',
    href: 'tel:+12125550123',
    isSerif: true,
  },
  {
    label: 'Email',
    value: 'concierge@klexec.com',
    sub: 'We reply within 15 minutes',
    href: 'mailto:concierge@klexec.com',
    isSerif: false,
  },
  {
    label: 'Location',
    value: 'Manhattan, New York',
    sub: 'Serving NYC · Tri-State · Northeast',
    href: undefined,
    isSerif: true,
  },
]

const serviceOptions = [
  'Airport Transfer',
  'Black Car Service',
  'Hourly & As-Directed',
  'Private Van Service',
  'Limousine Service',
  'Wedding Transport',
  'Executive / Corporate',
  'Other',
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid var(--line)',
    borderRadius: 0,
    padding: '10px 0',
    fontSize: '14px',
    color: 'var(--ink)',
    background: 'transparent',
    outline: 'none',
    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="section-padding"
      style={{ background: 'var(--bg)' }}
      aria-label="Contact and enquiries"
    >
      <div className="container-luxury">
        {/* Section header — 2-col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="eyebrow mb-4">Contact · 06</div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(34px, 4vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.06,
                color: 'var(--ink)',
                marginBottom: '16px',
              }}
            >
              Ready when{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}
              >
                you are
              </em>
              .
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--ink-3)', lineHeight: 1.75, maxWidth: '38ch' }}>
              Tell us where you need to be. We handle everything else — from the first mile to the last detail.
            </p>
          </div>
        </motion.div>

        {/* Contact grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '80px',
          }}
          className="contact-grid"
        >
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="contact-info"
          >
            {contactRows.map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                  padding: '24px 0',
                  borderTop: '1px solid var(--line)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-jetbrains), ui-monospace, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-4)',
                    paddingTop: '4px',
                  }}
                >
                  {row.label}
                </span>
                <div>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={
                        row.href.startsWith('https') ? '_blank' : undefined
                      }
                      rel={
                        row.href.startsWith('https')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="font-display block transition-colors duration-200"
                      style={{
                        fontSize: row.isSerif ? '22px' : '16px',
                        fontWeight: 400,
                        color: 'var(--ink)',
                        marginBottom: '4px',
                        textDecoration: 'none',
                        fontFamily: row.isSerif
                          ? undefined
                          : 'var(--font-manrope), system-ui, sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          'var(--gold)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          'var(--ink)'
                      }}
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span
                      className="font-display block"
                      style={{
                        fontSize: '22px',
                        fontWeight: 400,
                        color: 'var(--ink)',
                        marginBottom: '4px',
                      }}
                    >
                      {row.value}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily:
                        'var(--font-jetbrains), ui-monospace, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'var(--ink-4)',
                    }}
                  >
                    {row.sub}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                padding: '36px',
                borderRadius: '4px',
              }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="font-display"
                    style={{
                      fontSize: '28px',
                      fontWeight: 400,
                      color: 'var(--ink)',
                      marginBottom: '12px',
                    }}
                  >
                    Thank you.
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)' }}>
                    Your enquiry has been received. We will be in touch within
                    15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row: Full Name + Company */}
                  <div className="flex gap-4 mb-5">
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="name"
                        style={{
                          fontFamily:
                            'var(--font-jetbrains), ui-monospace, monospace',
                          fontSize: '9px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-4)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--ink)'
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--line)'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="company"
                        style={{
                          fontFamily:
                            'var(--font-jetbrains), ui-monospace, monospace',
                          fontSize: '9px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-4)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Company (optional)"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--ink)'
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--line)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row: Email + Phone */}
                  <div className="flex gap-4 mb-5">
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="email"
                        style={{
                          fontFamily:
                            'var(--font-jetbrains), ui-monospace, monospace',
                          fontSize: '9px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-4)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--ink)'
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--line)'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="phone"
                        style={{
                          fontFamily:
                            'var(--font-jetbrains), ui-monospace, monospace',
                          fontSize: '9px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-4)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (212) XXX-XXXX"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--ink)'
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderBottomColor =
                            'var(--line)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Service select */}
                  <div className="mb-5">
                    <label
                      htmlFor="service"
                      style={{
                        fontFamily:
                          'var(--font-jetbrains), ui-monospace, monospace',
                        fontSize: '9px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-4)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Service of interest
                    </label>
                    <select
                      id="service"
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLSelectElement).style.borderBottomColor =
                          'var(--ink)'
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLSelectElement).style.borderBottomColor =
                          'var(--line)'
                      }}
                    >
                      <option value="">Select a service…</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Textarea */}
                  <div className="mb-7">
                    <label
                      htmlFor="message"
                      style={{
                        fontFamily:
                          'var(--font-jetbrains), ui-monospace, monospace',
                        fontSize: '9px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-4)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Journey Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Pickup location, date &amp; time, number of passengers, any special requests…"
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '80px',
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderBottomColor =
                          'var(--ink)'
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderBottomColor =
                          'var(--line)'
                      }}
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p
                      style={{
                        fontFamily:
                          'var(--font-jetbrains), ui-monospace, monospace',
                        fontSize: '9.5px',
                        letterSpacing: '0.06em',
                        color: 'var(--ink-4)',
                        lineHeight: 1.5,
                        maxWidth: '200px',
                      }}
                    >
                      24/7 · Replies within 15 minutes
                    </p>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Request a quote →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .contact-grid {
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
