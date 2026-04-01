import { useEffect, useRef, useState } from 'react'
import Accordion from '../components/Accordion'
import { ScrollReveal } from '../components/ui'
import {
  GitBranch, Cube, Anchor, FileCode, ShieldCheck, ChartLine, Tornado,
  ArrowRight, Code, GitCommit, Rocket, Bell,
} from '@phosphor-icons/react'

function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.filter = 'blur(4px)'
    el.style.transition = `opacity 700ms var(--ease-out-expo) ${options.delay || 0}ms, transform 700ms var(--ease-out-expo) ${options.delay || 0}ms, filter 700ms var(--ease-out-expo) ${options.delay || 0}ms`
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

function Eyebrow({ children }) {
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

/* ─── Highlight box for technical details ─── */
function DetailBox({ items }) {
  return (
    <div
      style={{
        background: 'rgba(52,211,153,0.04)',
        border: '1px solid rgba(52,211,153,0.15)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(52,211,153,0.6)',
          marginBottom: '4px',
        }}
      >
        Tekniska detaljer
      </span>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              marginTop: '1px',
              flexShrink: 0,
              opacity: 0.7,
            }}
          >
            —
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'rgba(232,234,240,0.65)',
              lineHeight: 1.6,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─── Pipeline diagram node ─── */
function PipeNode({ Icon, label, sublabel, accent = false, highlight = false }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: highlight
            ? 'rgba(52,211,153,0.14)'
            : accent
            ? 'rgba(34,211,238,0.10)'
            : 'rgba(255,255,255,0.06)',
          border: highlight
            ? '1px solid rgba(52,211,153,0.45)'
            : accent
            ? '1px solid rgba(34,211,238,0.35)'
            : '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: highlight
            ? '0 0 28px rgba(52,211,153,0.2), inset 0 1px 1px rgba(255,255,255,0.08)'
            : accent
            ? '0 0 20px rgba(34,211,238,0.15), inset 0 1px 1px rgba(255,255,255,0.06)'
            : 'inset 0 1px 1px rgba(255,255,255,0.05)',
        }}
      >
        <Icon
          size={28}
          weight="light"
          style={{
            color: highlight
              ? 'var(--color-accent)'
              : accent
              ? 'var(--color-accent-alt)'
              : 'rgba(232,234,240,0.55)',
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            color: highlight
              ? 'var(--color-accent)'
              : accent
              ? 'var(--color-accent-alt)'
              : 'rgba(232,234,240,0.75)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(232,234,240,0.35)',
              marginTop: '3px',
              whiteSpace: 'nowrap',
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    </div>
  )
}

function PipeArrow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '24px',
        flexShrink: 0,
        gap: '0',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(52,211,153,0.15), rgba(52,211,153,0.4))',
        }}
      />
      <ArrowRight size={16} weight="light" style={{ color: 'rgba(52,211,153,0.5)', flexShrink: 0 }} />
    </div>
  )
}

