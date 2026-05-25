# Graph Report - biyerkhoroch  (2026-05-26)

## Corpus Check
- 62 files · ~19,883 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 340 nodes · 441 edges · 31 communities (28 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f3b5803`
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

## God Nodes (most connected - your core abstractions)
1. `BiyerKahini — Development Phases` - 12 edges
2. `connectToDatabase()` - 11 edges
3. `formatBDTCompact()` - 10 edges
4. `useGTM()` - 9 edges
5. `Deployment Guide — BiyerKahini` - 9 edges
6. `StoryCard()` - 8 edges
7. `getStoryBySlug()` - 7 edges
8. `SubmissionForm()` - 6 edges
9. `getAnalytics` - 6 edges
10. `ISubmission` - 6 edges

## Surprising Connections (you probably didn't know these)
- `StoryCard()` --calls--> `useGTM()`  [EXTRACTED]
  src/components/story/StoryCard.tsx → src/hooks/useGTM.ts
- `SubmissionForm()` --calls--> `useGTM()`  [EXTRACTED]
  src/components/submission/SubmissionForm.tsx → src/hooks/useGTM.ts
- `AnalyticsPage()` --calls--> `getAnalytics`  [EXTRACTED]
  src/app/(main)/analytics/page.tsx → src/lib/data/analytics.ts
- `ResultsSection()` --calls--> `searchStories()`  [EXTRACTED]
  src/app/(main)/search/page.tsx → src/lib/data/stories.ts
- `Image()` --calls--> `getStoryBySlug()`  [EXTRACTED]
  src/app/(main)/story/[slug]/opengraph-image.tsx → src/lib/data/stories.ts

## Communities (31 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.24
Nodes (7): geistMono, geistSans, inter, metadata, RootLayout(), viewport, ThemeScript()

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 4 — Backend: Submission API + Database Schema, Tasks

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (20): Accessibility, Admin System, Analytics & Statistics, Code Quality Requirements, Color System (60-30-10 Rule), Core Tech Stack, Database Design, Development Style (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 3 — Submission Form (Frontend), Tasks

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (26): dependencies, mongoose, next, @next/third-parties, nodemailer, react, react-dom, zod (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (14): useLocalStorageDraft(), calcTotal(), CITIES, COST_FIELDS, CostKey, EMPTY, FormState, n() (+6 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (34): sitemap(), getApprovedStoriesForSitemap(), getApprovedStorySlugs(), getLatestStories(), getRelatedStories(), getStoryBySlug(), serialize(), SORT_MAP (+26 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (13): ApprovedCard(), formatBDT(), COST_LABELS, formatBDT(), ModerationCard(), ApprovedPage(), getApprovedSubmissions(), costBreakdownSchema (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (18): LogoutButton(), ACTION_COLORS, ACTION_LABELS, DashboardPage(), getStats(), StatCard(), connectToDatabase(), MONGODB_URI (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (14): 1. MongoDB Setup, 2. Environment Variables, 3. Deploy to Vercel, 4. Custom Domain, 5. Post-Deployment Checklist, 6. Local Development, 7. Useful Commands, code:block1 (mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retry) (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection, Tasks

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (14): BarChart(), BarChartItem, BarChartProps, AnalyticsPage(), metadata, GET(), StatCard(), StatCardProps (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (20): escapeRegex(), getDistinctCities(), searchStories(), SearchStoryParams, GTMEventMap, useGTM(), BUDGET_PRESETS, DEFAULT_CITIES (+12 more)

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 5 — Admin Panel, Tasks

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 6 — Story Detail Pages, Tasks

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): hooks, PreToolUse, permissions, allow

### Community 17 - "Community 17"
Cohesion: 0.26
Nodes (9): sendSubmissionNotification(), SubmissionNotificationData, transporter, checkRateLimit(), Entry, getClientIp(), RateLimitResult, store (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (5): GTMPageViewTracker(), Footer(), Navbar(), navLinks, ThemeToggle()

### Community 25 - "Community 25"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 7 — Search & Filter System, Tasks

### Community 26 - "Community 26"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 8 — Analytics & Statistics, Tasks

### Community 27 - "Community 27"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 9 — SEO Optimization, Tasks

### Community 28 - "Community 28"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 10 — Performance Optimization & Deployment Prep, Tasks

### Community 29 - "Community 29"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer), Tasks

### Community 30 - "Community 30"
Cohesion: 0.50
Nodes (3): BiyerKahini — Development Phases, graphify, Workflow Rules

## Knowledge Gaps
- **157 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `connectToDatabase()` connect `Community 8` to `Community 17`, `Community 11`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `submissionFormSchema` connect `Community 5` to `Community 17`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `Submission` connect `Community 6` to `Community 12`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _157 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.08045977011494253 - nodes in this community are weakly interconnected._