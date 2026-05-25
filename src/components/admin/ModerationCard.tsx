"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ISubmission } from "@/lib/db/models/Submission";

const COST_LABELS: Record<string, string> = {
  venue: "Venue",
  catering: "Catering",
  photography: "Photography",
  clothing: "Clothing",
  jewelry: "Jewelry",
  decoration: "Decoration",
  makeup: "Makeup",
  gateDhora: "Gate Dhora",
  miscellaneous: "Misc",
};

function formatBDT(n: number) {
  return "৳" + n.toLocaleString("en-IN");
}

export function ModerationCard({ submission }: { submission: ISubmission }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | "delete" | null>(null);
  const [done, setDone] = useState(false);

  const id = String(submission._id);

  async function act(action: "approve" | "reject" | "delete") {
    setLoading(action);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" },
        ...(action !== "delete" ? { body: JSON.stringify({ action }) } : {}),
      });
      if (res.ok) {
        setDone(true);
        router.refresh();
      }
    } finally {
      setLoading(null);
    }
  }

  if (done) return null;

  const costs = submission.costs as Record<string, number>;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Top bar */}
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-[var(--border)]">
        <div>
          <h3 className="font-semibold text-[var(--text)]">
            {submission.city} · {submission.guestCount} guests
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {submission.venueName}
            {submission.photographyCompany ? ` · ${submission.photographyCompany}` : ""}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {new Date(submission.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[var(--accent)]">
            {formatBDT(submission.totalCost)}
          </p>
          <p className="text-xs text-[var(--text-muted)]">total</p>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="px-5 py-3 grid grid-cols-3 sm:grid-cols-5 gap-2 border-b border-[var(--border)]">
        {Object.entries(costs).map(([key, val]) =>
          val > 0 ? (
            <div key={key} className="text-center">
              <p className="text-xs text-[var(--text-muted)]">{COST_LABELS[key] ?? key}</p>
              <p className="text-sm font-medium text-[var(--text)]">{formatBDT(val)}</p>
            </div>
          ) : null
        )}
      </div>

      {/* Story */}
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <p className="text-sm text-[var(--text)] whitespace-pre-wrap line-clamp-4">
          {submission.story}
        </p>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => act("approve")}
          disabled={loading !== null}
          className="px-4 py-1.5 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition disabled:opacity-50"
        >
          {loading === "approve" ? "Approving…" : "Approve"}
        </button>
        <button
          onClick={() => act("reject")}
          disabled={loading !== null}
          className="px-4 py-1.5 text-sm rounded-lg bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text)] font-medium transition disabled:opacity-50"
        >
          {loading === "reject" ? "Rejecting…" : "Reject"}
        </button>
        <button
          onClick={() => act("delete")}
          disabled={loading !== null}
          className="ml-auto px-4 py-1.5 text-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition disabled:opacity-50"
        >
          {loading === "delete" ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
