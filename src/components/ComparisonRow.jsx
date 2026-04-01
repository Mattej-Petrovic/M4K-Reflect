/**
 * ComparisonRow
 * Renders a single comparison category with two columns: Before (left) and After (right).
 * "Before" side is visually muted; "After" side carries the accent.
 */
export default function ComparisonRow({ label, index = 0, before, after }) {
  return (
    <div
      style={{
        /* Outer shell */
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '1.5rem',
        padding: '5px',
        transition: 'border-color 300ms var(--ease-spring)',
      }}
    >
      {/* Inner core */}
      <div
        style={{
          borderRadius: 'calc(1.5rem - 5px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Category label bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderBottom: '1px solid var(--color-border)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-muted)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '2px 8px',
              letterSpacing: '0.05em',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            {label}
          </span>
        </div>

        {/* Two-column comparison */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--color-border)',
          }}
        >
          {/* Before */}
          <div
            style={{
              padding: '20px 24px',
              background: 'rgba(255,255,255,0.015)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,234,240,0.25)',
              }}
            >
              CyberPass · V1
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: before ? 'rgba(232,234,240,0.75)' : 'rgba(232,234,240,0.3)',
                fontStyle: before ? 'normal' : 'italic',
                lineHeight: 1.65,
              }}
            >
              {before ?? '[TEXT: before-tillstånd]'}
            </p>
          </div>

          {/* After */}
          <div
            style={{
              padding: '20px 24px',
              background: 'rgba(52,211,153,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
            }}
          >
            {/* Subtle left accent line */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                bottom: '16px',
                left: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
                opacity: 0.3,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(52,211,153,0.6)',
              }}
            >
              Pipeline · V10
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: after ? 'rgba(232,234,240,0.85)' : 'rgba(232,234,240,0.5)',
                fontStyle: after ? 'normal' : 'italic',
                lineHeight: 1.65,
              }}
            >
              {after ?? '[TEXT: after-tillstånd]'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
