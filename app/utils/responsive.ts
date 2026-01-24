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
 * Get the current breakpoint based on window width
 * @param width - Window width in pixels
 * @returns Current breakpoint name
 */
export function getBreakpoint(width: number): Breakpoint | 'xs' {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Check if a breakpoint is active
 * @param width - Window width in pixels
 * @param breakpoint - Breakpoint to check
 * @returns True if width >= breakpoint
 */
export function isBreakpointActive(
  width: number,
  breakpoint: Breakpoint
): boolean {
  return width >= breakpoints[breakpoint];
}

/**
 * Get responsive value based on breakpoint
 * @param values - Object with breakpoint keys and values
 * @param currentWidth - Current window width
 * @returns The appropriate value for the current breakpoint
 */
export function getResponsiveValue<T>(
  values: Partial<Record<Breakpoint | 'xs', T>>,
  currentWidth: number
): T | undefined {
  const breakpoint = getBreakpoint(currentWidth);
  
  // Try to find value for current breakpoint, fallback to smaller breakpoints
  const order: Array<Breakpoint | 'xs'> = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = order.indexOf(breakpoint);
  
  for (let i = currentIndex; i >= 0; i--) {
    const bp = order[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return undefined;
}
