'use client';

import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const { isDesktop } = useResponsive();
  const [showSidePanelIcon, setShowSidePanelIcon] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for showSidePanelIcon at 10% scroll
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;

      // Set to true when scrolled 10% or more, false when at top or less than 10%
      if (scrollY === 0 || scrollPercentage < 10) {
        setShowSidePanelIcon(false);
      } else if (scrollPercentage >= 10) {
        setShowSidePanelIcon(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted || !isDesktop) {
    return null;
  }

  return <Navbar showSidePanelIcon={showSidePanelIcon} />;
}