/* CI jobs cluster — shown inline between GH Actions and deploy */
function CICluster() {
  const jobs = [
    { label: 'npm ci' },
    { label: 'npm test' },
    { label: 'Docker build' },
    { label: 'Trivy + SARIF' },
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px 24px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '18px',
        flexShrink: 0,
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(232,234,240,0.35)',
          marginBottom: '2px',
        }}
      >
        Jobs
      </span>
      {jobs.map((j) => (
        <div key={j.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(52,211,153,0.6)',
              boxShadow: '0 0 6px rgba(52,211,153,0.4)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'rgba(232,234,240,0.65)',
              whiteSpace: 'nowrap',
            }}
          >
            {j.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* Deploy fork — staging + production branching */
function DeployFork() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      {[
        { label: 'Staging', sublabel: 'PR → main', color: 'rgba(34,211,238,0.85)', glow: 'rgba(34,211,238,0.12)' },
        { label: 'Production', sublabel: 'push main', color: 'rgba(52,211,153,0.9)', glow: 'rgba(52,211,153,0.12)' },
      ].map((d) => (
        <div
          key={d.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            background: d.glow,
            border: `1px solid ${d.color.replace('0.85', '0.25').replace('0.9', '0.3')}`,
            borderRadius: '14px',
            minWidth: '148px',
          }}
        >
          <Rocket size={18} weight="light" style={{ color: d.color, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: d.color, letterSpacing: '-0.01em' }}>
              {d.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(232,234,240,0.4)', marginTop: '2px' }}>
              {d.sublabel}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Full pipeline diagram ─── */
function PipelineDiagram() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '2rem',
        padding: '6px',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 'calc(2rem - 6px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
          padding: '48px 40px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div style={{ position: 'relative', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              background: 'var(--color-accent-dim)',
              border: '1px solid rgba(52,211,153,0.25)',
              borderRadius: '8px',
              padding: '5px 14px',
            }}
          >
            GitHub Actions Pipeline
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(232,234,240,0.28)' }}>
            trigger: push + pull_request → main
          </span>
        </div>

        {/* Horizontal flow — scrollable on mobile, centered on desktop */}
        <div
          style={{
            position: 'relative',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              minWidth: 'max-content',
            }}
          >
            <PipeNode Icon={Code} label="Developer" sublabel="git push/PR" />
            <PipeArrow />
            <PipeNode Icon={GitCommit} label="GitHub Actions" sublabel="workflow trigger" highlight />
            <PipeArrow />
            <CICluster />
            <PipeArrow />
            <DeployFork />
            <PipeArrow />
            <PipeNode Icon={Bell} label="Slack" sublabel="success / failure" accent />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Accordion content components ─── */

function CiCdContent() {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Vår pipeline körs via GitHub Actions och triggas vid varje push och pull request. Flödet börjar med att
        koden checkas ut, Node.js 18 sätts upp och dependencies installeras med <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>npm ci</code>.
        Sen körs testerna, om de passerar byggs en Docker-image taggad med commit-SHA:t. Imagen scannas direkt med
        Trivy som letar efter CRITICAL och HIGH-sårbarheter, och resultaten laddas upp som SARIF till GitHubs Security-tab.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Staging deployas automatiskt via webhook när en PR öppnas mot main. Production deployas när kod pushas direkt
        till main. Båda stegen skickar Slack-notifieringar med commit-info och länk till workflow-körningen. Om något
        jobb i kedjan fallerar triggas en separat failure-alert till Slack.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Pipeline-jobben har tydliga dependencies, staging kräver att CI passerar, och production kräver samma sak.
        Det gör att ingen deploy sker om tester eller scan misslyckas.
      </p>
      <DetailBox
        items={[
          'Trigger: push + pull_request mot main',
          'Node.js 18, npm ci för reproducerbar installation',
          'Docker build med commit-SHA som tag',
          'Trivy: severity CRITICAL,HIGH, SARIF-upload till GitHub Security',
          'Separata deploy-jobb för staging (PR) och production (push main)',
          'Slack-webhooks för success + failure',
        ]}
      />
    </div>
  )
}

function ContainerContent() {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Vi använde multi-stage builds för att hålla runtime-imagen så liten och säker som möjligt. Builder-steget
        kör på <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent-alt)', background: 'rgba(34,211,238,0.08)', padding: '1px 5px', borderRadius: '4px' }}>node:22-alpine</code> där
        dependencies installeras. Sen kopieras bara det som behövs till en distroless runtime-image —{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent-alt)', background: 'rgba(34,211,238,0.08)', padding: '1px 5px', borderRadius: '4px' }}>gcr.io/distroless/nodejs22-debian12:nonroot</code>.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Distroless innebär att imagen inte har shell, pakethanterare eller andra verktyg som en angripare skulle
        kunna använda. Containern körs som non-root och har en inbyggd HEALTHCHECK som pollar{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>/health</code>{' '}
        var 30:e sekund.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Under vecka 8 härdade vi imagen ytterligare. Vi gick från node:18-alpine till node:22-alpine, la till{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>.dockerignore</code>{' '}
        för att exkludera onödiga filer, och fixade filägandeskap med{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>--chown</code>.
        Trivy-scans visade att det härdade bygget eliminerade de gamla OpenSSL-sårbarheterna helt. En kritisk
        zlib-sårbarhet blev kvar eftersom Alpine inte hade publicerat patchen ännu, det dokumenterade vi som accepterad risk.
      </p>
      <DetailBox
        items={[
          'Multi-stage: node:22-alpine (builder) → distroless/nodejs22-debian12:nonroot (runtime)',
          'Non-root körning',
          'HEALTHCHECK inbyggd i imagen',
          '.dockerignore exkluderar node_modules, .git, README',
          'Trivy-scan före och efter härdning — OS-layer sårbarheter reducerades kraftigt',
          'Kvarvarande risk: zlib CVE utan tillgänglig patch i Alpine stable',
        ]}
      />
    </div>
  )
}

function KubernetesContent() {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Vi började med att migrera vår Docker Compose-setup till Kubernetes-manifest under vecka 5. Appen kördes
        i namespace{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>boiler-room</code>{' '}
        med en Deployment på 2 repliker, en NodePort Service och en ConfigMap för miljövariabler.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Varje pod har liveness och readiness probes mot{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>/health</code>.
        Readiness-proben startar efter 5 sekunder och kollar var 10:e, tills den passerar skickas ingen trafik till
        podden. Liveness-proben startar efter 10 sekunder och restartar podden automatiskt om den slutar svara.
        Resource requests och limits är satta på alla containrar (100m/64Mi request, 250m/128Mi limit) för att ge
        schedulern bra underlag och förhindra att en pod äter för mycket resurser.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Under vecka 6 deployade vi till Google Kubernetes Engine (GKE) med HTTPS och publicerade appen live. Vi
        satte upp en headless Service för MongoDB som StatefulSet med PersistentVolumeClaim på 1Gi, även om appen
        i praktiken var stateless vid det laget.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Vi har också Kustomize-konfiguration som wrapprar alla manifest och gör det enkelt att byta image-tag vid
        deploy. Deploy-scriptet (<code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', background: 'rgba(52,211,153,0.08)', padding: '1px 5px', borderRadius: '4px' }}>scripts/deploy.sh</code>)
        bygger imagen, laddar den i kind-klustret, uppdaterar APP_VERSION via en ConfigMap-patch och kör rollout.
      </p>
      <DetailBox
        items={[
          'Namespace: boiler-room (lokal), m4k-gang (GKE)',
          'Deployment: 2 repliker, liveness + readiness probes mot /health',
          'Resource requests/limits på alla containrar',
          'Service: NodePort (lokal), med port-forward som alternativ',
          'MongoDB: StatefulSet + headless Service + PVC 1Gi',
          'Kustomize: image tag override + ConfigMap patching',
          'Deploy-script: build → kind load → kustomize apply → rollout status',
          'GKE: production deployment med HTTPS under vecka 6',
        ]}
      />
    </div>
  )
}

function TerraformContent() {
  const C = ({ children, alt }) => (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: '12px',
      color: alt ? 'var(--color-accent-alt)' : 'var(--color-accent)',
      background: alt ? 'rgba(34,211,238,0.08)' : 'rgba(52,211,153,0.08)',
      padding: '1px 5px', borderRadius: '4px',
    }}>{children}</code>
  )
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Under vecka 7 gick vi från att köra <C>kubectl apply</C> manuellt till att hantera hela infrastrukturen
        med Terraform. Tanken var enkel, vi ville ha koll på vad som faktiskt körs i klustret, kunna planera
        ändringar innan de appliceras, och slippa gissa vad som finns deployet.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Vi skapade ett Terraform-projekt i <C>infra/terraform/</C> med separata filer per komponent:{' '}
        <C>redis.tf</C>, <C>api.tf</C>, <C>frontend.tf</C>, <C>monitor.tf</C> och <C>ingress.tf</C>. Varje fil
        beskriver deployments och services för sin del av stacken. Vi byggde också en återanvändbar modul{' '}
        (<C>modules/k8s-app</C>) som tar in namn, image, port, replicas, probes och resursgränser så att vi
        slipper duplicera samma block överallt.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        En utmaning var att resurserna redan fanns i klustret från vecka 6 men inte i Terraforms state. Vi löste
        det med <C>terraform import</C> för att synka verkligheten mot koden. Efter importen kunde vi köra{' '}
        <C>terraform plan</C> och se exakt vad som skilde sig, labels som saknades, endpoint-värden som driftade.
        Det är precis poängen med IaC: man ser avvikelser direkt istället för att upptäcka dem i produktion.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        State lagras i en GCS-bucket (<C alt>chas-tf-state-m4k-gang</C>) så att hela teamet kan jobba mot samma
        state. Vi la också till variabler för namespace, environment, replicas och domännamn, med validering så
        att t.ex. replicas alltid ligger mellan 1 och 3.
      </p>
      <DetailBox
        items={[
          'Provider: hashicorp/kubernetes ~> 2.35',
          'Backend: GCS bucket för remote state',
          'Modulstruktur: modules/k8s-app med deployment + service + probes + resource limits',
          'Filer: versions.tf, provider.tf, variables.tf, main.tf, redis.tf, api.tf, frontend.tf, monitor.tf, ingress.tf',
          'Import-flöde: terraform import för befintliga klusterresurser',
          'Variabler med validering (environment, api_replicas)',
          'Ingress med valfri TLS via cert-manager (enable_tls toggle)',
        ]}
      />
    </div>
  )
}

function SecurityContent() {
  const C = ({ children, alt }) => (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: '12px',
      color: alt ? 'var(--color-accent-alt)' : 'var(--color-accent)',
      background: alt ? 'rgba(34,211,238,0.08)' : 'rgba(52,211,153,0.08)',
      padding: '1px 5px', borderRadius: '4px',
    }}>{children}</code>
  )
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Säkerhet var inte något vi la till i slutet, det satt i flera lager från början. I våra
        Kubernetes-manifest kör alla containrar som non-root med <C>securityContext</C> som blockerar privilege
        escalation och droppar alla Linux capabilities. Root-filsystemet är read-only där det går, och vi har
        seccomp-profilen <C>RuntimeDefault</C> på pod-nivå.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Vi satte upp RBAC med least-privilege-principen. I <C>infra/k8s/rbac/</C> finns roller som{' '}
        <C alt>deploy-manager</C> (kan hantera deployments, services och configmaps) och{' '}
        <C alt>pod-reader</C> (kan bara läsa pods och loggar). ServiceAccounts binds till specifika roller via
        RoleBindings, så att ingen komponent har mer access än den behöver.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Under vecka 8 härdade vi container-imagen och körde Trivy-scans för att jämföra före och efter. Vi gick
        från node:18-alpine till node:22-alpine med multi-stage build och distroless runtime. OS-lagrets
        sårbarheter minskade rejält, och de gamla OpenSSL-problemen försvann helt. Vi dokumenterade kvarvarande
        risker som inte gick att patcha.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Vecka 10 var en ren säkerhetsanalys där vi kartlade en hel attackkedja, från command injection till RCE,
        token-stöld, session forgery och GCP metadata-åtkomst. Vi hittade exponerade secrets i deploymenten, en
        sårbar <C>/debug</C>-endpoint och en service account token som gick att nå via command injection. Det var
        inte vår egen app som var målet, utan en övningsapplikation, men det gav oss en tydlig bild av hur
        säkerhetsbrister i olika lager hänger ihop.
      </p>
      <DetailBox
        items={[
          'securityContext: runAsNonRoot, allowPrivilegeEscalation: false, drop ALL capabilities',
          'seccompProfile: RuntimeDefault',
          'readOnlyRootFilesystem: true (där möjligt)',
          'RBAC: deploy-manager Role (deployments, services, configmaps) + pod-reader Role (pods, pods/log)',
          'RoleBindings kopplade till specifika ServiceAccounts per namespace',
          'Trivy-scanning i CI: severity CRITICAL,HIGH, SARIF till GitHub Security tab',
          'Container hardening: multi-stage build, distroless runtime, non-root',
          'Vecka 10: fullständig attackkedjeanalys (command injection → RCE → token theft → cloud access)',
        ]}
      />
    </div>
  )
}

