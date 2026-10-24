import type { Metadata } from "next";
import { generateMetadata } from "../lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "SitecoreAI DAM - Digital asset management within a CMS Case Study",
  description: "Designing the content foundation so SitecoreAI could find, adapt, govern, and learn from brand content. A case study on rethinking DAM as an AI-first context layer.",
  path: "/dam",
  image: "/thumbs/damthumb.webp",
  type: "article",
});

export default function DamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
