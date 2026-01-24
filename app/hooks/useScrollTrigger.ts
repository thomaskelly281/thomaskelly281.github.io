'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

interface UseScrollTriggerOptions {
  /**
   * Callback function called when scroll trigger conditions are met
   */
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: gsap.plugins.ScrollTriggerInstanceVars;
  
  /**
   * Whether to enable the trigger
   * @default true
   */
  enabled?: boolean;
}

/**
 * Hook for creating scroll event triggers
 * Useful for onScroll events and scroll-based interactions
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useScrollTrigger(ref, {
 *   onEnter: () => console.log('Entered viewport'),
 *   onLeave: () => console.log('Left viewport'),
 *   scrollTrigger: {
 *     start: 'top center',
 *     end: 'bottom center',
 *   },
 * });
 * ```
 */
export function useScrollTrigger(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollTriggerOptions = {}
) {
  const { ScrollTrigger } = useGSAP();
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const {
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    scrollTrigger = {},
    enabled = true,
  } = options;

  useEffect(() => {
    if (!ref.current || !enabled) return;

    // Create ScrollTrigger instance
    triggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      ...scrollTrigger,
      onEnter: onEnter,
      onLeave: onLeave,
      onEnterBack: onEnterBack,
      onLeaveBack: onLeaveBack,
    });

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [
    ref,
    enabled,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    JSON.stringify(scrollTrigger),
  ]);

  return triggerRef.current;
}
