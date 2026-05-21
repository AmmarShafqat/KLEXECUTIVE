'use client'

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Clock as ClockIcon } from 'lucide-react'

const TIME_POPUP_HEIGHT = 252

function usePopoverPosition(
  triggerRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  estimatedHeight: number
) {
  const [pos, setPos] = useState<{
    top: number
    left: number
    width: number
    openUp: boolean
  } | null>(null)

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
  value: string // 24h "HH:mm"
  onChange: (v: string) => void
  stepMinutes?: number
}

function buildSlots(step: number): string[] {
  const out: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += step) {
      out.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return out
}

function format12(value: string): string {
  if (!value) return ''
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return ''
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function BrandTimePicker({
  id,
  label,
  value,
  onChange,
  stepMinutes = 15,
}: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const slots = useMemo(() => buildSlots(stepMinutes), [stepMinutes])
  const position = usePopoverPosition(wrapRef, open, TIME_POPUP_HEIGHT)

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

  // Scroll the list to current selection (or 9 AM as a sensible default)
  useEffect(() => {
    if (!open || !listRef.current) return
    const target = value || '09:00'
    const node = listRef.current.querySelector<HTMLButtonElement>(
      `[data-slot="${target}"]`
    )
    if (node) {
      listRef.current.scrollTop = node.offsetTop - 40
    }
  }, [open, value])

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
        aria-haspopup="listbox"
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
        {value ? format12(value) : 'Select time'}
      </button>
      <ClockIcon
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
            role="listbox"
            aria-label={`${label} picker`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 9999,
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              boxShadow: '0 12px 40px rgba(40,30,10,0.18)',
              overflow: 'hidden',
            }}
          >
            <div
              ref={listRef}
              style={{
                maxHeight: '240px',
                overflowY: 'auto',
                padding: '6px',
              }}
            >
              {slots.map((slot) => {
                const isSelected = slot === value
                return (
                  <button
                    key={slot}
                    type="button"
                    data-slot={slot}
                    onClick={() => {
                      onChange(slot)
                      setOpen(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '13px',
                      fontVariantNumeric: 'tabular-nums',
                      border: 'none',
                      background: isSelected ? 'var(--gold)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--ink)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        ;(e.currentTarget as HTMLButtonElement).style.background =
                          'var(--bg-2)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        ;(e.currentTarget as HTMLButtonElement).style.background =
                          'transparent'
                      }
                    }}
                  >
                    {format12(slot)}
                  </button>
                )
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
