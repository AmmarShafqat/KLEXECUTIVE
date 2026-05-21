'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

type PopoverPosition = { top: number; left: number; width: number; openUp: boolean }

const DATE_POPUP_HEIGHT = 360

function usePopoverPosition(
  triggerRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  estimatedHeight: number
) {
  const [pos, setPos] = useState<PopoverPosition | null>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      setPos(null)
      return
    }
    const update = () => {
      const node = triggerRef.current
      if (!node) return
      const r = node.getBoundingClientRect()
      const spaceBelow = window.innerHeight - r.bottom
      const openUp = spaceBelow < estimatedHeight && r.top > estimatedHeight
      setPos({
        top: openUp
          ? r.top + window.scrollY - estimatedHeight - 8
          : r.bottom + window.scrollY + 8,
        left: r.left + window.scrollX,
        width: r.width,
        openUp,
      })
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open, estimatedHeight, triggerRef])

  return pos
}

type Props = {
  id: string
  label: string
  value: string // ISO yyyy-MM-dd
  onChange: (v: string) => void
  minDate?: Date
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function fromISO(s: string): Date | undefined {
  if (!s) return undefined
  const [y, m, d] = s.split('-').map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

function formatLong(d: Date) {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BrandDatePicker({
  id,
  label,
  value,
  onChange,
  minDate,
}: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const selected = fromISO(value)
  const position = usePopoverPosition(wrapRef, open, DATE_POPUP_HEIGHT)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (wrapRef.current?.contains(target)) return
      if (popupRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={wrapRef}
      className={`pickfield ${value ? 'has-value' : ''} ${open ? 'is-open' : ''}`}
      style={{
        flex: 1,
        border: `1px solid ${open ? 'var(--gold)' : 'var(--line)'}`,
        borderRadius: '6px',
        padding: '12px 14px',
        position: 'relative',
        transition: 'border-color 0.2s ease',
        cursor: 'pointer',
        background: 'transparent',
      }}
      onClick={() => setOpen(true)}
    >
      <label
        htmlFor={id}
        style={{
          fontSize: '9px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-4)',
          display: 'block',
          marginBottom: '4px',
          fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
          cursor: 'pointer',
        }}
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: '14px',
          color: value ? 'var(--ink)' : 'var(--ink-4)',
          background: 'transparent',
          textAlign: 'left',
          padding: 0,
          paddingRight: '22px',
          fontFamily: 'inherit',
          fontVariantNumeric: 'tabular-nums',
          cursor: 'pointer',
        }}
      >
        {selected ? formatLong(selected) : 'Select date'}
      </button>
      <CalendarIcon
        size={15}
        strokeWidth={1.5}
        style={{
          position: 'absolute',
          right: '14px',
          bottom: '14px',
          color: 'var(--gold)',
          pointerEvents: 'none',
        }}
      />

      {open &&
        position &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popupRef}
            role="dialog"
            aria-label={`${label} picker`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              zIndex: 9999,
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              boxShadow: '0 12px 40px rgba(40,30,10,0.18)',
              padding: '12px',
            }}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(d) => {
                if (d) {
                  onChange(toISO(d))
                  setOpen(false)
                }
              }}
              disabled={minDate ? { before: minDate } : undefined}
              showOutsideDays
            />
          </div>,
          document.body
        )}
    </div>
  )
}
