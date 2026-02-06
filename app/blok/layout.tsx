import type { Metadata } from "next";
import { generateMetadata } from "../lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Blok - Design System Case Study",
  description: "Rebuilding Sitecore's design system for scale, governance, and AI. A comprehensive case study on design system architecture, component development, and cross-team collaboration.",
  path: "/blok",
  image: "/thumbs/blokthumb.webp",
  type: "article",
});

export default function BlokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

