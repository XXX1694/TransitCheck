import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-sans",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-mono",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

const title = "TransitCheck — Find out if they'll let you board";
const description =
  "Airlines refuse boarding over transit rules most travellers never hear about. Send your route and passport — a dated human check within 24 hours. $12 per route.";

export const viewport: Viewport = {
  themeColor: "#f2f3f0",
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
    "transit visa",
    "layover",
    "denied boarding",
    "route check",
    "passport",
  ],
  authors: [{ name: "TransitCheck" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en",
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
      lang="en"
      className={`${ibmSans.variable} ${ibmMono.variable} ${archivo.variable}`}
    >
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
