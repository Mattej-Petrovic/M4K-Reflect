import { useEffect, useRef } from 'react'

/* ─── ScrollReveal wrapper component ─── */
export function ScrollReveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = [
      `opacity 600ms ease-out ${delay}ms`,
      `transform 600ms ease-out ${delay}ms`,
    ].join(', ')
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  )
}

/* ─── Scroll-reveal hook ─── */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.filter = 'blur(4px)'
    el.style.transition = [
      `opacity 700ms var(--ease-out-expo) ${options.delay || 0}ms`,
      `transform 700ms var(--ease-out-expo) ${options.delay || 0}ms`,
      `filter 700ms var(--ease-out-expo) ${options.delay || 0}ms`,
    ].join(', ')
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          el.style.filter = 'blur(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [options.delay])
  return ref
}

/* ─── Double-Bezel card ─── */
export function BezelCard({ children, style = {}, innerStyle = {} }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '2rem',
        padding: '6px',
        ...style,
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.025)',
          borderRadius: 'calc(2rem - 6px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
          height: '100%',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ─── Eyebrow pill tag ─── */
export function Eyebrow({ children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        background: 'var(--color-accent-dim)',
        border: '1px solid rgba(52,211,153,0.25)',
        borderRadius: '9999px',
        padding: '4px 12px',
        marginBottom: '16px',
      }}
    >
      {children}
    </span>
  )
}

/* ─── Section heading ─── */
export function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(22px, 3vw, 28px)',
        fontWeight: 600,
        letterSpacing: '-0.025em',
        color: 'var(--color-text)',
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  )
}
