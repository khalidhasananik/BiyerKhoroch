import Link from "next/link";
import { StoryCard } from "@/components/story/StoryCard";
import type { Submission } from "@/types";

interface SearchResultsProps {
  data: Submission[];
  total: number;
  page: number;
  hasMore: boolean;
  currentParams: Record<string, string>;
}

function buildPageUrl(currentParams: Record<string, string>, targetPage: number): string {
  const params = new URLSearchParams(currentParams);
  if (targetPage <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(targetPage));
  }
  const qs = params.toString();
  return `/search${qs ? `?${qs}` : ""}`;
}

export function SearchResults({
  data,
  total,
  page,
  hasMore,
  currentParams,
}: SearchResultsProps) {
  const startIdx = (page - 1) * 12 + 1;
  const endIdx   = Math.min(page * 12, total);

  if (data.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4" role="img" aria-label="magnifying glass">🔍</p>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
          No stories found
        </h3>
        <p
          className="text-sm max-w-xs mx-auto mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Try adjusting your filters or search term to see more results.
        </p>
        <Link
          href="/search"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--accent)" }}
        >
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Results count */}
      <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
        Showing {startIdx}–{endIdx} of {total.toLocaleString()} {total === 1 ? "result" : "results"}
      </p>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.map((submission) => (
          <StoryCard key={submission._id} submission={submission} />
        ))}
      </div>

      {/* Pagination */}
      {(page > 1 || hasMore) && (
        <div className="flex items-center justify-between">
          {page > 1 ? (
            <Link
              href={buildPageUrl(currentParams, page - 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--surface)",
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </Link>
          ) : (
            <div />
          )}

          <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
            Page {page} · {total.toLocaleString()} total
          </span>

          {hasMore ? (
            <Link
              href={buildPageUrl(currentParams, page + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--surface)",
              }}
            >
              Next
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
}
