import type { Metadata } from "next";
import { SubmissionForm } from "@/components/submission/SubmissionForm";

export const metadata: Metadata = {
  title: "Share Your Wedding Story — BiyerKhoroch",
  description:
    "Anonymously share your wedding costs to help other Bangladeshi couples plan their special day.",
  alternates: { canonical: "/submit" },
  robots: { index: false, follow: false },
};

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
