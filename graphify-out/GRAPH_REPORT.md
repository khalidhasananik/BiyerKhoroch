# Graph Report - biyerkhoroch  (2026-05-26)

## Corpus Check
- 15 files · ~4,229 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 129 nodes · 120 edges · 20 communities (19 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78559942`
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]

## God Nodes (most connected - your core abstractions)
1. `BiyerKhoroch — Development Phases` - 12 edges
2. `Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection` - 5 edges
3. `Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)` - 5 edges
4. `Phase 3 — Submission Form (Frontend)` - 5 edges
5. `Phase 4 — Backend: Submission API + Database Schema` - 5 edges
6. `Phase 5 — Admin Panel` - 5 edges
7. `Phase 6 — Story Detail Pages` - 5 edges
8. `Phase 7 — Search & Filter System` - 5 edges
9. `Phase 8 — Analytics & Statistics` - 5 edges
10. `Phase 9 — SEO Optimization` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (20 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (6): geistMono, geistSans, inter, metadata, RootLayout(), viewport

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (15): Accessibility, Admin System, Analytics & Statistics, Code Quality Requirements, Color System (60-30-10 Rule), Core Tech Stack, Database Design, Development Style (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (13): BiyerKhoroch — Development Phases, Checklist, Checklist, Deliverables, Deliverables, graphify, Objectives, Objectives (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (13): dependencies, mongoose, next, react, react-dom, name, private, scripts (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (6): CostBreakdown, PaginatedResult, SearchParams, Submission, SubmissionFormData, SubmissionStatus

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection, Tasks

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 4 — Backend: Submission API + Database Schema, Tasks

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 5 — Admin Panel, Tasks

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 6 — Story Detail Pages, Tasks

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 8 — Analytics & Statistics, Tasks

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 9 — SEO Optimization, Tasks

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 10 — Performance Optimization & Deployment Prep, Tasks

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (5): Checklist, Deliverables, Objectives, Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer), Tasks

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (5): Homepage, Main Pages, Search & Filter System, Story Detail Page, Submission Page

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): hooks, PreToolUse, permissions, allow

## Knowledge Gaps
- **94 isolated node(s):** `allow`, `PreToolUse`, `graphify`, `Objectives`, `Tasks` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BiyerKhoroch — Development Phases` connect `Community 3` to `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection` connect `Community 7` to `Community 3`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)` connect `Community 14` to `Community 3`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `allow`, `PreToolUse`, `graphify` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._