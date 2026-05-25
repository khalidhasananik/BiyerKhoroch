# Graph Report - biyerkhoroch  (2026-05-26)

## Corpus Check
- 52 files · ~17,445 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 289 nodes · 354 edges · 22 communities (21 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6086539f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
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
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]

## God Nodes (most connected - your core abstractions)
1. `BiyerKhoroch — Development Phases` - 12 edges
2. `formatBDTCompact()` - 8 edges
3. `connectToDatabase()` - 8 edges
4. `StoryCard()` - 6 edges
5. `formatBDT()` - 6 edges
6. `Submission` - 6 edges
7. `Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection` - 5 edges
8. `Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)` - 5 edges
9. `Phase 3 — Submission Form (Frontend)` - 5 edges
10. `Phase 4 — Backend: Submission API + Database Schema` - 5 edges

## Surprising Connections (you probably didn't know these)
- `AnalyticsPage()` --calls--> `getAnalytics`  [EXTRACTED]
  src/app/(main)/analytics/page.tsx → src/lib/data/analytics.ts
- `GET()` --calls--> `getAnalytics`  [EXTRACTED]
  src/app/api/analytics/route.ts → src/lib/data/analytics.ts
- `generateMetadata()` --calls--> `getStoryBySlug()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts
- `ResultsSection()` --calls--> `searchStories()`  [EXTRACTED]
  src/app/(main)/search/page.tsx → src/lib/data/stories.ts
- `SearchPage()` --calls--> `getDistinctCities()`  [EXTRACTED]
  src/app/(main)/search/page.tsx → src/lib/data/stories.ts

## Communities (22 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.24
Nodes (7): geistMono, geistSans, inter, metadata, RootLayout(), viewport, ThemeScript()

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (20): Accessibility, Admin System, Analytics & Statistics, Code Quality Requirements, Color System (60-30-10 Rule), Core Tech Stack, Database Design, Development Style (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (38): BiyerKhoroch — Development Phases, Checklist, Checklist, Checklist, Checklist, Checklist, Checklist, Checklist (+30 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (23): dependencies, mongoose, next, react, react-dom, zod, devDependencies, eslint (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (13): useLocalStorageDraft(), calcTotal(), CITIES, COST_FIELDS, CostKey, EMPTY, FormState, n() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (20): PLACEHOLDER_STORIES, STATS, TRENDING, COST_LABELS, CostBreakdown(), CostBreakdownProps, ShareButtons(), ShareButtonsProps (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.21
Nodes (9): COST_LABELS, formatBDT(), ModerationCard(), costBreakdownSchema, ISubmission, shortId, submissionSchema, getPendingSubmissions() (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.32
Nodes (5): LogoutButton(), ACTION_COLORS, ACTION_LABELS, DashboardPage(), getStats()

### Community 9 - "Community 9"
Cohesion: 0.32
Nodes (6): DELETE(), isAuthenticated(), PATCH(), AdminAction, adminLogSchema, IAdminLog

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (26): escapeRegex(), getApprovedStorySlugs(), getDistinctCities(), getLatestStories(), getRelatedStories(), getStoryBySlug(), searchStories(), SearchStoryParams (+18 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (14): BarChart(), BarChartItem, BarChartProps, AnalyticsPage(), metadata, GET(), StatCard(), StatCardProps (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 3 — Submission Form (Frontend), Tasks

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 8 — Analytics & Statistics, Tasks

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 10 — Performance Optimization & Deployment Prep, Tasks

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): hooks, PreToolUse, permissions, allow

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (12): connectToDatabase(), MONGODB_URI, MongooseCache, checkRateLimit(), Entry, getClientIp(), RateLimitResult, store (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.31
Nodes (4): Footer(), Navbar(), navLinks, ThemeToggle()

## Knowledge Gaps
- **140 isolated node(s):** `graphify`, `Objectives`, `Tasks`, `Deliverables`, `Checklist` (+135 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `connectToDatabase()` connect `Community 17` to `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `formatBDT()` connect `Community 6` to `Community 11`, `Community 5`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `Submission` connect `Community 6` to `Community 10`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `graphify`, `Objectives`, `Tasks` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._