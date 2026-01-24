'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { useResponsive } from './useResponsive';

interface UseGSAPAnimationOptions {
  /**
   * Animation function that receives GSAP instance and element ref
   */
  animation: (gsap: typeof import('gsap').gsap, element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline | void;
  
  /**
   * Dependencies array - animation will re-run when these change
   */
  dependencies?: unknown[];
  
  /**
   * Whether to re-run animation on breakpoint changes
   * @default true
   */
  responsive?: boolean;
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: gsap.plugins.ScrollTriggerInstanceVars;
}

/**
 * Hook for creating GSAP animations with automatic cleanup and responsive support
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGSAPAnimation({
 *   animation: (gsap, el) => {
 *     gsap.from(el, {
 *       opacity: 0,
 *       y: 50,
 *       duration: 1,
 *     });
 *   },
 *   dependencies: [],
 * });
 * ```
 */
export function useGSAPAnimation(
  ref: RefObject<HTMLElement | null>,
  options: UseGSAPAnimationOptions
) {
  const { gsap } = useGSAP();
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
    const result = options.animation(gsap, ref.current);
    
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
    ...(options.dependencies || []),
    ...(options.responsive !== false ? [currentBreakpoint] : []),
  ]);

  // Handle responsive changes
  useEffect(() => {
    if (options.responsive === false) return;
    
    if (previousBreakpoint.current !== currentBreakpoint && ref.current) {
      // Re-run animation on breakpoint change
      if (animationRef.current) {
        animationRef.current.kill();
      }
      
      const result = options.animation(gsap, ref.current);
      if (result) {
        animationRef.current = result;
      }
      
      previousBreakpoint.current = currentBreakpoint;
    }
  }, [currentBreakpoint, options.responsive, gsap, ref]);
}
