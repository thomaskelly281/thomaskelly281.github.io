import type { Metadata } from "next";
import "./globals.css";
import { GSAPProvider } from "./contexts/GSAPContext";
import { SidePanelProvider } from "./contexts/SidePanelContext";
import { ScrollSmootherWrapper } from "./components/ScrollSmootherWrapper";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CustomCursor } from "./components/CustomCursor";
import { NavbarWrapper } from "./components/NavbarWrapper";
import { DesktopSidePanel } from "./components/DesktopSidePanel";
import { MobileSidePanel } from "./components/MobileSidePanel";
import { generateMetadata } from "./lib/metadata";
import { StructuredData } from "./components/StructuredData";

export const metadata: Metadata = generateMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/font-family-3/SFPRODISPLAYREGULAR.OTF"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/font-family-1/PPValve-PlainMedium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/font-family-2/georgia.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <GSAPProvider>
            <SidePanelProvider>
              <CustomCursor />
              {/* Navbar, SidePanels outside ScrollSmootherWrapper for proper fixed positioning */}
              <NavbarWrapper />
              <DesktopSidePanel />
              <MobileSidePanel />
              <ScrollSmootherWrapper>
                {children}
              </ScrollSmootherWrapper>
            </SidePanelProvider>
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
