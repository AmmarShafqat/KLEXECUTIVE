'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { THEME_MODE } from '@/lib/theme-config'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'klexec-theme'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (THEME_MODE !== 'user') {
      const locked: Theme = THEME_MODE
      const root = document.documentElement
      if (locked === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {}
      setTheme(locked)
      setMounted(true)
      return
    }
    setTheme(readInitialTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || THEME_MODE !== 'user') return
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  if (THEME_MODE !== 'user') return null

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-200 ${className}`}
      style={{
        width: 36,
        height: 36,
        border: '1px solid var(--line-2)',
        color: 'var(--ink)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-2)'
      }}
    >
      {mounted && isDark ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  )
}
