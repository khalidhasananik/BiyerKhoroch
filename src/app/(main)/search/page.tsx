import { Suspense } from "react";
import type { Metadata } from "next";
import { FilterPanel } from "@/components/search/FilterPanel";
import { SearchResults } from "@/components/search/SearchResults";
import {
  searchStories,
  getDistinctCities,
  type SearchStoryParams,
} from "@/lib/data/stories";

export const metadata: Metadata = {
  title: "Browse Wedding Stories | BiyerKhoroch",
  description:
    "Search and filter real Bangladeshi wedding cost breakdowns. Filter by city, budget, guest count, and more.",
  alternates: { canonical: "/search" },
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function SearchResultsSkeleton() {
  return (
    <>
      <div className="h-4 w-40 rounded mb-5" style={{ backgroundColor: "var(--surface-2)" }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border p-5 animate-pulse"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-16 rounded-full" style={{ backgroundColor: "var(--surface-2)" }} />
              <div className="h-5 w-20 rounded-full" style={{ backgroundColor: "var(--surface-2)" }} />
            </div>
            <div className="h-7 w-28 rounded mb-2"   style={{ backgroundColor: "var(--surface-2)" }} />
            <div className="space-y-1.5 mb-4">
              <div className="h-3 w-full  rounded"   style={{ backgroundColor: "var(--surface-2)" }} />
              <div className="h-3 w-4/5   rounded"   style={{ backgroundColor: "var(--surface-2)" }} />
              <div className="h-3 w-3/5   rounded"   style={{ backgroundColor: "var(--surface-2)" }} />
            </div>
            <div className="h-px mb-3" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex justify-between">
              <div className="h-3 w-32 rounded" style={{ backgroundColor: "var(--surface-2)" }} />
              <div className="h-3 w-16 rounded" style={{ backgroundColor: "var(--surface-2)" }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Async results section (streamed independently from FilterPanel) ───────────

async function ResultsSection({ params }: { params: SearchStoryParams }) {
  const { data, total, page, hasMore } = await searchStories(params);

  const currentParams: Record<string, string> = {};
  if (params.q)         currentParams.q         = params.q;
  if (params.city)      currentParams.city      = params.city;
  if (params.sort)      currentParams.sort      = params.sort;
  if (params.minCost)   currentParams.minCost   = params.minCost;
  if (params.maxCost)   currentParams.maxCost   = params.maxCost;
  if (params.minGuests) currentParams.minGuests = params.minGuests;
  if (params.maxGuests) currentParams.maxGuests = params.maxGuests;

  return (
    <SearchResults
      data={data}
      total={total}
      page={page}
      hasMore={hasMore}
      currentParams={currentParams}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    city?: string;
    sort?: string;
    minCost?: string;
    maxCost?: string;
    minGuests?: string;
    maxGuests?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const cities = await getDistinctCities();

  // Unique key forces Suspense to remount (and show skeleton) when params change
  const suspenseKey = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null)
    ) as Record<string, string>
  ).toString();

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
            Browse Stories
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Real wedding costs from couples across Bangladesh.
          </p>
        </div>

        {/* FilterPanel stays mounted through navigations (client component) */}
        <FilterPanel cities={cities} />

        {/* Results re-fetch on param change; skeleton shows during transition */}
        <Suspense key={suspenseKey} fallback={<SearchResultsSkeleton />}>
          <ResultsSection params={params} />
        </Suspense>
      </div>
    </main>
  );
}
