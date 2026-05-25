import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Share Your Wedding Story — BiyerKahini",
  description:
    "Anonymously share your wedding costs to help other Bangladeshi couples plan their special day.",
  alternates: { canonical: "/submit" },
  robots: { index: false, follow: false },
};

function FormSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Step bar skeleton */}
      <div className="flex items-start mb-8">
        {[1, 2, 3].map((n, i) => (
          <div key={n} className={`flex items-center ${i < 2 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: "var(--surface-2)" }}
              />
              <div className="h-2 w-10 rounded hidden sm:block" style={{ backgroundColor: "var(--surface-2)" }} />
            </div>
            {i < 2 && (
              <div className="flex-1 h-px mx-3 mb-5" style={{ backgroundColor: "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Card skeleton */}
      <div
        className="rounded-2xl border p-6 md:p-8"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="h-6 w-40 rounded mb-6" style={{ backgroundColor: "var(--surface-2)" }} />
        <div className="space-y-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-24 rounded mb-2" style={{ backgroundColor: "var(--surface-2)" }} />
              <div className="h-10 w-full rounded-lg" style={{ backgroundColor: "var(--surface-2)" }} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <div className="h-10 w-28 rounded-full" style={{ backgroundColor: "var(--surface-2)" }} />
        </div>
      </div>
    </div>
  );
}

const SubmissionForm = dynamic(
  () => import("@/components/submission/SubmissionForm").then((m) => ({ default: m.SubmissionForm })),
  { loading: FormSkeleton }
);

export default function SubmitPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Share Your Story
        </h1>
        <p className="leading-relaxed max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
          Help other couples plan their wedding by sharing your experience
          anonymously. All stories are reviewed before going public.
        </p>
      </div>
      <SubmissionForm />
    </main>
  );
}
