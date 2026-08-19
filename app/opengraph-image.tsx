import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "С рейса снимают не из-за визы в конечную страну, а из-за транзитной. TransitCheck, $12.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFontSubset(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  }).then((response) => response.text());

  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Could not subset ${family}`);
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
}

export default async function OpenGraphImage() {
  const headline =
    "С рейса снимают не из-за визы в конечную страну, а из-за транзитной";
  const meta = "TC  РАЗБОР ТРАНЗИТА  $12  24Ч";
  const codes = "ALA  SIN 9Ч  KUL";
  const stamp = "ВИЗА НУЖНА";
  const text = `${headline} ${meta} ${codes} ${stamp} P<KAZ`;

  let fonts: { name: string; data: ArrayBuffer; weight: number }[] = [];

  try {
    const [display, mono] = await Promise.all([
      loadFontSubset("Unbounded", 700, text),
      loadFontSubset("JetBrains Mono", 500, text),
    ]);
    fonts = [
      { name: "Unbounded", data: display, weight: 700 },
      { name: "JetBrains Mono", data: mono, weight: 500 },
    ];
  } catch {
    try {
      const fallback = await readFile(
        join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf"),
      );
      fonts = [{ name: "Noto Sans", data: fallback, weight: 400 }];
    } catch {
      fonts = [];
    }
  }

  const displayFamily = fonts.some((font) => font.name === "Unbounded")
    ? "Unbounded"
    : fonts[0]?.name ?? "sans-serif";
  const monoFamily = fonts.some((font) => font.name === "JetBrains Mono")
    ? "JetBrains Mono"
    : fonts[0]?.name ?? "monospace";

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
