import { Ticket, UsersThree } from '@phosphor-icons/react'
import { useScrollReveal, ScrollReveal, BezelCard, Eyebrow, SectionTitle } from '../components/ui'
import Accordion from '../components/Accordion'

const members = [
  {
    name: 'Carl Persson',
    role: 'Systemarkitekten',
    initial: 'C',
    bio: 'Carl hade koll på hur saker hängde ihop i praktiken. Han drev mycket av det tidiga Docker-arbetet och var den som ofta hittade felen i konfigurationen innan resten av teamet ens märkt att något var fel. Under vecka 4 var det Carl som flaggade push-konflikterna och såg till att vi fick ordning på branch-strategin.',
  },
  {
    name: 'Jonny Nguyen',
    role: 'Automationsspecialisten',
    initial: 'J',
    bio: 'Jonny tog sig an Terraform-migreringen och jobbade igenom konverteringen från YAML-manifest till HCL. Han stötte på GCP-behörighetsproblem flera gånger och var den som skrev support tickets för att få IAM-roller på plats. Han grävde sig igenom Terraform state, import-flöden och provider-konfiguration.',
  },
  {
    name: 'Julia Persson',
    role: 'Säkerhetsanalytikern',
    initial: 'J',
    bio: 'Julia fokuserade på säkerhetssidan. Från Trivy-scanning i pipelinen till RBAC och container hardening. Under vecka 10 var hon med och kartlade attackkedjan från command injection till cloud access. Hon var också den som höll koll på att vi dokumenterade våra findings ordentligt.',
  },
  {
    name: 'Mattej Petrovic',
    role: 'Teamleader & Integratören',
    initial: 'M',
    bio: 'Mattej höll ihop teamet och såg till att submissions kom in varje vecka. Han drev Kubernetes-deploymenten från lokal kind-miljö till GKE, byggde om Dockerfile med multi-stage och distroless, och ansvarade för den övergripande pipeline-arkitekturen. Han fick utmärkelsen "Rolling Update Expert" under vecka 5.',
  },
]


const sreHighlights = [
  {
    label: 'Blameless culture',
    desc: 'Vi pekade aldrig finger när något gick fel. Om en deploy kraschade eller en config var fel så löste vi det tillsammans direkt. Eftersom vi satt i boiler room sessions såg alla vad som hände i realtid. Istället för att någon satt ensam och försökte fixa något i tystnad kunde vi snabbt hoppa in, felsöka ihop och gå vidare. Det gjorde att vi inte fastnade i skuld utan bara fokus på lösning.',
  },
  {
    label: 'Monitoring & feedback loops',
    desc: 'Appen hade redan health, metrics och Prometheus endpoints, vilket gjorde att vi direkt kunde se om något var fel. I klustret körde vi också en egen monitor som checkade teamets status var 30:e sekund, så vi fick konstant feedback. Under vecka 9 använde vi Grafana och PromQL för att gräva i riktiga problem i produktion. Det gjorde att vi inte behövde gissa utan kunde se exakt vad som hände och varför.',
  },
  {
    label: 'Incident response',
    desc: 'När något gick fel dokumenterade vi det som blockers i våra submissions istället för att bara fixa och gå vidare. De viktigaste problemen blev som små postmortems där vi gick igenom vad som hände, varför det hände och hur vi löste det. Det gjorde att samma misstag inte upprepades och att vi hela tiden blev bättre. Istället för att bara släcka bränder började vi förstå varför de uppstod.',
  },
]

function MemberCard({ name, role, initial, bio, delay }) {
  const ref = useScrollReveal({ delay })
  return (
    <div ref={ref} style={{ height: '100%' }}>
      <BezelCard
        style={{ height: '100%' }}
        innerStyle={{
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.07)',
            border: '1px solid rgba(52,211,153,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '22px',
              fontWeight: 600,
              color: 'var(--color-accent)',
              opacity: 0.5,
            }}
          >
            {initial}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}
          >
            {role}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: bio ? 'rgba(232,234,240,0.75)' : 'rgba(232,234,240,0.28)',
            fontStyle: bio ? 'normal' : 'italic',
            lineHeight: 1.7,
            marginTop: '4px',
          }}
        >
          {bio ?? '[TEXT: roll och bidrag per person]'}
        </p>
      </BezelCard>
    </div>
  )
}


