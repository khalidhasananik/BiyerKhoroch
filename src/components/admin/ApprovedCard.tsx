"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ISubmission } from "@/lib/db/models/Submission";

function formatBDT(n: number) {
  return "৳" + n.toLocaleString("en-IN");
}

export function ApprovedCard({ submission }: { submission: ISubmission }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "confirm" | "deleting" | "done">("idle");

  const id = String(submission._id);

  async function handleDelete() {
    setState("deleting");
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setState("done");
        router.refresh();
      } else {
        setState("confirm");
      }
    } catch {
      setState("confirm");
    }
  }

  if (state === "done") return null;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-[var(--text)]">
              {submission.city} · {submission.guestCount} guests
            </h3>
            <Link
              href={`/story/${submission.slug}`}
              target="_blank"
              className="text-xs text-[var(--accent)] hover:underline shrink-0"
            >
              View ↗
            </Link>
          </div>
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

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-lg font-bold text-[var(--accent)]">
              {formatBDT(submission.totalCost)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">total</p>
          </div>

          {state === "idle" && (
            <button
              onClick={() => setState("confirm")}
              className="px-3 py-1.5 text-sm rounded-lg text-red-500 border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
            >
              Delete
            </button>
          )}

          {state === "confirm" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-muted)]">Sure?</span>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setState("idle")}
                className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition"
              >
                Cancel
              </button>
            </div>
          )}

          {state === "deleting" && (
            <span className="text-sm text-[var(--text-muted)]">Deleting…</span>
          )}
        </div>
      </div>
    </div>
  );
}
