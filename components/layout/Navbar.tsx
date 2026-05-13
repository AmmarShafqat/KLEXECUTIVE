'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerStyle: React.CSSProperties = {
    background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: '1px solid var(--line)',
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={headerStyle}
      role="banner"
    >
      <div className="container-luxury">
        <nav
          className="flex items-center justify-between"
          style={{ height: '72px' }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start shrink-0"
            aria-label="KL Exec — home"
          >
            <div className="relative inline-flex">
              <span
                style={{
                  fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                  fontSize: '20px',
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
          </Link>

          {/* Desktop nav — shown at ≥900px */}
          <ul
            className="hidden items-center gap-8"
            style={{ display: undefined }}
            id="nav-links"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                    fontSize: '13.5px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--gold)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--ink)'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right group */}
          <div className="flex items-center gap-4">
            {/* Phone — desktop only */}
            <a
              href="tel:+12125550123"
              id="nav-phone"
              aria-label="Call KL Exec"
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--ink)',
                transition: 'color 0.2s',
                display: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'
              }}
            >
              +1 (212) 555-0123
            </a>

            {/* Book Now — desktop only */}
            <Link
              href="#contact"
              id="nav-book"
              className="btn btn-primary"
              style={{
                fontSize: '11px',
                padding: '10px 20px',
                display: 'none',
              }}
            >
              Book Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="p-1.5 transition-colors duration-200"
              id="nav-toggle"
              style={{ color: 'var(--ink)' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Responsive show/hide */}
      <style>{`
        @media (min-width: 900px) {
          #nav-links   { display: flex !important; }
          #nav-phone   { display: flex !important; }
          #nav-book    { display: inline-flex !important; }
          #nav-toggle  { display: none !important; }
        }
      `}</style>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '500px' : '0',
          opacity: mobileOpen ? 1 : 0,
          background: 'var(--bg)',
          borderTop: mobileOpen ? '1px solid var(--line)' : 'none',
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="container-luxury py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3.5 transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '11.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: 'var(--ink-3)',
                borderBottom: '1px solid var(--line)',
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-5 flex flex-col gap-3">
            <Link
              href="#contact"
              className="btn btn-primary text-center justify-center"
              style={{ display: 'flex' }}
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
            <a
              href="tel:+12125550123"
              className="flex items-center justify-center py-3"
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: '11px',
                color: 'var(--ink-3)',
                border: '1px solid var(--line-2)',
                borderRadius: '999px',
              }}
            >
              +1 (212) 555-0123
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
