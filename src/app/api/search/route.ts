import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel from "@/lib/db/models/Submission";

const PAGE_SIZE = 12;

const SORT_MAP: Record<string, Record<string, 1 | -1>> = {
  latest:   { createdAt: -1 },
  oldest:   { createdAt:  1 },
  highest:  { totalCost: -1 },
  lowest:   { totalCost:  1 },
  funniest: { totalCost: -1 },
};

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q         = sp.get("q")?.trim() ?? "";
    const city      = sp.get("city")?.trim() ?? "";
    const minCost   = sp.get("minCost") ?? "";
    const maxCost   = sp.get("maxCost") ?? "";
    const minGuests = sp.get("minGuests") ?? "";
    const maxGuests = sp.get("maxGuests") ?? "";
    const sort      = sp.get("sort") ?? "latest";
    const page      = Math.max(1, parseInt(sp.get("page") ?? "1", 10));

    const filter: Record<string, unknown> = { status: "approved" };

    if (city) {
      filter.city = { $regex: `^${escapeRegex(city)}$`, $options: "i" };
    }
    if (q) {
      filter.$or = [
        { story:     { $regex: escapeRegex(q), $options: "i" } },
        { venueName: { $regex: escapeRegex(q), $options: "i" } },
        { city:      { $regex: escapeRegex(q), $options: "i" } },
      ];
    }
    if (minCost || maxCost) {
      const r: Record<string, number> = {};
      if (minCost) r.$gte = parseInt(minCost, 10);
      if (maxCost) r.$lte = parseInt(maxCost, 10);
      filter.totalCost = r;
    }
    if (minGuests || maxGuests) {
      const r: Record<string, number> = {};
      if (minGuests) r.$gte = parseInt(minGuests, 10);
      if (maxGuests) r.$lte = parseInt(maxGuests, 10);
      filter.guestCount = r;
    }

    await connectToDatabase();

    const sortObj = SORT_MAP[sort] ?? SORT_MAP.latest;
    const skip = (page - 1) * PAGE_SIZE;

    const [docs, total] = await Promise.all([
      SubmissionModel.find(filter).sort(sortObj).skip(skip).limit(PAGE_SIZE).lean(),
      SubmissionModel.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: JSON.parse(JSON.stringify(docs)),
      total,
      page,
      pageSize: PAGE_SIZE,
      hasMore: page * PAGE_SIZE < total,
    });
  } catch (err) {
    console.error("[/api/search]", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
