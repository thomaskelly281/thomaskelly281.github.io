'use client';

import { useEffect, useState } from 'react';

/**
 * Professional breakpoints matching Tailwind defaults
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Hook to get current viewport width and responsive state
 * @returns Object with width, height, and boolean flags for each breakpoint
 */
export function useResponsive() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSm = dimensions.width >= breakpoints.sm;
  const isMd = dimensions.width >= breakpoints.md;
  const isLg = dimensions.width >= breakpoints.lg;
  const isXl = dimensions.width >= breakpoints.xl;
  const is2Xl = dimensions.width >= breakpoints['2xl'];

  return {
    width: dimensions.width,
    height: dimensions.height,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    // Convenience flags
    isMobile: !isSm,
    isTablet: isSm && !isLg,
    isDesktop: isLg,
    // Breakpoint matching
    currentBreakpoint: (() => {
      if (dimensions.width >= breakpoints['2xl']) return '2xl';
      if (dimensions.width >= breakpoints.xl) return 'xl';
      if (dimensions.width >= breakpoints.lg) return 'lg';
      if (dimensions.width >= breakpoints.md) return 'md';
      if (dimensions.width >= breakpoints.sm) return 'sm';
      return 'xs';
    })() as Breakpoint | 'xs',
  };
}

/**
 * Hook to check if a specific breakpoint is active
 * @param breakpoint - The breakpoint to check
 * @param direction - 'up' checks if width >= breakpoint, 'down' checks if width < breakpoint
 */
export function useBreakpoint(
  breakpoint: Breakpoint,
  direction: 'up' | 'down' = 'up'
) {
  const { width } = useResponsive();
  const breakpointValue = breakpoints[breakpoint];

  return direction === 'up'
    ? width >= breakpointValue
    : width < breakpointValue;
}