function MonitoringContent() {
  const C = ({ children, alt }) => (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: '12px',
      color: alt ? 'var(--color-accent-alt)' : 'var(--color-accent)',
      background: alt ? 'rgba(34,211,238,0.08)' : 'rgba(52,211,153,0.08)',
      padding: '1px 5px', borderRadius: '4px',
    }}>{children}</code>
  )
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Appen har inbyggda endpoints för att kunna övervaka vad som händer i runtime. <C>/health</C> returnerar
        service-namn, version, uptime och en boolean för om appen mår bra, det är den endpointen som
        Kubernetes-proberna pekar mot. <C>/metrics</C> ger en JSON-payload med totalt antal requests,
        genomsnittlig responstid och statistik per route. <C>/metrics/prometheus</C> exporterar samma data i
        Prometheus-format så att det går att skrapa med en extern monitor.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        All mätdata samlas in via en middleware som loggar varje request, start- och sluttid, route och
        statuskod. Det är simpelt men det ger oss det vi behöver: vi kan se vilka routes som används, hur snabbt
        de svarar och om något börjar svara med felkoder.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        I klustret körde vi en separat monitor-komponent (<C alt>team-monitor</C>) som en egen deployment med
        dedicerad ServiceAccount. Den har en ConfigMap med team-namn, API-endpoint och check-intervall, plus en
        Secret för API-nyckeln. Monitorn kollar teamets status mot en extern endpoint var 30:e sekund. Den kör
        med read-only filesystem, non-root och minimala RBAC-rättigheter, den kan läsa pods, services,
        deployments och ingresses men inte ändra något.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Under vecka 9 jobbade vi med Grafana-dashboards och PromQL för att analysera produktionsproblem. Vi
        identifierade HTTP 500-fel i inventory-service och order-service, latency-problem i report-generator och
        CPU/minnesöverskridningar i payment-service. Utan tillgång till applikationsloggar fick vi förlita oss
        på mönster i metrics-datan, vilket var en bra övning i hur man felsöker med det man har.
      </p>
      <DetailBox
        items={[
          '/health: service name, version, uptime, healthy boolean — används av K8s liveness/readiness probes',
          '/metrics: JSON med totalRequests, averageResponseMs, routeMetrics per path',
          '/metrics/prometheus: Prometheus text format (counter + gauge) — redo för extern scraping',
          'Middleware: loggar duration, route och statuskod per request',
          'team-monitor deployment: dedicerad ServiceAccount med RBAC (read-only pods, services, deployments, ingresses)',
          'Monitor config via ConfigMap + Secret (API-nyckel)',
          'Vecka 9: Grafana + PromQL-analys av 4 produktionsproblem (HTTP 500, latency, CPU/minne)',
        ]}
      />
    </div>
  )
}

