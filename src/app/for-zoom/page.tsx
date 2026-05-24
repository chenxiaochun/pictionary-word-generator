import type { Metadata } from "next";
import { ForZoomClient } from "./ForZoomClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { forZoomSchemas } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Pictionary Word Generator for Zoom – Free Virtual Game Night",
  description:
    "Play Pictionary on Zoom with a free word generator, built-in timer, peek-proof word reveal, and no repeats. Perfect for remote teams and virtual parties.",
  alternates: {
    canonical: "/for-zoom",
  },
};

export default function ForZoomRoute() {
  return (
    <main>
      <JsonLd data={forZoomSchemas} />
      <ForZoomClient />
    </main>
  );
}