export default function Team() {
  const headerRef  = useScrollReveal({ delay: 0 })
  const workRef    = useScrollReveal({ delay: 100 })
  const sreRef     = useScrollReveal({ delay: 100 })
  const ticketRef  = useScrollReveal({ delay: 100 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

      {/* ── Header ── */}
      <section>
        <div ref={headerRef}>
          <Eyebrow>Team & SRE · Kursmål 4 & 11</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
            }}
          >
            Team &amp; SRE
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ maxWidth: '700px' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: 'rgba(232,234,240,0.65)',
            lineHeight: 1.75,
          }}
        >
          M4K Gang bestod av fyra personer med olika styrkor men samma mål, att leverera något vi faktiskt kan visa upp. Vi hade ingen tydlig rollfördelning från början. Istället märkte vi snabbt att det funkade bättre att dela upp ansvaret i början av varje session och sedan hjälpa varandra när det behövdes.
        </p>
      </section>

      {/* ── Team cards ── */}
      <section>
        <div style={{ marginBottom: '32px' }}>
          <Eyebrow>Teammedlemmar</Eyebrow>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
          }}
        >
          {members.map((m, i) => (
            <MemberCard key={m.name} {...m} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ── Hur vi jobbade ── */}
      <section>
        <div ref={workRef} style={{ marginBottom: '24px' }}>
          <Eyebrow>Arbetsprocess</Eyebrow>
          <SectionTitle>Hur vi jobbade</SectionTitle>
        </div>
        <BezelCard innerStyle={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <UsersThree
              size={20}
              weight="light"
              style={{ color: 'var(--color-accent)', opacity: 0.5, marginTop: '2px', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'rgba(232,234,240,0.75)',
                  lineHeight: 1.75,
                }}
              >
                Vi körde boiler room sessions varje vecka där vi satt tillsammans och jobbade fokuserat. I början av varje session gick vi igenom vad som behövde göras och delade upp det. Ibland jobbade vi på samma sak, ibland körde vi parallellt på varsitt. Det viktiga var att alla hade koll på läget och att ingen blev sittande fast själv. Det gjorde stor skillnad för tempot. Istället för att fastna i timmar kunde man bara fråga direkt och komma vidare.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'rgba(232,234,240,0.75)',
                  lineHeight: 1.75,
                }}
              >
                Varje vecka lämnade vi också in en submission där vi sammanfattade vad vi gjort, vilka problem vi stött på och vad nästa steg var. Det tvingade oss att faktiskt tänka igenom vad vi höll på med, inte bara köra på. Totalt blev det tio submissions under kursen, och det hjälpte oss hålla en jämn nivå hela vägen istället för att stressa i slutet.
              </p>
            </div>
          </div>
        </BezelCard>
      </section>

      {/* ── SRE-koppling ── */}
      <section>
        <div ref={sreRef} style={{ marginBottom: '24px' }}>
          <Eyebrow>SRE-principer</Eyebrow>
          <SectionTitle>Site Reliability Engineering</SectionTitle>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          {sreHighlights.map(({ label, desc }) => (
            <BezelCard
              key={label}
              style={{ borderColor: 'rgba(34,211,238,0.15)' }}
              innerStyle={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(34,211,238,0.02)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-alt)',
                  opacity: 0.7,
                }}
              >
                {label}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'rgba(232,234,240,0.75)',
                  lineHeight: 1.7,
                }}
              >
                {desc}
              </p>
            </BezelCard>
          ))}
        </div>
      </section>

      {/* ── Mini-postmortems ── */}
      <section>
        <div style={{ marginBottom: '32px' }}>
          <Eyebrow>Incidents & Blockers</Eyebrow>
          <SectionTitle>Mini-postmortems</SectionTitle>
        </div>
        <ScrollReveal delay={80}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '800px' }}>
          <Accordion title="Terraform state vs verklighet" index={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Vecka 7</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(52,211,153,0.7)', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Löst</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', lineHeight: 1.75, color: 'rgba(232,234,240,0.75)' }}>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>VAD HÄNDE</span><br />Vi hade konverterat vecka 6-resurserna till Terraform, men när vi körde apply fick vi felmeddelanden om att resurser redan existerade. Terraform visste inte om dem eftersom de skapats manuellt med kubectl.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>ORSAK</span><br />Resurserna fanns i klustret men inte i Terraforms state. Utan import ser Terraform dem som nya och försöker skapa dubbletter.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>LÖSNING</span><br />Vi körde terraform import för varje befintlig resurs. API, frontend, Redis. Efter det visade terraform plan bara de små skillnaderna som faktiskt behövde fixas, som saknade labels.</p>
                <p style={{ color: 'rgba(52,211,153,0.7)', fontStyle: 'italic' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', fontStyle: 'normal' }}>LÄRDOM</span><br />Migrerar man från manuell hantering till IaC måste man synka state först. Annars jobbar man mot verkligheten istället för med den.</p>
              </div>
            </div>
          </Accordion>

          <Accordion title="GKE-deploy med behörighetsproblem" index={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Vecka 6</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(52,211,153,0.7)', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Löst</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', lineHeight: 1.75, color: 'rgba(232,234,240,0.75)' }}>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>VAD HÄNDE</span><br />Under GKE-deployen kunde vi inte köra kubectl get nodes och flera kommandon gav permission denied. MongoDB-konfigurationen bröts också av att teamnamnet hade fel casing, uppercase vs lowercase.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>ORSAK</span><br />Vi hade inte rätt RBAC-behörigheter på klustret från start, och MongoDB-connectionen var case-sensitive på namespace-nivå.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>LÖSNING</span><br />Behörigheterna fixades av kursansvarig. Casing-problemet löste vi genom att standardisera allt till lowercase. Vi fick upp HTTPS och hela deployen fungerade end-to-end.</p>
                <p style={{ color: 'rgba(52,211,153,0.7)', fontStyle: 'italic' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', fontStyle: 'normal' }}>LÄRDOM</span><br />Saker som ligger utanför ens kontroll (plattformsbehörigheter) kan blockera hela teamet. Dokumentera problemet, skicka ticket, jobba vidare med det man kan påverka.</p>
              </div>
            </div>
          </Accordion>

          <Accordion title="Container hardening vs kvarvarande sårbarheter" index={2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,234,240,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Vecka 8</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(234,179,8,0.7)', background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.15)', borderRadius: '5px', padding: '2px 8px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, alignSelf: 'flex-start' }}>Delvis löst</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', lineHeight: 1.75, color: 'rgba(232,234,240,0.75)' }}>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>VAD HÄNDE</span><br />Vi härdade Docker-imagen, multi-stage build, distroless runtime, non-root. Trivy-scans visade att OS-layer sårbarheterna minskade rejält. Men en kritisk zlib-sårbarhet blev kvar, och det fanns fortfarande HIGH findings i npm dependencies.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>ORSAK</span><br />Alpine hade inte publicerat en patch för zlib ännu. npm-sårbarheterna satt i dependencies av dependencies, att uppgradera dem riskerade att orsaka fel i appen.</p>
                <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.08em' }}>LÖSNING</span><br />Vi dokumenterade zlib som accepterad risk med motivering. npm-sårbarheterna flaggades för framtida audit när uppströms-paket släpper fixes.</p>
                <p style={{ color: 'rgba(52,211,153,0.7)', fontStyle: 'italic' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', fontStyle: 'normal' }}>LÄRDOM</span><br />Säkerhet handlar inte om noll sårbarheter, det handlar om att veta vilka som finns, varför de finns kvar, och att ha en plan.</p>
              </div>
            </div>
          </Accordion>
        </div>
        </ScrollReveal>
      </section>

      {/* ── Support tickets ── */}
      <section>
        <div ref={ticketRef} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <Eyebrow>Support</Eyebrow>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(232,234,240,0.5)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border)',
              borderRadius: '9999px',
              padding: '3px 10px',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}>4 tickets</span>
          </div>
          <SectionTitle>Support Tickets</SectionTitle>
        </div>
        <ScrollReveal delay={80}>
        <BezelCard innerStyle={{ padding: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              {
                id: '#10',
                title: 'Service Account Key File Access',
                priority: 'Medium',
                status: 'Stängd',
                person: 'Jonny',
                desc: 'Jonny kunde inte komma åt credentials-filen för GCloud-synk efter att ha missat en behörighetsruta vid första åtkomsten.',
                priorityColor: 'rgba(234,179,8,0.7)',
                priorityBg: 'rgba(234,179,8,0.06)',
                priorityBorder: 'rgba(234,179,8,0.15)',
                statusColor: 'rgba(232,234,240,0.4)',
                statusBg: 'rgba(255,255,255,0.04)',
                statusBorder: 'var(--color-border)',
              },
              {
                id: '#30',
                title: 'Terraform apply blockeras av GCP kapacitetsbrist',
                priority: 'Hög',
                status: 'Löst',
                person: 'Mattej',
                desc: 'Mattej fick 409-fel på en backup-policy som fastnat i GCP utan att Terraform hann spara state, plus att europe-north1 hade slut på e2-micro kapacitet.',
                priorityColor: 'rgba(239,68,68,0.7)',
                priorityBg: 'rgba(239,68,68,0.06)',
                priorityBorder: 'rgba(239,68,68,0.15)',
                statusColor: 'rgba(52,211,153,0.7)',
                statusBg: 'rgba(52,211,153,0.06)',
                statusBorder: 'rgba(52,211,153,0.15)',
              },
              {
                id: '#34',
                title: 'Gatekeeper Lab – Deploy policy forbidden',
                priority: 'Medium',
                status: 'Löst',
                person: 'Mattej',
                desc: 'Mattej fick behörighetsfel vid deploy av policy via Gatekeeper Lab. Service accountet saknade rättigheter på klustret.',
                priorityColor: 'rgba(234,179,8,0.7)',
                priorityBg: 'rgba(234,179,8,0.06)',
                priorityBorder: 'rgba(234,179,8,0.15)',
                statusColor: 'rgba(52,211,153,0.7)',
                statusBg: 'rgba(52,211,153,0.06)',
                statusBorder: 'rgba(52,211,153,0.15)',
              },
              {
                id: '#39',
                title: 'Terraform apply blocked by missing IAM permissions',
                priority: 'Medium',
                status: 'Löst',
                person: 'Jonny',
                desc: 'Jonny fick 403 på saknade IAM-behörigheter: compute.instances.create, disks.create med flera. Löstes genom att tilldela Compute Instance Admin-rollen.',
                priorityColor: 'rgba(234,179,8,0.7)',
                priorityBg: 'rgba(234,179,8,0.06)',
                priorityBorder: 'rgba(234,179,8,0.15)',
                statusColor: 'rgba(52,211,153,0.7)',
                statusBg: 'rgba(52,211,153,0.06)',
                statusBorder: 'rgba(52,211,153,0.15)',
              },
            ].map(t => (
              <div
                key={t.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto',
                  alignItems: 'start',
                  gap: '14px',
                  padding: '14px 18px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  transition: 'background 200ms',
                }}
              >
                {/* ID */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  marginTop: '1px',
                }}>
                  {t.id}
                </span>
                {/* Title + desc */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'rgba(232,234,240,0.8)',
                    letterSpacing: '-0.01em',
                  }}>{t.title}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'rgba(232,234,240,0.6)',
                    lineHeight: 1.55,
                  }}>{t.desc}</span>
                </div>
                {/* Priority */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: t.priorityColor,
                  background: t.priorityBg,
                  border: `1px solid ${t.priorityBorder}`,
                  borderRadius: '5px',
                  padding: '3px 8px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>{t.priority}</span>
                {/* Status */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: t.statusColor,
                  background: t.statusBg,
                  border: `1px solid ${t.statusBorder}`,
                  borderRadius: '5px',
                  padding: '3px 8px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>{t.status}</span>
              </div>
            ))}
          </div>
        </BezelCard>
        </ScrollReveal>
      </section>

    </div>
  )
}
