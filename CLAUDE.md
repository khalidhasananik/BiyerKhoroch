@AGENTS.md

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

---

# BiyerKhoroch — Development Phases

**Project:** Anonymous wedding cost sharing platform for Bangladesh  
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MongoDB/Mongoose · Vercel

---

## Phase 1 — Project Setup, Folder Structure, Theme, MongoDB Connection
**Status:** `Completed`

### Objectives
- Establish the full folder/file architecture
- Configure Inter font (only font)
- Build the complete CSS theme system (light/dark, 60-30-10 pink accent)
- Wire up MongoDB connection utility
- Set base layout

### Tasks
- [x] Write CLAUDE.md with all phases
- [x] Install mongoose
- [x] Create `src/components/`, `src/lib/`, `src/types/` directories
- [x] Set up Inter via `next/font/google`
- [x] Define CSS theme tokens in `globals.css` (Tailwind v4 `@theme`)
- [x] Create `src/lib/db/connection.ts` — singleton Mongoose connection
- [x] Create `.env.local` with `MONGODB_URI`
- [x] Update `src/app/layout.tsx` — Inter font, `<html lang="bn">`, dark class support

### Deliverables
- Working Next.js dev server
- MongoDB connection utility ready
- Theme system operational (light + dark)
- Clean folder skeleton for all future phases

### Checklist
- [x] `npm run dev` starts without errors
- [x] No TypeScript errors
- [x] `.env.local` present and gitignored
- [x] Inter font loading correctly

---

## Phase 2 — Homepage UI (Hero, Feed Cards, Navbar, Footer)
**Status:** `Pending Review`

### Objectives
- Build the main public homepage
- Responsive submission feed cards
- Navbar with branding + navigation links
- Footer with site info

### Tasks
- [ ] `src/components/layout/Navbar.tsx` — logo, nav links, theme toggle
- [ ] `src/components/layout/Footer.tsx`
- [ ] `src/app/(main)/layout.tsx` wrapping with Navbar + Footer
- [ ] `src/app/(main)/page.tsx` — homepage sections:
  - Hero section (tagline, CTA)
  - Trending stories (placeholder cards)
  - Latest submissions feed
  - Statistics preview strip
  - CTA section (submit your story)
- [ ] `src/components/story/StoryCard.tsx` — responsive feed card
- [ ] Mobile-first responsive design throughout

### Deliverables
- Fully rendered homepage with all sections
- Responsive on mobile, tablet, desktop, ultrawide
- Dark mode functional

### Checklist
- [ ] All homepage sections render
- [ ] Navbar and footer work on mobile
- [ ] StoryCard component is reusable
- [ ] Dark mode looks correct

---

## Phase 3 — Submission Form (Frontend)
**Status:** `Pending`

### Objectives
- Anonymous multi-step submission form
- Validation, auto-save draft to localStorage
- Anti-spam: honeypot field, rate limiting architecture
- Loading states and success/error handling

### Tasks
- [ ] `src/app/(main)/submit/page.tsx`
- [ ] `src/components/submission/SubmissionForm.tsx` (client component)
- [ ] Form fields: city, guest count, venue, all cost fields, story
- [ ] Zod validation schema in `src/lib/validations/submission.ts`
- [ ] Auto-save draft to localStorage hook
- [ ] Honeypot field implementation
- [ ] Loading state + success/error UI

### Deliverables
- Fully functional submission form UI
- Draft auto-save working
- Client-side validation with error messages

### Checklist
- [ ] All required fields present
- [ ] Validation shows inline errors
- [ ] Draft persists on page refresh
- [ ] Honeypot field is hidden
- [ ] Mobile layout is clean

---

## Phase 4 — Backend: Submission API + Database Schema
**Status:** `Pending`

### Objectives
- Mongoose submission schema with all fields
- Server action / route handler for form submission
- Rate limiting middleware
- Admin moderation queue (pending/approved/rejected status)

### Tasks
- [ ] `src/lib/db/models/Submission.ts` — full Mongoose schema with indexes
- [ ] `src/lib/db/models/AdminLog.ts`
- [ ] `src/app/api/submissions/route.ts` — POST handler
- [ ] Server-side Zod validation
- [ ] Rate limiting (in-memory or Upstash-ready)
- [ ] Status field: `pending` | `approved` | `rejected`
- [ ] Slug auto-generation from city + id
- [ ] Total cost auto-calculation logic

### Deliverables
- Submission saved to MongoDB on form submit
- Moderation queue populated
- Proper error responses

### Checklist
- [ ] Schema has all required fields + indexes
- [ ] Images field array present (for future use)
- [ ] Duplicate/spam submissions blocked by rate limit
- [ ] API returns proper HTTP status codes

---

## Phase 5 — Admin Panel
**Status:** `Pending`

### Objectives
- Protected admin route (simple password auth via env var)
- Moderation queue: approve / reject / delete submissions
- Dashboard with key stats

### Tasks
- [ ] `src/app/admin/page.tsx` — login page
- [ ] `src/app/admin/dashboard/page.tsx`
- [ ] `src/app/admin/queue/page.tsx` — pending submissions list
- [ ] `src/app/api/admin/auth/route.ts` — password check, set httpOnly cookie
- [ ] `src/middleware.ts` — protect `/admin/*` routes
- [ ] `src/app/api/admin/submissions/[id]/route.ts` — approve/reject/delete
- [ ] Admin log writes on every action

