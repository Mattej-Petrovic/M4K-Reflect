import { useEffect, useRef, useState } from 'react'
import { ArrowDown, MapPin } from '@phosphor-icons/react'
import { useScrollReveal, ScrollReveal, BezelCard, Eyebrow } from '../components/ui'

/* ─── Count-up hook ─── */
function useCountUp(target, duration = 1500, startDelay = 0) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const elRef   = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start, frame
        const tick = (ts) => {
          if (!start) start = ts
          const elapsed = ts - start - startDelay
          if (elapsed < 0) { frame = requestAnimationFrame(tick); return }
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          setCount(Math.round(eased * target))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration, startDelay])

  return [count, elRef]
}

/* ─── Stat card ─── */
function StatCard({ label, rawValue, delay }) {
  const target = parseInt(rawValue, 10)
  const [count, countRef] = useCountUp(target, 1500, delay)

  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={countRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'rgba(52,211,153,0.35)' : 'rgba(52,211,153,0.18)'}`,
        borderRadius: '2rem',
        padding: '6px',
        boxShadow: hovered
          ? '0 0 24px rgba(52,211,153,0.2), 0 0 8px rgba(52,211,153,0.1)'
          : '0 0 14px rgba(52,211,153,0.1), 0 0 4px rgba(52,211,153,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring), transform 300ms var(--ease-spring)',
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        borderRadius: 'calc(2rem - 6px)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '40px',
          fontWeight: 700,
          color: 'var(--color-accent)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}>
          {count}
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}>
          {label}
        </span>
      </div>
    </div>
  )
}

/* ─── Team member card ─── */
function MemberCard({ initials, name, role, delay }) {
  const ref = useScrollReveal({ delay })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{ height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: '100%',
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'rgba(52,211,153,0.3)' : 'var(--color-border)'}`,
        borderRadius: '2rem',
        padding: '6px',
        boxShadow: hovered ? '0 0 18px rgba(52,211,153,0.12)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring), transform 300ms var(--ease-spring)',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          borderRadius: 'calc(2rem - 6px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
          height: '100%',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
        }}>
          {/* Avatar circle — permanent soft glow */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.07)',
            border: '1px solid rgba(52,211,153,0.25)',
            boxShadow: '0 0 16px rgba(52,211,153,0.2), 0 0 4px rgba(52,211,153,0.1), inset 0 1px 1px rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'var(--color-accent)',
            }}>
              {initials}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: '-0.01em',
            }}>
              {name}
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}>
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Achievement badge ─── */
function AchievementBadge({ emoji, name, points, week, tier, delay }) {
  const ref = useScrollReveal({ delay })
  const [hovered, setHovered] = useState(false)

  const isGold   = tier === 'gold'
  const isSilver = tier === 'silver'

  const tierColor  = isGold ? 'rgba(251,191,36,0.8)'  : isSilver ? 'rgba(148,163,184,0.7)'  : 'var(--color-accent)'
  const tierBg     = isGold ? 'rgba(251,191,36,0.1)'  : isSilver ? 'rgba(148,163,184,0.1)'  : 'var(--color-accent-dim)'
  const tierBorder = isGold ? 'rgba(251,191,36,0.25)' : isSilver ? 'rgba(148,163,184,0.2)'  : 'rgba(52,211,153,0.2)'

  /* tier-matched glow values */
  const glowIdle   = isGold ? '0 0 14px rgba(251,191,36,0.14)' : isSilver ? '0 0 14px rgba(148,163,184,0.12)' : '0 0 14px rgba(52,211,153,0.1)'
  const glowHover  = isGold ? '0 0 24px rgba(251,191,36,0.28)' : isSilver ? '0 0 24px rgba(148,163,184,0.22)' : '0 0 24px rgba(52,211,153,0.2)'
  const borderIdle  = isGold ? 'rgba(251,191,36,0.35)' : isSilver ? 'rgba(148,163,184,0.3)' : 'rgba(52,211,153,0.18)'
  const borderHover = isGold ? 'rgba(251,191,36,0.6)'  : isSilver ? 'rgba(148,163,184,0.5)' : 'rgba(52,211,153,0.35)'
  const innerBg     = isGold ? 'rgba(251,191,36,0.04)' : isSilver ? 'rgba(148,163,184,0.04)' : 'rgba(255,255,255,0.025)'

  return (
    <div
      ref={ref}
      style={{ height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: '100%',
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? borderHover : borderIdle}`,
        borderRadius: '2rem',
        padding: '6px',
        boxShadow: hovered ? glowHover : glowIdle,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring), transform 300ms var(--ease-spring)',
      }}>
        <div style={{
          height: '100%',
          background: innerBg,
          borderRadius: 'calc(2rem - 6px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
          padding: '20px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center',
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '15px',
            background: tierBg, border: `1px solid ${tierBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', lineHeight: 1, flexShrink: 0,
          }}>
            {emoji}
          </div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.005em', lineHeight: 1.35 }}>
            {name}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: tierColor, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {points}p
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: '5px', padding: '2px 8px' }}>
              Vecka {week}
            </span>
          </div>
          {(isGold || isSilver) && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: tierColor, background: tierBg, border: `1px solid ${tierBorder}`, borderRadius: '9999px', padding: '3px 10px' }}>
              {isGold ? 'Gold' : 'Silver'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Data ─── */
const stats = [
  { label: 'Submissions',      rawValue: '36'  },
  { label: 'Total score',      rawValue: '513' },
  { label: 'Veckor',           rawValue: '10'  },
  { label: 'Support tickets',  rawValue: '4'   },
]

const members = [
  { initials: 'CP', name: 'Carl Persson',    role: 'Systemarkitekten'        },
  { initials: 'JN', name: 'Jonny Nguyen',    role: 'Automationsspecialisten' },
  { initials: 'JP', name: 'Julia Persson',   role: 'Säkerhetsanalytikern'    },
  { initials: 'MP', name: 'Mattej Petrovic', role: 'Teamleader & Integratören' },
]

const achievements = [
  { emoji: '🔒', name: 'Security Bug Report',   points: 100, week: 2, tier: null     },
  { emoji: '📚', name: 'Extra Documentation',    points: 50,  week: 3, tier: null     },
  { emoji: '🎯', name: 'Perfect Execution',      points: 83,  week: 3, tier: null     },
  { emoji: '🥈', name: 'Green Pipeline Warrior', points: 50,  week: 4, tier: 'silver' },
  { emoji: '🥇', name: 'Zero-Downtime Engineer', points: 100, week: 5, tier: 'gold'   },
]

const traits = ['consistent', 'thorough', 'zero-blockers']

/* ─── Vibe card wrapper with hover glow ─── */
function VibeCard({ vibeRef, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      ref={vibeRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'rgba(52,211,153,0.35)' : 'rgba(52,211,153,0.18)'}`,
        borderRadius: '2rem',
        padding: '6px',
        boxShadow: hovered
          ? '0 0 24px rgba(52,211,153,0.2), 0 0 8px rgba(52,211,153,0.1)'
          : '0 0 14px rgba(52,211,153,0.1), 0 0 4px rgba(52,211,153,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring), transform 300ms var(--ease-spring)',
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        borderRadius: 'calc(2rem - 6px)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
        padding: '28px 32px',
        display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
      }}>
        {children}
      </div>
    </div>
  )
}

export default function Hero() {
  const heroRef     = useScrollReveal({ delay: 0 })
  const scrollRef   = useScrollReveal({ delay: 200 })
  const statsHdrRef = useScrollReveal({ delay: 0 })
  const teamHdrRef  = useScrollReveal({ delay: 0 })
  const achHdrRef   = useScrollReveal({ delay: 0 })
  const vibeRef     = useScrollReveal({ delay: 0 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: '96px' }}>

      {/* ── Hero section ── */}
      <section>
        <div ref={heroRef} style={{ maxWidth: '760px' }}>
          <Eyebrow>DevSecOps · 10 veckor · Malmö</Eyebrow>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(52px, 9vw, 108px)',
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 0.95,
            color: 'var(--color-text)',
            marginBottom: '28px',
          }}>
            M4K<br />
            <span style={{ color: 'var(--color-accent)' }}>GANG</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '20px',
            color: 'rgba(232,234,240,0.7)',
            maxWidth: '520px',
            lineHeight: 1.65,
          }}>
            Från manuella deploys till automatiserade pipelines. 10 veckor DevSecOps i praktiken.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px',
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'rgba(232,234,240,0.55)', letterSpacing: '0.06em',
          }}>
            <MapPin size={13} weight="light" style={{ color: 'var(--color-accent)', opacity: 0.85 }} />
            Malmö
          </div>
        </div>

        <div ref={scrollRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '52px', color: 'rgba(232,234,240,0.55)' }}>
          <ArrowDown size={15} weight="light" style={{ animation: 'bounce 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scrolla
          </span>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section>
        <div ref={statsHdrRef} style={{ marginBottom: '24px' }}>
          <Eyebrow>Nyckeltal</Eyebrow>
        </div>
        <ScrollReveal delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            {stats.map((s, i) => (
              <StatCard key={s.label} label={s.label} rawValue={s.rawValue} delay={i * 120} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Team section ── */}
      <section>
        <div ref={teamHdrRef} style={{ marginBottom: '24px' }}>
          <Eyebrow>Teamet</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
            4 personer. Ett mål.
          </h2>
        </div>
        <ScrollReveal delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {members.map((m, i) => (
              <MemberCard key={m.name} {...m} delay={i * 70} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Achievements ── */}
      <section>
        <div ref={achHdrRef} style={{ marginBottom: '24px' }}>
          <Eyebrow>Achievements</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--color-text)' }}>
            5 badges — 383p totalt
          </h2>
        </div>
        <ScrollReveal delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '10px', alignItems: 'stretch' }}>
            {achievements.map((a, i) => (
              <AchievementBadge key={a.name} {...a} delay={i * 70} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Personality / Vibe ── */}
      <section>
        <VibeCard vibeRef={vibeRef}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                Team vibe
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
                "The Perfectionists"
              </span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'var(--color-border)', flexShrink: 0 }} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {traits.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', color: 'var(--color-accent)', background: 'var(--color-accent-dim)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '9999px', padding: '5px 14px' }}>
                  {t}
                </span>
              ))}
            </div>
        </VibeCard>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </div>
  )
}
