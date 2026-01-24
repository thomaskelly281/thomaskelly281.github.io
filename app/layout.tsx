import type { Metadata } from "next";
import "./globals.css";
import { GSAPProvider } from "./contexts/GSAPContext";
import { ScrollSmootherWrapper } from "./components/ScrollSmootherWrapper";
import { ThemeProvider } from "./providers/ThemeProvider";

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
            <ScrollSmootherWrapper>
              {children}
            </ScrollSmootherWrapper>
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
