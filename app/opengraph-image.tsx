import { ImageResponse } from "next/og";

export const alt = "Find out if they'll let you board. TransitCheck.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f2f3f0",
          color: "#14181d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>TransitCheck</span>
          <span>Route verdict · $12 · 24h</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 0.95,
              maxWidth: 920,
            }}
          >
            Find out if they&apos;ll let you board.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              padding: "22px 28px",
              border: "1px solid #14181d",
              background: "#f7f8f5",
              fontFamily: "ui-monospace, monospace",
              fontSize: 40,
              letterSpacing: 2,
            }}
          >
            <span>ALA</span>
            <span style={{ opacity: 0.45 }}>→</span>
            <span>DXB</span>
            <span style={{ opacity: 0.45 }}>→</span>
            <span>BKK</span>
            <span
              style={{
                marginLeft: 12,
                padding: "6px 10px",
                border: "1px solid #8a6a0c",
                color: "#8a6a0c",
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              TRANSIT VISA REQUIRED (LANDSIDE)
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
