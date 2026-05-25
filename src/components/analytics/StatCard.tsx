interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-1"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>
        {value}
      </span>
      {sub && (
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}
