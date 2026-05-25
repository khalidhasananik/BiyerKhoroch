interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartItem[];
  formatValue?: (v: number) => string;
  title?: string;
}

const ROW_H   = 40;
const LABEL_W = 148;
const BAR_GAP = 8;
const VIEW_W  = 560;

export function BarChart({ data, formatValue, title }: BarChartProps) {
  if (!data.length) return null;

  const fmt = formatValue ?? String;
  const max = Math.max(...data.map((d) => d.value));
  const barAreaW = VIEW_W - LABEL_W - 4;
  const svgH = data.length * ROW_H + BAR_GAP;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {title && (
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${svgH}`}
          width="100%"
          style={{ display: "block", minWidth: 260 }}
          aria-label={title ?? "Bar chart"}
          role="img"
        >
          {data.map((item, i) => {
            const y       = i * ROW_H + BAR_GAP / 2;
            const barW    = max > 0 ? Math.round((item.value / max) * (barAreaW - 80)) : 0;
            const barH    = 20;
            const barY    = y + (ROW_H - barH) / 2;
            const barX    = LABEL_W;
            const valX    = barX + barW + 6;
            const isFirst = i === 0;

            return (
              <g key={item.label}>
                {/* label */}
                <text
                  x={LABEL_W - 10}
                  y={y + ROW_H / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fontFamily="inherit"
                  fill="var(--text-muted)"
                >
                  {item.label.length > 16 ? item.label.slice(0, 14) + "…" : item.label}
                </text>

                {/* track */}
                <rect
                  x={barX}
                  y={barY}
                  width={barAreaW - 80}
                  height={barH}
                  rx={4}
                  fill="var(--surface-2)"
                />

                {/* bar */}
                {barW > 0 && (
                  <rect
                    x={barX}
                    y={barY}
                    width={barW}
                    height={barH}
                    rx={4}
                    fill={isFirst ? "var(--accent)" : "var(--accent)"}
                    opacity={isFirst ? 1 : 0.55 + (1 - i / data.length) * 0.45}
                  />
                )}

                {/* value */}
                <text
                  x={valX}
                  y={y + ROW_H / 2}
                  dominantBaseline="middle"
                  fontSize={10}
                  fontFamily="inherit"
                  fill="var(--text-muted)"
                >
                  {fmt(item.value)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
