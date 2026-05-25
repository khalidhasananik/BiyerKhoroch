# Graph Report - biyerkhoroch  (2026-05-26)

## Corpus Check
- 43 files · ~13,263 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 244 nodes · 288 edges · 21 communities (20 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1066cb49`
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
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]

## God Nodes (most connected - your core abstractions)
1. `BiyerKhoroch — Development Phases` - 12 edges
2. `formatBDTCompact()` - 6 edges
3. `connectToDatabase()` - 6 edges
4. `Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection` - 5 edges
5. `Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)` - 5 edges
6. `Phase 3 — Submission Form (Frontend)` - 5 edges
7. `Phase 4 — Backend: Submission API + Database Schema` - 5 edges
8. `Phase 5 — Admin Panel` - 5 edges
9. `Phase 6 — Story Detail Pages` - 5 edges
10. `Phase 7 — Search & Filter System` - 5 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getStoryBySlug()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts
- `generateStaticParams()` --calls--> `getApprovedStorySlugs()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts
- `StoryPage()` --calls--> `getStoryBySlug()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts
- `StoryPage()` --calls--> `getRelatedStories()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts
- `StoryPage()` --calls--> `getLatestStories()`  [EXTRACTED]
  src/app/(main)/story/[slug]/page.tsx → src/lib/data/stories.ts

## Communities (21 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.24
Nodes (7): geistMono, geistSans, inter, metadata, RootLayout(), viewport, ThemeScript()

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (20): Accessibility, Admin System, Analytics & Statistics, Code Quality Requirements, Color System (60-30-10 Rule), Core Tech Stack, Database Design, Development Style (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (33): BiyerKhoroch — Development Phases, Checklist, Checklist, Checklist, Checklist, Checklist, Checklist, Deliverables (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (23): dependencies, mongoose, next, react, react-dom, zod, devDependencies, eslint (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (13): useLocalStorageDraft(), calcTotal(), CITIES, COST_FIELDS, CostKey, EMPTY, FormState, n() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (21): PLACEHOLDER_STORIES, STATS, TRENDING, COST_LABELS, CostBreakdown(), CostBreakdownProps, ShareButtons(), ShareButtonsProps (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.39
Nodes (6): COST_LABELS, formatBDT(), ModerationCard(), ISubmission, getPendingSubmissions(), QueuePage()

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (14): LogoutButton(), ACTION_COLORS, ACTION_LABELS, DashboardPage(), getStats(), connectToDatabase(), MONGODB_URI, MongooseCache (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 5 — Admin Panel, Tasks

### Community 10 - "Community 10"
Cohesion: 0.42
Nodes (8): getApprovedStorySlugs(), getLatestStories(), getRelatedStories(), getStoryBySlug(), serialize(), generateMetadata(), generateStaticParams(), StoryPage()

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 4 — Backend: Submission API + Database Schema, Tasks

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 9 — SEO Optimization, Tasks

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer), Tasks

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): hooks, PreToolUse, permissions, allow

### Community 17 - "Community 17"
Cohesion: 0.21
Nodes (9): checkRateLimit(), Entry, getClientIp(), RateLimitResult, store, costBreakdownSchema, shortId, submissionSchema (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.31
Nodes (4): Footer(), Navbar(), navLinks, ThemeToggle()

## Knowledge Gaps
- **122 isolated node(s):** `graphify`, `Objectives`, `Tasks`, `Deliverables`, `Checklist` (+117 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `connectToDatabase()` connect `Community 8` to `Community 17`, `Community 10`, `Community 7`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `BiyerKhoroch — Development Phases` connect `Community 3` to `Community 9`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `submissionFormSchema` connect `Community 5` to `Community 17`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `graphify`, `Objectives`, `Tasks` to the rest of the system?**
  _122 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._