# PROJECT.md — M4K Gang Grupprapport

## Vad detta är
En portfolio-hemsida som dokumenterar och reflekterar över M4K Gangs DevSecOps-kurs (11 veckor). Hemsidan ÄR grupprapporten och ska kunna visas för en arbetsgivare vid LIA-ansökan.

Repo: M4K-Reflect
Deadline: 6 april 2026, 23:59.

---

## KRITISK BYGGREGEL: INGEN TEXT FÖRRÄN DEN SKICKAS IN

Sidan byggs i faser. I Fas A och B byggs BARA struktur och layout — inga texter, inga beskrivningar, inget content. Alla ställen där text ska in markeras med en kort platshållare i hakparentes som beskriver vad som ska fyllas i.

Exempel på korrekta platshållare:
- `[TEXT: one-liner om teamets resa]`
- `[STATS: antal submissions]`
- `[ACCORDION-CONTENT: CI/CD pipeline beskrivning]`
- `[REFLECTION: vad fungerade bra]`

Exempel på FEL (gör INTE detta):
- Skriva ut faktisk beskrivande text
- Generera "lagom-klingande" placeholder-meningar
- Fylla i siffror eller tekniska detaljer

Texten fylls i separat, sida för sida, i Fas C. Materialet skickas in vid varje steg.

---

## KRITISK DATAREGEL: HITTA ALDRIG PÅ

All data, statistik, siffror och fakta på sidan MÅSTE komma från inskickat material. Claude får ALDRIG:
- Hitta på siffror (submissions, deploys, tickets, poäng, närvaro)
- Gissa tekniska detaljer som inte finns i materialet
- Generera "rimliga" placeholder-värden
- Anta vad teamet gjorde en viss vecka utan källa
- Skriva text som presenteras som fakta utan underlag

Om data saknas → skriv `[DATA SAKNAS: beskrivning av vad som behövs]` och fråga efter materialet.

---

## Kursmål som ska täckas
Rapporten kopplar till dessa kursmål. Varje mål MÅSTE ha tydlig närvaro på sidan.

| ID | Kursmål | Var det täcks |
|----|---------|---------------|
| 1 | Shared Responsibility-modellen | Sida 6 (Reflektioner) + Sida 3 (Teknisk — GKE ansvar vs molnleverantör) |
| 4 | SRE-metodik och systemresiliens | Sida 5 (Team & SRE) + Sida 3 (health checks, replicas, rollbacks) |
| 8 | Chaos Engineering | Sida 3 (chaos-staging i pipeline) + Sida 2 (tidslinje — veckan det testades) |
| 10 | Bedömning av molnarkitektur | Sida 3 (GKE-arkitektur, Terraform-moduler, namespace) + Sida 4 (Before & After) |
| 11 | Incidentrespons och post-mortem | Sida 5 (blockers som mini-postmortems, support tickets) + Sida 6 (Reflektioner) |

---

## Team
- Carl Persson — "Infrastrukturspecialisten"
- Jonny Nguyen — "Automationsarkitekten"
- Julia Persson — "Säkerhetsanalytikern"
- Mattej Petrovic — "Teamleader & Integratören"

Teamnamn: M4K Gang (4 medlemmar)
GitHub Pipeline: https://github.com/Mattej-Petrovic/M4K-Pipeline
GitHub CyberPass: https://github.com/Mattej-Petrovic/CyberPass

---

## Teknisk stack för hemsidan
- React (Vite) med React Router (client-side routing)
- Tailwind CSS
- Inga externa API:er — allt är statiskt content
- Deployment: Vercel

---

## Design

Använd **soft-skill** från `.claude/skills/soft-skill.md`.

Tema: Mörkt (dark mode). Låt soft-skill styra exakt vilka färger, shadows, typografi och spacing som används — specificera INTE manuellt. Skillen väljer vibe och layout archetype baserat på projektets kontext (DevSecOps portfolio/rapport).

Undvik:
- Lila/neon ("AI purple")
- Emojis i UI (ikoner via Phosphor istället)
- Gradient-text på rubriker
- Generiska 3-kolumns-grids

Typografi: Geist (sans) + Geist Mono (kod/siffror).

---

## Routing & Navigation

React Router med separata routes för varje sida. INTE single-page scroll.

| Route | Sida | Sidnamn i nav |
|-------|------|---------------|
| `/` | Hero / Startsida | Hem |
| `/journey` | Vår resa | Vår resa |
| `/tech` | Teknisk djupdykning | Teknisk |
| `/before-after` | Before & After | Before & After |
| `/team` | Team & SRE | Team & SRE |
| `/reflections` | Reflektioner & Kursmål | Reflektioner |
| `/data` | Grafer & Data | Data |

Navigation:
- Floating pill navbar (soft-skill "Fluid Island" pattern)
- Aktiv sida markerad i nav
- Hamburgermeny med staggered reveal under 768px
- Smooth page transitions (route-baserade)

---

## Sidstruktur — 7 sidor (separata routes)

### Sida 1: Hero / Startsida (`/`)
**Syfte:** Första intrycket. Snabbt visa vem vi är och vad vi åstadkommit.

Innehåll:
- Teamnamn (M4K Gang) som headline
- `[TEXT: one-liner om teamets resa]`
- Stats-grid med 4 nyckeltal: `[STATS: submissions]`, `[STATS: total score]`, `[STATS: veckor]`, `[STATS: support tickets]`
- Teammedlemmar med roller och närvaro (Carl — Infrastrukturspecialisten, Jonny — Automationsarkitekten, Julia — Säkerhetsanalytikern, Mattej — Teamleader & Integratören)
- `[DATA: achievements/badges]` — sektion
- Subtil scroll-indikator

