import Link from "next/link";
import { formatBDT, formatBDTCompact, timeAgo } from "@/lib/utils/format";
import { CostBreakdown } from "./CostBreakdown";
import { ShareButtons } from "./ShareButtons";
import type { Submission } from "@/types";

interface StoryDetailProps {
  story: Submission;
  shareUrl: string;
}

export function StoryDetail({ story, shareUrl }: StoryDetailProps) {
  const {
    city,
    weddingYear,
    guestCount,
    venueName,
    photographyCompany,
    costs,
    totalCost,
    story: storyText,
    createdAt,
  } = story;

  const costPerGuest = guestCount > 0 ? Math.round(totalCost / guestCount) : 0;
  const shareTitle = `${city} wedding · ${guestCount} guests · ${formatBDTCompact(totalCost)} — BiyerKahini`;

  return (
    <article>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/search" className="hover:text-[var(--accent)] transition-colors">Stories</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--text)" }}>{city}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {city}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
            style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {guestCount} guests
          </span>
          {weddingYear && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
              style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {weddingYear}
            </span>
          )}
          <time
            dateTime={createdAt}
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {timeAgo(createdAt)}
          </time>
        </div>

        {/* Total cost — hero number */}
        <p
          className="text-4xl md:text-5xl font-bold tabular-nums mb-2"
          style={{ color: "var(--text)" }}
        >
          {formatBDT(totalCost)}
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {formatBDTCompact(costPerGuest)} per guest
        </p>

        {/* Venue info */}
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{venueName}</span>
          </div>
          {photographyCompany && (
            <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>{photographyCompany}</span>
            </div>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="border-t mb-8" style={{ borderColor: "var(--border)" }} />

      {/* Story text */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: "var(--text-muted)" }}>
          Their Story
        </h2>
        <div
          className="text-base leading-loose whitespace-pre-line"
          style={{ color: "var(--text)" }}
        >
          {storyText}
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="mb-10">
        <CostBreakdown costs={costs} totalCost={totalCost} />
      </section>

      {/* Divider */}
      <div className="border-t mb-8" style={{ borderColor: "var(--border)" }} />

      {/* Share */}
      <section className="mb-4">
        <ShareButtons url={shareUrl} title={shareTitle} />
      </section>

      {/* CTA */}
      <div
        className="mt-8 rounded-xl border p-5"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
          Had a wedding? Share yours anonymously.
        </p>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Help the next couple plan better — and maybe laugh about the parts that went sideways.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: "var(--accent)", color: "#fff" }}
        >
          Share your cost
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
