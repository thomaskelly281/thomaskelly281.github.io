import type { Metadata } from "next";
import "./globals.css";
import { GSAPProvider } from "./contexts/GSAPContext";
import { ScrollSmootherWrapper } from "./components/ScrollSmootherWrapper";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CustomCursor } from "./components/CustomCursor";
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
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <GSAPProvider>
            <CustomCursor />
            <ScrollSmootherWrapper>
              {children}
            </ScrollSmootherWrapper>
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
