import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest, Unbounded } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-unbounded",
});

const onest = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-onest",
});

const jetbrains = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-jetbrains",
});

const title = "С рейса снимают из-за транзитной визы — TransitCheck";
const description =
  "Платный разбор транзитных требований для одного маршрута. Вердикт по каждому плечу, источники и дата в PDF за 24 часа. $12, разово, для паспортов Казахстана и СНГ.";

export const viewport: Viewport = {
  themeColor: "#F4F4EE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: "%s — TransitCheck",
  },
  description,
  applicationName: "TransitCheck",
  keywords: [
    "транзитная виза",
    "стыковка",
    "снятие с рейса",
    "паспорт Казахстана",
    "разбор маршрута",
  ],
  authors: [{ name: "TransitCheck" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: "TransitCheck",
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${onest.variable} ${jetbrains.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          К содержанию
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
