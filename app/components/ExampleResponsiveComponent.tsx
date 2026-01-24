'use client';

import { useRef } from 'react';
import { useGSAPAnimation } from '../hooks/useGSAPAnimation';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Example component demonstrating responsive design and GSAP animations
 * This serves as a reference for how to use the responsive utilities
 */
export function ExampleResponsiveComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, currentBreakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  // Example GSAP animation that adapts to screen size
  useGSAPAnimation(ref, {
    animation: (gsap, el) => {
      return gsap.from(el, {
        opacity: 0,
        y: isMobile ? 20 : 50,
        duration: 1,
        ease: 'power2.out',
      });
    },
    dependencies: [],
    responsive: true, // Re-runs animation on breakpoint changes
  });

  return (
    <div
      ref={ref}
      className="
        w-full
        p-4 sm:p-6 md:p-8 lg:p-12
        text-sm sm:text-base md:text-lg lg:text-xl
        bg-white dark:bg-gray-900
        rounded-lg
        shadow-sm sm:shadow-md lg:shadow-lg
      "
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Responsive Component Example
      </h2>
      
      <div className="space-y-2 text-gray-600 dark:text-gray-400">
        <p>Current width: {width}px</p>
        <p>Current breakpoint: {currentBreakpoint}</p>
        <p>Device type: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
          <p className="text-sm sm:text-base">Responsive Grid Item 1</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
          <p className="text-sm sm:text-base">Responsive Grid Item 2</p>
        </div>
        <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded sm:col-span-2 lg:col-span-1">
          <p className="text-sm sm:text-base">Responsive Grid Item 3</p>
        </div>
      </div>
    </div>
  );
}
