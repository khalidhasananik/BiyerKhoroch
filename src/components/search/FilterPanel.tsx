"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatBDTCompact } from "@/lib/utils/format";

const DEFAULT_CITIES = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna",
  "Barisal", "Rangpur", "Mymensingh", "Comilla", "Narayanganj",
  "Gazipur", "Cox's Bazar", "Jessore", "Bogra",
];

const SORT_OPTIONS = [
  { value: "latest",   label: "Latest" },
  { value: "oldest",   label: "Oldest" },
  { value: "highest",  label: "Highest Cost" },
  { value: "lowest",   label: "Lowest Cost" },
  { value: "funniest", label: "Most Dramatic" },
];

const BUDGET_PRESETS = [
  { label: "Under ৳5L",  min: "",        max: "500000"  },
  { label: "৳5L–৳15L",  min: "500000",  max: "1500000" },
  { label: "৳15L–৳30L", min: "1500000", max: "3000000" },
  { label: "৳30L–৳50L", min: "3000000", max: "5000000" },
  { label: "Over ৳50L",  min: "5000000", max: ""        },
];

const GUEST_PRESETS = [
  { label: "Under 100",  min: "",    max: "100" },
  { label: "100–300",    min: "100", max: "300" },
  { label: "300–500",    min: "300", max: "500" },
  { label: "500+",       min: "500", max: ""    },
];

interface FilterPanelProps {
  cities: string[];
}

