import type { Metadata } from "next";
import { EasyClient } from "./EasyClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { easyWordsSchemas } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Easy Pictionary Words Generator – Free Online Tool",
  description:
    "Generate easy Pictionary words instantly. Simple drawable prompts with built-in timer — perfect for warm-ups, kids, and casual game nights.",
  alternates: {
    canonical: "/easy-pictionary-words",
  },
};

export default function EasyPictionaryRoute() {
  return (
    <main>
      <JsonLd data={easyWordsSchemas} />
      <EasyClient />
    </main>
  );
}