function ChaosContent() {
  const C = ({ children, alt }) => (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: '12px',
      color: alt ? 'var(--color-accent-alt)' : 'var(--color-accent)',
      background: alt ? 'rgba(34,211,238,0.08)' : 'rgba(52,211,153,0.08)',
      padding: '1px 5px', borderRadius: '4px',
    }}>{children}</code>
  )
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
        Vi har ett chaos-steg inbyggt direkt i vår CI/CD-pipeline. Jobbet heter <C>chaos-staging</C> och körs
        automatiskt efter varje lyckad staging-deploy. Det fungerar enkelt: med 50% sannolikhet triggas en
        omstart av staging-miljön via samma deploy-hook som vanlig deploy använder. Resten av gångerna hoppas
        det över.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Poängen är att testa att staging-miljön klarar en oväntad restart utan att något går sönder. Om appen
        startar korrekt, health-proben passerar och trafiken börjar flöda igen utan manuellt ingripande, då vet
        vi att deploymenten är tillräckligt robust. Det är inte Chaos Monkey-nivå, men det är en medveten
        implementation som kör i produktion på varje PR.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Chaos-steget körs bara när staging-deploy lyckas (villkoret{' '}
        <C alt>needs.deploy-staging.result == 'success'</C>). Om staging-hooken inte är konfigurerad hoppas hela
        steget över istället för att krascha. Det gör att pipelinen är resilient oavsett om secrets finns eller
        inte.
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.75, marginTop: '12px' }}>
        Det här knyter an till kursmål 8 (Chaos Engineering). Vi ville inte bara läsa om det utan faktiskt ha
        det i vår pipeline. Slumpmässig restart efter deploy är ett litet men konkret steg mot att validera
        systemets förmåga att återhämta sig.
      </p>
      <DetailBox
        items={[
          'Jobb: chaos-staging i .github/workflows/pipeline.yml',
          'Trigger: körs efter lyckad staging-deploy (needs: deploy-staging)',
          'Logik: RANDOM % 2 — 50% chans att restart triggas',
          'Metod: curl POST mot STAGING_DEPLOY_HOOK_URL (samma hook som vanlig deploy)',
          'Sleep 8s efter restart för att ge miljön tid att stabilisera',
          'Graceful skip om STAGING_DEPLOY_HOOK_URL inte är satt',
          'Validerar: att appen startar korrekt, health probes passerar och trafik återupptas utan manuell intervention',
          'Kursmål 8: Chaos Engineering',
        ]}
      />
    </div>
  )
}

