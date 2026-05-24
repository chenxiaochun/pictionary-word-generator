import type { Metadata } from "next";
import "./globals.css";
import "@/styles/seo-pages.css";

export const metadata: Metadata = {
  title: "Pictionary Word Generator with Timer – Free Game Host Tool",
  description:
    "Host Pictionary with a free word generator, built-in timer, peek-proof reveal, and zero repeats. Perfect for parties, Zoom, and family game night.",
  openGraph: {
    title: "Pictionary Host — Word Generator with Timer",
    description:
      "The fun way to host Pictionary. Free, no signup.",
    type: "website",
  },
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
