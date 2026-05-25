"use client";

import { useState, type ReactNode } from "react";
import { useLocalStorageDraft } from "@/hooks/useLocalStorageDraft";
import { submissionFormSchema } from "@/lib/validations/submission";
import { formatBDT } from "@/lib/utils/format";

const DRAFT_KEY = "biyerkahini_draft_v1";

const CITIES = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal",
  "Comilla", "Narayanganj", "Mymensingh", "Jessore", "Bogura", "Rangpur",
  "Gazipur", "Feni", "Cox's Bazar", "Narsingdi",
];

const COST_FIELDS = [
  { key: "venue",         label: "Venue" },
  { key: "catering",      label: "Catering & Food" },
  { key: "photography",   label: "Photography & Video" },
  { key: "clothing",      label: "Clothing (Bride & Groom)" },
  { key: "jewelry",       label: "Jewelry & Accessories" },
  { key: "decoration",    label: "Decoration & Flowers" },
  { key: "makeup",        label: "Makeup & Salon" },
  { key: "gateDhora",     label: "Gaye Holud / Gate Dhora" },
  { key: "miscellaneous", label: "Miscellaneous" },
] as const;

type CostKey = typeof COST_FIELDS[number]["key"];

interface FormState {
  city: string;
  guestCount: string;
  venueName: string;
  photographyCompany: string;
  venue: string;
  catering: string;
  photography: string;
  clothing: string;
  jewelry: string;
  decoration: string;
  makeup: string;
  gateDhora: string;
  miscellaneous: string;
  totalCostOverride: string;
  story: string;
  honeypot: string;
}

const EMPTY: FormState = {
  city: "", guestCount: "", venueName: "", photographyCompany: "",
  venue: "", catering: "", photography: "", clothing: "", jewelry: "",
  decoration: "", makeup: "", gateDhora: "", miscellaneous: "",
  totalCostOverride: "", story: "", honeypot: "",
};

function n(s: string) { return parseFloat(s) || 0; }

function calcTotal(f: FormState): number {
  return COST_FIELDS.reduce((sum, { key }) => sum + n(f[key]), 0);
}

