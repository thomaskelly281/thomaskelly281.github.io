'use client';

import { useGSAP } from '../contexts/GSAPContext';

interface ScrollToOptions {
  /**
   * Duration of the scroll animation in seconds
   * @default 1
   */
  duration?: number;
  
  /**
   * Easing function
   * @default 'power2.inOut'
   */
  ease?: string;
  
  /**
   * Offset from the target position (in pixels)
   * @default 0
   */
  offset?: number;
}

/**
 * Hook for smooth scrolling to elements or positions
 * Uses GSAP's ScrollToPlugin for smooth animations
 * 
 * @example
 * ```tsx
 * const scrollTo = useScrollTo();
 * 
 * // Scroll to element
 * scrollTo('#section-1');
 * 
 * // Scroll to position
 * scrollTo(500);
 * 
 * // With options
 * scrollTo('#section-1', { duration: 2, offset: -100 });
 * ```
 */
export function useScrollTo() {
  const { gsap, smoother } = useGSAP();

  /**
   * Scroll to a target element or position
   * @param target - CSS selector, element, or pixel value
   * @param options - Scroll animation options
   */
  const scrollTo = (
    target: string | number | HTMLElement,
    options: ScrollToOptions = {}
  ) => {
    const {
      duration = 1,
      ease = 'power2.inOut',
      offset = 0,
    } = options;
    
    const smooth = duration > 0; // Whether to use smooth scrolling

    // If ScrollSmoother is active, use it for smoother scrolling
    if (smoother && typeof smoother.scrollTo === 'function') {
      try {
        if (typeof target === 'number') {
          // Scroll to pixel position
          // ScrollSmoother.scrollTo(number, smooth, position)
          smoother.scrollTo(target + offset, smooth, 'top top');
        } else {
          // Scroll to element (ScrollSmoother accepts element, selector, or number)
          // For offset, we need to calculate the position or use a custom approach
          if (offset !== 0) {
            // If offset is needed, calculate the element position
            const element = typeof target === 'string' 
              ? document.querySelector(target) 
              : target;
            
            if (element) {
              const elementTop = (element as HTMLElement).offsetTop;
              smoother.scrollTo(elementTop + offset, smooth, 'top top');
            }
          } else {
            // No offset, use element directly
            smoother.scrollTo(target, smooth, 'top top');
          }
        }
      } catch (error) {
        // If ScrollSmoother fails, fall back to ScrollToPlugin
        console.warn('ScrollSmoother scrollTo failed, falling back to ScrollToPlugin:', error);
        gsap.to(window, {
          duration,
          ease,
          scrollTo: {
            y: typeof target === 'number' 
              ? target + offset 
              : target,
            offsetY: offset,
          },
        });
      }
    } else {
      // Fallback to ScrollToPlugin if ScrollSmoother is not available
      gsap.to(window, {
        duration,
        ease,
        scrollTo: {
          y: typeof target === 'number' 
            ? target + offset 
            : target,
          offsetY: offset,
        },
      });
    }
  };

  /**
   * Scroll to top of the page
   */
  const scrollToTop = (options?: ScrollToOptions) => {
    scrollTo(0, options);
  };

  /**
   * Scroll to bottom of the page
   */
  const scrollToBottom = (options?: ScrollToOptions) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollTo(maxScroll, options);
  };

  return {
    scrollTo,
    scrollToTop,
    scrollToBottom,
  };
}
