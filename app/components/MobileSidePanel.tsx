'use client';

import * as React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useSidePanel } from '../contexts/SidePanelContext';
import { useScrollTo } from '../hooks/useScrollTo';
import { PanelLeft } from '@/components/animate-ui/icons/panel-left';
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
  { label: 'Contact', href: '#contact' },
  { label: 'CV', href: '#cv' },
];

export function MobileSidePanel() {
  const { isMobile, isTablet } = useResponsive();
  const { isOpen, close, open } = useSidePanel();
  const { scrollToTop, scrollTo } = useScrollTo();

  // Only show on mobile and tablet
  if (!isMobile && !isTablet) {
    return null;
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    if (item.isHome) {
      scrollToTop({ duration: 1 });
    } else {
      scrollTo(item.href, { duration: 1 });
    }
    close();
  };

  return (
    <>
      {/* Trigger button with TK for mobile/tablet */}
      <div className="fixed left-3 top-3 z-50">
        <button
          onClick={open}
          className="flex items-center gap-1.5 bg-[var(--accent-tertiary)] px-2.5 py-1.5 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderRadius: '8px' }}
          aria-label="Open menu"
        >
          <div className="p-0 h-auto text-[#222222]">
            <AnimateIcon animateOnHover>
              <PanelLeft size={18} strokeWidth={1.5} />
            </AnimateIcon>
          </div>
          <span
            className="font-[family-name:var(--font-ppvalve)] font-extrabold italic text-[#222222] leading-none"
            style={{ fontWeight: 800, fontSize: '0.9375rem' }}
          >
            TK
          </span>
        </button>
      </div>

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
    </>
  );
}
