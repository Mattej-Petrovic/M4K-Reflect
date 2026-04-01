import { useState, useRef, useEffect } from 'react'
import { CaretDown } from '@phosphor-icons/react'

export default function Accordion({ title, children, index = 0 }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0)
    }
  }, [open])

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '1.25rem',
        padding: '4px',
        transition: 'border-color 300ms var(--ease-spring)',
        borderColor: open ? 'var(--color-border-hi)' : 'var(--color-border)',
      }}
    >
      {/* Inner core — Double-Bezel */}
      <div
        style={{
          background: open ? 'rgba(52,211,153,0.03)' : 'rgba(255,255,255,0.02)',
          borderRadius: 'calc(1.25rem - 4px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
          transition: 'background 400ms var(--ease-spring)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            gap: '16px',
          }}
          aria-expanded={open}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Index badge */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: open ? 'var(--color-accent)' : 'var(--color-text-muted)',
                background: open ? 'var(--color-accent-dim)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${open ? 'rgba(52,211,153,0.25)' : 'var(--color-border)'}`,
                borderRadius: '6px',
                padding: '3px 8px',
                letterSpacing: '0.05em',
                transition: 'all 300ms var(--ease-spring)',
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 500,
                color: open ? 'var(--color-text)' : 'rgba(232,234,240,0.75)',
                letterSpacing: '-0.01em',
                transition: 'color 300ms',
              }}
            >
              {title}
            </span>
          </div>
          <CaretDown
            size={16}
            weight="light"
            style={{
              color: 'var(--color-text-muted)',
              flexShrink: 0,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 400ms var(--ease-spring)',
            }}
          />
        </button>

        {/* Animated body */}
        <div
          style={{
            height: `${height}px`,
            overflow: 'hidden',
            transition: 'height 400ms var(--ease-spring)',
          }}
        >
          <div
            ref={bodyRef}
            style={{
              padding: '0 24px 20px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
