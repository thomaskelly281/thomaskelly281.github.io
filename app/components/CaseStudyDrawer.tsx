'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@/components/ui/drawer';
import './CaseStudyDrawer.css';

const CLOSE_ANIMATION_MS = 1100;
const OPEN_WIDTH = '95vw';
const READY_TO_CLOSE_WIDTH = 'calc(95vw - 14px)';

interface CaseStudyDrawerProps {
  title: string;
  open: boolean;
  onDismiss: () => void;
  children: ReactNode;
}

export function CaseStudyDrawer({
  title,
  open,
  onDismiss,
  children,
}: CaseStudyDrawerProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isReadyToClose, setIsReadyToClose] = useState(false);
  const dismissedRef = useRef(false);
  const dismissTimeoutRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    onDismiss();
  };

  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current !== null) {
        window.clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || window.matchMedia('(hover: none)').matches) {
      setIsReadyToClose(false);
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      setIsReadyToClose(!!element?.closest('[data-drawer-dismiss]'));
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [isOpen]);

  useEffect(() => {
    const drawer = contentRef.current;
    if (!drawer || !isOpen) return;

    const controls = animate(
      drawer,
      { width: isReadyToClose ? READY_TO_CLOSE_WIDTH : OPEN_WIDTH },
      { type: 'spring', stiffness: 420, damping: 22, mass: 0.7 },
    );

    return () => controls.stop();
  }, [isOpen, isReadyToClose]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(nextOpen) => {
        setIsOpen(nextOpen);
        if (nextOpen) {
          dismissedRef.current = false;
          return;
        }

        setIsReadyToClose(false);
        if (dismissTimeoutRef.current !== null) {
          window.clearTimeout(dismissTimeoutRef.current);
        }
        dismissTimeoutRef.current = window.setTimeout(
          dismiss,
          CLOSE_ANIMATION_MS,
        );
      }}
      direction="right"
      handleOnly
      shouldScaleBackground={false}
    >
      <DrawerContent
        ref={contentRef}
        data-case-study-drawer=""
        className="z-[60] overflow-hidden rounded-2xl border-0 shadow-none data-[vaul-drawer-direction=right]:inset-y-3 data-[vaul-drawer-direction=right]:right-3 data-[vaul-drawer-direction=right]:h-auto data-[vaul-drawer-direction=right]:w-[95vw] data-[vaul-drawer-direction=right]:max-w-none data-[vaul-drawer-direction=right]:border-0 data-[vaul-drawer-direction=right]:sm:max-w-none"
        overlayClassName="z-[60] duration-1000"
      >
        <DrawerTitle className="sr-only">{title}</DrawerTitle>
        <div className="h-full overflow-y-auto overscroll-contain">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
