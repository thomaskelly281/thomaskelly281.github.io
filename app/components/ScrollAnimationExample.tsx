'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useScrollTo } from '../hooks/useScrollTo';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import { fadeInOnScroll, slideUpOnScroll, staggerOnScroll } from '../utils/scroll-animations';

/**
 * Example component demonstrating scroll animations and ScrollSmoother
 * This serves as a reference for how to use the scroll utilities
 */
export function ScrollAnimationExample() {
  const fadeRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { scrollTo, scrollToTop } = useScrollTo();

  // Fade in animation
  useScrollAnimation(fadeRef, {
    animation: (gsap, el) => {
      return fadeInOnScroll(el, {
        start: 'top 80%',
        duration: 1,
      });
    },
  });

  // Slide up animation
  useScrollAnimation(slideRef, {
    animation: (gsap, el) => {
      return slideUpOnScroll(el, {
        start: 'top 80%',
        distance: 100,
        duration: 1.2,
      });
    },
  });

  // Stagger animation for multiple elements
  useScrollAnimation(staggerRef, {
    animation: (gsap, el) => {
      const items = el.querySelectorAll('.stagger-item');
      return staggerOnScroll(items, {
        start: 'top 80%',
        stagger: 0.2,
        distance: 50,
      });
    },
  });

  // Scroll trigger for events
  useScrollTrigger(triggerRef, {
    onEnter: () => {
      console.log('Trigger entered viewport');
    },
    onLeave: () => {
      console.log('Trigger left viewport');
    },
    scrollTrigger: {
      start: 'top center',
      end: 'bottom center',
    },
  });

  return (
    <div className="space-y-32 py-32 px-4 sm:px-6 lg:px-8">
      {/* Scroll to top button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => scrollToTop({ duration: 1.5 })}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Scroll to Top
        </button>
      </div>

      {/* Fade in example */}
      <div
        ref={fadeRef}
        className="max-w-4xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Fade In Animation</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This section fades in as you scroll. The animation is triggered when
          the element enters 80% from the top of the viewport.
        </p>
      </div>

      {/* Slide up example */}
      <div
        ref={slideRef}
        className="max-w-4xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Slide Up Animation</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This section slides up from below as you scroll. Notice how it
          animates smoothly with ScrollSmoother enabled.
        </p>
      </div>

      {/* Stagger animation example */}
      <div
        ref={staggerRef}
        className="max-w-4xl mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6">Stagger Animation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stagger-item p-4 bg-blue-100 dark:bg-blue-900 rounded">
            <p>Item 1</p>
          </div>
          <div className="stagger-item p-4 bg-green-100 dark:bg-green-900 rounded">
            <p>Item 2</p>
          </div>
          <div className="stagger-item p-4 bg-purple-100 dark:bg-purple-900 rounded">
            <p>Item 3</p>
          </div>
          <div className="stagger-item p-4 bg-red-100 dark:bg-red-900 rounded">
            <p>Item 4</p>
          </div>
          <div className="stagger-item p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
            <p>Item 5</p>
          </div>
          <div className="stagger-item p-4 bg-pink-100 dark:bg-pink-900 rounded">
            <p>Item 6</p>
          </div>
        </div>
      </div>

      {/* Scroll trigger example */}
      <div
        ref={triggerRef}
        className="max-w-4xl mx-auto p-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Scroll Trigger Events</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Check the console to see scroll trigger events. This section triggers
          callbacks when it enters and leaves the viewport center.
        </p>
      </div>

      {/* Spacer for scrolling */}
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-400">Keep scrolling to see more animations</p>
      </div>
    </div>
  );
}
