import { ChartBar, ChartLine, Users, Clock } from '@phosphor-icons/react'
import { useScrollReveal, ScrollReveal, BezelCard, Eyebrow, SectionTitle } from '../components/ui'

/* ─── Data ─────────────────────────────────────────── */

const submissionsData = [
  { week: 'V2', count: 3 },
  { week: 'V3', count: 4 },
  { week: 'V4', count: 2 },
  { week: 'V5', count: 4 },
  { week: 'V6', count: 2 },
  { week: 'V7', count: 5 },
  { week: 'V8', count: 7 },
  { week: 'V9', count: 6 },
  { week: 'V10', count: 3 },
]
const SUBMISSIONS_MAX = 7

const attendanceData = [
  { name: 'Carl Persson',    present: 30, late: 2,  pct: 100 },
  { name: 'Jonny Nguyen',   present: 30, late: 0,  pct: 97  },
  { name: 'Julia Persson',  present: 31, late: 0,  pct: 100 },
  { name: 'Mattej Petrovic', present: 31, late: 3,  pct: 97  },
]
const ATTENDANCE_MAX = 34

const loginsData = [
  { week: 'V2', count: 13 },
  { week: 'V3', count: 5  },
  { week: 'V4', count: 5  },
  { week: 'V5', count: 8  },
  { week: 'V6', count: 13 },
  { week: 'V7', count: 10 },
  { week: 'V8', count: 6  },
  { week: 'V9', count: 6  },
  { week: 'V10', count: 7  },
]
const LOGINS_MAX = 13

const loginTimesData = [
  { hour: '07:00', count: 6  },
  { hour: '08:00', count: 39 },
  { hour: '09:00', count: 5  },
  { hour: '10:00', count: 2  },
  { hour: '11:00', count: 4  },
  { hour: '13:00', count: 1  },
  { hour: '15:00', count: 1  },
  { hour: '16:00', count: 3  },
  { hour: '17:00', count: 1  },
  { hour: '18:00', count: 3  },
  { hour: '20:00', count: 1  },
  { hour: '21:00', count: 3  },
  { hour: '22:00', count: 2  },
  { hour: '23:00', count: 2  },
]
const TIMES_MAX = 39

const scoreBreakdown = [
  { label: 'Boiler Room Submissions', pts: 280, color: 'var(--color-accent)', bg: 'var(--color-accent-dim)', border: 'rgba(52,211,153,0.25)' },
  { label: 'Achievements',            pts: 233, color: 'var(--color-accent-alt)', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.2)' },
  { label: 'Consistency',             pts: 67,  color: 'rgba(234,179,8,0.8)', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' },
]
const SCORE_TOTAL = 513

/* ─── Chart helpers ─────────────────────────────────── */

const CHART_HEIGHT = 160 // px, bar area

function ChartHeader({ Icon, label, badge }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <Icon size={15} weight="light" style={{ color: 'var(--color-accent)', opacity: 0.6 }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'rgba(232,234,240,0.75)', letterSpacing: '-0.01em' }}>
          {label}
        </span>
      </div>
      {badge && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--color-accent)',
          background: 'var(--color-accent-dim)',
          border: '1px solid rgba(52,211,153,0.2)',
          borderRadius: '6px',
          padding: '2px 9px',
          letterSpacing: '0.06em',
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}

/* ─── Graf 1: Submissions per vecka (vertical bars) ─── */

