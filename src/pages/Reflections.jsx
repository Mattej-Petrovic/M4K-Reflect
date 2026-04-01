import { CheckCircle, XCircle, ArrowsClockwise } from '@phosphor-icons/react'
import { useScrollReveal, ScrollReveal, BezelCard, Eyebrow, SectionTitle } from '../components/ui'
import Accordion from '../components/Accordion'

const reflections = [
  {
    Icon: CheckCircle,
    accentColor: 'var(--color-accent)',
    accentBg: 'var(--color-accent-dim)',
    accentBorder: 'rgba(52,211,153,0.2)',
    label: 'Fungerade bra',
    title: 'Gruppdynamiken var vår största styrka',
    body: 'Vi kom överens från start och det handlade inte bara om att vi jobbade bra ihop tekniskt, vi höll kontakt utanför skoltid, hjälpte varandra med saker vid sidan av kursen och tog lunch tillsammans efter boiler rooms. Det skapar en stämning där man faktiskt vill bidra, inte bara måste. Alla i gruppen ville ta för sig och lära sig, vilket gjorde att vi var effektiva utan att någon behövde pusha de andra. Sen kompletterade vi varandra bra, alla var starka på olika delar, så det blev naturligt vem som tog sig an vad.',
  },
  {
    Icon: XCircle,
    accentColor: 'rgba(239,68,68,0.7)',
    accentBg: 'rgba(239,68,68,0.08)',
    accentBorder: 'rgba(239,68,68,0.15)',
    label: 'Svårast',
    title: 'Tempot lämnade lite utrymme för djup förståelse',
    body: 'Att lära sig Kubernetes, Terraform, CI/CD, container hardening och säkerhetsanalys på tio veckor kräver disciplin och struktur, men det kräver också en engagerad utbildare, och där hade vi tur. Ändå var det svårt att förstå allt på djupet. Vissa veckor handlade mer om att hänga med och göra rätt saker i rätt ordning än att verkligen förstå varför. Den förståelsen kom ofta i efterhand, när man såg hur bitarna hängde ihop.',
  },
  {
    Icon: ArrowsClockwise,
    accentColor: 'var(--color-accent-alt)',
    accentBg: 'rgba(34,211,238,0.08)',
    accentBorder: 'rgba(34,211,238,0.15)',
    label: 'Annorlunda',
    title: 'Mer praktik, mindre teori',
    body: 'De veckor vi lärde oss mest var de där vi byggde något själva, inte de där vi satt och läste dokumentation. Om vi fick göra om kursen hade vi velat jobba mer med egna projekt parallellt, där vi applicerar varje veckas koncept direkt istället för att bara förstå det i labbmiljön. Det är skillnaden mellan att veta hur Terraform fungerar och att faktiskt ha kört det mot sin egen infrastruktur.',
  },
]

