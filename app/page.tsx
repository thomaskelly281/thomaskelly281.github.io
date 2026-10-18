'use client';

import { Header } from './components/Header';
import { DockToSection } from './components/DockToSection';

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <DockToSection />
    </main>
  );
}
