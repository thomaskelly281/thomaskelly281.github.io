'use client';

import { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { useGSAP } from './contexts/GSAPContext';

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  // GSAP scroll animation for transition between header and work section
  useEffect(() => {
    if (!headerRef.current || !workRef.current) return;

    const header = headerRef.current;
    const work = workRef.current;

    // Create a timeline for the transition animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: work,
        start: 'top bottom',
        end: 'top center',
        scrub: 1, // Smooth scrubbing animation
      },
    });

    // Animate header elements out as we scroll
    const headerContent = header.querySelector('[data-header-content]');
    
    if (headerContent) {
      tl.to(
        headerContent,
        {
          opacity: 0,
          y: -50,
          scale: 0.95,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // Animate work section elements in
    const workTitle = work.querySelector('[data-work-title]');
    const workContent = work.querySelector('[data-work-content]');

    if (workTitle) {
      tl.from(
        workTitle,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out',
        },
        0.2
      );
    }

    if (workContent) {
      tl.from(
        workContent,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
        },
        0.4
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === work) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger]);

  return (
    <main className="bg-background min-h-screen">
      {/* Header Section */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Work Section */}
      <WorkSection ref={workRef} />

      {/* About Section */}
      <AboutSection ref={aboutRef} />

      {/* Testimonials Section */}
      <TestimonialsSection ref={testimonialsRef} />

      {/* Footer */}
      <Footer />

    </main>
  );
}
