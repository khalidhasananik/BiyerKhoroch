import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data/analytics";

export async function GET() {
  try {
    const data = await getAnalytics();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load analytics." },
      { status: 500 }
    );
  }
}
