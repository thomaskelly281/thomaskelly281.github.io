import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Common scroll animation presets for quick use
 */

/**
 * Fade in animation on scroll
 */
export function fadeInOnScroll(
  element: gsap.DOMTarget,
  options?: {
    start?: string;
    end?: string;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: options?.duration ?? 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: options?.start ?? 'top 80%',
        end: options?.end ?? 'top 50%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Slide up animation on scroll
 */
export function slideUpOnScroll(
  element: gsap.DOMTarget,
  options?: {
    start?: string;
    distance?: number;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.distance ?? 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: options?.start ?? 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Scale in animation on scroll
 */
export function scaleInOnScroll(
  element: gsap.DOMTarget,
  options?: {
    start?: string;
    scale?: number;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: options?.scale ?? 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: options?.duration ?? 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: options?.start ?? 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Parallax effect on scroll
 */
export function parallaxOnScroll(
  element: gsap.DOMTarget,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  return gsap.to(element, {
    yPercent: -(options?.speed ?? 50),
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: options?.start ?? 'top bottom',
      end: options?.end ?? 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Pin element on scroll
 */
export function pinOnScroll(
  element: gsap.DOMTarget,
  options?: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
  }
) {
  return ScrollTrigger.create({
    trigger: element as gsap.DOMTarget,
    start: options?.start ?? 'top top',
    end: options?.end ?? '+=100%',
    pin: true,
    pinSpacing: options?.pinSpacing ?? true,
  });
}

/**
 * Stagger animation for multiple elements
 */
export function staggerOnScroll(
  elements: gsap.DOMTarget,
  options?: {
    start?: string;
    distance?: number;
    stagger?: number;
    duration?: number;
  }
) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.distance ?? 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start: options?.start ?? 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Scroll progress indicator
 */
export function scrollProgress(
  element: gsap.DOMTarget,
  options?: {
    start?: string;
    end?: string;
  }
) {
  return gsap.to(element, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: options?.start ?? 'top top',
      end: options?.end ?? 'bottom bottom',
      scrub: true,
    },
  });
}
