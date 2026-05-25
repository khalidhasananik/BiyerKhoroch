import type { MetadataRoute } from "next";
import { getApprovedStoriesForSitemap } from "@/lib/data/stories";

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://biyerkhoroch.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getApprovedStoriesForSitemap();

  const storyUrls: MetadataRoute.Sitemap = stories.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/story/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/analytics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...storyUrls,
  ];
}
