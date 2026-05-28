# Graph Report - BiyerKhoroch  (2026-05-28)

## Corpus Check
- 64 files · ~20,255 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 417 nodes · 616 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a049479c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]

## God Nodes (most connected - your core abstractions)
1. `connectToDatabase()` - 28 edges
2. `compilerOptions` - 16 edges
3. `formatBDTCompact()` - 16 edges
4. `BiyerKahini — Development Phases` - 12 edges
5. `Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)` - 10 edges
6. `Phase 3 — Submission Form (Frontend)` - 10 edges
7. `Phase 4 — Backend: Submission API + Database Schema` - 10 edges
8. `Phase 5 — Admin Panel` - 10 edges
9. `Phase 6 — Story Detail Pages` - 10 edges
10. `Phase 7 — Search & Filter System` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ResultsSection()` --calls--> `searchStories()`  [EXTRACTED]
  src/app/(main)/search/page.tsx → src/lib/data/stories.ts
- `Image()` --calls--> `formatBDTCompact()`  [EXTRACTED]
  src/app/(main)/story/[slug]/opengraph-image.tsx → src/lib/utils/format.ts
- `generateMetadata()` --calls--> `formatBDTCompact()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/utils/format.ts
- `StoryPage()` --calls--> `formatBDTCompact()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/utils/format.ts
- `getApprovedSubmissions()` --calls--> `connectToDatabase()`  [EXTRACTED]
  src/app/admin/approved/page.tsx → src/lib/db/connection.ts

## Communities (35 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.24
Nodes (7): geistMono, geistSans, inter, metadata, RootLayout(), viewport, ThemeScript()

### Community 1 - "Community 1"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 4 — Backend: Submission API + Database Schema, Tasks (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (20): Accessibility, Admin System, Analytics & Statistics, Code Quality Requirements, Color System (60-30-10 Rule), Core Tech Stack, Database Design, Development Style (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 3 — Submission Form (Frontend), Tasks (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (26): dependencies, mongoose, next, @next/third-parties, nodemailer, react, react-dom, zod (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (13): useLocalStorageDraft(), calcTotal(), CITIES, COST_FIELDS, CostKey, CURRENT_YEAR, EMPTY, FormState (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (39): BarChart(), BarChartItem, BarChartProps, AnalyticsPage(), metadata, GET(), StatCard(), StatCardProps (+31 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (13): ApprovedCard(), formatBDT(), COST_LABELS, formatBDT(), ModerationCard(), ApprovedPage(), getApprovedSubmissions(), costBreakdownSchema (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (27): sitemap(), escapeRegex(), getApprovedStoriesForSitemap(), getApprovedStorySlugs(), getLatestStories(), getRelatedStories(), getStoryBySlug(), serialize() (+19 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (14): 1. MongoDB Setup, 2. Environment Variables, 3. Deploy to Vercel, 4. Custom Domain, 5. Post-Deployment Checklist, 6. Local Development, 7. Useful Commands, code:block1 (mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retry) (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.28
Nodes (8): BiyerKahini — Development Phases, Checklist, Deliverables, graphify, Objectives, Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection, Tasks, Workflow Rules

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (15): getDistinctCities(), SearchStoryParams, GTMEventMap, useGTM(), BUDGET_PRESETS, DEFAULT_CITIES, FilterPanel(), FilterPanelProps (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 5 — Admin Panel, Tasks (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 6 — Story Detail Pages, Tasks (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): hooks, PreToolUse, permissions, allow

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (13): sendSubmissionNotification(), SubmissionNotificationData, transporter, checkRateLimit(), Entry, getClientIp(), RateLimitResult, store (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (5): GTMPageViewTracker(), Footer(), Navbar(), navLinks, ThemeToggle()

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 7 — Search & Filter System, Tasks (+1 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 8 — Analytics & Statistics, Tasks (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 9 — SEO Optimization, Tasks (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 10 — Performance Optimization & Deployment Prep, Tasks (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (9): Checklist, Checklist, Deliverables, Deliverables, Objectives, Objectives, Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer), Tasks (+1 more)

### Community 30 - "Community 30"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (7): ClearLogsButton(), LogoutButton(), ACTION_COLORS, ACTION_LABELS, DashboardPage(), getStats(), StatCard()

## Knowledge Gaps
- **199 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+194 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `connectToDatabase()` connect `Community 8` to `Community 6`, `Community 7`, `Community 12`, `Community 17`, `Community 31`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `BiyerKahini — Development Phases` connect `Community 10` to `Community 1`, `Community 3`, `Community 13`, `Community 14`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `submissionFormSchema` connect `Community 17` to `Community 5`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _199 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.07329462989840348 - nodes in this community are weakly interconnected._