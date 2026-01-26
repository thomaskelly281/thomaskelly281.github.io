'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useResponsive } from '../hooks/useResponsive';
import { useSidePanel } from '../contexts/SidePanelContext';
import { useScrollTo } from '../hooks/useScrollTo';
import { X } from '@/components/animate-ui/icons/x';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetTitle,
} from '@/components/animate-ui/primitives/radix/sheet';
import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  isHome?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#', isHome: true },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#footer' },
];

export function DesktopSidePanel() {
  const { isDesktop } = useResponsive();
  const { isOpen, close } = useSidePanel();
  const { scrollToTop, scrollTo } = useScrollTo();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before rendering to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Only show on desktop, but wait until mounted to prevent hydration mismatch
  if (!mounted || !isDesktop) {
    return null;
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    
    // If not on home page, navigate to home first, then scroll to section
    if (!isHomePage && item.href.startsWith('#')) {
      router.push('/');
      close();
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        if (item.isHome) {
          scrollToTop({ duration: 1 });
        } else {
          scrollTo(item.href, { duration: 1 });
        }
      }, 100);
      return;
    }
    
    // On home page, just scroll to section
    if (item.isHome) {
      scrollToTop({ duration: 1 });
    } else {
      scrollTo(item.href, { duration: 1 });
    }
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetPortal>
        <SheetOverlay className="fixed inset-0 z-50 bg-black/50" />
        <SheetContent side="left" className="w-[300px] sm:w-[400px] z-50 bg-[var(--accent-tertiary)] p-6 pb-12" data-sidepanel>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          
          {/* Close button in top left */}
          <SheetClose asChild>
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'absolute left-4 top-4 z-10 text-[#222222]'
              )}
              style={{ color: '#222222' }}
              aria-label="Close menu"
            >
              <AnimateIcon animateOnHover>
                <X size={32} className="text-[#222222]" style={{ color: '#222222' }} />
              </AnimateIcon>
            </button>
          </SheetClose>
          
          <div className="flex flex-col h-full mt-12">
            {/* Navigation Items */}
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="relative text-4xl sm:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] transition-colors hover:text-[#222222] group"
                  style={{ fontWeight: 500 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#222222] transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Theme Toggle - Beneath menu items */}
            <div className="mt-8">
              <ThemeTogglerButton size="lg" className="scale-[1.3] text-[#222222]" style={{ color: '#222222' }} />
            </div>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}
