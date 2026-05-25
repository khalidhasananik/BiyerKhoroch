import { connectToDatabase } from "@/lib/db/connection";
import SubmissionModel, { type ISubmission } from "@/lib/db/models/Submission";
import type { Submission } from "@/types";

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
