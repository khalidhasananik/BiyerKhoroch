"use client";

import Link from "next/link";
import { formatBDTCompact, timeAgo } from "@/lib/utils/format";
import { useGTM } from "@/hooks/useGTM";
import type { Submission } from "@/types";

interface StoryCardProps {
  submission: Pick<
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
  >;
  variant?: "default" | "featured";
}

export function StoryCard({ submission, variant = "default" }: StoryCardProps) {
  const { trackEvent } = useGTM();
  const {
    slug,
    city,
    guestCount,
    venueName,
    photographyCompany,
    totalCost,
    story,
    createdAt,
  } = submission;

  const snippet = story.length > 120 ? story.slice(0, 120).trimEnd() + "…" : story;

  return (
    <Link
      href={`/story/${slug}`}
      onClick={() => trackEvent({ event: "story_click", story_slug: slug, story_city: city, total_cost: totalCost })}
      className="group block rounded-xl border p-5 transition-colors hover:border-[var(--accent)]"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top row: city + guest count */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: "var(--surface-2)", color: "var(--text)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {city}
        </span>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
          style={{ backgroundColor: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          {guestCount} guests
        </span>
        {variant === "featured" && (
          <span
            className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            Trending
          </span>
        )}
      </div>

      {/* Total cost — prominent */}
      <p
        className="text-2xl font-bold mb-2 tabular-nums transition-colors group-hover:text-[var(--accent)]"
        style={{ color: "var(--text)" }}
      >
        {formatBDTCompact(totalCost)}
      </p>

      {/* Story snippet */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-3"
        style={{ color: "var(--text-muted)" }}
      >
        {snippet}
      </p>

      {/* Bottom meta */}
      <div
        className="flex items-center justify-between text-xs border-t pt-3"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="truncate">🏛 {venueName}</span>
          {photographyCompany && (
            <span className="truncate">📷 {photographyCompany}</span>
          )}
        </div>
        <time
          dateTime={createdAt}
          className="ml-4 shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {timeAgo(createdAt)}
        </time>
      </div>
    </Link>
  );
}
