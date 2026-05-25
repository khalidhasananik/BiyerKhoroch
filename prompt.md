# prompt.md

You are a senior full-stack engineer and system architect helping build a production-ready anonymous wedding cost sharing platform called "BiyerKhoroch".

The goal of the platform is to allow people in Bangladesh to anonymously share real wedding expenses along with stories/confessions/reviews about their wedding experience.

The platform should feel like a mix of:

* Reddit confession/community platform
* wedding storytelling platform
* expense transparency database
* slightly funny and culturally relatable deshi experience

The tone should balance:

* clean modern UI
* emotional storytelling
* funny/social/internet-native vibes

---

# Core Tech Stack

Frontend:

* Next.js (latest stable App Router)
* Tailwind CSS
* TypeScript

Backend:

* Next.js server actions / route handlers

Database:

* MongoDB with Mongoose

Deployment:

* Vercel

Typography:

* Inter only

Theme:

* Light mode + dark mode support

Performance:

* Extremely fast loading
* Avoid heavy animations
* Avoid unnecessary libraries
* Focus on Core Web Vitals
* Lazy load where appropriate
* Use optimized images
* Keep bundle size small

---

# Color System (60-30-10 Rule)

Primary Brand Color:

* Pink

Use the 60-30-10 design rule:

* 60% neutral backgrounds
* 30% secondary soft tones
* 10% pink accent/highlight color

Design should NOT feel overly feminine or wedding-card styled.

Avoid:

* cheesy gradients
* excessive shadows
* glassmorphism
* flashy animations

Preferred aesthetic:

* minimal
* modern
* slightly Reddit-inspired
* highly readable
* content-focused

---

# Platform Features

Users can anonymously submit wedding expenses.

NO LOGIN OR SIGNUP SYSTEM.

Everything is anonymous.

Submissions remain permanent unless removed by admin.

All submissions require admin approval before public visibility.

---

# Submission Fields

Required fields:

* city
* guest count
* venue name
* venue cost
* catering/food cost
* photography company name
* photography cost
* clothing cost
* jewelry cost
* decoration cost
* makeup cost
* gate dhora cost
* miscellaneous expenses
* review/story/confession

Optional:

* total wedding cost override

System behavior:

* automatically calculate total wedding cost
* but allow manual override

Future-ready architecture:

* image uploads will be added later
* structure database and components accordingly

---

# Main Pages

## Homepage

Homepage should prioritize:

* latest submissions
* trending/funny stories
* featured confessions
* recent wedding costs

Homepage sections:

* hero section
* trending stories
* latest submissions feed
* statistics preview
* CTA section
* footer

---

## Submission Page

Anonymous form submission page.

Requirements:

* mobile-first responsive design
* validation
* anti-spam protection
* profanity filtering capability
* autosave draft locally
* loading states
* success/error handling

Anti-spam implementation:

* rate limiting
* honeypot field
* Cloudflare Turnstile-ready architecture

---

## Story Detail Page

Individual SEO-friendly pages for each submission.

Requirements:

* slug-based URLs
* metadata generation
* OpenGraph tags
* share-friendly previews
* structured typography
* readable layout

---

## Search & Filter System

Implement advanced filtering/search.

Search parameters should include:

* city
* venue name
* photography company
* budget range
* guest count range
* total wedding cost
* wedding size
* keyword search in story/confession
* funniest stories
* latest stories
* highest cost weddings
* lowest cost weddings

Filters should be:

* fast
* mobile-friendly
* URL-query based
* SEO-friendly

---

# Analytics & Statistics

Create analytics/statistics pages.

Examples:

* average wedding cost by city
* average cost per guest
* highest spending categories
* average decoration cost
* average food cost
* median wedding budget
* most expensive venues
* budget breakdown trends

Use lightweight charts only.

Prioritize readability over visual complexity.

---

# Admin System

Create a lightweight admin panel.

Requirements:

* protected admin route
* simple password auth
* approve/reject submissions
* delete inappropriate submissions
* moderation queue
* dashboard stats

DO NOT build a full authentication system.

Keep admin lightweight and secure.

---

# SEO Requirements

SEO is extremely important.

Implement:

* metadata API
* dynamic metadata
* sitemap.xml
* robots.txt
* canonical URLs
* OpenGraph tags
* Twitter cards
* semantic HTML
* structured data where appropriate
* optimized page titles/descriptions

Pages must be indexable and shareable.

---

# Database Design

Design scalable MongoDB schemas.

Collections may include:

* submissions
* moderation queue
* admin logs
* analytics cache

Submission schema should be optimized for:

* filtering
* sorting
* searching
* future image uploads

Add proper indexes.

---

# Responsive Requirements

The site must work perfectly on:

* mobile
* tablet
* desktop
* ultrawide screens

Prioritize mobile UX first.

---

# Accessibility

Implement:

* keyboard navigation
* aria labels
* semantic HTML
* proper contrast ratios
* reduced motion support

---

# Code Quality Requirements

Use:

* reusable components
* proper folder architecture
* clean TypeScript typing
* scalable architecture
* environment variables properly
* modular code
* server/client component separation

Avoid:

* monolithic components
* duplicated logic
* unnecessary dependencies

---

# Important Development Workflow

VERY IMPORTANT:

You MUST divide the entire project into AT LEAST 10 development phases.

Create a file called:

* CLAUDE.md

Inside CLAUDE.md:

* list all development phases
* each phase must have:

  * objectives
  * tasks
  * expected deliverables
  * checklist
  * approval status

Workflow rules:

1. Only work on ONE phase at a time
2. After completing a phase, STOP
3. Mark that phase as:

   * "Pending Review"
4. Wait for my approval
5. I will open a NEW CHAT SESSION for each phase
6. Once approved, mark the phase as:

   * "Completed"
7. Then proceed to the next phase only

Claude must NEVER continue automatically into future phases without approval.

---

# Example Phase Structure

Phase 1:

* project setup
* folder structure
* Tailwind setup
* theme system
* MongoDB connection
* base layout

Phase 2:

* homepage UI
* responsive feed cards
* navbar/footer

Phase 3:

* submission form
* validation
* anti-spam setup

Phase 4:

* backend submission handling
* database schema

Phase 5:

* moderation/admin system

Phase 6:

* story detail pages

Phase 7:

* search/filter system

Phase 8:

* analytics/statistics

Phase 9:

* SEO optimization

Phase 10:

* performance optimization
* testing
* deployment prep

Add more phases if necessary.

---

# Development Style

While coding:

* explain architecture decisions briefly
* keep commits logically separated
* prioritize maintainability
* avoid overengineering
* keep UI clean and fast
* optimize for real-world production use

The codebase should feel like:

* scalable startup MVP
* modern production-ready app
* optimized for future growth

---

# Final Goal

Build a fast, modern, anonymous wedding-cost storytelling platform optimized for:

* relatability
* social sharing
* transparency
* storytelling
* performance
* SEO
* mobile usage

The platform should feel authentic to Bangladeshi internet culture while still looking modern and globally polished.
