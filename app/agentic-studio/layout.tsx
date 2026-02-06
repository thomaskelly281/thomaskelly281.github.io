import type { Metadata } from "next";
import { generateMetadata } from "../lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Agentic Studio - AI Product Design",
  description: "Designing pioneer marketer workflows through AI enablement. A case study on designing for AI agents, non-linear workflows, and enterprise AI integration at Sitecore.",
  path: "/agentic-studio",
  image: "/thumbs/agenticthumb.webp",
  type: "article",
});

export default function AgenticStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

