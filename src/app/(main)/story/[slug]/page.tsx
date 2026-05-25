import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StoryDetail } from "@/components/story/StoryDetail";
import { StoryCard } from "@/components/story/StoryCard";
import {
  getStoryBySlug,
  getRelatedStories,
  getLatestStories,
  getApprovedStorySlugs,
} from "@/lib/data/stories";
import { formatBDTCompact } from "@/lib/utils/format";

// ISR: revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getApprovedStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return { title: "Story Not Found" };
  }

  const title = `${story.city} Wedding · ${story.guestCount} Guests · ${formatBDTCompact(story.totalCost)}`;
  const description = story.story.length > 160 ? story.story.slice(0, 157) + "…" : story.story;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/story/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/story/${slug}`,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://biyerkhoroch.com";
  const shareUrl = `${baseUrl}/story/${slug}`;

  // Prefer same-city stories; fall back to latest if none
  let related = await getRelatedStories(story.city, slug, 3);
  if (related.length === 0) {
    related = await getLatestStories(slug, 3);
  }

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <StoryDetail story={story} shareUrl={shareUrl} />
          </div>

          {/* Sidebar: related stories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              {related.length > 0 && (
                <section>
                  <h2
                    className="text-sm font-semibold uppercase tracking-wide mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {related[0]?.city === story.city
                      ? `More from ${story.city}`
                      : "More Stories"}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {related.map((r) => (
                      <StoryCard key={r._id} submission={r} />
                    ))}
                  </div>
                </section>
              )}

              <div
                className="mt-6 rounded-xl border p-4"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  About BiyerKhoroch
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Anonymous wedding cost breakdowns from real couples across Bangladesh.
                  No names. No shame. Just numbers.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
