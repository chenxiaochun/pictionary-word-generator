import { HomeClient } from "./HomeClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeSchemas } from "@/lib/seo-schemas";

export default function HomePage() {
  return (
    <main>
      <JsonLd data={homeSchemas} />
      <HomeClient />
    </main>
  );
}
