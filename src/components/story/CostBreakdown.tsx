import { formatBDT } from "@/lib/utils/format";
import type { CostBreakdown } from "@/types";

const COST_LABELS: Record<keyof CostBreakdown, string> = {
  venue: "Venue",
  catering: "Catering / Food",
  photography: "Photography",
  clothing: "Clothing & Attire",
  jewelry: "Jewelry",
  decoration: "Decoration",
  makeup: "Hair & Makeup",
  gateDhora: "Gate Dhora",
  miscellaneous: "Miscellaneous",
};

interface CostBreakdownProps {
  costs: CostBreakdown;
  totalCost: number;
}

export function CostBreakdown({ costs, totalCost }: CostBreakdownProps) {
  const entries = (Object.entries(costs) as [keyof CostBreakdown, number][])
    .filter(([, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Cost Breakdown
        </h3>
      </div>

      <div style={{ backgroundColor: "var(--bg)" }}>
        {entries.map(([key, amount]) => {
          const pct = totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
          return (
            <div
              key={key}
              className="px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {COST_LABELS[key]}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {pct}%
                  </span>
                  <span
                    className="text-sm font-medium tabular-nums"
                    style={{ color: "var(--text)" }}
                  >
                    {formatBDT(amount)}
                  </span>
                </div>
              </div>
              <div
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--surface-2)" }}
              >
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "var(--accent)",
                    opacity: 0.75,
                  }}
                />
              </div>
            </div>
          );
        })}

        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Total
          </span>
          <span
            className="text-base font-bold tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            {formatBDT(totalCost)}
          </span>
        </div>
      </div>
    </div>
  );
}
