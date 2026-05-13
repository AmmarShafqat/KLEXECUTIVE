'use client'

import Link from 'next/link'
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react'

const serviceLinks = [
  'Airport Transfer',
  'Corporate Travel',
  'Hourly & As-Directed',
  'Weddings & Galas',
  'City-to-City',
  'IPO Roadshows',
]

const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
  { label: 'Careers', href: '#' },
]

const cityLinks = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'The Bronx',
  'Westchester',
  'Long Island',
]

export default function Footer() {
  return (
    <footer
      className="bg-white"
      id="footer"
      role="contentinfo"
      style={{ borderTop: '1px solid var(--line)', paddingBottom: '30px' }}
    >
      <div className="container-luxury" style={{ paddingTop: '70px' }}>
        {/* 4-column grid */}
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div className="mb-4 relative inline-flex flex-col">
              <div className="relative inline-flex">
                <span
                  style={{
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    fontSize: '18px',
                    letterSpacing: '0.24em',
                    fontWeight: 800,
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  KLEXEC
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: '5px',
                    height: '5px',
                    background: 'var(--gold)',
                    borderRadius: '50%',
                    top: '-3px',
                    right: '-8px',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                  fontSize: '7.5px',
                  letterSpacing: '0.22em',
                  color: 'var(--ink-4)',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                EST. 2014
              </span>
            </div>
            <p
              className="mb-6 max-w-xs leading-relaxed"
              style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}
            >
              New York&apos;s premier executive chauffeur service.
              Uncompromising luxury, precision, and professionalism on every
              journey.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transition-all duration-300"
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--line)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ink-4)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--ink)'
                    el.style.borderColor = 'var(--ink)'
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'transparent'
                    el.style.borderColor = 'var(--line)'
                    el.style.color = 'var(--ink-4)'
                  }}
                >
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Service */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Service
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="transition-colors duration-200"
                    style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--ink-3)'
                    }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KL Exec */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              KL Exec
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200"
                    style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--ink-3)'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Cities
            </h3>
            <ul className="space-y-3">
              {cityLinks.map((city) => (
                <li key={city}>
                  <span
                    style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}
                  >
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'var(--ink-4)',
            }}
          >
            © {new Date().getFullYear()} KL Exec. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="transition-colors duration-200"
                  style={{
                    fontFamily:
                      'var(--font-jetbrains), ui-monospace, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.04em',
                    color: 'var(--ink-4)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--gold)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--ink-4)'
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (min-width: 640px) {
          footer .grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1024px) {
          footer .grid { grid-template-columns: 1.4fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
