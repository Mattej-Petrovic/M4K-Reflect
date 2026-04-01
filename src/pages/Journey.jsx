import { useScrollReveal, ScrollReveal, Eyebrow } from '../components/ui'
import HorizontalTimeline from '../components/HorizontalTimeline'

const weeks = [
  {
    week: 1,
    title: 'Grunden läggs',
    status: 'green',
    description:
      'Allt började med det mest grundläggande, sätta upp en GitHub-organisation och bestämma hur vi ville jobba. Vi skapade vår första app, en Password Strength Checker, mest för att få igång flödet med commits och branching. Det var inte tekniskt avancerat, men det tvingade oss att enas om en struktur tidigt. Vem pushar vad, hur vi namnger branches, hur vi reviewar. Grunden som resten byggde på.',
    highlights: [
      'Satte upp GitHub-organisation och repo-struktur',
      'Byggde Password Strength Checker som första gemensamma projekt',
      'Övade commits, branching och samarbetsflöden',
    ],
    achievements: [],
  },
  {
    week: 2,
    title: 'Containers och Docker',
    status: 'green',
    description:
      'Vi forkade team-flags-repot och gjorde faktiskt en smart grej direkt, vi körde appen lokalt utan Docker först. Då fick vi en baseline att jämföra med när vi senare började köra allt i containers. MongoDB-kopplingen funkade, environment variables var på plats, och localhost:3000 rullade som det skulle. När vi sen körde första docker build så kraschade det direkt. Det visade sig vara medvetet, vi hade missat att läsa DOCKER_TESTING.md där rätt build target stod. Bra påminnelse om att faktiskt läsa dokumentationen innan man bara kör.',
    highlights: [
      'Startade appen lokalt utan Docker först, smart verifiering',
      'Satte upp MongoDB och kopplade miljön',
      'Debuggade build-fel och hittade rätt target i DOCKER_TESTING.md',
    ],
    achievements: [
      { emoji: '🔒', name: 'Security Bug Report', points: 100, tier: null },
    ],
  },
  {
    week: 3,
    title: 'Docker Compose och orkestrering',
    status: 'green',
    description:
      'Nu skulle tre tjänster börja snacka med varandra. Docker Compose var verktyget, och helt plötsligt handlade allt om nätverk, health checks och service discovery. Vi satte health checks på alla services, testade isolering mellan frontend-net och backend-net, och fattade hur containrarna hittar varandra via DNS. Resultatet? 95 av 100 poäng, plus två achievements. Extra Documentation och Perfect Execution. Lätt vår bästa vecka.',
    highlights: [
      'Byggde 3-tjänst-app med Docker Compose',
      'Implementerade health checks för alla services',
      'Testade nätverksisolering och service discovery',
      '95/100 poäng från instruktören',
    ],
    achievements: [
      { emoji: '📚', name: 'Extra Documentation', points: 50,  tier: null },
      { emoji: '🎯', name: 'Perfect Execution',   points: 83,  tier: null },
    ],
  },
  {
    week: 4,
    title: 'CI/CD och Hackathon',
    status: 'green',
    description:
      'Hackathon-vecka och ett stort steg framåt. Vi byggde en komplett CI/CD-pipeline i GitHub Actions: test, Docker-build, Trivy-skanning och deploy till Railway. Hela kedjan automatiserad. Under hackathon fick vi silver, alla team som deltog fick gröna pipelines, men vi var nöjda med vår. Trivy flaggade att vår container körde som root, så vi fixade Dockerfile med USER node och verifierade med en ny skanning. Push-konflikter vid merge var frustrerande men lärorika.',
    highlights: [
      'CI/CD-pipeline: test → Docker-build → Trivy-scan → deploy',
      'Deployade till Railway med staging-ready secrets',
      'Fixade Trivy-varning: bytte från root till USER node i Dockerfile',
      'Löste push-konflikter vid merge',
    ],
    achievements: [
      { emoji: '🥈', name: 'Green Pipeline Warrior', points: 50, tier: 'silver' },
    ],
  },
  {
    week: 5,
    title: 'Kubernetes',
    status: 'green',
    description:
      'Övergången från Docker Compose till Kubernetes. Vi deployade på ett lokalt Kind-kluster med namespace m4k-pipeline, körde backend och frontend med två repliker vardera, och la in health probes och resource limits. Rolling update till k8s-v5 utan nertid funkade direkt. HPA däremot visade "cpu: unknown" det tog ett tag innan vi förstod att metrics-server inte finns i lokala kluster. Mattej fick individuellt pris som Rolling Update Expert och teamet tog Gold-achievement som Zero-Downtime Engineer.',
    highlights: [
      'Deployment till lokalt Kind-kluster i namespace m4k-pipeline',
      'Backend + frontend med 2 repliker vardera',
      'Health probes och resource requests/limits implementerade',
      'Rolling update till k8s-v5 utan nertid',
      'Debuggade HPA cpu: unknown — metrics-server krävs lokalt',
    ],
    achievements: [
      { emoji: '🥇', name: 'Zero-Downtime Engineer',   points: 100, tier: 'gold' },
      { emoji: '🔄', name: 'Rolling Update Expert',    points: 0,   tier: null, individual: true },
    ],
  },
  {
    week: 6,
    title: 'Produktion i GKE',
    status: 'green',
    description:
      "Från lokalt Kind-kluster till riktigt moln. Vi körde upp hela stacken i Google Kubernetes Engine. Redis, API, frontend, monitoring och ingress, allt via manifests. HTTPS fixades med cert-manager och Let’s Encrypt, och till slut fick vi monitoreringen att funka som den skulle. Det var inte clean. kubectl-permissions saknades i början och MongoDB spårade ur på casing i teamnamnet. Men i slutet av veckan hade vi en publik HTTPS-URL som svarade med 200. Det satt.",
    highlights: [
      'Full deploy till GKE med 10 manifest-filer i lagerordning',
      'HTTPS/TLS via cert-manager och Let\'s Encrypt',
      'Team Flags-monitorering kopplad och rapporterande',
      'Löste permission-problem med kubectl och MongoDB casing-buggar',
      'Konsoliderade alla filer till en tydlig repo-struktur',
    ],
    achievements: [],
  },
  {
    week: 7,
    title: 'Terraform och Infrastructure as Code',
    status: 'yellow',
    description:
      'Infrastructure as Code via Terraform. Vi satte upp projektstrukturen med main.tf och variables.tf och började konvertera vecka 6-manifesten till HCL. Första gången vi körde terraform init, plan och apply var det oklart om något faktiskt hände. State list var tom och kubectl visade inte det vi förväntade oss. Översättningen från YAML till HCL var knepigare än vi trott, speciellt att veta vad som skulle vara hårdkodat och vad som skulle bli variabler. Första veckan med gul status.',
    highlights: [
      'Satte upp Terraform-projektstruktur med main.tf och variables.tf',
      'Konverterade vecka 6-manifest till Terraform HCL',
      'Körde terraform init, plan och apply för första gången',
      'Utmaning: terraform state list var tom — oklart om resurser faktiskt skapades',
      'Utmaning: YAML → HCL-översättning krävde refaktorering till variabler',
    ],
    achievements: [],
  },
  {
    week: 8,
    title: 'Container Security och Hardening',
    status: 'yellow',
    description:
      'Säkerhetshärdning av vår container-image. Vi uppgraderade från node:18-alpine till node:22-alpine, la till multi-stage build, bytte till non-root user och rensade upp med .dockerignore. Trivy-skanningen före och efter var talande, OS-sårbarheter minskade rejält. Men en kritisk zlib-sårbarhet gick inte att åtgärda eftersom Alpine inte hade släppt patchen ännu, och flera HIGH-findings i npm-dependencies kunde inte uppgraderas utan risk för att appen gick sönder. Ibland handlar säkerhet om att veta vad man inte kan fixa ännu.',
    highlights: [
      'Uppgraderade basimage från node:18-alpine till node:22-alpine',
      'Multi-stage build + non-root user + .dockerignore',
      'Trivy-skanning före/efter: OS-sårbarheter minskade rejält',
      'Kvarvarande: kritisk zlib-vuln (ej patchad i Alpine stable)',
      'Kvarvarande: HIGH-findings i npm-dependencies som inte gick att uppgradera säkert',
    ],
    achievements: [],
  },
  {
    week: 9,
    title: 'Monitoring och Observability',
    status: 'yellow',
    description:
      'Grafana, PromQL, Kubernetes-metrics och alerting, mycket nytt på en gång. Vi fick i uppgift att identifiera produktionsproblem via dashboards och det blev fyra dokumenterade issues: HTTP 500-fel i inventory-service och order-service, latens i report-generator, och CPU/minnesproblem i payment-service. Utan tillgång till apploggar fick vi förlita oss helt på mönster i metriken. Det var frustrerande men också realistiskt, i produktion har man inte alltid hela bilden.',
    highlights: [
      'Analyserade fyra produktionsissues via Grafana-dashboards',
      'inventory-service och order-service: HTTP 500-fel',
      'report-generator: latens-problem',
      'payment-service: CPU- och minnesproblem',
      'Föreslog root causes och fixes baserat på metrics',
      'Utmaning: ingen tillgång till apploggar — analys baserad på mönster',
    ],
    achievements: [],
  },
  {
    week: 10,
    title: 'Säkerhetsanalys och Attack Chains',
    status: 'red',
    description:
      'Sista veckan och den tyngsta. Vi analyserade en applikation och hittade sårbarheter i flera lager. Dependency-problem, exponerade secrets i Kubernetes, session forgery via ett debug-endpoint, service account tokens som läckte via command injection och en GCP metadata-läcka. Vi mappade hela attack chain. Från injection till RCE, vidare till token-stöld, förfalskade admin-sessioner och till slut access till molnet. En grej som stack ut var att Mattej, med hjälp av Claude, hittade en sårbarhet som egentligen inte ens var en del av uppgiften. En läckt SECRET_KEY gjorde det möjligt att forgea giltiga Flask-sessioner och i praktiken ge sig själv admin. Det uppmärksammades och gav beröm från instruktören. Status röd. Inte för att vi misslyckades, utan för att rapporten visade hur allvarliga sårbarheterna faktiskt var.',
    highlights: [
      'Identifierade kritiska dependency-sårbarheter',
      'Hittade exponerade secrets i Kubernetes-deployment',
      'Session forgery via /debug-endpoint',
      'Service account token exposure via command injection',
      'GCP-token-läcka via metadata-access',
      'Mappade full attack chain: injection → RCE → token theft → cloud access',
      'Status röd, medvetet, rapporten visar allvaret i fynden',
    ],
    achievements: [],
  },
]

export default function Journey() {
  const headerRef = useScrollReveal({ delay: 0 })
  const tlRef     = useScrollReveal({ delay: 100 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px' }}>

      {/* ── Header ── */}
      <section style={{ marginBottom: '72px' }}>
        <div ref={headerRef}>
          <Eyebrow>Vår resa · 10 veckor</Eyebrow>
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
            Vår resa
          </h1>

          {/* Intro paragraph */}
          <div
            style={{
              maxWidth: '600px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '18px 22px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
              }}
            >
              Tio veckor. Från att klona vårt första repo till att köra en egen backend med flera tjänster, säkrad med HTTPS i produktion. Det här är vår resa genom DevSecOps-kursen, vecka för vecka, med allt som gick rätt och allt som gick fel.
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section>
        <div ref={tlRef} style={{ marginBottom: '36px' }}>
          <Eyebrow>Tidslinje</Eyebrow>
        </div>
        <ScrollReveal delay={200}>
          <HorizontalTimeline weeks={weeks} />
        </ScrollReveal>
      </section>

    </div>
  )
}
