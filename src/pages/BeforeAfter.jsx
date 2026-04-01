import { ArrowRight, GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'
import ComparisonRow from '../components/ComparisonRow'
import { useScrollReveal, BezelCard, Eyebrow, SectionTitle } from '../components/ui'

const comparisons = [
  {
    label: 'Arkitektur',
    before:
      'En enkel HTML/JS-sida (CyberPass) utan backend eller API. Allt kördes lokalt, ingen separation av ansvar.',
    after:
      'En Node.js/Express-app med health, metrics och Prometheus-endpoints. Strukturerad kodbas med tester, deploy-script och separata infra-mappar.',
  },
  {
    label: 'Deployment',
    before:
      'Manuell, öppna filen i en webbläsare eller pusha till GitHub Pages. Ingen kontroll över vad som deployas eller när.',
    after:
      'Automatiserad CI/CD via GitHub Actions. Staging deployas på PR mot main, production på push till main. Slack-notifieringar vid varje deploy och failure.',
  },
  {
    label: 'Säkerhet',
    before:
      'Ingen säkerhetsskanning, inga kontroller. Ingen koll på dependencies eller kända sårbarheter.',
    after:
      'Trivy skannar varje Docker-build i pipeline. SARIF-resultat laddas upp till GitHub Security tab. Container körs som non-root i distroless image. Nuvarande resultat: 0 critical, 0 high, 1 medium, 4 low.',
  },
  {
    label: 'Infrastruktur',
    before:
      'Ingen infrastruktur att prata om. Filerna låg i ett repo och det var det.',
    after:
      'Kubernetes-manifest för lokal och GKE-deploy. Terraform för hela stacken, redis, api, frontend, monitor, ingress. Remote state i GCS. Allt versionshanterat och reproducerbart.',
  },
  {
    label: 'Teamprocess',
    before:
      'Alla jobbade på egen hand, oklara roller, ingen struktur för samarbete eller inlämning.',
    after:
      'Definierade roller i teamet. Boiler room-submissions varje vecka. Support tickets, gemensam troubleshooting, dokumenterade blockers och lösningar.',
  },
]

const trivyResults = [
  { label: 'Critical', count: 0, color: 'rgba(239,68,68,0.7)',  bar: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.2)' },
  { label: 'High',     count: 0, color: 'rgba(249,115,22,0.7)', bar: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.2)' },
  { label: 'Medium',   count: 1, color: 'rgba(234,179,8,0.8)',  bar: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.2)' },
  { label: 'Low',      count: 4, color: 'rgba(52,211,153,0.75)', bar: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.18)' },
]

const MAX_BAR = 6 // scale bars against this max

const repos = [
  {
    label: 'CyberPass',
    sub: 'Vecka 1 — startpunkten',
    href: 'https://github.com/Mattej-Petrovic/CyberPass',
    accent: false,
  },
  {
    label: 'M4K-Pipeline',
    sub: 'Vecka 10 — full CI/CD',
    href: 'https://github.com/Mattej-Petrovic/M4K-Pipeline',
    accent: true,
  },
]

export default function BeforeAfter() {
  const headerRef  = useScrollReveal({ delay: 0 })
  const colRef     = useScrollReveal({ delay: 100 })
  const trivyRef   = useScrollReveal({ delay: 150 })
  const repoRef    = useScrollReveal({ delay: 200 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

      {/* ── Header ── */}
      <section>
        <div ref={headerRef}>
          <Eyebrow>Progression · V1 → V10</Eyebrow>
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
            Before &amp; After
          </h1>
          <p
            style={{
              maxWidth: '580px',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
            }}
          >
            Skillnaden mellan vecka 1 och vecka 10 är inte bara teknisk. Vi tänker helt annorlunda kring hur kod ska byggas, testas och deployas. Här jämför vi var vi startade och var vi slutade.
          </p>

        </div>
      </section>

      {/* ── Column headers + comparison rows ── */}
      <section>
        <div ref={colRef}>
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <a
              href="https://mattej-petrovic.github.io/CyberPass/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => {
                const outer = e.currentTarget.firstChild
                outer.style.borderColor = 'rgba(255,255,255,0.18)'
                outer.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const outer = e.currentTarget.firstChild
                outer.style.borderColor = 'var(--color-border)'
                outer.style.transform = 'translateY(0)'
              }}
            >
              <BezelCard
                style={{ cursor: 'pointer', transition: 'border-color 250ms var(--ease-spring), transform 250ms var(--ease-spring)' }}
                innerStyle={{ padding: '14px 20px 14px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                    Vecka 1
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 600, color: 'rgba(232,234,240,0.4)', letterSpacing: '-0.02em' }}>
                    CyberPass
                  </span>
                </div>
                <span
                  className="visa-live-muted"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', flexShrink: 0,
                    fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
                    color: 'rgba(232,234,240,0.7)',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '6px', padding: '6px 12px',
                    transition: 'background 200ms, transform 150ms',
                  }}
                >
                  Visa live
                  <ArrowRight size={12} weight="light" />
                </span>
              </BezelCard>
            </a>

            <a
              href="https://m4k-pipeline.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => {
                const outer = e.currentTarget.firstChild
                outer.style.borderColor = 'rgba(52,211,153,0.45)'
                outer.style.transform = 'translateY(-2px)'
                outer.style.boxShadow = '0 0 20px rgba(52,211,153,0.1)'
              }}
              onMouseLeave={e => {
                const outer = e.currentTarget.firstChild
                outer.style.borderColor = 'rgba(52,211,153,0.2)'
                outer.style.transform = 'translateY(0)'
                outer.style.boxShadow = 'none'
              }}
            >
              <BezelCard
                style={{ borderColor: 'rgba(52,211,153,0.2)', cursor: 'pointer', transition: 'border-color 250ms var(--ease-spring), transform 250ms var(--ease-spring), box-shadow 250ms var(--ease-spring)' }}
                innerStyle={{ padding: '14px 20px 14px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: 'rgba(52,211,153,0.04)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.75 }}>
                    Vecka 10
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                    M4K-Pipeline
                  </span>
                </div>
                <span
                  className="visa-live-accent"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', flexShrink: 0,
                    fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
                    color: 'rgba(10,15,10,0.9)',
                    background: 'var(--color-accent)',
                    borderRadius: '6px', padding: '6px 12px',
                    transition: 'background 200ms, transform 150ms',
                  }}
                >
                  Visa live
                  <ArrowRight size={12} weight="regular" />
                </span>
              </BezelCard>
            </a>
          </div>

          {/* Comparison rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {comparisons.map((c, i) => (
              <ComparisonRow
                key={c.label}
                label={c.label}
                index={i}
                before={c.before}
                after={c.after}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trivy scan results ── */}
      <section>
        <div ref={trivyRef}>
          <div style={{ marginBottom: '28px' }}>
            <Eyebrow>Säkerhetsdata</Eyebrow>
            <SectionTitle>Trivy Vulnerability Scan</SectionTitle>
          </div>

          <BezelCard
            innerStyle={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {/* Result bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {trivyResults.map((r) => {
                const pct = r.count === 0 ? 0 : Math.max(4, (r.count / MAX_BAR) * 100)
                return (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Severity label */}
                    <div
                      style={{
                        width: '72px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: r.color,
                          flexShrink: 0,
                          boxShadow: r.count > 0 ? `0 0 6px ${r.color}` : 'none',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: r.count === 0 ? 'rgba(232,234,240,0.3)' : r.color,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {r.label}
                      </span>
                    </div>

                    {/* Bar track */}
                    <div
                      style={{
                        flex: 1,
                        height: '8px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {r.count > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${pct}%`,
                            background: r.color,
                            borderRadius: '9999px',
                            boxShadow: `0 0 8px ${r.color}`,
                          }}
                        />
                      )}
                    </div>

                    {/* Count badge */}
                    <div
                      style={{
                        width: '36px',
                        textAlign: 'right',
                        flexShrink: 0,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: r.count === 0 ? 'rgba(232,234,240,0.2)' : r.color,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {r.count}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: '20px' }} />

            {/* Context text */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                maxWidth: '640px',
              }}
            >
              Baseline-imagen innan härdning hade betydligt fler OS-layer sårbarheter, inklusive kända
              OpenSSL-problem som eliminerades helt genom uppgraderingen till{' '}
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-accent)',
                  background: 'rgba(52,211,153,0.08)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                }}
              >
                node:22-alpine
              </code>{' '}
              och distroless runtime.
            </p>
          </BezelCard>
        </div>
      </section>

      {/* ── Repo links ── */}
      <section>
        <div ref={repoRef}>
          <div style={{ marginBottom: '24px' }}>
            <Eyebrow>Källkod</Eyebrow>
            <SectionTitle>GitHub Repositories</SectionTitle>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {repos.map(({ label, sub, href, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '5px 5px 5px 20px',
                  background: accent ? 'rgba(52,211,153,0.04)' : 'var(--color-surface)',
                  border: `1px solid ${accent ? 'rgba(52,211,153,0.2)' : 'var(--color-border)'}`,
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'border-color 300ms var(--ease-spring), background 300ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent ? 'rgba(52,211,153,0.45)' : 'var(--color-border-hi)'
                  e.currentTarget.style.background = accent ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = accent ? 'rgba(52,211,153,0.2)' : 'var(--color-border)'
                  e.currentTarget.style.background = accent ? 'rgba(52,211,153,0.04)' : 'var(--color-surface)'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: accent ? 'var(--color-text)' : 'rgba(232,234,240,0.6)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: accent ? 'rgba(52,211,153,0.6)' : 'var(--color-text-muted)',
                    }}
                  >
                    {sub}
                  </div>
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9999px',
                    background: accent ? 'var(--color-accent-dim)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${accent ? 'rgba(52,211,153,0.25)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <GithubLogo
                    size={15}
                    weight="light"
                    style={{ color: accent ? 'var(--color-accent)' : 'rgba(232,234,240,0.4)' }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
