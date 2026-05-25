import type { Metadata } from "next";
import "./globals.css";
import "@/styles/seo-pages.css";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

const defaultTitle =
  "Pictionary Word Generator with Timer – Free Game Host Tool";
const defaultDescription =
  "Host Pictionary with a free word generator, built-in timer, peek-proof reveal, and zero repeats. Perfect for parties, Zoom, and family game night.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: `%s · ${SITE_NAME}`,
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pictionary Host — Word Generator with Timer",
    description: "The fun way to host Pictionary. Free, no signup.",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pictionary Host — Word Generator with Timer",
    description: "The fun way to host Pictionary. Free, no signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
