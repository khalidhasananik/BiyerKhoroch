import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            color: "#db2777",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Bangladesh · Real Wedding Costs
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          BiyerKhoroch
        </div>

        <div
          style={{
            color: "#a3a3a3",
            fontSize: 26,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          Anonymous wedding cost breakdowns and confessions from real couples across Bangladesh
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: "20px",
          }}
        >
          {["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"].map((city) => (
            <div
              key={city}
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "8px 18px",
                color: "#a3a3a3",
                fontSize: 15,
              }}
            >
              {city}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            color: "#db2777",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          biyerkhoroch.com
        </div>
      </div>
    )
  );
}
