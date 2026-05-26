import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel from "@/lib/db/models/Submission";
import { submissionFormSchema } from "@/lib/validations/submission";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendSubmissionNotification } from "@/lib/email";

export async function POST(request: Request) {
  // Rate limit by IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again tomorrow." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Server-side validation
  const result = submissionFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = result.data;

  // Honeypot — bots fill it, humans don't
  if (data.honeypot) {
    // Return 200 to not tip off bots, but don't save
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Calculate total cost
  const costs = data.costs;
  const calculatedTotal = Object.values(costs).reduce((a, b) => a + b, 0);
  const totalCost = data.totalCostOverride ?? calculatedTotal;

  await connectToDatabase();

  const submission = new SubmissionModel({
    city: data.city,
    weddingYear: data.weddingYear,
    guestCount: data.guestCount,
    venueName: data.venueName,
    photographyCompany: data.photographyCompany,
    costs: data.costs,
    totalCost,
    totalCostOverride: data.totalCostOverride,
    story: data.story,
    status: "pending",
    images: [],
  });

  await submission.save();

  // Fire-and-forget — don't let email failure block the response
  sendSubmissionNotification({
    slug: submission.slug,
    city: submission.city,
    guestCount: submission.guestCount,
    venueName: submission.venueName,
    totalCost: submission.totalCost,
    story: submission.story,
  }).catch((err) => console.error("[email] notification failed:", err));

  return NextResponse.json(
    {
      ok: true,
      id: submission._id.toString(),
      slug: submission.slug,
    },
    { status: 201 }
  );
}
