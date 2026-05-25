import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeSchemas } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={homeSchemas} />
      <HomeClient />
    </main>
  );
}
