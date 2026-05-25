/**
 * Formats a BDT amount using Bangladeshi comma grouping (en-IN locale).
 * e.g. 1250000 → "৳ 12,50,000"
 */
export function formatBDT(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `৳ ${formatted}`;
}

/**
 * Compact format for display in cards.
 * e.g. 1250000 → "৳12.5L"  |  250000 → "৳2.5L"  |  9800000 → "৳98L"
 */
export function formatBDTCompact(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `৳${(amount / 1_00_00_000).toFixed(1).replace(/\.0$/, "")}Cr`;
  }
  if (amount >= 1_00_000) {
    return `৳${(amount / 1_00_000).toFixed(1).replace(/\.0$/, "")}L`;
  }
  return `৳${new Intl.NumberFormat("en-IN").format(amount)}`;
}

/**
 * Returns a relative time string.
 * e.g. "3 days ago", "2 months ago"
 */
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}
