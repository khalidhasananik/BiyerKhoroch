import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/story/StoryCard";
import { formatBDTCompact } from "@/lib/utils/format";
import { searchStories } from "@/lib/data/stories";
import { getAnalytics } from "@/lib/data/analytics";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [latestResult, trendingResult, analytics] = await Promise.all([
    searchStories({ sort: "latest", page: "1" }),
    searchStories({ sort: "highest", page: "1" }),
    getAnalytics(),
  ]);

  const latest = latestResult.data.slice(0, 6);
  const trending = trendingResult.data.slice(0, 3);

  const stats = [
    { label: "Weddings shared", value: analytics.totalSubmissions > 0 ? String(analytics.totalSubmissions) : "—" },
    { label: "Average total cost", value: analytics.avgTotalCost > 0 ? formatBDTCompact(analytics.avgTotalCost) : "—" },
    { label: "Cities covered", value: analytics.citiesRepresented > 0 ? String(analytics.citiesRepresented) : "—" },
    { label: "Avg per guest", value: analytics.avgCostPerGuest > 0 ? formatBDTCompact(analytics.avgCostPerGuest) : "—" },
  ];

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
            {stats.map(({ label, value }) => (
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
            href="/search?sort=highest"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            See all →
          </Link>
        </div>

        {trending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((s) => (
              <StoryCard key={s._id} submission={s} variant="featured" />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl border py-16 text-center"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <p className="text-base font-medium mb-2" style={{ color: "var(--text)" }}>
              No stories yet
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Be the first to share your wedding costs anonymously.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Share Your Story
            </Link>
          </div>
        )}
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

          {latest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((s) => (
                <StoryCard key={s._id} submission={s} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl border py-16 text-center"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-base font-medium mb-2" style={{ color: "var(--text)" }}>
                No submissions yet
              </p>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                Stories appear here once approved. Share yours to get started.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                Share Your Wedding Cost
              </Link>
            </div>
          )}
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
