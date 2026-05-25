import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel, { type ISubmission } from "@/lib/db/models/Submission";
import type { Submission } from "@/types";

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

export interface SearchStoryParams {
  q?: string;
  city?: string;
  minCost?: string;
  maxCost?: string;
  minGuests?: string;
  maxGuests?: string;
  sort?: string;
  page?: string;
}

export async function searchStories(params: SearchStoryParams): Promise<{
  data: Submission[];
  total: number;
  page: number;
  hasMore: boolean;
}> {
  await connectToDatabase();

  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const filter: Record<string, unknown> = { status: "approved" };

  if (params.city) {
    filter.city = { $regex: `^${escapeRegex(params.city)}$`, $options: "i" };
  }
  if (params.q) {
    filter.$or = [
      { story:     { $regex: escapeRegex(params.q), $options: "i" } },
      { venueName: { $regex: escapeRegex(params.q), $options: "i" } },
      { city:      { $regex: escapeRegex(params.q), $options: "i" } },
    ];
  }
  if (params.minCost || params.maxCost) {
    const r: Record<string, number> = {};
    if (params.minCost) r.$gte = parseInt(params.minCost, 10);
    if (params.maxCost) r.$lte = parseInt(params.maxCost, 10);
    filter.totalCost = r;
  }
  if (params.minGuests || params.maxGuests) {
    const r: Record<string, number> = {};
    if (params.minGuests) r.$gte = parseInt(params.minGuests, 10);
    if (params.maxGuests) r.$lte = parseInt(params.maxGuests, 10);
    filter.guestCount = r;
  }

  const sortObj = SORT_MAP[params.sort ?? "latest"] ?? SORT_MAP.latest;

  const [docs, total] = await Promise.all([
    SubmissionModel
      .find(filter)
      .sort(sortObj)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean<ISubmission[]>(),
    SubmissionModel.countDocuments(filter),
  ]);

  return {
    data: docs.map(serialize),
    total,
    page,
    hasMore: page * PAGE_SIZE < total,
  };
}

export async function getDistinctCities(): Promise<string[]> {
  await connectToDatabase();
  const cities = await SubmissionModel.distinct("city", { status: "approved" }) as string[];
  return cities.sort();
}

function serialize(doc: ISubmission): Submission {
  return JSON.parse(JSON.stringify(doc)) as Submission;
}

export async function getStoryBySlug(slug: string): Promise<Submission | null> {
  await connectToDatabase();
  const doc = await SubmissionModel.findOne({ slug, status: "approved" }).lean<ISubmission>();
  return doc ? serialize(doc) : null;
}

export async function getRelatedStories(
  city: string,
  excludeSlug: string,
  limit = 3
): Promise<Submission[]> {
  await connectToDatabase();
  const docs = await SubmissionModel
    .find({ city, status: "approved", slug: { $ne: excludeSlug } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<ISubmission[]>();
  return docs.map(serialize);
}

export async function getLatestStories(excludeSlug: string, limit = 3): Promise<Submission[]> {
  await connectToDatabase();
  const docs = await SubmissionModel
    .find({ status: "approved", slug: { $ne: excludeSlug } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<ISubmission[]>();
  return docs.map(serialize);
}

export async function getApprovedStorySlugs(): Promise<string[]> {
  await connectToDatabase();
  const docs = await SubmissionModel
    .find({ status: "approved" }, { slug: 1 })
    .lean<Pick<ISubmission, "slug">[]>();
  return docs.map((d) => d.slug);
}

export async function getApprovedStoriesForSitemap(): Promise<{ slug: string; updatedAt: string }[]> {
  await connectToDatabase();
  const docs = await SubmissionModel
    .find({ status: "approved" }, { slug: 1, updatedAt: 1 })
    .lean<Pick<ISubmission, "slug" | "updatedAt">[]>();
  return docs.map((d) => ({ slug: d.slug, updatedAt: new Date(d.updatedAt).toISOString() }));
}
