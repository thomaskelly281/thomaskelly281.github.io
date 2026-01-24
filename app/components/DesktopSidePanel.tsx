'use client';

import * as React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useSidePanel } from '../contexts/SidePanelContext';
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

export function DesktopSidePanel() {
  const { isDesktop } = useResponsive();
  const { isOpen, close } = useSidePanel();

  // Only show on desktop
  if (!isDesktop) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetPortal>
        <SheetOverlay className="fixed inset-0 z-50 bg-black/50" />
        <SheetContent side="left" className="w-[300px] sm:w-[400px] z-50 bg-background p-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          
          {/* Close button in top left */}
          <SheetClose asChild>
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'absolute left-4 top-4'
              )}
              aria-label="Close menu"
            >
              <AnimateIcon animateOnHover>
                <X />
              </AnimateIcon>
            </button>
          </SheetClose>
          
          <div className="flex flex-col gap-6 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Theme</span>
                <ThemeTogglerButton />
              </div>
            </div>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}
