import type { Metadata } from "next";
import { getAnalytics } from "@/lib/data/analytics";
import { StatCard } from "@/components/analytics/StatCard";
import { BarChart } from "@/components/analytics/BarChart";
import { formatBDT, formatBDTCompact } from "@/lib/utils/format";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Wedding Cost Analytics | BiyerKhoroch",
  description:
    "Real data from Bangladeshi weddings — average costs by city, venue spending, category breakdowns, and more.",
  alternates: { canonical: "/analytics" },
};

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  const isEmpty = data.totalSubmissions === 0;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* ── Header ── */}
      <section
        className="border-b py-10 px-4"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
            Real Data
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Wedding Cost Analytics
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            Aggregated from {data.totalSubmissions} approved wedding cost report{data.totalSubmissions !== 1 ? "s" : ""}.
            {data.totalSubmissions > 0 && " Updated every 24 hours."}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {isEmpty ? (
          /* ── Empty state ── */
          <div
            className="rounded-2xl border p-16 text-center"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <p className="text-4xl mb-4">📊</p>
            <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
              No data yet
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Analytics will appear once wedding stories are approved. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* ── Summary stats ── */}
            <section>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  label="Total Stories"
                  value={String(data.totalSubmissions)}
                  sub="approved submissions"
                />
                <StatCard
                  label="Avg Wedding Cost"
                  value={formatBDTCompact(data.avgTotalCost)}
                  sub={formatBDT(data.avgTotalCost)}
                />
                <StatCard
                  label="Avg Cost per Guest"
                  value={formatBDTCompact(data.avgCostPerGuest)}
                  sub={formatBDT(data.avgCostPerGuest)}
                />
                <StatCard
                  label="Cities"
                  value={String(data.citiesRepresented)}
                  sub="represented"
                />
              </div>
            </section>

            {/* ── By city ── */}
            {data.byCityStats.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Average Cost by City
                </h2>
                <BarChart
                  title={`Top ${data.byCityStats.length} cities by number of submissions`}
                  data={data.byCityStats.map((c) => ({
                    label: c.city,
                    value: c.avgCost,
                  }))}
                  formatValue={formatBDTCompact}
                />
              </section>
            )}

            {/* ── Category breakdown ── */}
            {data.categoryAvgs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Average Spend by Category
                </h2>
                <BarChart
                  title="Mean cost per expense category across all weddings"
                  data={data.categoryAvgs.map((c) => ({
                    label: c.label,
                    value: c.avgAmount,
                  }))}
                  formatValue={formatBDTCompact}
                />
              </section>
            )}

            {/* ── Top venues ── */}
            {data.topVenues.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Most Popular Venues
                </h2>
                <div
                  className="rounded-2xl border divide-y overflow-hidden"
                  style={{ borderColor: "var(--border)" }}
                >
                  {data.topVenues.map((v, i) => (
                    <div
                      key={v.venue}
                      className="flex items-center justify-between px-5 py-3"
                      style={{ backgroundColor: "var(--surface)" }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="text-xs font-bold w-5 text-center shrink-0"
                          style={{ color: i === 0 ? "var(--accent)" : "var(--text-muted)" }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text)" }}
                        >
                          {v.venue}
                        </span>
                      </div>
                      <span
                        className="text-xs shrink-0 ml-4 tabular-nums"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {v.count} wedding{v.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Disclaimer ── */}
            <p className="text-xs pb-4" style={{ color: "var(--text-muted)" }}>
              All figures are averages computed from anonymously submitted data. Individual
              wedding costs vary widely based on family size, preferences, and region.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