const sections = [
  {
    title: 'CI/CD Pipeline',
    Icon: GitBranch,
    summary: 'GitHub Actions triggas vid push och PR. npm ci → test → Docker build → Trivy scan → deploy till staging eller production med Slack-notifieringar i varje steg.',
    Content: CiCdContent,
  },
  {
    title: 'Container Builds & Hardening',
    Icon: Cube,
    summary: 'Multi-stage builds med distroless runtime-image. Non-root körning, HEALTHCHECK och .dockerignore. Trivy-scans visade kraftigt reducerade sårbarheter efter härdning i vecka 8.',
    Content: ContainerContent,
  },
  {
    title: 'Kubernetes Deployment',
    Icon: Anchor,
    summary: 'Migrerade från Docker Compose till K8s-manifest under vecka 5. Deployment med 2 repliker, liveness/readiness probes, resource limits och Kustomize för image-tagging. GKE med HTTPS i vecka 6.',
    Content: KubernetesContent,
  },
  {
    title: 'Terraform & IaC',
    Icon: FileCode,
    summary: 'Migrerade från manuell kubectl till Terraform i vecka 7. Återanvändbar modul, GCS remote state och terraform import för att synka befintliga klusterresurser mot koden.',
    Content: TerraformContent,
  },
  {
    title: 'Säkerhet',
    Icon: ShieldCheck,
    summary: 'Säkerhet i flera lager: securityContext, RBAC med least-privilege, Trivy i CI och distroless containers. Vecka 10: fullständig attackkedjeanalys från command injection till cloud access.',
    Content: SecurityContent,
  },
  {
    title: 'Monitoring & Observability',
    Icon: ChartLine,
    summary: 'Inbyggda /health, /metrics och /metrics/prometheus endpoints. Team-monitor som egen deployment med RBAC. Vecka 9: Grafana + PromQL för att diagnostisera HTTP 500, latency och resursproblem i produktion.',
    Content: MonitoringContent,
  },
  {
    title: 'Chaos Engineering',
    Icon: Tornado,
    summary: 'chaos-staging-jobb inbyggt i pipelinen — körs automatiskt efter staging-deploy med 50% chans att trigga en oväntad restart. Validerar att appen återhämtar sig utan manuellt ingripande. Kursmål 8.',
    Content: ChaosContent,
  },
]