export function FilterPanel({ cities }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [q,         setQ]         = useState(searchParams.get("q")         ?? "");
  const [city,      setCity]      = useState(searchParams.get("city")      ?? "");
  const [sort,      setSort]      = useState(searchParams.get("sort")      ?? "latest");
  const [minCost,   setMinCost]   = useState(searchParams.get("minCost")   ?? "");
  const [maxCost,   setMaxCost]   = useState(searchParams.get("maxCost")   ?? "");
  const [minGuests, setMinGuests] = useState(searchParams.get("minGuests") ?? "");
  const [maxGuests, setMaxGuests] = useState(searchParams.get("maxGuests") ?? "");

  // Ref captures current values so the debounce callback never has stale closures
  const vals = useRef({ q, city, sort, minCost, maxCost, minGuests, maxGuests });
  vals.current = { q, city, sort, minCost, maxCost, minGuests, maxGuests };

  const pushUrl = useCallback(
    (overrides: Partial<typeof vals.current & { page: string }> = {}) => {
      const v = { ...vals.current, ...overrides };
      const params = new URLSearchParams();
      if (v.q)         params.set("q",         v.q);
      if (v.city)      params.set("city",      v.city);
      if (v.sort && v.sort !== "latest") params.set("sort", v.sort);
      if (v.minCost)   params.set("minCost",   v.minCost);
      if (v.maxCost)   params.set("maxCost",   v.maxCost);
      if (v.minGuests) params.set("minGuests", v.minGuests);
      if (v.maxGuests) params.set("maxGuests", v.maxGuests);
      // page intentionally reset to 1 on filter change (not passed through)
      startTransition(() => router.push(`/search?${params.toString()}`));
    },
    [router]
  );

  // Sync URL → local state on browser back/forward navigation
  useEffect(() => {
    setQ(         searchParams.get("q")         ?? "");
    setCity(      searchParams.get("city")      ?? "");
    setSort(      searchParams.get("sort")      ?? "latest");
    setMinCost(   searchParams.get("minCost")   ?? "");
    setMaxCost(   searchParams.get("maxCost")   ?? "");
    setMinGuests( searchParams.get("minGuests") ?? "");
    setMaxGuests( searchParams.get("maxGuests") ?? "");
  }, [searchParams]);

  // Debounced text search
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleQueryChange = (value: string) => {
    setQ(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => pushUrl({ q: value }), 400);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    pushUrl({ city: value });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    pushUrl({ sort: value });
  };

  const applyBudgetPreset = (min: string, max: string) => {
    setMinCost(min);
    setMaxCost(max);
    pushUrl({ minCost: min, maxCost: max });
  };

  const applyGuestPreset = (min: string, max: string) => {
    setMinGuests(min);
    setMaxGuests(max);
    pushUrl({ minGuests: min, maxGuests: max });
  };

  const applyRangeFilters = () => {
    pushUrl({ minCost, maxCost, minGuests, maxGuests });
  };

  const clearAll = () => {
    setQ(""); setCity(""); setSort("latest");
    setMinCost(""); setMaxCost(""); setMinGuests(""); setMaxGuests("");
    startTransition(() => router.push("/search"));
  };

  const hasFilters = !!(q || city || minCost || maxCost || minGuests || maxGuests || sort !== "latest");
  const hasRangeFilters = !!(minCost || maxCost || minGuests || maxGuests);
  const displayCities = cities.length > 0 ? cities : DEFAULT_CITIES;

  const costChipLabel = (): string | null => {
    if (minCost && maxCost)
      return `${formatBDTCompact(parseInt(minCost))}–${formatBDTCompact(parseInt(maxCost))}`;
    if (minCost) return `From ${formatBDTCompact(parseInt(minCost))}`;
    if (maxCost) return `Up to ${formatBDTCompact(parseInt(maxCost))}`;
    return null;
  };

  const guestChipLabel = (): string | null => {
    if (minGuests && maxGuests) return `${minGuests}–${maxGuests} guests`;
    if (minGuests) return `${minGuests}+ guests`;
    if (maxGuests) return `Up to ${maxGuests} guests`;
    return null;
  };

  return (
    <div className="mb-6">
      {/* ── Main filter bar ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-0">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "var(--text-muted)" }}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search stories, venues, cities…"
            value={q}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:border-[var(--accent)]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div
                className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
              />
            </div>
          )}
        </div>

        {/* City select */}
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:border-[var(--accent)] cursor-pointer"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: city ? "var(--text)" : "var(--text-muted)",
          }}
        >
          <option value="">All Cities</option>
          {displayCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Sort select */}
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:border-[var(--accent)] cursor-pointer"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* More filters toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm whitespace-nowrap transition-colors hover:border-[var(--accent)]"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: showAdvanced ? "var(--accent)" : "var(--border)",
            color: showAdvanced ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6"  x2="20" y2="6"  />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>
          Filters
          {hasRangeFilters && (
            <span
              className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold leading-none"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              {[minCost || maxCost, minGuests || maxGuests].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* ── Advanced filters panel ────────────────────────── */}
      {showAdvanced && (
        <div
          className="rounded-xl border p-5 mb-3"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Budget range */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Budget Range
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {BUDGET_PRESETS.map((preset) => {
                  const active = minCost === preset.min && maxCost === preset.max;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyBudgetPreset(preset.min, preset.max)}
                      className="px-2.5 py-1 rounded-full text-xs border transition-colors"
                      style={{
                        backgroundColor: active ? "var(--accent)" : "var(--surface-2)",
                        borderColor:     active ? "var(--accent)" : "var(--border)",
                        color:           active ? "#fff"          : "var(--text-muted)",
                      }}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min ৳"
                  value={minCost}
                  onChange={(e) => setMinCost(e.target.value)}
                  min={0}
                  className="flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                />
                <span style={{ color: "var(--text-muted)" }}>–</span>
                <input
                  type="number"
                  placeholder="Max ৳"
                  value={maxCost}
                  onChange={(e) => setMaxCost(e.target.value)}
                  min={0}
                  className="flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
            </div>

            {/* Guest count range */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Guest Count
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {GUEST_PRESETS.map((preset) => {
                  const active = minGuests === preset.min && maxGuests === preset.max;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyGuestPreset(preset.min, preset.max)}
                      className="px-2.5 py-1 rounded-full text-xs border transition-colors"
                      style={{
                        backgroundColor: active ? "var(--accent)" : "var(--surface-2)",
                        borderColor:     active ? "var(--accent)" : "var(--border)",
                        color:           active ? "#fff"          : "var(--text-muted)",
                      }}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minGuests}
                  onChange={(e) => setMinGuests(e.target.value)}
                  min={1}
                  className="flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                />
                <span style={{ color: "var(--text-muted)" }}>–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  min={1}
                  className="flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
            </div>
          </div>

          <div
            className="flex justify-end gap-2 mt-5 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => {
                setMinCost(""); setMaxCost(""); setMinGuests(""); setMaxGuests("");
                pushUrl({ minCost: "", maxCost: "", minGuests: "", maxGuests: "" });
              }}
              className="px-3 py-1.5 text-xs rounded-lg border transition-colors hover:border-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--surface)",
              }}
            >
              Clear range
            </button>
            <button
              type="button"
              onClick={applyRangeFilters}
              className="px-4 py-1.5 text-xs rounded-lg font-medium transition-colors"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* ── Active filter chips ───────────────────────────── */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {q && (
            <FilterChip
              label={`"${q}"`}
              onRemove={() => { setQ(""); pushUrl({ q: "" }); }}
            />
          )}
          {city && (
            <FilterChip
              label={city}
              onRemove={() => handleCityChange("")}
            />
          )}
          {costChipLabel() && (
            <FilterChip
              label={costChipLabel()!}
              onRemove={() => { setMinCost(""); setMaxCost(""); pushUrl({ minCost: "", maxCost: "" }); }}
            />
          )}
          {guestChipLabel() && (
            <FilterChip
              label={guestChipLabel()!}
              onRemove={() => { setMinGuests(""); setMaxGuests(""); pushUrl({ minGuests: "", maxGuests: "" }); }}
            />
          )}
          {sort !== "latest" && (
            <FilterChip
              label={SORT_OPTIONS.find((o) => o.value === sort)?.label ?? sort}
              onRemove={() => handleSortChange("latest")}
            />
          )}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border"
      style={{
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="transition-colors hover:text-[var(--accent)]"
        aria-label={`Remove ${label} filter`}
      >
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </svg>
      </button>
    </span>
  );
}
