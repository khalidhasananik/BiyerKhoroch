import Link from "next/link";
import { StoryCard } from "@/components/story/StoryCard";
import { formatBDT, formatBDTCompact } from "@/lib/utils/format";
import type { Submission } from "@/types";

// ─── Placeholder data (replaced by DB in Phase 4) ────────────────────────────

const PLACEHOLDER_STORIES: Pick<
  Submission,
  | "_id"
  | "slug"
  | "city"
  | "guestCount"
  | "venueName"
  | "photographyCompany"
  | "totalCost"
  | "story"
  | "createdAt"
>[] = [
  {
    _id: "1",
    slug: "dhaka-wedding-bashundhara-2024",
    city: "Dhaka",
    guestCount: 600,
    venueName: "Bashundhara Convention City",
    photographyCompany: "Lens & Light Studio",
    totalCost: 1850000,
    story:
      "We thought ৳20 lakh was enough. We were wrong. The gate dhora alone cost more than our photography package. Our relatives showed up with 80 extra guests nobody told us about. The biryani ran out by 8pm. Would do it again, somehow.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    slug: "chittagong-wedding-radisson-2024",
    city: "Chittagong",
    guestCount: 400,
    venueName: "Radisson Blu Chittagong",
    photographyCompany: "Moments by Farhan",
    totalCost: 2400000,
    story:
      "Planned for 400 guests, fed 550. My father-in-law invited the entire neighbourhood without telling anyone. Decoration was supposed to be simple — ended up being a full-on floral chaos. No regrets, photos were stunning.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "3",
    slug: "sylhet-wedding-rose-view-2024",
    city: "Sylhet",
    guestCount: 250,
    venueName: "Rose View Hotel",
    photographyCompany: "Captured Moments BD",
    totalCost: 980000,
    story:
      "We kept it small and honest. Sylheti family weddings have a reputation for going overboard — we refused to. Under ৳10 lakh, 250 guests, everyone ate well. My nana cried. Total success.",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "4",
    slug: "dhaka-wedding-hotel-intercontinental-2024",
    city: "Dhaka",
    guestCount: 800,
    venueName: "Hotel InterContinental",
    photographyCompany: "Wedding Diaries BD",
    totalCost: 4200000,
    story:
      "৳42 lakh and my mother still asks why the sweets weren't good enough. We had international catering, live ghazal, 800 guests — and the photographer's memory card corrupted. We only have 200 photos from our own wedding.",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "5",
    slug: "rajshahi-wedding-nice-garden-2024",
    city: "Rajshahi",
    guestCount: 300,
    venueName: "Nice Garden Banquet",
    photographyCompany: "Al-Amin Photography",
    totalCost: 620000,
    story:
      "Rajshahi biye — clean, warm, simple. The mango tree in the garden made the photos incredible. Spent most of the budget on food because that is the right priority. Zero drama, maximum misti paan.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "6",
    slug: "khulna-wedding-city-inn-2024",
    city: "Khulna",
    guestCount: 450,
    venueName: "City Inn Banquet Hall",
    photographyCompany: "Shutter Story KHL",
    totalCost: 1150000,
    story:
      "Everything went fine until the power went out during the ring ceremony. Generator kicked in after 8 minutes of complete darkness and panicked aunties. My husband still says it was 'romantic'. It was not romantic.",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const TRENDING = PLACEHOLDER_STORIES.slice(0, 3);
const LATEST = PLACEHOLDER_STORIES;

// ─── Stats strip data ─────────────────────────────────────────────────────────

const STATS = [
  { label: "Weddings shared", value: "247" },
  { label: "Average total cost", value: formatBDTCompact(1_850_000) },
  { label: "Cities covered", value: "42" },
  { label: "Avg per guest", value: formatBDTCompact(3_800) },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-6 border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              🇧🇩 Anonymous · Free · No Login Required
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
              style={{ color: "var(--text)" }}
            >
              Real wedding costs.{" "}
              <span style={{ color: "var(--accent)" }}>Real stories.</span>{" "}
              No filter.
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Bangladeshi weddings are expensive. But how much, exactly? Browse
              anonymous cost breakdowns and confessions from real couples across
              Dhaka, Chittagong, Sylhet, and beyond.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                Browse Stories
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Share Yours (free)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section
        className="border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x"
            style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}
          >
            {STATS.map(({ label, value }) => (
              <div key={label} className="px-0 md:px-6 first:pl-0 last:pr-0 flex flex-col gap-0.5">
                <dt
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </dt>
                <dd
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: "var(--text)" }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Trending stories ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            Trending Stories
          </h2>
          <Link
            href="/search?sort=funniest"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRENDING.map((s) => (
            <StoryCard key={s._id} submission={s} variant="featured" />
          ))}
        </div>
      </section>

      {/* ── Latest feed ──────────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
              Latest Submissions
            </h2>
            <Link
              href="/search?sort=latest"
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Browse all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LATEST.map((s) => (
              <StoryCard key={s._id} submission={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--text)" }}
          >
            Had a wedding recently?
          </h2>
          <p
            className="text-base mb-8 max-w-lg mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Share your real costs and story anonymously. Help the next couple
            plan better — and maybe laugh about the parts that went sideways.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            Share Your Wedding Cost
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            100% anonymous · No account needed · Free forever
          </p>
        </div>
      </section>
    </main>
  );
}
