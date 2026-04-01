import { useState, useRef, useEffect } from 'react'
import { CaretDown } from '@phosphor-icons/react'

/* Status dot + label */
const STATUS = {
  green:  { emoji: '🟢', label: 'Slutfört',    color: 'rgba(52,211,153,0.8)',  bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)'  },
  yellow: { emoji: '🟡', label: 'Delvis',       color: 'rgba(234,179,8,0.8)',   bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.2)'   },
  red:    { emoji: '🔴', label: 'Utmanande',    color: 'rgba(239,68,68,0.8)',   bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
}

export default function TimelineItem({
  week,
  title,
  description,
  status = 'green',
  highlights = [],
  achievements = [],
  isLast = false,
}) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0)
    }
  }, [open])

  const s = STATUS[status] ?? STATUS.green

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      {/* ── Spine ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '48px',
          marginRight: '20px',
        }}
      >
        {/* Node dot — coloured by status */}
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: open ? s.color : 'var(--color-border-hi)',
            border: `2px solid ${open ? s.color : 'var(--color-border-hi)'}`,
            boxShadow: open ? `0 0 12px ${s.color}66` : 'none',
            transition: 'all 400ms var(--ease-spring)',
            flexShrink: 0,
            marginTop: '22px',
            zIndex: 1,
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '1px',
              flex: 1,
              minHeight: '32px',
              background: 'linear-gradient(to bottom, var(--color-border-hi), var(--color-border))',
              marginTop: '4px',
            }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div
        style={{
          flex: 1,
          marginBottom: isLast ? '0' : '14px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '1.25rem',
          padding: '4px',
          transition: 'border-color 300ms var(--ease-spring)',
          borderColor: open ? 'var(--color-border-hi)' : 'var(--color-border)',
        }}
      >
        <div
          style={{
            background: open ? 'rgba(52,211,153,0.02)' : 'rgba(255,255,255,0.02)',
            borderRadius: 'calc(1.25rem - 4px)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
            overflow: 'hidden',
            transition: 'background 400ms var(--ease-spring)',
          }}
        >
          {/* ── Header row ── */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              gap: '10px',
            }}
            aria-expanded={open}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
              {/* Week badge */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: open ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  background: open ? 'var(--color-accent-dim)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${open ? 'rgba(52,211,153,0.25)' : 'var(--color-border)'}`,
                  borderRadius: '6px',
                  padding: '3px 8px',
                  flexShrink: 0,
                  transition: 'all 300ms var(--ease-spring)',
                }}
              >
                V{week}
              </span>

              {/* Title */}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: open ? 'var(--color-text)' : 'rgba(232,234,240,0.75)',
                  letterSpacing: '-0.01em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'color 300ms',
                }}
              >
                {title}
              </span>

              {/* Status badge */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: s.color,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: '5px',
                  padding: '2px 7px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '8px' }}>{s.emoji}</span>
                {s.label}
              </span>

              {/* Achievement pill count */}
              {achievements.length > 0 && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'rgba(251,191,36,0.75)',
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    borderRadius: '5px',
                    padding: '2px 7px',
                    flexShrink: 0,
                  }}
                >
                  {achievements.length} ach.
                </span>
              )}
            </div>

            <CaretDown
              size={14}
              weight="light"
              style={{
                color: 'var(--color-text-muted)',
                flexShrink: 0,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 400ms var(--ease-spring)',
              }}
            />
          </button>

          {/* ── Animated body ── */}
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
                padding: '0 18px 18px',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '16px',
              }}
            >
              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                {description}
              </p>

              {/* Highlights */}
              {highlights.length > 0 && (
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                    marginBottom: achievements.length > 0 ? '16px' : '0',
                  }}
                >
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        color: 'rgba(232,234,240,0.7)',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--color-accent)',
                          fontSize: '9px',
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      >
                        ▸
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Achievement badges */}
              {achievements.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {achievements.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '5px 12px',
                        background: a.tier === 'gold'
                          ? 'rgba(251,191,36,0.08)'
                          : a.tier === 'silver'
                            ? 'rgba(148,163,184,0.08)'
                            : 'var(--color-accent-dim)',
                        border: `1px solid ${
                          a.tier === 'gold'
                            ? 'rgba(251,191,36,0.25)'
                            : a.tier === 'silver'
                              ? 'rgba(148,163,184,0.2)'
                              : 'rgba(52,211,153,0.2)'
                        }`,
                        borderRadius: '9999px',
                      }}
                    >
                      <span style={{ fontSize: '13px', lineHeight: 1 }}>{a.emoji}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '11px',
                          fontWeight: 500,
                          color: a.tier === 'gold'
                            ? 'rgba(251,191,36,0.9)'
                            : a.tier === 'silver'
                              ? 'rgba(148,163,184,0.85)'
                              : 'var(--color-accent)',
                        }}
                      >
                        {a.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {a.points}p
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
