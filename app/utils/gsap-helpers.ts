import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Create a responsive GSAP animation that adapts to breakpoints
 * @param element - Element to animate
 * @param fromProps - Animation properties for "from" state
 * @param toProps - Animation properties for "to" state
 * @param breakpointConfig - Different animation configs per breakpoint
 */
export function createResponsiveAnimation(
  element: gsap.TweenTarget,
  fromProps: gsap.TweenVars,
  toProps: gsap.TweenVars,
  breakpointConfig?: {
    mobile?: { from?: gsap.TweenVars; to?: gsap.TweenVars };
    tablet?: { from?: gsap.TweenVars; to?: gsap.TweenVars };
    desktop?: { from?: gsap.TweenVars; to?: gsap.TweenVars };
  }
) {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  let finalFrom = fromProps;
  let finalTo = toProps;

  if (breakpointConfig) {
    if (width < 768 && breakpointConfig.mobile) {
      finalFrom = { ...fromProps, ...breakpointConfig.mobile.from };
      finalTo = { ...toProps, ...breakpointConfig.mobile.to };
    } else if (width < 1024 && breakpointConfig.tablet) {
      finalFrom = { ...fromProps, ...breakpointConfig.tablet.from };
      finalTo = { ...toProps, ...breakpointConfig.tablet.to };
    } else if (breakpointConfig.desktop) {
      finalFrom = { ...fromProps, ...breakpointConfig.desktop.from };
      finalTo = { ...toProps, ...breakpointConfig.desktop.to };
    }
  }

  return gsap.fromTo(element, finalFrom, finalTo);
}

/**
 * Create a ScrollTrigger animation with responsive settings
 */
export function createResponsiveScrollTrigger(
  element: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  scrollTriggerProps: gsap.plugins.ScrollTriggerInstanceVars
) {
  return gsap.to(element, {
    ...animationProps,
    scrollTrigger: {
      ...scrollTriggerProps,
      // Auto-refresh on resize for responsive layouts
      refreshPriority: 1,
    },
  });
}

/**
 * Match media queries for responsive GSAP animations
 * @param breakpoint - Breakpoint to match
 * @param callback - Function to run when breakpoint matches
 */
export function matchMedia(
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  callback: (context: gsap.Context) => void
) {
  const breakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };

  const ctx = gsap.context(() => {
    callback(ctx);
  });

  const mm = gsap.matchMedia();
  mm.add(breakpoints[breakpoint], () => {
    callback(ctx);
  });

  return ctx;
}