const kursmål = [
  {
    id: 1,
    rubrik: 'Shared Responsibility-modellen',
    body: 'Vi jobbade i Google Kubernetes Engine där ansvaret delas mellan oss och molnleverantören. Google sköter control plane, nod-OS och nätverksinfrastruktur. Vi ansvarar för vad som körs i klustret, deployments, konfiguration, secrets, RBAC och säkerhetspolicyer. Det blev tydligt under vecka 6 när vi inte hade rätt behörigheter på klustret. Problemet låg inte i vår kod utan i plattformskonfigurationen, men det var fortfarande vårt ansvar att identifiera det och skicka en ticket. I praktiken handlar shared responsibility om att veta var gränsen går mellan det du kontrollerar och det du inte gör, och att agera på rätt sida av den gränsen.',
  },
  {
    id: 4,
    rubrik: 'SRE-metodik och systemresiliens',
    body: 'SRE-principerna syntes i hur vi byggde och driftade systemet. Health checks på alla containrar, readiness probes som hindrar trafik till pods som inte är redo, resource limits som förhindrar att en pod äter hela klustrets resurser. Vi hade en separat monitor-komponent som kollade teamets status var 30:e sekund. Under vecka 9 jobbade vi med Grafana och PromQL för att analysera produktionsproblem, HTTP 500-fel, latency och resursöverskridningar. Blameless culture var inte något vi bestämde i förväg, men det blev naturligt: när något gick sönder fixade vi det ihop istället för att leta efter vems fel det var.',
  },
  {
    id: 8,
    rubrik: 'Chaos Engineering',
    body: 'Vi implementerade ett chaos-steg direkt i vår CI/CD-pipeline. Jobbet chaos-staging körs efter varje lyckad staging-deploy och har 50% sannolikhet att trigga en omstart av staging-miljön. Poängen är att validera att miljön klarar en oväntad restart, att appen startar korrekt, health probes passerar och trafik återupptas utan manuellt ingripande. Det är inte Netflix Chaos Monkey, men det är en medveten implementation som körs automatiskt vid varje PR. Det gav oss konkret erfarenhet av principen: testa systemets resiliens innan produktion gör det åt dig.',
  },
  {
    id: 10,
    rubrik: 'Bedömning av molnarkitektur',
    body: 'Vår stack körde på GKE med namespace-isolering, Terraform-hanterad infrastruktur och Ingress med valfri TLS. Vi använde en återanvändbar Terraform-modul för deployments med inbyggda probes, resource limits och security context. Remote state i GCS, variabler med validering, och import-flöde för befintliga resurser.\n\nUr säkerhetsperspektiv körde vi non-root containers med distroless images, RBAC med least-privilege och Trivy-scanning i pipeline. Allt byggde på Linux-baserade images, Alpine i builder-steget och Debian-baserad distroless i runtime.\n\nKostnadsmässigt lärde vi oss att GKE debiterar per kluster plus nodernas compute-resurser. Vi satte resource requests och limits på alla pods för att undvika överprovisionering, och använde e2-micro instanser i labben för att hålla kostnaderna nere. Under vecka 7 fick vi erfara kapacitetsbrist i europe-north1. Alla tre zoner var fulla på e2-micro, vilket tvingade oss att testa olika zoner och förstå hur kapacitet och pricing hänger ihop i GCP.\n\nCompliance-mässigt handlade det om att följa best practices: inga hårdkodade secrets i manifest, secrets hanterade via Kubernetes Secrets och GitHub Actions secrets, container images scannade innan deploy, och RBAC som begränsade vad varje komponent kunde göra i klustret. Det är inte formell compliance mot en standard som ISO 27001, men principerna är desamma, kontrollera access, spåra ändringar, och dokumentera avvikelser.',
  },
  {
    id: 11,
    rubrik: 'Incidentrespons och post-mortem',
    body: 'Varje vecka dokumenterade vi blockers i våra submissions, vad som gick fel, varför, och hur vi löste det. De viktigaste blev mini-postmortems: Terraform state som inte matchade klustret, GKE-behörigheter som blockerade hela teamet, container-sårbarheter som inte gick att patcha. Vi skrev också support tickets när problem låg utanför vår kontroll, totalt 4 stycken under kursen. Under vecka 10 kartlade vi en fullständig attackkedja från command injection till cloud access, vilket var den mest intensiva incident response-övningen. Det vi lärde oss är att dokumentation inte är efterarbete, det är en del av lösningen.',
  },
]

function ReflectionCard({ Icon, accentColor, accentBg, accentBorder, label, title, body, delay }) {
  const ref = useScrollReveal({ delay })
  return (
    <div ref={ref} style={{ height: '100%' }}>
      <BezelCard
        style={{ height: '100%', borderColor: accentBorder }}
        innerStyle={{
          padding: '28px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        {/* Icon + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={17} weight="light" style={{ color: accentColor }} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accentColor,
              opacity: 0.8,
            }}
          >
            {label}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: 'var(--color-text)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--color-border)' }} />

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            color: 'rgba(232,234,240,0.75)',
            lineHeight: 1.8,
            flex: 1,
          }}
        >
          {body}
        </p>
      </BezelCard>
    </div>
  )
}

export default function Reflections() {
  const h1Ref       = useScrollReveal({ delay: 0 })
  const kmHeaderRef = useScrollReveal({ delay: 0 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: '96px' }}>

      {/* ── Header ── */}
      <section>
        <div ref={h1Ref}>
          <Eyebrow>Reflektioner & Kursmål</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: '24px',
            }}
          >
            Reflektioner
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: 'rgba(232,234,240,0.65)',
              lineHeight: 1.75,
              maxWidth: '680px',
            }}
          >
            Tio veckor DevSecOps. Från första git push till en komplett pipeline med Kubernetes, Terraform och säkerhetsanalys. Här samlar vi det vi tar med oss och kopplar det till kursmålen.
          </p>
        </div>
      </section>

      {/* ── Reflection cards ── */}
      <section>
        <div style={{ marginBottom: '32px' }}>
          <Eyebrow>Teamets syn</Eyebrow>
          <SectionTitle>Vad vi lärde oss</SectionTitle>
        </div>
        <ScrollReveal delay={80}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px',
              alignItems: 'stretch',
            }}
          >
            {reflections.map((r, i) => (
              <ReflectionCard key={r.label} {...r} delay={i * 80} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Kursmål section ── */}
      <section>
        <div ref={kmHeaderRef} style={{ marginBottom: '32px' }}>
          <Eyebrow>Kursplan</Eyebrow>
          <SectionTitle>Kursmål vi täcker</SectionTitle>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '860px' }}>
          {kursmål.map((k, i) => (
            <ScrollReveal key={k.id} delay={i * 60}>
            <Accordion
              index={i}
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-accent)',
                      opacity: 0.6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    Mål {k.id}
                  </span>
                  {k.rubrik}
                </span>
              }
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'rgba(232,234,240,0.75)',
                  lineHeight: 1.8,
                }}
              >
                {k.body}
              </p>
            </Accordion>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  )
}