function parseErrors(error: { issues: { path: PropertyKey[]; message: string }[] }): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.map(p => String(p)).join(".");
    if (!out[path]) out[path] = issue.message;
  }
  return out;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function SubmissionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const clearDraft = useLocalStorageDraft(DRAFT_KEY, form, (saved) => {
    setForm(saved);
    setHasDraft(true);
  });

  function set(field: keyof FormState, value: string) {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => { const next = { ...p }; delete next[field]; return next; });
  }

  function validate1(): boolean {
    const r = submissionFormSchema
      .pick({ city: true, guestCount: true, venueName: true })
      .safeParse({ city: form.city, guestCount: n(form.guestCount), venueName: form.venueName });
    if (!r.success) { setErrors(parseErrors(r.error)); return false; }
    setErrors({});
    return true;
  }

  function validate2(): boolean {
    const errs: Record<string, string> = {};
    for (const { key } of COST_FIELDS) {
      const v = form[key];
      if (v !== "" && isNaN(parseFloat(v))) errs[key] = "Enter a valid amount";
      else if (n(v) < 0) errs[key] = "Cannot be negative";
    }
    if (calcTotal(form) === 0 && !Object.keys(errs).length) {
      errs._total = "Enter at least one cost amount";
    }
    if (Object.keys(errs).length) { setErrors(errs); return false; }
    setErrors({});
    return true;
  }

  function validate3(): boolean {
    const r = submissionFormSchema.pick({ story: true }).safeParse({ story: form.story });
    if (!r.success) { setErrors(parseErrors(r.error)); return false; }
    setErrors({});
    return true;
  }

  function next() {
    const ok = step === 1 ? validate1() : step === 2 ? validate2() : validate3();
    if (ok) setStep(s => Math.min(s + 1, 3));
  }

  function back() { setErrors({}); setStep(s => Math.max(s - 1, 1)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate3()) return;

    const total = calcTotal(form);
    const payload = {
      city: form.city,
      guestCount: Math.round(n(form.guestCount)),
      venueName: form.venueName,
      photographyCompany: form.photographyCompany || undefined,
      costs: {
        venue: n(form.venue), catering: n(form.catering),
        photography: n(form.photography), clothing: n(form.clothing),
        jewelry: n(form.jewelry), decoration: n(form.decoration),
        makeup: n(form.makeup), gateDhora: n(form.gateDhora),
        miscellaneous: n(form.miscellaneous),
      },
      totalCostOverride: form.totalCostOverride ? n(form.totalCostOverride) : undefined,
      story: form.story,
      honeypot: form.honeypot || undefined,
    };

    const validation = submissionFormSchema.safeParse(payload);
    if (!validation.success) { setErrors(parseErrors(validation.error)); return; }

    setStatus("submitting");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error ?? "Submission failed. Please try again.");
      }
      clearDraft();
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessView />;

  const total = calcTotal(form);
  const displayTotal = form.totalCostOverride ? n(form.totalCostOverride) : total;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — invisible to real users, traps bots */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -1, height: 0, overflow: "hidden" }}
      >
        <label htmlFor="hp_site">Website</label>
        <input
          id="hp_site" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={form.honeypot} onChange={e => set("honeypot", e.target.value)}
        />
      </div>

      {/* Saved draft notice */}
      {hasDraft && step === 1 && (
        <div
          className="mb-6 flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <span>Continuing your saved draft.</span>
          <button
            type="button"
            className="font-medium underline underline-offset-2"
            style={{ color: "var(--accent)" }}
            onClick={() => { setForm(EMPTY); clearDraft(); setHasDraft(false); }}
          >
            Start fresh
          </button>
        </div>
      )}

      <StepBar current={step} />

      {/* ── Step 1: Wedding Details ── */}
      {step === 1 && (
        <Card>
          <CardTitle>Wedding Details</CardTitle>
          <div className="space-y-5">
            <Field label="City" required error={errors.city}>
              <input
                type="text" list="city-list" value={form.city}
                onChange={e => set("city", e.target.value)}
                placeholder="e.g. Dhaka" className="input-field"
                style={errors.city ? { borderColor: "#ef4444" } : undefined}
              />
              <datalist id="city-list">
                {CITIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </Field>

            <Field label="Total Guests" required error={errors.guestCount}>
              <input
                type="number" min={1} max={10000} value={form.guestCount}
                onChange={e => set("guestCount", e.target.value)}
                placeholder="e.g. 500" className="input-field"
                style={errors.guestCount ? { borderColor: "#ef4444" } : undefined}
              />
            </Field>

            <Field label="Venue Name" required error={errors.venueName}>
              <input
                type="text" value={form.venueName}
                onChange={e => set("venueName", e.target.value)}
                placeholder="e.g. Bashundhara Convention Center" className="input-field"
                style={errors.venueName ? { borderColor: "#ef4444" } : undefined}
              />
            </Field>

            <Field label="Photography Company" error={errors.photographyCompany}>
              <input
                type="text" value={form.photographyCompany}
                onChange={e => set("photographyCompany", e.target.value)}
                placeholder="Optional" className="input-field"
              />
            </Field>
          </div>
          <div className="mt-8 flex justify-end">
            <PrimaryBtn onClick={next}>Continue →</PrimaryBtn>
          </div>
        </Card>
      )}

      {/* ── Step 2: Cost Breakdown ── */}
      {step === 2 && (
        <Card>
          <CardTitle>Cost Breakdown</CardTitle>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Enter 0 for any category that doesn't apply to your wedding.
          </p>

          {errors._total && (
            <p
              className="mb-4 text-sm rounded-lg px-4 py-2.5 border"
              style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.35)", backgroundColor: "rgba(239,68,68,0.08)" }}
            >
              {errors._total}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            {COST_FIELDS.map(({ key, label }) => (
              <Field key={key} label={label} error={errors[key]}>
                <CostInput value={form[key]} onChange={v => set(key, v)} hasError={!!errors[key]} />
              </Field>
            ))}
          </div>

          {/* Live total */}
          <div
            className="mt-6 rounded-xl border px-5 py-4 flex items-center justify-between"
            style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}
          >
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>Calculated Total</span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: "var(--accent)" }}>
              {formatBDT(total)}
            </span>
          </div>

          <div className="mt-4">
            <Field label="Total Override" hint="Use if the calculated total is incorrect">
              <CostInput
                value={form.totalCostOverride}
                onChange={v => set("totalCostOverride", v)}
                placeholder={String(total || 0)}
              />
            </Field>
          </div>

          <div className="mt-8 flex gap-3">
            <OutlineBtn onClick={back}>← Back</OutlineBtn>
            <PrimaryBtn onClick={next} flex>Continue →</PrimaryBtn>
          </div>
        </Card>
      )}

      {/* ── Step 3: Story + Review ── */}
      {step === 3 && (
        <Card>
          <CardTitle>Your Story</CardTitle>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Share anonymously. Be honest — your experience helps other couples plan.
          </p>

          <Field label="Your experience" required error={errors.story}>
            <textarea
              rows={7} value={form.story}
              onChange={e => set("story", e.target.value)}
              placeholder="What surprised you about the costs? What would you do differently? Any tips for couples planning in your city?"
              className="input-field resize-none"
              style={errors.story ? { borderColor: "#ef4444" } : undefined}
            />
            <p
              className="text-xs text-right mt-1 tabular-nums"
              style={{
                color: form.story.length > 2000 ? "#ef4444"
                  : form.story.length >= 20 ? "var(--accent)"
                  : "var(--text-muted)",
              }}
            >
              {form.story.length} / 2000
            </p>
          </Field>

          {/* Review summary */}
          <div
            className="mt-6 rounded-xl border p-5"
            style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
              Review
            </p>
            <div className="space-y-2 text-sm">
              <ReviewRow label="City" value={form.city} />
              <ReviewRow label="Guests" value={form.guestCount} />
              <ReviewRow label="Venue" value={form.venueName} />
              {form.photographyCompany && (
                <ReviewRow label="Photographer" value={form.photographyCompany} />
              )}
              <div className="border-t pt-2 mt-2" style={{ borderColor: "var(--border)" }}>
                <ReviewRow label="Total Cost" value={formatBDT(displayTotal)} accent />
              </div>
            </div>
          </div>

          {status === "error" && (
            <div
              className="mt-4 text-sm rounded-lg px-4 py-3 border"
              style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.35)", backgroundColor: "rgba(239,68,68,0.08)" }}
            >
              {serverError}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <OutlineBtn onClick={back}>← Back</OutlineBtn>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 py-2.5 rounded-full font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {status === "submitting" ? "Submitting…" : "Submit Story"}
            </button>
          </div>
        </Card>
      )}
    </form>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepBar({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Costs" },
    { n: 3, label: "Story" },
  ];
  return (
    <div className="flex items-start mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                backgroundColor: s.n === current ? "var(--accent)" : "transparent",
                color: s.n === current ? "#fff" : s.n < current ? "var(--accent)" : "var(--text-muted)",
                border: s.n === current ? "none" : s.n < current ? "2px solid var(--accent)" : "2px solid var(--border)",
              }}
            >
              {s.n < current ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : s.n}
            </div>
            <span
              className="text-xs hidden sm:block"
              style={{ color: s.n === current ? "var(--accent)" : "var(--text-muted)" }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="flex-1 h-px mx-3 mb-5"
              style={{ backgroundColor: s.n < current ? "var(--accent)" : "var(--border)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-6 md:p-8"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
      {children}
    </h2>
  );
}

function Field({
  label, required, error, hint, children,
}: {
  label: string; required?: boolean; error?: string; hint?: string; children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
        {label}
        {required && <span className="ml-0.5" style={{ color: "var(--accent)" }}>*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{hint}</p>
      )}
      {error && (
        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{error}</p>
      )}
    </div>
  );
}

function CostInput({
  value, onChange, hasError, placeholder = "0",
}: {
  value: string; onChange: (v: string) => void; hasError?: boolean; placeholder?: string;
}) {
  return (
    <div
      className="flex items-center rounded-lg border overflow-hidden"
      style={{ borderColor: hasError ? "#ef4444" : "var(--border)", backgroundColor: "var(--bg)" }}
    >
      <span
        className="px-3 py-2.5 text-sm border-r select-none shrink-0 font-medium"
        style={{
          borderColor: hasError ? "#ef4444" : "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--text-muted)",
        }}
      >
        ৳
      </span>
      <input
        type="number" min={0} step={100}
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-2.5 px-3 text-sm bg-transparent outline-none"
        style={{ color: "var(--text)" }}
      />
    </div>
  );
}

function ReviewRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span
        className={accent ? "font-bold text-base" : "font-medium text-right"}
        style={{ color: accent ? "var(--accent)" : "var(--text)" }}
      >
        {value || "—"}
      </span>
    </div>
  );
}

function PrimaryBtn({ onClick, flex, children }: { onClick: () => void; flex?: boolean; children: ReactNode }) {
  return (
    <button
      type="button" onClick={onClick}
      className={`${flex ? "flex-1" : ""} px-6 py-2.5 rounded-full font-semibold text-white`}
      style={{ backgroundColor: "var(--accent)" }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button" onClick={onClick}
      className="px-5 py-2.5 rounded-full font-medium border"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
    >
      {children}
    </button>
  );
}

function SuccessView() {
  return (
    <div
      className="rounded-2xl border p-10 text-center max-w-md mx-auto"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: "var(--surface-2)" }}
      >
        <svg
          width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
        Story Submitted!
      </h2>
      <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Your wedding story has been submitted for review. It will appear publicly
        once approved — usually within 24 hours.
      </p>
      <a
        href="/"
        className="inline-block mt-8 px-7 py-3 rounded-full font-semibold text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Back to Home
      </a>
    </div>
  );
}