### Deliverables
- Admin can log in with password from env var
- Can approve/reject/delete submissions
- Dashboard shows total/pending/approved counts

### Checklist
- [ ] Admin routes redirect to login if not authenticated
- [ ] Approve sets status to `approved`, triggers public visibility
- [ ] Admin log records every action
- [ ] No frontend auth framework used

---

## Phase 6 — Story Detail Pages
**Status:** `Pending`

### Objectives
- SEO-friendly individual story pages
- Slug-based URLs
- Full expense breakdown display
- Social share meta tags

### Tasks
- [ ] `src/app/(main)/story/[slug]/page.tsx`
- [ ] `generateStaticParams` or ISR for story pages
- [ ] `generateMetadata` for dynamic OG/Twitter tags
- [ ] `src/components/story/StoryDetail.tsx` — full page layout
- [ ] `src/components/story/CostBreakdown.tsx` — expense table
- [ ] Share buttons (copy link, X/Twitter, Facebook)
- [ ] Related stories section

### Deliverables
- Each approved submission has a public URL
- OG image tags work for social sharing
- Cost breakdown readable on mobile

### Checklist
- [ ] URLs are `/story/dhaka-wedding-abc123` format
- [ ] Page title uses city + guest count
- [ ] Share preview shows correct image/description
- [ ] 404 for pending/rejected stories

---

## Phase 7 — Search & Filter System
**Status:** `Pending`

### Objectives
- Full-text + faceted search
- URL-query-based filtering (shareable, bookmarkable)
- Fast, mobile-friendly filter UI

### Tasks
- [ ] `src/app/(main)/search/page.tsx`
- [ ] `src/components/search/FilterPanel.tsx`
- [ ] `src/components/search/SearchResults.tsx`
- [ ] `src/app/api/search/route.ts` — query builder with MongoDB
- [ ] Filters: city, budget range, guest count, venue, sort order
- [ ] Pagination (cursor-based or page-based)
- [ ] URL sync for all filter state

### Deliverables
- Search page with all filter types
- Results update on filter change
- URL reflects active filters
- Fast response time

### Checklist
- [ ] All filter params reflected in URL
- [ ] Text search works across story field
- [ ] Price range slider works on mobile
- [ ] Empty state handled gracefully

---

## Phase 8 — Analytics & Statistics
**Status:** `Pending`

### Objectives
- Aggregate stats from approved submissions
- Lightweight charts (no heavy libraries)
- City-based averages, category breakdowns

### Tasks
- [ ] `src/app/(main)/analytics/page.tsx`
- [ ] `src/app/api/analytics/route.ts` — MongoDB aggregation pipeline
- [ ] `src/components/analytics/BarChart.tsx` — lightweight SVG chart
- [ ] `src/components/analytics/StatCard.tsx`
- [ ] Cached aggregations (revalidate every 24h)
- [ ] Metrics: avg cost by city, avg cost/guest, top venues, category breakdown

### Deliverables
- Analytics page with readable charts
- Data cached and fast
- Mobile-readable layouts

### Checklist
- [ ] Charts render on mobile
- [ ] Data aggregation is accurate
- [ ] Cache invalidates when new submission approved
- [ ] No heavy chart library added to bundle

---

## Phase 9 — SEO Optimization
**Status:** `Pending`

### Objectives
- Full SEO implementation across all pages
- Dynamic metadata API
- Sitemap, robots.txt
- Structured data (JSON-LD)
- Canonical URLs

### Tasks
- [ ] `src/app/sitemap.ts` — dynamic sitemap including all story slugs
- [ ] `src/app/robots.ts`
- [ ] `generateMetadata` on all pages
- [ ] JSON-LD structured data on story pages
- [ ] OG image generation (`opengraph-image.tsx`)
- [ ] Canonical URLs in layout
- [ ] `next/og` image for dynamic sharing previews
- [ ] Semantic HTML audit across all components

### Deliverables
- All pages have correct metadata
- sitemap.xml generated
- OG previews work on major platforms
- Structured data validates

### Checklist
- [ ] Lighthouse SEO score ≥ 95
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt present
- [ ] Story pages have correct OG title/description/image

---

## Phase 10 — Performance Optimization & Deployment Prep
**Status:** `Pending`

### Objectives
- Optimize Core Web Vitals
- Bundle size audit and reduction
- Vercel deployment configuration
- Environment variable documentation
- Final QA pass

### Tasks
- [ ] Audit and lazy-load heavy components
- [ ] `next/image` for all images
- [ ] Verify no unused dependencies
- [ ] `next.config.ts` — security headers, image domains
- [ ] Vercel environment variables setup guide
- [ ] `CONTRIBUTING.md` / deployment notes
- [ ] Lighthouse audit on all key pages
- [ ] Test on real mobile device

### Deliverables
- LCP < 2.5s, CLS < 0.1, FID < 100ms
- Bundle size ≤ 150kb JS for homepage
- Vercel deployment working
- All env vars documented

### Checklist
- [ ] Lighthouse Performance ≥ 90 on homepage
- [ ] No layout shift on font load
- [ ] All images optimized
- [ ] Production build succeeds with zero warnings

---

## Workflow Rules

1. Work on **ONE phase at a time**
2. After completing a phase → mark `Pending Review` and **STOP**
3. Wait for user approval before starting next phase
4. User opens a **new chat session** for each phase
5. Once approved → mark `Completed`, proceed to next phase
6. **Never auto-continue** into future phases
