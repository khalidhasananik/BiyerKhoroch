import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel from "@/lib/db/models/Submission";
import AdminLogModel from "@/lib/db/models/AdminLog";
import type { AdminAction } from "@/lib/db/models/AdminLog";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "1";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { action, note } = body as { action?: string; note?: string };

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json(
      { error: "action must be 'approve' or 'reject'." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const submission = await SubmissionModel.findById(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  const newStatus = action === "approve" ? "approved" : "rejected";
  submission.status = newStatus;
  await submission.save();

  await AdminLogModel.create({
    action: action as AdminAction,
    submissionId: submission._id,
    submissionSlug: submission.slug,
    note: note ?? undefined,
  });

  return NextResponse.json({ ok: true, status: newStatus });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  await connectToDatabase();

  const submission = await SubmissionModel.findByIdAndDelete(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  await AdminLogModel.create({
    action: "delete" as AdminAction,
    submissionId: submission._id,
    submissionSlug: submission.slug,
  });

  return NextResponse.json({ ok: true });
}
