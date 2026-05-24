import type { Metadata } from "next";
import { ForKidsClient } from "./ForKidsClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { forKidsSchemas } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Pictionary Words for Kids – Free Generator",
  description:
    "Kid-friendly Pictionary word generator with easy words, 90-second timer, and peek-proof reveal. Perfect for family game night and classrooms ages 5–12.",
  alternates: {
    canonical: "/for-kids",
  },
};

export default function ForKidsRoute() {
  return (
    <main>
      <JsonLd data={forKidsSchemas} />
      <ForKidsClient />
    </main>
  );
}
