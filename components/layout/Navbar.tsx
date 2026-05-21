'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerStyle: React.CSSProperties = {
    background: scrolled
      ? 'rgba(var(--bg-rgb), 0.97)'
      : 'transparent',
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

          {/* Right group */}
          <div className="flex items-center gap-4">
            {/* Phone — hidden on small screens */}
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

            {/* Book Now */}
            <Link
              href="#contact"
              className="btn btn-primary"
              style={{
                fontSize: '11px',
                padding: '10px 20px',
              }}
            >
              Book Now
            </Link>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Responsive: show phone number on wider screens */}
      <style>{`
        @media (min-width: 640px) {
          #nav-phone { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
