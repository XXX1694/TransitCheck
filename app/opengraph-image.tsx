import { ImageResponse } from "next/og";

export const alt =
  "С рейса снимают не из-за визы в конечную страну, а из-за транзитной. TransitCheck, $12.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
};

async function loadFontFile(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Font ${url} ${response.status}`);
  }
  return response.arrayBuffer();
}

export default async function OpenGraphImage() {
  const headline =
    "С рейса снимают не из-за визы в конечную страну, а из-за транзитной";
  const stamp = "ВИЗА НУЖНА";

  let fonts: OgFont[] = [];

  try {
    const [unboundedCyr, unboundedLat, monoCyr, monoLat] = await Promise.all([
      loadFontFile(
        "https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/cyrillic-700-normal.ttf",
      ),
      loadFontFile(
        "https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-700-normal.ttf",
      ),
      loadFontFile(
        "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/cyrillic-500-normal.ttf",
      ),
      loadFontFile(
        "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.ttf",
      ),
    ]);
    fonts = [
      { name: "Unbounded", data: unboundedCyr, weight: 700 },
      { name: "Unbounded", data: unboundedLat, weight: 700 },
      { name: "JetBrains Mono", data: monoCyr, weight: 500 },
      { name: "JetBrains Mono", data: monoLat, weight: 500 },
    ];
  } catch {
    fonts = [];
  }

  const displayFamily = fonts.some((font) => font.name === "Unbounded")
    ? "Unbounded"
    : "sans-serif";
  const monoFamily = fonts.some((font) => font.name === "JetBrains Mono")
    ? "JetBrains Mono"
    : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F4EE",
          color: "#101B2D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: monoFamily,
            fontSize: 22,
            color: "#40506B",
          }}
        >
          <span>TC · РАЗБОР ТРАНЗИТА</span>
          <span>$12 · 24Ч · PDF</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontFamily: displayFamily,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {headline}
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 210,
                padding: "16px 18px",
                border: "1px solid #D3D3C6",
                fontFamily: monoFamily,
                fontSize: 28,
              }}
            >
              <span style={{ fontSize: 16, color: "#40506B" }}>рейс</span>
              <span>ALA→SIN</span>
              <span style={{ fontSize: 16, color: "#40506B" }}>28.04.26</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 200,
                padding: "16px 18px",
                border: "1px solid #D3D3C6",
                background: "#E8E8DF",
                fontFamily: monoFamily,
                fontSize: 28,
              }}
            >
              <span style={{ fontSize: 16, color: "#40506B" }}>стыковка</span>
              <span>SIN 9ч</span>
              <span
                style={{
                  marginTop: 8,
                  padding: "4px 8px",
                  border: "2px solid #A32E2E",
                  color: "#A32E2E",
                  fontFamily: displayFamily,
                  fontSize: 18,
                  transform: "rotate(-2deg)",
                }}
              >
                {stamp}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 210,
                padding: "16px 18px",
                border: "1px solid #D3D3C6",
                fontFamily: monoFamily,
                fontSize: 28,
              }}
            >
              <span style={{ fontSize: 16, color: "#40506B" }}>рейс</span>
              <span>SIN→KUL</span>
              <span style={{ fontSize: 16, color: "#40506B" }}>29.04.26</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#101B2D",
            color: "#F4F4EE",
            padding: "12px 16px",
            fontFamily: monoFamily,
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 12, height: 12, background: "#D9F04B" }} />
          <span>P&lt;KAZ&lt;&lt;&lt;&lt;&lt;&lt;&lt; ALA&gt;SIN&gt;KUL&lt;&lt;28APR26</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
