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
          background: "#f4efe4",
          color: "#1c1914",
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
            fontSize: 24,
          }}
        >
          <span>TransitCheck</span>
          <span>$12 · 24 hours · human check</span>
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
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Find out if they&apos;ll let you board.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "20px 26px",
              border: "1px solid #1c1914",
              background: "#fbf7ee",
              fontSize: 36,
            }}
          >
            <span>ALA</span>
            <span style={{ opacity: 0.45 }}>→</span>
            <span>DXB</span>
            <span style={{ opacity: 0.45 }}>→</span>
            <span>BKK</span>
            <span
              style={{
                marginLeft: 8,
                padding: "6px 10px",
                border: "1px solid #8d5a12",
                color: "#8d5a12",
                fontSize: 20,
              }}
            >
              Transit visa, landside
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
