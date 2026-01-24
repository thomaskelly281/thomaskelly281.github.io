'use client';

import { MobileSidePanel } from './components/MobileSidePanel';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { useResponsive } from './hooks/useResponsive';

export default function Home() {
  const { isDesktop } = useResponsive();

  return (
    <main className="bg-background min-h-screen">
      {/* Mobile/Tablet Side Panel */}
      <MobileSidePanel />
      
      {/* Desktop Navbar - only show on desktop */}
      {isDesktop && <Navbar />}
      
      {/* Header Section */}
      <Header />
    </main>
  );
}