function SubmissionsChart() {
  const ref = useScrollReveal({ delay: 0 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ChartHeader Icon={ChartBar} label="Submissions per vecka" badge="36 totalt" />
        <div style={{ padding: '24px 20px 16px' }}>
          {/* Bar area */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${CHART_HEIGHT}px`, position: 'relative' }}>
            {/* Y-axis grid lines */}
            {[2, 4, 6].map(v => (
              <div key={v} style={{
                position: 'absolute',
                left: 0, right: 0,
                bottom: `${(v / SUBMISSIONS_MAX) * 100}%`,
                borderTop: '1px dashed rgba(255,255,255,0.05)',
                pointerEvents: 'none',
              }} />
            ))}
            {submissionsData.map(({ week, count }) => {
              const h = (count / SUBMISSIONS_MAX) * 100
              const isPeak = count === SUBMISSIONS_MAX
              return (
                <div key={week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  {/* Value label */}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isPeak ? 'var(--color-accent)' : 'rgba(232,234,240,0.4)', letterSpacing: '0.04em' }}>
                    {count}
                  </span>
                  {/* Bar */}
                  <div style={{
                    width: '100%',
                    height: `${h}%`,
                    background: isPeak
                      ? 'linear-gradient(to top, var(--color-accent), rgba(52,211,153,0.5))'
                      : 'linear-gradient(to top, rgba(52,211,153,0.55), rgba(52,211,153,0.2))',
                    borderRadius: '4px 4px 2px 2px',
                    boxShadow: isPeak ? '0 0 12px rgba(52,211,153,0.25)' : 'none',
                    transition: 'height 600ms var(--ease-out-expo)',
                  }} />
                </div>
              )
            })}
          </div>
          {/* Baseline */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 0 8px' }} />
          {/* X labels */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {submissionsData.map(({ week }) => (
              <div key={week} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.3)', letterSpacing: '0.04em' }}>
                  {week}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Graf 2: Närvaro per teammedlem (horizontal bars) ─── */

function AttendanceChart() {
  const ref = useScrollReveal({ delay: 80 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ChartHeader Icon={Users} label="Närvaro per teammedlem" badge="98.5% snitt" />
        <div style={{ padding: '20px 20px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {attendanceData.map(({ name, present, late, pct }) => {
              const presentW = (present / ATTENDANCE_MAX) * 100
              const lateW    = (late    / ATTENDANCE_MAX) * 100
              const firstName = name.split(' ')[0]
              return (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(232,234,240,0.65)', fontWeight: 500 }}>
                      {firstName}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: pct === 100 ? 'var(--color-accent)' : 'rgba(234,179,8,0.8)', letterSpacing: '0.04em' }}>
                      {pct}%
                    </span>
                  </div>
                  {/* Stacked bar */}
                  <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', gap: '1px' }}>
                    <div style={{ width: `${presentW}%`, background: 'linear-gradient(to right, var(--color-accent), rgba(52,211,153,0.6))', borderRadius: '4px 0 0 4px', transition: 'width 600ms var(--ease-out-expo)' }} />
                    {late > 0 && (
                      <div style={{ width: `${lateW}%`, background: 'rgba(234,179,8,0.5)', borderRadius: late > 0 && present + late >= ATTENDANCE_MAX ? '0 4px 4px 0' : '0' }} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--color-accent)', opacity: 0.7 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Present</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(234,179,8,0.5)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sen</span>
            </div>
          </div>
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Graf 3: Logins per vecka (vertical bars) ─── */

function LoginsChart() {
  const ref = useScrollReveal({ delay: 160 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ChartHeader Icon={ChartLine} label="Logins per vecka" badge="73 totalt" />
        <div style={{ padding: '24px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${CHART_HEIGHT}px`, position: 'relative' }}>
            {[5, 10].map(v => (
              <div key={v} style={{
                position: 'absolute', left: 0, right: 0,
                bottom: `${(v / LOGINS_MAX) * 100}%`,
                borderTop: '1px dashed rgba(255,255,255,0.05)',
                pointerEvents: 'none',
              }} />
            ))}
            {loginsData.map(({ week, count }) => {
              const h    = (count / LOGINS_MAX) * 100
              const isPeak = count === LOGINS_MAX
              return (
                <div key={week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isPeak ? 'var(--color-accent-alt)' : 'rgba(232,234,240,0.4)', letterSpacing: '0.04em' }}>
                    {count}
                  </span>
                  <div style={{
                    width: '100%',
                    height: `${h}%`,
                    background: isPeak
                      ? 'linear-gradient(to top, var(--color-accent-alt), rgba(34,211,238,0.4))'
                      : 'linear-gradient(to top, rgba(34,211,238,0.5), rgba(34,211,238,0.15))',
                    borderRadius: '4px 4px 2px 2px',
                    boxShadow: isPeak ? '0 0 14px rgba(34,211,238,0.2)' : 'none',
                  }} />
                </div>
              )
            })}
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 0 8px' }} />
          <div style={{ display: 'flex', gap: '6px' }}>
            {loginsData.map(({ week }) => (
              <div key={week} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.3)', letterSpacing: '0.04em' }}>
                  {week}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Graf 4: Login-tider (horizontal bars) ─── */

function LoginTimesChart() {
  const ref = useScrollReveal({ delay: 240 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ChartHeader Icon={Clock} label="Login-tider (timme på dygnet)" badge="Peak 08:00" />
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loginTimesData.map(({ hour, count }) => {
              const w = (count / TIMES_MAX) * 100
              const isPeak = count === TIMES_MAX
              return (
                <div key={hour} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: isPeak ? 'var(--color-accent)' : 'rgba(232,234,240,0.5)', width: '42px', flexShrink: 0, letterSpacing: '0.04em' }}>
                    {hour}
                  </span>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${w}%`,
                      background: isPeak
                        ? 'linear-gradient(to right, var(--color-accent), rgba(52,211,153,0.6))'
                        : 'rgba(52,211,153,0.3)',
                      borderRadius: '4px',
                      boxShadow: isPeak ? '0 0 10px rgba(52,211,153,0.3)' : 'none',
                    }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: isPeak ? 'var(--color-accent)' : 'rgba(232,234,240,0.55)', width: '26px', textAlign: 'right', letterSpacing: '0.04em', flexShrink: 0 }}>
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(52,211,153,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Morgonlaget dominerar — 39 av 73 logins före 09:00
            </span>
          </div>
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Stats row ─────────────────────────────────────── */

const stats = [
  { label: 'Submissions', value: '36' },
  { label: 'Logins',      value: '73' },
  { label: 'Snitt närvaro', value: '98.5%' },
  { label: 'Aktiva veckor', value: '9' },
  { label: 'Total score',  value: '513p' },
]

function StatsRow() {
  const ref = useScrollReveal({ delay: 0 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ padding: '0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          borderRadius: 'inherit',
          overflow: 'hidden',
        }}
        className="stats-row"
        >
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                padding: '20px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-accent)', lineHeight: 1 }}>
                {value}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(232,234,240,0.55)', letterSpacing: '0.01em' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Score breakdown ───────────────────────────────── */

function ScoreBreakdown() {
  const ref = useScrollReveal({ delay: 80 })
  return (
    <div ref={ref}>
      <BezelCard innerStyle={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'rgba(232,234,240,0.75)' }}>
            Score breakdown
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '-0.03em' }}>
            {SCORE_TOTAL}p
          </span>
        </div>

        {/* Stacked horizontal bar */}
        <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', gap: '2px' }}>
          {scoreBreakdown.map(({ label, pts, color }) => (
            <div
              key={label}
              style={{
                flex: pts,
                background: color,
                opacity: 0.7,
                transition: 'flex 600ms var(--ease-out-expo)',
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {scoreBreakdown.map(({ label, pts, color, bg, border }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: color, opacity: 0.7, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(232,234,240,0.55)' }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: color,
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: '5px',
                padding: '1px 7px',
                letterSpacing: '0.04em',
              }}>
                {pts}p
              </span>
            </div>
          ))}
        </div>
      </BezelCard>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────── */

export default function Data() {
  const h1Ref = useScrollReveal({ delay: 0 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: '56px' }}>

      {/* ── Header ── */}
      <section>
        <div ref={h1Ref}>
          <Eyebrow>Grafer & Data · Dashboard</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: '20px',
            }}
          >
            Data
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'rgba(232,234,240,0.65)', lineHeight: 1.75, maxWidth: '560px' }}>
            Siffrorna bakom M4K Gangs tio veckor, det vi faktiskt levererade.
          </p>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section>
        <StatsRow />
      </section>

      {/* ── Chart 2×2 grid ── */}
      <section>
        <ScrollReveal delay={0}>
          <div style={{ marginBottom: '24px' }}>
            <Eyebrow>Visualiseringar</Eyebrow>
            <SectionTitle>Engagemang & aktivitet</SectionTitle>
          </div>
          <div
            className="data-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
          >
            <SubmissionsChart />
            <AttendanceChart />
            <LoginsChart />
            <LoginTimesChart />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Score breakdown ── */}
      <section>
        <ScrollReveal delay={0}>
          <div style={{ marginBottom: '20px' }}>
            <Eyebrow>Poäng</Eyebrow>
            <SectionTitle>Score breakdown</SectionTitle>
          </div>
          <div style={{ maxWidth: '680px' }}>
            <ScoreBreakdown />
          </div>
        </ScrollReveal>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .data-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(3, 1fr) !important; }
          .stats-row > div { border-right: 1px solid var(--color-border) !important; border-bottom: 1px solid var(--color-border); }
        }
      `}</style>

    </div>
  )
}
