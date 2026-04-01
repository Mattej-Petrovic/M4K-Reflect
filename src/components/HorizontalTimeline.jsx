import { useState, useEffect, useRef, useCallback } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import TimelineItem from './TimelineItem'

/* ─── Status tokens ─── */
// rgb: the raw RGB triplet used to build explicit rgba() glow values (avoids broken "${rgba_string}hex" concatenation)
const STATUS = {
  green:  { color: 'var(--color-accent)',  glow: 'rgba(52,211,153,0.6)',  ring: 'rgba(52,211,153,0.35)', label: 'Slutfört', rgb: '52,211,153'  },
  yellow: { color: 'rgba(234,179,8,1)',    glow: 'rgba(234,179,8,0.6)',   ring: 'rgba(234,179,8,0.35)',  label: 'Delvis',   rgb: '234,179,8'   },
  red:    { color: 'rgba(239,68,68,1)',    glow: 'rgba(239,68,68,0.6)',   ring: 'rgba(239,68,68,0.35)',  label: 'Kritiskt', rgb: '239,68,68'   },
}

/* ─── Achievement pill (panel only) ─── */
function AchievementPill({ a }) {
  const isGold   = a.tier === 'gold'
  const isSilver = a.tier === 'silver'
  const color  = isGold ? 'rgba(251,191,36,0.9)'   : isSilver ? 'rgba(148,163,184,0.85)' : 'var(--color-accent)'
  const bg     = isGold ? 'rgba(251,191,36,0.08)'  : isSilver ? 'rgba(148,163,184,0.08)' : 'var(--color-accent-dim)'
  const border = isGold ? 'rgba(251,191,36,0.25)'  : isSilver ? 'rgba(148,163,184,0.2)'  : 'rgba(52,211,153,0.2)'
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 14px', background: bg, border: `1px solid ${border}`, borderRadius: '9999px' }}>
      <span style={{ fontSize: '14px', lineHeight: 1 }}>{a.emoji}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, color }}>{a.name}</span>
      {a.points > 0 && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>{a.points}p</span>
      )}
    </div>
  )
}

/* ─── Panel content ─── */
function PanelContent({ week }) {
  if (!week) return null
  const s = STATUS[week.status] ?? STATUS.green
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--color-accent)', background: 'var(--color-accent-dim)',
          border: '1px solid rgba(52,211,153,0.25)', borderRadius: '7px', padding: '5px 12px',
        }}>
          Vecka {week.week}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: s.color, background: s.ring.replace('0.35', '0.08'),
          border: `1px solid ${s.ring}`, borderRadius: '5px', padding: '4px 10px',
        }}>
          {s.label}
        </span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 32px)',
        fontWeight: 700, letterSpacing: '-0.03em',
        color: 'var(--color-text)', lineHeight: 1.15, marginBottom: '18px',
      }}>
        {week.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '15px',
        color: 'var(--color-text-muted)', lineHeight: 1.8,
        marginBottom: '24px', maxWidth: '700px',
      }}>
        {week.description}
      </p>
      {week.highlights?.length > 0 && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: week.achievements?.length > 0 ? '24px' : '0' }}>
          {week.highlights.map((h, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px',
              color: 'rgba(232,234,240,0.8)', display: 'flex',
              alignItems: 'baseline', gap: '10px', lineHeight: 1.55,
            }}>
              <span style={{ color: 'var(--color-accent)', fontSize: '10px', flexShrink: 0 }}>▸</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      {week.achievements?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '18px', borderTop: '1px solid var(--color-border)' }}>
          {week.achievements.map((a, i) => <AchievementPill key={i} a={a} />)}
        </div>
      )}
    </div>
  )
}