export default function Tech() {
  const headerRef = useScrollReveal({ delay: 0 })
  const diagramRef = useScrollReveal({ delay: 150 })
  const accordionRef = useScrollReveal({ delay: 250 })

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '160px' }}>

      {/* Hero header */}
      <section style={{ marginBottom: '56px' }}>
        <div ref={headerRef}>
          <Eyebrow>Teknisk djupdykning</Eyebrow>
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
            Teknisk
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: '640px',
            }}
          >
            Vi gick från att köra enstaka Docker-kommandon till att bygga en helt automatiserad pipeline med säkerhetsscanning, multi-stage builds och Kubernetes på GKE. Det här är vad som driver CyberPass och M4K-Pipeline från commit hela vägen till produktion.
          </p>
        </div>
      </section>

      {/* Pipeline diagram */}
      <section style={{ marginBottom: '72px' }}>
        <div ref={diagramRef}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(232,234,240,0.4)',
              }}
            >
              CI/CD Flöde
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <PipelineDiagram />
        </div>
      </section>

      {/* Accordion sections */}
      <section>
        <div ref={accordionRef} style={{ marginBottom: '32px' }}>
          <Eyebrow>Sektioner</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}
          >
            Teknisk genomgång
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '900px',
          }}
        >
          {sections.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 60}>
            <Accordion title={s.title} index={i}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <s.Icon size={16} weight="light" style={{ color: 'var(--color-accent)', opacity: 0.7 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-accent)',
                      opacity: 0.7,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s.title}
                  </span>
                </div>
                {s.Content ? (
                  <s.Content />
                ) : (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: 'rgba(232,234,240,0.35)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                    }}
                  >
                    {s.summary}
                  </p>
                )}
              </div>
            </Accordion>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  )
}
