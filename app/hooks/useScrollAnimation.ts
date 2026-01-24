'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { useResponsive } from './useResponsive';

interface ScrollAnimationOptions {
  /**
   * Animation function that receives GSAP instance, element, and ScrollTrigger
   */
  animation: (
    gsap: typeof import('gsap').gsap,
    element: HTMLElement,
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
  ) => gsap.core.Tween | gsap.core.Timeline | void;
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: gsap.plugins.ScrollTriggerInstanceVars;
  
  /**
   * Dependencies array - animation will re-run when these change
   */
  dependencies?: unknown[];
  
  /**
   * Whether to re-run animation on breakpoint changes
   * @default true
   */
  responsive?: boolean;
}

/**
 * Hook for creating scroll-triggered GSAP animations
 * Automatically handles cleanup and responsive updates
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useScrollAnimation(ref, {
 *   animation: (gsap, el, ScrollTrigger) => {
 *     gsap.from(el, {
 *       opacity: 0,
 *       y: 100,
 *       duration: 1,
 *       scrollTrigger: {
 *         trigger: el,
 *         start: 'top 80%',
 *         end: 'bottom 20%',
 *         scrub: true,
 *       },
 *     });
 *   },
 * });
 * ```
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  animationOptions: ScrollAnimationOptions
) {
  const { gsap, ScrollTrigger } = useGSAP();
  const { currentBreakpoint } = useResponsive();
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const previousBreakpoint = useRef<string>(currentBreakpoint);

  useEffect(() => {
    if (!ref.current) return;

    // Cleanup previous animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Create new animation
    const result = animationOptions.animation(gsap, ref.current, ScrollTrigger);
    
    if (result) {
      animationRef.current = result;
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [
    ref,
    ...(animationOptions.dependencies || []),
    ...(animationOptions.responsive !== false ? [currentBreakpoint] : []),
  ]);

  // Handle responsive changes
  useEffect(() => {
    if (animationOptions.responsive === false) return;
    
    if (previousBreakpoint.current !== currentBreakpoint && ref.current) {
      // Re-run animation on breakpoint change
      if (animationRef.current) {
        animationRef.current.kill();
      }
      
      const result = animationOptions.animation(gsap, ref.current, ScrollTrigger);
      if (result) {
        animationRef.current = result;
      }
      
      previousBreakpoint.current = currentBreakpoint;
    }
  }, [currentBreakpoint, animationOptions.responsive, animationOptions, gsap, ScrollTrigger, ref]);
}