/* ─── Main component ─── */
export default function HorizontalTimeline({ weeks }) {
  const [active, setActive]                 = useState(null)
  const [displayed, setDisplayed]           = useState(null)
  const [panelVisible, setPanelVisible]     = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [nodesReady, setNodesReady]         = useState(false)
  const [lineWidth, setLineWidth]           = useState(0)
  const [hoveredIdx, setHoveredIdx]         = useState(null)

  const nodeRefs  = useRef([])
  const trackRef  = useRef(null)
  const panelRef  = useRef(null)
  const switchRef = useRef(false)

  const TOTAL    = weeks.length
  const NODE_IDLE   = 72   // px — idle diameter
  const NODE_ACTIVE = 80   // px — active diameter (~1.1x)

  /* ── Page-load: draw line → pop nodes ── */
  useEffect(() => {
    let frame, start
    const DURATION = 1100
    function tick(ts) {
      if (!start) start = ts
      const p = Math.min((ts - start) / DURATION, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setLineWidth(eased * 100)
      if (p < 1) frame = requestAnimationFrame(tick)
      else setNodesReady(true)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  /* ── Panel logic ── */
  const openPanel = useCallback((idx) => {
    if (active === idx) {
      setContentVisible(false)
      setTimeout(() => { setPanelVisible(false); setActive(null); setDisplayed(null) }, 300)
      return
    }
    if (panelVisible) {
      switchRef.current = true
      setContentVisible(false)
      setTimeout(() => {
        setDisplayed(weeks[idx]); setActive(idx)
        requestAnimationFrame(() => requestAnimationFrame(() => { setContentVisible(true); switchRef.current = false }))
      }, 220)
    } else {
      setDisplayed(weeks[idx]); setActive(idx); setPanelVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setContentVisible(true)))
    }
  }, [active, panelVisible, weeks])

  /* ── Keyboard nav ── */
  const handleKey = useCallback((e) => {
    if (active === null) return
    if (e.key === 'ArrowRight' && active < TOTAL - 1) openPanel(active + 1)
    if (e.key === 'ArrowLeft'  && active > 0)         openPanel(active - 1)
    if (e.key === 'Escape')                           openPanel(active)
  }, [active, TOTAL, openPanel])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  /* ── Caret offset ── */
  const getCaretOffset = () => {
    if (active === null || !nodeRefs.current[active] || !trackRef.current) return '50%'
    const nr = nodeRefs.current[active].getBoundingClientRect()
    const tr = trackRef.current.getBoundingClientRect()
    return `${nr.left + nr.width / 2 - tr.left}px`
  }

  const activeStatus = active !== null ? (STATUS[weeks[active]?.status] ?? STATUS.green) : STATUS.green

  /* ── Build multi-stop gradient for rail fill ── */
  const buildRailGradient = () => {
    // evenly spaced stops per week
    const stops = weeks.map((w, i) => {
      const s = STATUS[w.status] ?? STATUS.green
      const pct = (i / (TOTAL - 1)) * 100
      return `${s.color} ${pct.toFixed(1)}%`
    })
    return `linear-gradient(to right, ${stops.join(', ')})`
  }

  return (
    <div>
      {/* ═══ DESKTOP ═══ */}
      <div className="ht-desktop" ref={trackRef}>

        {/* ── Track ── */}
        <div style={{
          position: 'relative',
          paddingTop: '134px',
          paddingBottom: '140px',
          userSelect: 'none',
        }}>

          {/* Rail — at top edge of nodes (paddingTop + 4px) so line grazes node tops */}
          <div style={{
            position: 'absolute', top: '124px', left: '0', right: '0',
            height: '4px', background: 'var(--color-border)',
            borderRadius: '9999px',
          }} />

          {/* Animated multi-colour fill */}
          <div style={{
            position: 'absolute', top: '124px', left: '0',
            width: `${lineWidth}%`, height: '4px',
            background: buildRailGradient(),
            borderRadius: '9999px',
            boxShadow: lineWidth > 5 ? '0 0 10px rgba(52,211,153,0.4)' : 'none',
          }} />

          {/* ── Nodes ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {weeks.map((w, i) => {
              const s          = STATUS[w.status] ?? STATUS.green
              const isActive   = active === i
              const isHovered  = hoveredIdx === i
              const isDimmed   = active !== null && !isActive
              const isLast     = i === TOTAL - 1  // V10 gets pulse
              const titleDelay = 80 + i * 70      // stagger

              const nodeSize = isActive ? NODE_ACTIVE : NODE_IDLE

              return (
                <div
                  key={w.week}
                  ref={el => nodeRefs.current[i] = el}
                  onClick={() => openPanel(i)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={e => e.key === 'Enter' && openPanel(i)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    /* staggered fade-in on load */
                    opacity: nodesReady ? (isDimmed ? 0.45 : 1) : 0,
                    transform: nodesReady
                      ? (isHovered && !isActive ? 'translateY(-4px)' : 'translateY(0)')
                      : 'translateY(12px)',
                    transition: [
                      `opacity 420ms var(--ease-out-expo) ${i * 65}ms`,
                      `transform 350ms var(--ease-spring)`,
                    ].join(', '),
                  }}
                >
                  {/* Slot — always NODE_ACTIVE wide so layout doesn't shift */}
                  <div style={{
                    position: 'relative',
                    width: `${NODE_ACTIVE}px`,
                    height: `${NODE_ACTIVE}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>

                    {/* Static ring — active only, no animation */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', inset: '-5px',
                        borderRadius: '50%',
                        border: `1.5px solid rgba(${s.rgb},0.35)`,
                        pointerEvents: 'none',
                      }} />
                    )}

                    {/* No extra ring for V10 — opacity pulse handled by CSS class on node circle */}

                    {/* Node circle */}
                    <div style={{
                      width:  `${nodeSize}px`,
                      height: `${nodeSize}px`,
                      borderRadius: '50%',
                      /* glassmorphism fill */
                      background: isActive
                        ? `radial-gradient(circle at 38% 30%, rgba(${s.rgb},0.42), rgba(${s.rgb},0.16) 55%, transparent 100%)`
                        : isHovered
                          ? `radial-gradient(circle at 38% 30%, rgba(${s.rgb},0.30), rgba(${s.rgb},0.10) 60%, transparent 100%)`
                          : `radial-gradient(circle at 38% 30%, rgba(${s.rgb},0.22), rgba(${s.rgb},0.07) 65%, transparent 100%)`,
                      border: `2px solid ${isActive ? s.color : isHovered ? `rgba(${s.rgb},0.80)` : `rgba(${s.rgb},0.55)`}`,
                      /* BUG FIX: use proper rgba() — was appending hex suffix to rgba strings which silently zeroed the glow */
                      boxShadow: isActive
                        ? `0 0 0 3px rgba(${s.rgb},0.25), 0 0 28px rgba(${s.rgb},0.52), inset 0 1px 2px rgba(255,255,255,0.16)`
                        : isHovered
                          ? `0 0 24px rgba(${s.rgb},0.48), 0 0 8px rgba(${s.rgb},0.22), inset 0 1px 1px rgba(255,255,255,0.12)`
                          : `0 0 20px rgba(${s.rgb},0.40), 0 0 40px rgba(${s.rgb},0.15), inset 0 1px 1px rgba(255,255,255,0.09)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 380ms var(--ease-spring)',
                      position: 'relative',
                      backdropFilter: 'blur(4px)',
                    }}
                    className={isLast && !isActive ? 'ht-last-node' : undefined}
                    >
                      {/* Inner highlight ring */}
                      <div style={{
                        position: 'absolute',
                        inset: '4px',
                        borderRadius: '50%',
                        border: `1px solid rgba(255,255,255,${isActive ? '0.18' : '0.07'})`,
                        transition: 'border-color 380ms',
                        pointerEvents: 'none',
                      }} />

                      {/* V-label — NO achievement indicator here */}
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isActive ? '20px' : '15px',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        color: isActive ? s.color : isHovered ? `${s.color}ee` : `${s.color}cc`,
                        transition: 'font-size 380ms var(--ease-spring), color 280ms',
                        lineHeight: 1,
                        position: 'relative',
                      }}>
                        V{w.week}
                      </span>
                    </div>
                  </div>

                  {/* Title — staggered fade-in */}
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive
                      ? 'var(--color-text)'
                      : isHovered
                        ? 'rgba(232,234,240,0.75)'
                        : 'rgba(232,234,240,0.45)',
                    maxWidth: '88px',
                    textAlign: 'center',
                    lineHeight: 1.35,
                    opacity: nodesReady ? 1 : 0,
                    transform: nodesReady ? 'translateY(0)' : 'translateY(6px)',
                    transition: [
                      `color 280ms`,
                      `font-weight 280ms`,
                      `opacity 500ms var(--ease-out-expo) ${titleDelay}ms`,
                      `transform 500ms var(--ease-out-expo) ${titleDelay}ms`,
                    ].join(', '),
                  }}>
                    {w.title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Idle hint */}
          {active === null && nodesReady && (
            <div style={{
              position: 'absolute', bottom: '32px', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-muted)', letterSpacing: '0.14em',
              textTransform: 'uppercase',
              animation: 'ht-hint-pulse 3s ease-in-out infinite',
              whiteSpace: 'nowrap',
            }}>
              klicka en vecka
            </div>
          )}
        </div>

        {/* ── Expandable panel ── */}
        <div style={{
          overflow: 'hidden',
          maxHeight: panelVisible ? '1000px' : '0',
          transition: 'max-height 500ms var(--ease-spring)',
        }}>
          {/* Caret */}
          <div style={{ position: 'relative', height: '16px', overflow: 'visible', marginBottom: '2px' }}>
            <div style={{
              position: 'absolute',
              left: getCaretOffset(),
              top: '0',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: `12px solid ${activeStatus.color}`,
              opacity: panelVisible ? 0.75 : 0,
              transition: `left 380ms var(--ease-spring), opacity 300ms`,
              filter: `drop-shadow(0 -3px 6px ${activeStatus.glow})`,
            }} />
          </div>

          {/* Panel card — coloured top bar via border-top */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderTop: `3px solid ${activeStatus.color}`,
            borderRadius: '1.5rem',
            padding: '5px',
            boxShadow: `0 0 40px ${activeStatus.glow}22`,
            transition: 'border-top-color 350ms, box-shadow 350ms',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.025)',
              borderRadius: 'calc(1.5rem - 5px)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
              padding: '36px 48px 44px',
            }}>
              {/* Nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <button
                  onClick={() => active > 0 && openPanel(active - 1)}
                  disabled={active === 0 || active === null}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none',
                    cursor: (active === 0 || active === null) ? 'not-allowed' : 'pointer',
                    color: (active === 0 || active === null) ? 'var(--color-border)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
                    padding: '6px 0', transition: 'color 200ms',
                  }}
                >
                  <CaretLeft size={13} weight="light" /> Föregående
                </button>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {weeks.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => openPanel(i)}
                      style={{
                        width: active === i ? '22px' : '5px',
                        height: '5px',
                        borderRadius: '9999px',
                        background: active === i ? 'var(--color-accent)' : 'var(--color-border-hi)',
                        cursor: 'pointer',
                        transition: 'all 350ms var(--ease-spring)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => active < TOTAL - 1 && openPanel(active + 1)}
                  disabled={active === TOTAL - 1 || active === null}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none',
                    cursor: (active === TOTAL - 1 || active === null) ? 'not-allowed' : 'pointer',
                    color: (active === TOTAL - 1 || active === null) ? 'var(--color-border)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
                    padding: '6px 0', transition: 'color 200ms',
                  }}
                >
                  Nästa <CaretRight size={13} weight="light" />
                </button>
              </div>

              {/* Content */}
              <div
                ref={panelRef}
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 300ms var(--ease-out-expo), transform 300ms var(--ease-out-expo)',
                }}
              >
                <PanelContent week={displayed} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE: vertical fallback ═══ */}
      <div className="ht-mobile">
        {weeks.map((w, i) => (
          <TimelineItem
            key={w.week}
            week={w.week}
            title={w.title}
            status={w.status}
            description={w.description}
            highlights={w.highlights}
            achievements={w.achievements}
            isLast={i === weeks.length - 1}
          />
        ))}
      </div>

      <style>{`
        .ht-desktop { display: block; }
        .ht-mobile  { display: none; }

        @media (max-width: 767px) {
          .ht-desktop { display: none; }
          .ht-mobile  { display: block; }
        }

        /* ht-ring-pulse removed — active nodes use static ring, no animation */

        /* V10 — pure opacity breathe, no scale */
        .ht-last-node {
          animation: ht-last-breathe 4s ease-in-out infinite;
        }
        @keyframes ht-last-breathe {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 1.0;  }
        }

        /* "klicka en vecka" hint text */
        @keyframes ht-hint-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1.0; }
        }
      `}</style>
    </div>
  )
}
