import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db/connection";
import AdminLogModel from "@/lib/db/models/AdminLog";

export async function DELETE() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  await AdminLogModel.deleteMany({});

  return NextResponse.json({ ok: true });
}

