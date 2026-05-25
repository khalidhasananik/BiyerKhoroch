import Link from "next/link";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel from "@/lib/db/models/Submission";
import AdminLogModel from "@/lib/db/models/AdminLog";
import { LogoutButton } from "@/components/admin/LogoutButton";

async function getStats() {
  await connectToDatabase();

  const [total, pending, approved, rejected, recentLogs] = await Promise.all([
    SubmissionModel.countDocuments(),
    SubmissionModel.countDocuments({ status: "pending" }),
    SubmissionModel.countDocuments({ status: "approved" }),
    SubmissionModel.countDocuments({ status: "rejected" }),
    AdminLogModel.find().sort({ createdAt: -1 }).limit(10).lean(),
  ]);

  return { total, pending, approved, rejected, recentLogs };
}

const ACTION_LABELS: Record<string, string> = {
  approve: "Approved",
  reject: "Rejected",
  delete: "Deleted",
};

const ACTION_COLORS: Record<string, string> = {
  approve: "text-green-600 dark:text-green-400",
  reject: "text-red-500 dark:text-red-400",
  delete: "text-neutral-500",
};

export default async function DashboardPage() {
  const { total, pending, approved, rejected, recentLogs } = await getStats();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">BiyerKhoroch Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/queue"
            className="text-sm px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition"
          >
            Moderation Queue
            {pending > 0 && (
              <span className="ml-2 bg-white/20 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {pending}
              </span>
            )}
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={total} color="text-[var(--text)]" />
        <StatCard label="Pending" value={pending} color="text-amber-500" />
        <StatCard label="Approved" value={approved} color="text-green-600 dark:text-green-400" />
        <StatCard label="Rejected" value={rejected} color="text-red-500" />
      </div>

      {/* Recent activity */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--text)]">Recent Activity</h2>
        </div>

        {recentLogs.length === 0 ? (
          <p className="px-5 py-8 text-sm text-[var(--text-muted)] text-center">
            No admin actions yet.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {recentLogs.map((log) => (
              <li key={String(log._id)} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${ACTION_COLORS[log.action] ?? "text-[var(--text-muted)]"}`}
                  >
                    {ACTION_LABELS[log.action] ?? log.action}
                  </span>
                  <p className="text-sm text-[var(--text)] truncate mt-0.5">
                    {log.submissionSlug}
                  </p>
                  {log.note && (
                    <p className="text-xs text-[var(--text-muted)] truncate">{log.note}</p>
                  )}
                </div>
                <time className="shrink-0 text-xs text-[var(--text-muted)]">
                  {new Date(log.createdAt as Date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-5 py-4">
      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide font-medium mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
