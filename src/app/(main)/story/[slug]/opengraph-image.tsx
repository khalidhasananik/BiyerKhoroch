import { ImageResponse } from "next/og";
import { getStoryBySlug } from "@/lib/data/stories";
import { formatBDTCompact } from "@/lib/utils/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#0f0f0f",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ color: "#ffffff", fontSize: 48, fontWeight: 700 }}>
            BiyerKhoroch
          </div>
        </div>
      )
    );
  }

  const cost = formatBDTCompact(story.totalCost);
  const excerpt =
    story.story.length > 130
      ? story.story.slice(0, 127) + "..."
      : story.story;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header label */}
        <div
          style={{
            color: "#db2777",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          BiyerKhoroch · Wedding Cost Story
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #db2777",
              borderRadius: 8,
              padding: "6px 18px",
              color: "#db2777",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {story.city}
          </div>
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "6px 18px",
              color: "#a3a3a3",
              fontSize: 16,
            }}
          >
            {story.guestCount} guests
          </div>
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "6px 18px",
              color: "#a3a3a3",
              fontSize: 16,
            }}
          >
            {story.venueName}
          </div>
        </div>

        {/* Cost — hero number */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          {cost}
        </div>

        {/* Story excerpt */}
        <div
          style={{
            color: "#a3a3a3",
            fontSize: 22,
            lineHeight: 1.55,
            flex: 1,
          }}
        >
          &ldquo;{excerpt}&rdquo;
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 28,
            borderTop: "1px solid #262626",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#525252", fontSize: 15 }}>
            Anonymous · No names. No shame. Just numbers.
          </div>
          <div style={{ color: "#db2777", fontSize: 16, fontWeight: 600 }}>
            biyerkhoroch.com
          </div>
        </div>
      </div>
    )
  );
}
