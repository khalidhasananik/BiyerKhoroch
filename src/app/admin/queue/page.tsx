import Link from "next/link";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel, { type ISubmission } from "@/lib/db/models/Submission";
import { ModerationCard } from "@/components/admin/ModerationCard";

const PAGE_SIZE = 20;

async function getPendingSubmissions(page: number) {
  await connectToDatabase();
  const skip = (page - 1) * PAGE_SIZE;
  const [submissions, total] = await Promise.all([
    SubmissionModel.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean<ISubmission[]>(),
    SubmissionModel.countDocuments({ status: "pending" }),
  ]);
  return { submissions, total, pages: Math.ceil(total / PAGE_SIZE) };
}

export default async function QueuePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { submissions, total, pages } = await getPendingSubmissions(page);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Moderation Queue</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {total} pending submission{total !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition"
        >
          ← Dashboard
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-24 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
          <p className="text-4xl mb-3">🎉</p>
          <p className="font-semibold text-[var(--text)]">All caught up!</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">No pending submissions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <ModerationCard key={String(sub._id)} submission={sub} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/admin/queue?page=${page - 1}`}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition"
            >
              ← Prev
            </Link>
          )}
          <span className="text-sm text-[var(--text-muted)] px-2">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link
              href={`/admin/queue?page=${page + 1}`}
              className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
