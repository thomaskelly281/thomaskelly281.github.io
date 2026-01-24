'use client';

import { forwardRef, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useGSAP } from '../contexts/GSAPContext';

export const WorkSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;

  // Scroll animation for work section entrance
  useScrollAnimation(sectionRef, {
    animation: (gsap, element, ScrollTrigger) => {
      // Animate elements in the work section
      const title = element.querySelector('[data-work-title]');
      const content = element.querySelector('[data-work-content]');

      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      if (title) {
        tl.from(title, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      if (content) {
        tl.from(
          content,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      return tl;
    },
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-background"
    >
      <div className="max-w-7xl mx-auto w-full py-20">
        <h2
          data-work-title
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-primary mb-8"
        >
          Work
        </h2>
        <div data-work-content className="text-text-secondary">
          <p className="font-sfpro text-lg leading-relaxed" style={{ fontWeight: 300 }}>
            Your work content will go here.
          </p>
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
