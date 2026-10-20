import type { Metadata } from "next";
import { generateMetadata } from "../lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Agentic Studio - AI Product Design",
  description: "Designing the AI surface so Sitecore marketers could run agents, flows, and chat without the product turning into a chatbot.",
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


