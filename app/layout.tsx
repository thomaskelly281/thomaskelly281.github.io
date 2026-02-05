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

export const metadata: Metadata = {
  title: "Thomas Kelly - Product Designer",
  description: "Product Designer working @ Sitecore, based in Dublin, Ireland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