### Sida 2: Vår resa (`/journey`)
**Syfte:** Visa hela utvecklingsresan vecka 1–10.

Innehåll:
- `[TEXT: kort narrativ, 3-4 meningar om resan]`
- Vertikal tidslinje, vecka 1 till vecka 10
- Varje vecka: veckonummer-badge + rubrik + `[TEXT: 2-3 korta punkter]` (synliga)
- Fällbar sektion per vecka: `[ACCORDION-CONTENT: vad vi gjorde, verktyg, blockers]`

Layout: Vertikal tidslinje med alternerande cards (desktop), staplat (mobil).

### Sida 3: Teknisk djupdykning (`/tech`)
**Syfte:** Visa teknisk förståelse. Täcker CI/CD, containers, K8s, säkerhet, monitoring.

Innehåll:
- `[DIAGRAM: pipeline-arkitektur]` placeholder överst
- 7 accordion-sektioner:
  1. CI/CD Pipeline — `[ACCORDION-CONTENT: GitHub Actions flöde]`
  2. Container Builds & Hardening — `[ACCORDION-CONTENT: Dockerfile, distroless, Trivy]`
  3. Kubernetes Deployment — `[ACCORDION-CONTENT: manifest, probes, services]`
  4. Terraform & IaC — `[ACCORDION-CONTENT: moduler, state, variabler]`
  5. Säkerhet — `[ACCORDION-CONTENT: RBAC, NetworkPolicy, secrets]`
  6. Monitoring & Observability — `[ACCORDION-CONTENT: health endpoints, Prometheus, Team Flags]`
  7. Chaos Engineering — `[ACCORDION-CONTENT: chaos-staging, vad det testar]` (KURSMÅL 8)

### Sida 4: Before & After (`/before-after`)
**Syfte:** Visuell kontrast mellan vecka 1 (CyberPass) och vecka 10 (full pipeline).

Innehåll:
- `[TEXT: intro, 2 meningar]`
- Jämförelseblock i 5 kategorier (tvåkolumns-cards):
  - Arkitektur, Deployment, Säkerhet, Infrastruktur, Teamprocess
- `[CHART: before/after vulnerability count]` (Trivy-scan)
- Länkar till GitHub-repos

Layout: Tvåkolumns card-grid. Vänster dämpad, höger med accent. Tydlig visuell progression.

### Sida 5: Team & SRE (`/team`)
**Syfte:** Teamdynamik kopplat till SRE-principer. Kursmål 4 och 11.

Innehåll:
- Teammedlemmar med `[TEXT: roll och bidrag per person]`
- `[TEXT: hur vi jobbade — boiler room, arbetsfördelning]`
- SRE-koppling (highlight-cards): blameless culture, on-call-ansvar, monitoring
- Blockers som expanderbara mini-postmortem cards (3 st)
- `[DATA: support tickets sammanfattning]`

### Sida 6: Reflektioner & Kursmål (`/reflections`)
**Syfte:** VG-kritisk sida. Mognad, självinsikt, kursmålskoppling.

Innehåll:
- Tre reflektions-cards: fungerade bra / svårast / annorlunda
- 5 kursmåls-cards (mål 1, 4, 8, 10, 11) med expanderbar text

### Sida 7: Grafer & Data (`/data`)
**Syfte:** Visualisera engagemang med data.

Innehåll:
- `[CHART: attendance/närvaro över tid]`
- `[CHART: login-mönster]`
- `[CHART: submissions per vecka]`
- `[CHART: commit-aktivitet]`

Layout: Dashboard-stil, 2 grafer per rad i grid.

---

## Designregler (alla sidor)

### Text
- Max 3-4 meningar synlig text per sektion. Resten fällbart.
- Inga textväggar. Mer än 5 rader → bryt med visual, diagram eller card.
- Hierarki: Rubrik → kort intro → content cards.

### Layout
- Följ soft-skill regler. Inga generiska layouts.
- Double-Bezel (Doppelrand) på alla cards och containers.
- Responsivt: single-column under 768px, w-full, px-4.

### Interaktivitet
- Scroll-reveal (IntersectionObserver)
- Accordions för långa texter
- Hover-effekter med tactile feedback (scale-[0.98] på active)
- Custom cubic-bezier transitions
- Staggered entry animations

---

## Byggordning

### Fas A: Skal
Vite + React + Tailwind setup. React Router med alla 7 routes. Floating pill navbar. Alla sidor som tomma shells. BARA struktur, INGA texter.

### Fas B: Komponentstruktur per sida (denna ordning)
Bygg layout-komponenterna med platshållare. Fortfarande INGEN text.
1. Hero/Start
2. Before & After
3. Teknisk djupdykning
4. Vår resa
5. Team & SRE
6. Reflektioner & Kursmål
7. Grafer & Data

### Fas C: Content (en sida åt gången)
Material skickas in. Text fylls i, en sida åt gången.

### Fas D: Polish
Animationer, mobilanpassning, finslipning.

---

## Filstruktur
```
m4k-reflect/
├── public/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── ui/
│   │       ├── Card.jsx
│   │       ├── Accordion.jsx
│   │       ├── StatsGrid.jsx
│   │       └── ScrollReveal.jsx
│   ├── pages/
│   │   ├── Hero.jsx
│   │   ├── Journey.jsx
│   │   ├── TechDeepDive.jsx
│   │   ├── BeforeAfter.jsx
│   │   ├── TeamSRE.jsx
│   │   ├── Reflections.jsx
│   │   └── DataDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── PROJECT.md
├── .claude/
│   └── skills/
│       └── soft-skill.md
├── package.json
├── tailwind.config.js
├── vite.config.js
└── index.html
```
